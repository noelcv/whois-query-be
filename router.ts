import { Router } from "express";
import controllers from "./controllers/index.controller";

const router = Router();

router.get("/", controllers.home.getHome);

export default router;