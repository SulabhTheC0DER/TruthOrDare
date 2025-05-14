export const getQuestions = (req, res) => {
    res.status(200).json({ message: "Fetching all questions..." });
};

export const addQuestion = (req, res) => {
    const { question, type } = req.body;

    if (!question || !type) {
        return res.status(400).json({ error: "Question and type are required!" });
    }

    res.status(201).json({ message: "New question added!", question, type });
};
