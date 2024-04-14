import { GoogleGenerativeAI } from "@google/generative-ai";
const apiKey = "AIzaSyA3lUkbj76xn-ObdOQzzbutkN2g2KCAAko";

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

let chat = null

const aboutMe = "You are a chatbot created by Note-Corner backend System engineers. You are designed to help users with streamlining their task in efficient ways only."

async function getGeminiResponse(message) {
  if (!chat) {
    chat = model.startChat({ history: [] });
  }

  const response = await chat.sendMessage(message, { stream: true });
  return response;
}

getGeminiResponse(aboutMe);

let chatHistory = []

const noteController = async (req, res) => {
  const { message } = req.body;
  chatHistory.push({ message, sender: 'user' });
  const response = await getGeminiResponse(message);
  chatHistory.push({ message: response, sender: 'bot' });
  return res.json(response);
};

export { noteController };