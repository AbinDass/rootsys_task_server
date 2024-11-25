import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors'
import authRoutes from "./routes/authroutes.js"
import taskRoutes from "./routes/task.js";
const app = express();
app.use(cors());
dotenv.config({ path: "./.env" });

//connecting database here

const DB = `mongodb://localhost:27017/rootsys`;
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log(`database connected successfully`);
    });

app.use(express.json({ limit: "2MB" }));
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes)
app.use('/tasks', taskRoutes)
// running server here

const PORT = 8000;
app.listen(PORT, (err) => {
    if (err) {
        console.log(`database set`);
    } else {
        console.log(`running at port ${PORT}`);
    }
});
