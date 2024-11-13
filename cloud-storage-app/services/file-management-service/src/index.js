import express from 'express';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import File from './usermodel.js';
import { initmongo } from './utils/helperdb.js';
const app = express();
app.use(express.json());
const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB limit
    fileFilter: (req, file, cb) => {
        cb(null, true);
    }
});
initmongo()

function authenticate(req, res, next) {
    const token = req.headers['authorization'];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}


app.post('/files/upload', authenticate, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({ statuscode: 400, message: 'File is required' });
        }

        const file = new File({
            userId: req.user.userId,
            path: req.file.path,
            filename: req.file.originalname,
        });
        await file.save();
        res.status(200).send({ message: 'File uploaded successfully', fileId: file._id });
    } catch (error) {
        console.error("File upload error:", error);
        res.status(500).send({ statuscode: 500, message: 'Internal Server Error' });
    }
});


app.get('/files/download/:fileId', authenticate, async (req, res) => {
    try{
    const file = await File.findOne({
         _id: req.params.fileId, 
         userId: req.user.userId 
        });
    if (file) {
        console.log("file downloaded")
        res.download(file.path, file.filename)
    }
    else{ 
        res.status(404).send({ message: 'File not found' })
   }
} catch (error) {
    res.status(500).send({ statuscode: 500, message: 'Internal Server Error' });
}
});

app.listen(3003, () => console.log('File Management service running on port 3003'));
