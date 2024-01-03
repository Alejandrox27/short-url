import "dotenv/config";
import "./database/connectDB.js";
import express from 'express';
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import linkRouter from "./routes/link.route.js"
import redirectRouter from "./routes/redirect.route.js"

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use("/", redirectRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/links", linkRouter);

//app.use(express.static("public"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("🔥🔥🔥 http://localhost:" + PORT)
})