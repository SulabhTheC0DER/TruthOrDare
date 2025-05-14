const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

// Get a random truth/dare question
router.get("/", async (req, res) => {
    const type = req.query.type || "truth";
    const question = await Question.aggregate([{ $match: { type } }, { $sample: { size: 1 } }]);
    res.json(question.length ? question[0] : { message: "No questions available" });
});

// Add new questions (Admin use only)
router.post("/add", async (req, res) => {
    const { type, text } = req.body;
    if (!type || !text) return res.status(400).json({ error: "Type and text required" });

    const newQuestion = new Question({ type, text });
    await newQuestion.save();
    res.json({ message: "Question added successfully!" });
});

export default router;
