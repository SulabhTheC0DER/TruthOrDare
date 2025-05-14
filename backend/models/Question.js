import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  type: { type: String, enum: ["truth", "dare"], required: true },
  text: { type: String, required: true },
});

const Question = mongoose.model("Question", questionSchema);
export default Question;
