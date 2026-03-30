import axios from "axios";
import fs from "fs";
import path from "path";


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const sarvamRefine = async (formattedGemini) => {
  let sarvamPromptText;
  try {
    const sarvamPromptPath = path.join(process.cwd(), "sarvam_prompt.txt");
    sarvamPromptText = fs
      .readFileSync(sarvamPromptPath, "utf-8")
      .replace(/^\uFEFF/, "");
  } catch {
    sarvamPromptText = `You are an expert medical translator and formatter. You will receive a medical report analysis.
You must output EXACTLY three sections, and NOTHING ELSE. 

## English
(Keep the original analysis, clean and well-formatted)

## Hindi
(Translate the full analysis into simple Hindi)

## Hinglish
(Rewrite in Hinglish)

CRITICAL RULES:
1. Start each language EXACTLY with "## LanguageName" on a new line. Do NOT use "1. English".
2. Patient Details MUST be formatted exactly like this:
**👤 Patient Details:**
* **Name:** [Name]
* **Age & Gender:** [Age, Gender]
3. You MUST color-code the severity of the findings using HTML spans. Examples:
   - High/Critical/Severe: <span class="text-red-600 font-bold bg-red-50 px-2 py-1 rounded-md border border-red-200">High</span>
   - Slightly High/Low/Borderline: <span class="text-yellow-600 font-bold bg-yellow-50 px-2 py-1 rounded-md border border-yellow-200">Slightly High</span>
   - Normal/Good: <span class="text-green-600 font-bold bg-green-50 px-2 py-1 rounded-md border border-green-200">Normal</span>
4. Keep the Summary intact. 
5. DO NOT output conversational filler (e.g., "Okay, let's tackle this query..."). Start directly with "## English".`;
  }

  const response = await axios.post(
    "https://api.sarvam.ai/v1/chat/completions",
    {
      model: "sarvam-m",
      messages: [
        { role: "system", content: sarvamPromptText },
        { role: "user", content: formattedGemini },
      ],
      max_tokens: 4096,
    },
    {
      headers: {
        "api-subscription-key": process.env.SARVAM_API_KEY,
        "Content-Type": "application/json",
      },
      timeout: 60000,
    },
  );
  let refinedText =
    response.data?.choices?.[0]?.message?.content || formattedGemini;
  refinedText = refinedText.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
  return refinedText;
};

const analyzeReport = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const base64File = file.buffer.toString("base64");

    let promptText;
    try {
      const geminiPromptPath = path.join(process.cwd(), "medical_prompt.txt");
      promptText = fs
        .readFileSync(geminiPromptPath, "utf-8")
        .replace(/^\uFEFF/, "");
    } catch {
      return res
        .status(500)
        .json({ success: false, message: "Could not load medical_prompt.txt" });
    }

    const geminiUrl = process.env.GEMINI_API_URL.includes("?key=")
      ? `${process.env.GEMINI_API_URL}${process.env.GEMINI_API_KEY}`
      : `${process.env.GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`;

    const payload = {
      contents: [
        {
          parts: [
            { text: promptText },
            {
              inlineData: {
                mimeType: file.mimetype,
                data: base64File,
              },
            },
          ],
        },
      ],
    };

    let geminiResponse;
    const maxRetries = 2;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        geminiResponse = await axios.post(geminiUrl, payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        break;
      } catch (error) {
        if (
          error.response &&
          error.response.status === 429 &&
          attempt < maxRetries - 1
        ) {
          console.warn(
            `Gemini Rate Limit Hit. Waiting 16 seconds before retrying (Attempt ${attempt + 2})...`,
          );
          await delay(16000);
        } else {
          throw error;
        }
      }
    }

    const geminiResult =
      geminiResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No result generated";

    const formattedGemini = geminiResult
      .replace(/➡️\s*/g, "\n➡️ ")
      .replace(/\n{2,}/g, "\n\n");

    let finalResult = formattedGemini;
    try {
      finalResult = await sarvamRefine(formattedGemini);
    } catch (sarvamError) {
      console.error(
        "Sarvam Error (falling back to Gemini output):",
        sarvamError.response?.data || sarvamError.message,
      );
    }

    return res.json({ success: true, data: finalResult });
  } catch (error) {
    console.error("Error Details:", error.response?.data || error.message);

    if (error.response?.status === 429) {
      return res.status(429).json({
        success: false,
        message:
          "Our servers are experiencing high traffic. Please wait a minute and try again.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error analyzing report",
      error: error.response?.data?.error?.message || error.message,
    });
  }
};

export { analyzeReport };
