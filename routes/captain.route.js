import { Router } from "express";
import registerCaptain from "../controller/captain.controller.js";
const router = Router();

router.route("/register").post(registerCaptain);




const captainRouter = router;
export default captainRouter;