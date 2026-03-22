import router, { Router } from "express";
import { getwebsite, website } from "../controllers/content";
import { middleware } from "../middleware/usermiddleware";

const content = router();

content.post("/website", middleware, website);
content.get("/website/:websiteID", middleware, getwebsite);

export default content;
