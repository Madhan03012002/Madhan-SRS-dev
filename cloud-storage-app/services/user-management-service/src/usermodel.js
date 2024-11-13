import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const userSchema = new mongoose.Schema({
  email: String,
  name: String
});

const User = mongoose.model('User', userSchema);

export default User; 
