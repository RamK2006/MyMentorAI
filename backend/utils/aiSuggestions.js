const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const getDefaultSuggestions = (zone) => {
    switch (zone) {
        case 'green': return "1. Keep up the consistent effort in your studies.\n2. Continue managing your time effectively.\n3. Reach out to a teacher for an extra challenge or project.";
        case 'yellow': return "1. Review recent topics where your grades were lower.\n2. Try to attend all classes this week to not miss key information.\n3. Set aside a specific time each day for homework.";
        case 'red': return "1. Please speak with your school counselor or a trusted teacher this week.\n2. Focus on improving attendance immediately.\n3. Break down your assignments into smaller, more manageable tasks.";
        default: return "Please check in with your teacher for guidance.";
    }
};

const generateSuggestions = async (riskData, studentProfile) => {
    const prompt = `
        You are an expert AI educational counselor. A student's academic risk profile has been generated.
        Your task is to provide 3 concise, actionable, and encouraging recommendations for the student.
        Do not mention the risk score or zone directly. Focus on positive actions.

        Student's Grade Level: ${studentProfile.grade_level || 'Not specified'}
        
        Key Risk Indicators:
        - Average Grade: ${riskData.factors.avgGrade}%
        - Attendance Score (lower indicates better attendance): ${riskData.factors.attendance}
        - Wellbeing Score (higher indicates more stress/less motivation): ${riskData.factors.wellbeing}

        Based on these indicators, provide three numbered suggestions formatted with markdown (e.g., "1. First suggestion.\n2. Second suggestion.").
    `;

    try {
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error("Gemini API Error:", error);
        return getDefaultSuggestions(riskData.zone);
    }
};
module.exports = generateSuggestions;