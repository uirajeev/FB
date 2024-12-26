import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/users.js';
import Code from '../models/code.js';
import {
  validateEmail,
  validateLength,
  generateUsername,
} from '../helper/validation.js';
import { generateToken } from '../helper/token.js';
import sendVerificationEmail from '../helper/mailer.js';
import generateCode from '../helper/generageCode.js';

// Send email verification mail to user
function sendMail(doc, subject = null, templet = null) {
  const emailToken = generateToken(
    {
      id: doc._id.toString(),
    },
    '24h'
  );
  const url = `${process.env.BASE_URL}/activate/${emailToken}`;
  sendVerificationEmail(doc.email, doc.first_name, url, subject, templet);
}

// create login token
function crateSession(doc, expire = '7d', msg = '') {
  const token = generateToken(
    {
      id: doc._id.toString(),
    },
    expire
  );

  return {
    id: doc._id.toString(),
    picture: doc.picture,
    username: doc.username,
    first_name: doc.first_name,
    last_name: doc.last_name,
    verified: doc.verified,
    ...(msg && { message: msg }),
    token,
  };
}
// Register User
export const register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      middle_name,
      email,
      password,
      gender,
      bYear,
      bMonth,
      bDay,
    } = req.body;

    // Email Validation
    if (!validateEmail(email)) {
      return res.status(400).json({
        message:
          'Uh-oh! It seems the email address you provided is invalid. Please double-check and enter a valid email address to continue.',
      });
    }
    // Check for unique email
    const isEmail = await User.findOne({ email });
    if (isEmail) {
      if (isEmail.verified) {
        return res.status(400).json({
          message:
            'Oops! It looks like that email address is already registered. Please use a different email or try logging in.',
        });
      }
      // Send verification mail to user when email is registered but not verified
      sendMail(isEmail);
      return res.status(400).json({
        message: `The email address ${email} is already registered with us. Please verify your account to gain access.`,
      });
    }

    // Check first name length
    if (!validateLength(first_name, 3, 30)) {
      return res.status(400).json({
        message:
          'Hey there! Your first name should be between 3 and 30 characters long. Please adjust the length and try again.',
      });
    }

    // Check last name length
    if (!validateLength(last_name, 3, 30)) {
      return res.status(400).json({
        message:
          'Oops! Your last name should be between 3 and 30 characters long. Please make sure it falls within this range and try again.',
      });
    }

    // Check last name length
    if (!validateLength(password, 8, 32)) {
      return res.status(400).json({
        message:
          'Uh-oh! Your password should be between 8 and 32 characters long. Please create a password that falls within this range and try again.',
      });
    }

    const bcryptedPassword = await bcrypt.hash(password, 12);
    const newUserName = await generateUsername(
      first_name.toLowerCase() + last_name.toLowerCase()
    );

    const user = await new User({
      first_name,
      last_name,
      middle_name,
      email,
      username: newUserName,
      password: bcryptedPassword,
      gender,
      bYear,
      bMonth,
      bDay,
    });

    // res.json(user);
    user.save().then((doc) => {
      // Send verification mail to user
      sendMail(doc);

      // create response object with new token
      res.json(
        crateSession(
          doc,
          '7d',
          'Congratulations on your successful registration! Please check your email for the activation link.'
        )
      );
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Activate User
export const activateAccount = async (req, res) => {
  try {
    const { token } = req.body;
    const id = req.user.id;
    const userTokenInfo = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(userTokenInfo.id);

    if (id !== user.id) {
      return res.status(400).json({ message: 'Invalid token' });
    }
    if (user?.verified) {
      return res
        .status(400)
        .json({ message: 'This email ID has already been activated.' });
    }
    await User.findByIdAndUpdate(userTokenInfo.id, { verified: true });
    res.json({ message: 'Account activated successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message:
          "We couldn't find this email address in our records. Please check the email address you provided.",
      });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({
        message:
          'Sorry, the password you entered is invalid. Please try again.',
      });
    }
    // res.json(crateSession(user, '1d', 'Congratulations! You have successfully logged in!'));
    res.json(crateSession(user, '7d'));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Auth
export const auth = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    res.json(crateSession(user, '7d'));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const resendVerificationEmail = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    if (user.verified) {
      return res
        .status(400)
        .json({ message: 'This email ID has already been activated.' });
    }
    sendMail(user);
    res.json({ message: 'Verification email sent successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Find User
export const findUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Account does not exists.' });
    }

    res.json({ email: user.email, picture: user.picture });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Send Reset Email

export const sendResetEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).select('-password');
    if (!user) {
      return res.status(400).json({ message: 'Account does not exists.' });
    }
    const code = generateCode(5);
    await Code.deleteMany({ user: user._id });
    await new Code({ code, user: user._id }).save();

    const templet = `<div style=max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto;font-weight:600;color:#3b5998><img alt=""src=https://res.cloudinary.com/dnnklt79k/image/upload/v1693748628/FB/logo_r8ueez.png style=width:30px> <span>Action require: Activate you facebook Account</span></div><div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;font-size:17px;color:#141023;font-family:Roboto"><span>Hello ${user.first_name}!</span><div style="padding:20px 0"><span>Thanks for setting up your Facebook account! To complete your registration/password reset, please verify your email by entering the code below:</span></div><span style="width:200px;padding:10px 15px;background:#4c649b;text-decoration:none;font-weight:600;color:#fff"target=_blank>${code}</span><br><div style=padding-top:20px;color:#898f9c>Facebook enables you to stay connected with your friends. Once registered, you can effortlessly share photos, organize events, and much more.</div></div>`;
    sendMail(user, 'Reset Your Password for Facebook Access', templet);
    return res.status(200).json({ message: 'Reset email sent successfully!' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Verify code

export const verifyCode = async (req, res) => {
  try {
    const { code, email } = req.body;
    const user = await User.findOne({ email });
    const dbCode = await Code.findOne({ user: user._id });
    if (dbCode.code !== code) {
      return res.status(401).json({
        message: 'Verification code is wrong.',
      });
    }
    return res.status(200).json({message: 'Code validated!'});
  } catch (error) {
    return res.status(500).json({ message: err.message });
  }
};


// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const {email, password} = req.body;
    if(!email) {
      return res.status(400).json({message: 'Invalid credentials "emali"'})
    }
    if(!password) {
      return res.status(400).json({message: 'Invalid credentials "password"'})
    }
    const bcryptedPassword = await bcrypt.hash(password, 12);
    const user = await User.findOneAndUpdate({email}, {password: bcryptedPassword});
    await Code.findOneAndRemove({ user: user._id });
    return res.status(200).json({message: 'Password changed successfully'})
  } catch (error) {
    return res.status(500).json({ message: err.message });
  }
};