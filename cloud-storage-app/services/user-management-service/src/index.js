import express from 'express';
import jwt from 'jsonwebtoken';
import User from './usermodel.js'; 
import { initmongo } from './utils/helperdb.js';
const app = express();
app.use(express.json());
initmongo()

function authenticate(req, res, next) {
    const token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

app.get('/user/profile', authenticate, async (req, res) => {
    try{
    const user = await User.findById(req.user.userId).select('-password');
    res.status(200).send(user);
    } catch(error){
        res.status(500).send({ statuscode: 500, message: 'Internal Server Error' })
    }
});

app.put('/user/profile', authenticate, async (req, res) => {
    try{
    const user = await User.findByIdAndUpdate(req.user.userId, req.body, { new: true });
    res.status(200).send(user);
} catch(error){
    res.status(500).send({ statuscode: 500, message: 'Internal Server Error' })
}
});


app.listen(3002, () => console.log('User Management service running on port 3002'))