import { Router } from "express";
import { registerUser, loginUser, getUserProfile, logoutUser } from "../controller/user.controller.js";
import { authUser } from "../middleware/auth.middleware.js";
const router = Router();



router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/profile").get(authUser, getUserProfile);

router.route("/logout").get(authUser, logoutUser)




const userRouter = router;
export default userRouter;