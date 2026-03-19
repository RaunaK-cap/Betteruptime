import router, { Router } from "express";
import { website } from "../controllers/userfn";
import { middleware } from "../middleware/usermiddleware";

const content = router();

content.post("/website", middleware, website);

export default content;
