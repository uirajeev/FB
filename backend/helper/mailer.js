import nodemailer from 'nodemailer';
import {google} from 'googleapis';

const {OAuth2} = google.auth;
const authLink = "https://developers.google.com/oauthplayground";

const {EMAIL, MAILING_ID, MAILING_SECRET, MAILING_REFRESH } = process.env;

const auth = new OAuth2(MAILING_ID, MAILING_SECRET, authLink);

export default (email, name, url) => {
    auth.setCredentials({
        refresh_token: MAILING_REFRESH,
    });
    const accessToken = auth.getAccessToken();
    const stmp = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: EMAIL,
            clientId: MAILING_ID,
            clientSecret: MAILING_SECRET,
            refreshToken: MAILING_REFRESH,
            accessToken,
        },
    });

    const mailOptions = {
        from: EMAIL,
        to: email,
        subject: 'Verify Your Email Address for Facebook Access',
        html: `<div style=max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto;font-weight:600;color:#3b5998><img alt=""src=https://res.cloudinary.com/dnnklt79k/image/upload/v1693748628/FB/logo_r8ueez.png style=width:30px> <span>Action require: Activate you facebook Account</span></div><div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;font-size:17px;color:#141023;font-family:Roboto"><span>Hello ${name}!</span><div style="padding:20px 0"><span>You've recently set up a Facebook account. To finalize your registration, kindly confirm your email.</span></div><a href=${url} rel="noopener noreferrer"style="width:200px;padding:10px 15px;background:#4c649b;text-decoration:none;font-weight:600;color:#fff"target=_blank>Confirm your account</a><br><div style=padding-top:20px;color:#898f9c>Facebook enables you to stay connected with your friends. Once registered, you can effortlessly share photos, organize events, and much more.</div></div>`,
    };

    stmp.sendMail(mailOptions, (err, res) => {
        if(err) {
            return err;
        }
        return res;
    });
};
