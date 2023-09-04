import bcrypt from 'bcrypt';
import User from '../models/users.js';
import{ validateEmail, validateLength, generateUsername } from '../helper/validation.js'
import { generateToken } from '../helper/token.js';
import sendVerificationEmail from '../helper/mailer.js';

export const home = (req, res) => {
    res.send('Hey i am user')
}

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
        if(!validateEmail(email)) {
            return res.status(400).json({
                message: 'Uh-oh! It seems the email address you provided is invalid. Please double-check and enter a valid email address to continue.',
            });
        }
        // Check for unique email
        const isEmail = await User.findOne({email});
        if(isEmail) {
            return res.status(400).json({
                message: 'Oops! It looks like that email address is already registered. Please use a different email or try logging in.',
            });
        }

        // Check first name length
        if(!validateLength(first_name, 3, 30)) {
            return res.status(400).json({
                message: 'Hey there! Your first name should be between 3 and 30 characters long. Please adjust the length and try again.',
            });
        }

        // Check last name length
        if(!validateLength(last_name, 3, 30)) {
            return res.status(400).json({
                message: 'Oops! Your last name should be between 3 and 30 characters long. Please make sure it falls within this range and try again.',
            });
        }

        // Check last name length
        if(!validateLength(password, 8, 32)) {
            return res.status(400).json({
                message: 'Uh-oh! Your password should be between 8 and 32 characters long. Please create a password that falls within this range and try again.',
            });
        }

        const bcryptedPassword = await bcrypt.hash(password, 12);
        const newUserName = await generateUsername(first_name + last_name);

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
        user.save().then( doc => {
            const emailToken = generateToken({
                id: doc._id.toString()
            }, '24h');
            const url = `${process.env.BASE_URL}/activate/${emailToken}`;
            sendVerificationEmail(doc.email, doc.first_name, url);
            res.json(doc);
        });
    } catch(error) {
        res.status(500).json({message: error.message});
    }
}
