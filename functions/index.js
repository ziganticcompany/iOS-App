const functions = require('firebase-functions');

const admin = require('firebase-admin');

const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const cors = require('cors')({ origin: true });

admin.initializeApp();

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'zigantic.a@gmail.com',
        pass: 'zigantic10?'
    }
});
exports.sendMail = functions.https.onRequest((req, res) => {

    cors(req, res, () => {

        const { dest, htmlFormat, subject } = req.body;
        const mailOptions = {
            from: 'zigantic.a@gmail.com', // Something like: Jane Doe <janedoe@gmail.com>
            to: dest,
            subject: subject, // email subject
            html: htmlFormat
        };
        return transporter.sendMail(mailOptions, (erro, info) => {
            if (erro) {
                return res.send(erro.toString());
            }
            return res.send('Sended');

        });

    });

});