import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/users.js';
import {
  validateEmail,
  validateLength,
  generateUsername,
} from '../helper/validation.js';
import { generateToken } from '../helper/token.js';
import sendVerificationEmail from '../helper/mailer.js';

// Send email verification mail to user
function sendMail(doc) {
  const emailToken = generateToken(
    {
      id: doc._id.toString(),
    },
    '24h'
  );
  const url = `${process.env.BASE_URL}/activate/${emailToken}`;
  sendVerificationEmail(doc.email, doc.first_name, url);
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
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};
