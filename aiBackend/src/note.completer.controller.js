import { GoogleGenerativeAI } from "@google/generative-ai";
const apiKey = "AIzaSyA3lUkbj76xn-ObdOQzzbutkN2g2KCAAko";

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

let chat = null

const aboutMe = "You are a chatbot created by Note-Corner backend System engineers. You are designed to predict the next 3-4 words (strictly adhere limit) when the user is writing only(strict)."

async function getGeminiResponse(message) {
    if (!chat) {
        chat = model.generateContent(aboutMe);
    }
    const newMessage = message.split(' ').slice(-30).join(' ');
    const response = await model.generateContent(`Predict with accuracy what should be the next 3-4 words after : new Message ${newMessage}`);
    return response;
}


const autoCompletion = async (req, res) => {
    const { message } = req.body;
    const response = await getGeminiResponse(message);
    const { candidates } = response.response;
    const {content:{parts}} = candidates[0];
    const {text} = parts[0];
    return res.json(text);
};

export { autoCompletion };