import { Router } from "express";
import {
	createUser,
	getAllUser,
	getProfile,
	loginUser,
} from "../controller/user.controllers";
import auth from "../middlewares/auth.middlewares";

const router = Router();

router.route("/signup").post(createUser);
router.route("/signin").post(loginUser);
router.route("/").get(auth, getAllUser);
router.route("/profile").get(auth, getProfile);

export default router;
