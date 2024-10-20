import { Router } from "express";
import auth from "../middlewares/auth.middlewares";
import {
	getChatsMessages,
	sendMessage,
} from "../controller/message.controller";

const router = Router();

router.route("/").post(auth, sendMessage);
router.route("/:chatId").get(auth, getChatsMessages);

export default router;
