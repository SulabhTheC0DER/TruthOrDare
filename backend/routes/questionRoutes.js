import express from "express";
import { getQuestions, addQuestion } from "../controllers/questionController.js";

const router = express.Router();

router.get("/", getQuestions);
router.post("/add", addQuestion);

export default router;
