import express, { Response } from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import { googleLogin } from "./controller/user.controllers";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: ["http://localhost:5173", "*"],
		credentials: true,
	})
);
app.use(cookieParser());

app.use((req, _, next) => {
	console.log("Request Hit On ->", req.url);
	next();
});

app.get("/", (_, res: Response) => {
	res.send("working fineee");
});

app.get("/auth/google", (req, res) => {
	const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code&scope=email%20profile`;
	res.redirect(oauthUrl);
});

app.get("/auth/google/callback", googleLogin);

import userRouter from "./routes/user.routes";
import errorMiddleware from "./middlewares/error.middlewares";
import chatRouter from "./routes/chat.routes";
import messageRouter from "./routes/message.routes";

app.use("/api/auth", userRouter);
app.use("/api/chats", chatRouter);
app.use("/api/messages", messageRouter);

app.use(errorMiddleware);

const server = http.createServer(app);
export default server;
