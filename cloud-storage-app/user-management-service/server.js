require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// User model
const userSchema = new mongoose.Schema({ email: String, name: String });
const User = mongoose.model('User', userSchema);

// Middleware to verify JWT
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

// Fetch profile
app.get('/user/profile', authenticate, async (req, res) => {
    const user = await User.findById(req.user.userId).select('-password');
    res.send(user);
});

// Update profile
app.put('/user/profile', authenticate, async (req, res) => {
    const user = await User.findByIdAndUpdate(req.user.userId, req.body, { new: true });
    res.send(user);
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(3002, () => console.log('User Management service running on port 3002')));
