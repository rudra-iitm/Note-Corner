import { GoogleGenerativeAI } from "@google/generative-ai";
const apiKey = "AIzaSyA3lUkbj76xn-ObdOQzzbutkN2g2KCAAko";

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

let chat = null

const aboutMe = "You are a chatbot created by Note-Corner backend System engineers. Predict the correct order in which the given tasks should be executed : "

async function getGeminiResponse(message) {
    if (!chat) {
        chat = model.generateContent(aboutMe);
    }
    const response = await model.generateContent(`${aboutMe} ${message} then give response saying that we recommend you to execute the tasks in the following order :`);
    return response;
}


const predictOrder = async (req, res) => {
    const { message } = req.body;
    const response = await getGeminiResponse(message);
    const { candidates } = response.response;
    const {content:{parts}} = candidates[0];
    const {text} = parts[0];
    const formattedText = text.split("\n").filter((line) => line.length > 0).map((line) => line.trim()).join("\n");
    return res.json(formattedText);
};

export { predictOrder };