import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const fileSchema = new mongoose.Schema({
    userId: String, 
    path: String, 
    filename: String
});

const File = mongoose.model('File', fileSchema);

export default File; 
