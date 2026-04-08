import router, { Router } from "express";
import { deletewebsite, getwebsite, website } from "../controllers/content";
import { middleware } from "../middleware/usermiddleware";

const content = router();

content.post("/website", middleware, website);
content.get("/website/:websiteID", middleware, getwebsite);
content.delete("/websitedelete", middleware, deletewebsite);

export default content;
