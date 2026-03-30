// backend/controllers/reportController.js
import axios from "axios";
import fs from "fs";
import path from "path";

const sarvamRefine = async (formattedGemini) => {
    // Safely read sarvam prompt with fallback
    let sarvamPromptText;
    try {
        const sarvamPromptPath = path.join(process.cwd(), "sarvam_prompt.txt");
        sarvamPromptText = fs.readFileSync(sarvamPromptPath, "utf-8").replace(/^\uFEFF/, ""); 
    } catch {
        // Fallback inline prompt if file read fails
        sarvamPromptText = `You are a helpful medical assistant. You will receive a medical report analysis in English.
Your job is to reformat and present it clearly in THREE sections:

1. English – Keep the original analysis, clean and well-formatted.
2. Hindi – Translate the full analysis into simple Hindi.
3. 🤝 Hinglish – Rewrite in Hinglish (Hindi words in English script, casual tone).

Keep the ➡️ arrow format, patient info, and Summary intact in all three sections.
Do NOT skip any findings. Keep tone friendly and non-alarming.`;
    }

    const response = await axios.post(
        "https://api.sarvam.ai/v1/chat/completions", // SARVAM URL
        {
            model: "sarvam-m",
            messages: [
                { role: "system", content: sarvamPromptText },
                { role: "user", content: formattedGemini }
            ],
            max_tokens: 2048
        },
        {
            headers: {
                "api-subscription-key": process.env.SARVAM_API_KEY,
                "Content-Type": "application/json"
            },
            timeout: 60000
        }
    );
    let refinedText = response.data?.choices?.[0]?.message?.content || formattedGemini;
    refinedText = refinedText.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
    return refinedText;
};

const analyzeReport = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        const base64File = file.buffer.toString("base64");

        // Step 1: Read Gemini prompt safely
        let promptText;
        try {
            const geminiPromptPath = path.join(process.cwd(), "medical_prompt.txt");
            promptText = fs.readFileSync(geminiPromptPath, "utf-8").replace(/^\uFEFF/, "");
        } catch {
            return res.status(500).json({ success: false, message: "Could not load medical_prompt.txt" });
        }

        // Step 2: Call Gemini API
        const geminiResponse = await axios.post(
            `${process.env.GEMINI_API_URL}${process.env.GEMINI_API_KEY}`,
            {
                contents: [
                    {
                        parts: [
                            { text: promptText },
                            {
                                inline_data: {
                                    mime_type: file.mimetype,
                                    data: base64File
                                }
                            }
                        ]
                    }
                ]
            }
        );

        const geminiResult =
            geminiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "No result generated";

        const formattedGemini = geminiResult
            .replace(/➡️\s*/g, "\n➡️ ")
            .replace(/\n{2,}/g, "\n\n");

        // Step 3: Sarvam refine + multilingual
        let finalResult = formattedGemini;
        try {
            finalResult = await sarvamRefine(formattedGemini);
        } catch (sarvamError) {
            console.error(
                "Sarvam Error (falling back to Gemini output):",
                sarvamError.response?.data || sarvamError.message
            );
        }

        return res.json({ success: true, data: finalResult });

    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        return res.status(500).json({
            success: false,
            message: "Error analyzing report",
            error: error.response?.data || error.message
        });
    }
};

export { analyzeReport };