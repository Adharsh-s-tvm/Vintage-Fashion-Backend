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

dotenv.config()
const port = process.env.PORT || 7000;

connectDB()

const app = express()
app.use(cors());


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);


app.listen(port, () => console.log(`Server running on port : ${port}`));
