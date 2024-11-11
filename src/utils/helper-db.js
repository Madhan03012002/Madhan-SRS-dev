import mongoose from "mongoose"
import dotenv from 'dotenv';
dotenv.config();

const DB_CONNTION_STRING = process.env.DB_CONNTION_STRING ? process.env.DB_CONNTION_STRING : "DB_CONNTION_STRING"
console.log("DB File")
 const initmongo = () => {
    try {
        mongoose.set('strictQuery', true);
        mongoose.connect(DB_CONNTION_STRING);
        let db = mongoose.connection;
        db.on('error', err => console.log(err));
        db.once('open', () => console.log('\n📝 Connected'));

    } catch (err) {
        console.log(err);
    }
}
export { initmongo };