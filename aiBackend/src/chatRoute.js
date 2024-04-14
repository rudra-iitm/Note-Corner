import { Router } from "express";
import { chatController } from "./chat.controller.js";

const router = Router();    
router.post('/talk', chatController);

export default router;