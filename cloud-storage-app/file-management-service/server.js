require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const app = express();
app.use(express.json());
const upload = multer({ dest: 'uploads/' });

// File model
const fileSchema = new mongoose.Schema({ userId: String, path: String, filename: String });
const File = mongoose.model('File', fileSchema);

// Middleware for JWT authentication
function authenticate(req, res, next) {
    const token = req.headers['authorization'];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Upload file
app.post('/files/upload', authenticate, upload.single('file'), async (req, res) => {
    const file = new File({ userId: req.user.userId, path: req.file.path, filename: req.file.originalname });
    await file.save();
    res.send({ message: 'File uploaded', fileId: file._id });
});

// Download file
app.get('/files/download/:fileId', authenticate, async (req, res) => {
    const file = await File.findOne({ _id: req.params.fileId, userId: req.user.userId });
    if (file) res.download(file.path, file.filename);
    else res.status(404).send({ message: 'File not found' });
});

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(3003, () => console.log('File Management service running on port 3003')));
