import nodemailer from 'nodemailer';
import {google} from 'googleapis';

const {OAuth2} = google.auth;
const authLink = "https://developers.google.com/oauthplayground";

const {EMAIL, MAILING_ID, MAILING_SECRET, MAILING_REFRESH, MAILING_ACCESS} = process.env;

const auth = new OAuth2(MAILING_ID, MAILING_REFRESH, MAILING_SECRET, authLink);

export default sendVerificationEmail = (email, name, url) => {
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
        html: '',
    };

    stmp.sendMail(mailOptions, (err, res) => {
        if(err) {
            return err;
        }
        return res;
    });
}
