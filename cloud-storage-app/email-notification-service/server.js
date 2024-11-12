require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASSWORD }
});

app.post('/email/send', (req, res) => {
    const { to, subject, text } = req.body;
    transporter.sendMail({ from: process.env.EMAIL, to, subject, text }, (error, info) => {
        if (error) return res.status(500).send(error.toString());
        res.send('Email sent: ' + info.response);
    });
});

app.listen(3004, () => console.log('Email service running on port 3004'));
