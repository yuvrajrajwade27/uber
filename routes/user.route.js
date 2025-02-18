import { Router } from "express";
import registerUser from "../controller/user.controller.js";
const router = Router();


router.route("/register").post(registerUser)






const userRouter = router;
export default userRouter;