import dotenv from "dotenv";
dotenv.config();


import connectDB from "./config/db";
import { app } from "./app";

const PORT = process.env.PORT || 3000;

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error("JWT_KEY must be defined");
    }
    try {
        await connectDB();
    } catch (error) {
        console.error(error, "database connection failed..");
    }

    app.listen(PORT, () => {
        console.log(`listening  at port ${process.env.PORT} `);    });
};

start();
