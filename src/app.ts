import express from "express";
import "express-async-errors";
import cors from "cors";

import cookieParser from "cookie-parser";

import dotenv from "dotenv";
import { errorHandler } from "./middlewares/error-handler";
import { userRouter } from "./routes/userRoter";



dotenv.config();

const app = express();

app.use(cookieParser());

const corsOptions = {
    origin: "http://localhost:3000", 
    credentials: true, 
    optionsSuccessStatus: 200
};

app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.set("trust proxy", true);


app.use(cors(corsOptions));



app.use("/api/user",userRouter(express.Router()));



app.use(errorHandler);

export { app }; 
