import express, { type RequestHandler } from "express";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";
import { supabaseAdmin } from "./supabase.js";
import { authStorage } from "./replit_integrations/auth/storage.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json());

const isAuthenticated: RequestHandler = async (req: any, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  req.supabaseUser = user;
  next();
};

app.get("/api/me", isAuthenticated, async (req: any, res) => {
  try {
    const supaUser = req.supabaseUser;
    const meta = supaUser.user_metadata ?? {};
    await authStorage.upsertUser({
      id: supaUser.id,
      email: supaUser.email ?? null,
      firstName: meta.full_name?.split(" ")[0] ?? meta.given_name ?? meta.name?.split(" ")[0] ?? null,
      lastName: meta.full_name?.split(" ").slice(1).join(" ") ?? meta.family_name ?? null,
      profileImageUrl: meta.avatar_url ?? meta.picture ?? null,
    });
    const user = await authStorage.getUser(supaUser.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      profileImageUrl: user.profileImageUrl,
      credits: user.credits,
    });
  } catch (e) {
    console.error("Error in /api/me:", e);
    res.status(500).json({ message: "Failed to fetch user" });
  }
});

const DOCUMENT_TYPE_NAMES: Record<string, string> = {
  "personal-statement": "personal statement",
  scholarship: "scholarship application essay",
  erasmus: "Erasmus motivation letter",
};

app.post("/api/generate-draft", isAuthenticated, async (req: any, res) => {
  const supaUser = req.supabaseUser;
  const userId = supaUser.id;

  const credits = await authStorage.getCredits(userId);
  if (credits <= 0) {
    return res.status(403).json({ error: "no_credits" });
  }

  const { name, documentType, language, fieldOfStudy, university, background, achievement, motivation } = req.body;

  if (!name || !documentType || !university || !fieldOfStudy || !background || !achievement || !motivation) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GROQ_API_KEY is not configured on the server." });
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
    const groq = new OpenAI({
      apiKey,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const draft = completion.choices[0]?.message?.content?.trim();
    if (!draft) throw new Error("No content generated");

    const remainingCredits = await authStorage.deductCredit(userId);

    return res.json({ draft, creditsRemaining: remainingCredits });
  } catch (e: any) {
    console.error("generate-draft error:", e);
    if (e?.status === 429) {
      return res.status(429).json({ error: "Too many requests. Please wait a moment and try again." });
    }
    return res.status(500).json({ error: e?.message || "AI generation failed" });
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
