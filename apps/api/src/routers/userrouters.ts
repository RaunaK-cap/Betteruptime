import { Router } from "express";
import { login, signup } from "../controllers/usercontrol";

const userroutes = Router();

userroutes.post("/signup", signup);
userroutes.post("/login", login);

export default userroutes;
