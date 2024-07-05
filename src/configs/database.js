const mysql = require('mysql2');
const nodemailer = require('nodemailer');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123@Thang',
    database: 'SGr'
});

const mailService = {
    async sendEmail({ emailFrom, emailTo, emailSubject, emailText }) {
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'kenyon.kuhn56@ethereal.email',
                pass: '3UX7EDdUmnKzwYpXN8'
            }
        });

        await transporter.sendMail({
            from: emailFrom,
            to: emailTo,
            subject: emailSubject,
            text: emailText,
        });
    },
};

Object.freeze(mailService);

module.exports = {
    db,
    mailService,
};
