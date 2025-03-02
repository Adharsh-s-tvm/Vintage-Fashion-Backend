//packages
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors'


// Utiles 
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import adminRoutes from "./routes/adminRoutes.js";
import signUpOtpRoutes from './routes/signUpOtp/signUpOtpRoutes.js'

dotenv.config()
const port = process.env.PORT || 7000;

connectDB()

const app = express()
app.use(cors({
    origin: 'http://localhost:3000', // or whatever your frontend URL is
    credentials: true
}));


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use("/api", userRoutes);
app.use("/api/admin", adminRoutes);

app.use("/api/user/otp", signUpOtpRoutes);


app.listen(port, () => console.log(`Server running on port : ${port}`));
