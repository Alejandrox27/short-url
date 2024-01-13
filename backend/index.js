import "dotenv/config";
import "./database/connectDB.js";
import express from 'express';
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import linkRouter from "./routes/link.route.js";
import redirectRouter from "./routes/redirect.route.js";
import cors from "cors";
import __dirname from "./utils/dirs.js";

const app = express();

const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2, process.env.ORIGIN3]

app.use(cors({
    origin: function(origin, callback){
        if(!origin || whiteList.includes(origin)){
            return callback(null, origin);
        };
        return callback("CORS Error origin: " + origin + " non authorized.")
    }, 
    credentials: true
},
));

app.use(express.json());

app.use(cookieParser());

app.use("/", redirectRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/links", linkRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("🔥🔥🔥 http://127.0.0.1:" + PORT)
})