import express from "express"
const router = express.Router();
router.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
});
import { user } from "../middleware/usercrud.js";

router.post("/user",user)

export {router}