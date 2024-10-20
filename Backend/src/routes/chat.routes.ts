import { Router } from "express";
import auth from "../middlewares/auth.middlewares";
import { createChat, getChats } from "../controller/Chat.controllers";

const router = Router();

router.route("/").get(auth, getChats);
router.route("/:userId").post(auth, createChat);

export default router;

    