import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from './usermodel.js';
import nodemailer from 'nodemailer';
import { initmongo } from './utils/helperdb.js';

const app = express();
app.use(express.json());
initmongo()

const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

app.post('/auth/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("Email already registered");
            return res.status(409).send({ statuscode: 409, message: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });
        await user.save();

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Registration Confirmation',
            text: 'Thank you for registering! Your account has been created successfully.',
        };

        await transporter.sendMail(mailOptions);
        console.log("Confirmation email sent to", email);

        console.log("User registered");
        res.status(200).send({ statuscode: 200, message: 'User registered successfully' });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send({ statuscode: 500, message: 'Internal Server Error' });
    }
});



 app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try{
    const user = await User.findOne({ email });
    console.log(user)
    let passval = user ?  await bcrypt.compare(password, user?.password) : false
    // console.log(passval)
    if (user && passval ) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        // console.log(token)
        res.status(200).send({ token ,statusode : 200 , message : "user login success"});
    } else {
        res.status(400).send({ statuscode: 400 , message: 'Invalid credentials' });
    }
}catch (error) {
    console.error("Error login user:", error);
    res.status(500).send({ statuscode: 500, message: 'Internal Server Error' });
}
});

app.listen(3001, () => console.log('Auth service running on port 3001'))
