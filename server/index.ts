import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json());

const DOCUMENT_TYPE_NAMES: Record<string, string> = {
  "personal-statement": "personal statement",
  scholarship: "scholarship application essay",
  erasmus: "Erasmus motivation letter",
};

app.post("/api/generate-draft", async (req, res) => {
  const {
    name,
    documentType,
    language,
    fieldOfStudy,
    university,
    background,
    achievement,
    motivation,
  } = req.body;

  if (
    !name ||
    !documentType ||
    !university ||
    !fieldOfStudy ||
    !background ||
    !achievement ||
    !motivation
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return res
      .status(500)
      .json({ error: "Google API key is not configured on the server." });
  }

  const docName = DOCUMENT_TYPE_NAMES[documentType] || "application letter";
  const langName = language || "English";

  const systemPrompt = `You are a skilled academic writing coach. You write in a natural, personal, and authentic tone — never robotic or formulaic. You avoid clichés like "I am passionate about" or "Since I was a child." Your writing sounds like a thoughtful student, not an AI. You produce exactly one draft with no preamble, no commentary, and no sign-off — just the body text. You write in ${langName}.`;

  const userPrompt = `Write a ${docName} in ${langName} for ${name}, who is applying to ${university} to study ${fieldOfStudy}.

Background: ${background}

Biggest achievement: ${achievement}

Why they want this opportunity: ${motivation}

Write 300–400 words. Use first person. Make it specific and personal. Do not include a title, greeting, or sign-off — just the body paragraphs. Write entirely in ${langName}.`;

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: systemPrompt,
    });

    const result = await model.generateContent(userPrompt);
    const draft = result.response.text().trim();

    if (!draft) throw new Error("No content generated");

    return res.json({ draft });
  } catch (e: any) {
    console.error("generate-draft error:", e);
    if (e?.status === 429) {
      return res.status(429).json({
        error: "Too many requests. Please wait a moment and try again.",
      });
    }
    return res
      .status(500)
      .json({ error: e?.message || "AI generation failed" });
  }
});

if (process.env.NODE_ENV === "production") {
  const distPath = path.resolve(__dirname, "../dist");
  app.use(express.static(distPath));
  app.get("*splat", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

const PORT = parseInt(process.env.PORT || "3001", 10);
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
