import { Router } from "express";
import { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain } from "../controller/captain.controller.js";
import { authCaptain } from "../middleware/auth.middleware.js";
const router = Router();

router.route("/register").post(registerCaptain);

router.route("/login").post(loginCaptain);

router.route("/profile").get(authCaptain, getCaptainProfile);

router.route("/logout").get(authCaptain, logoutCaptain)


const captainRouter = router;
export default captainRouter;