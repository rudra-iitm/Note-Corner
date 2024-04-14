import { Router } from "express";
import { noteController } from "./note.controller.js";
import { autoCompletion } from "./note.completer.controller.js";

const router = Router();
router.post('/note', noteController);
router.post('/completion',autoCompletion);

export default router;