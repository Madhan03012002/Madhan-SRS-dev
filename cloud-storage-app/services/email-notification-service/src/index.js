import dotenv from 'dotenv';
import express from 'express';
import nodemailer from 'nodemailer';
dotenv.config();

const app = express();
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { 
        user: process.env.EMAIL, 
        pass: process.env.EMAIL_PASSWORD 
    }
});

console.log("Email service initialized");

app.post('/email/send', (req, res) => {
    const { to, subject, text } = req.body;
    try {
        transporter.sendMail({ from: process.env.EMAIL, to, subject, text }, (error, info) => {
            if (error) return res.status(500).send(error.toString());
            res.status(200).send('Email sent: ' + info.response);
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.toString());
    }
});

app.listen(3004, () => console.log('Email service running on port 3004'));
