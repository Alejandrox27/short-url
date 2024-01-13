import "dotenv/config";
import "./database/connectDB.js";
import express from 'express';
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import linkRouter from "./routes/link.route.js";
import redirectRouter from "./routes/redirect.route.js";
import cors from "cors";
import { create } from "express-handlebars";
import __dirname from "./utils/dirs.js";
import path from "node:path";

const app = express();

const whiteList = [process.env.ORIGIN1, process.env.ORIGIN2]

app.use(cors({
    origin: function(origin, callback){
        if(!origin || whiteList.includes(origin)){
            return callback(null, origin);
        };
        return callback("CORS Error origin: " + origin + " non authorized.")
    }},
));

app.use(express.json());

app.use(cookieParser());

const hbs = create({
    extname: ".hbs",
    partialsDir: ["views/components"],
})

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "..", "views"));

app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/", redirectRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/links", linkRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("🔥🔥🔥 http://127.0.0.1:" + PORT)
})