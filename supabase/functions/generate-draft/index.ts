import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const DOCUMENT_TYPE_NAMES: Record<string, string> = {
  "personal-statement": "personal statement",
  "scholarship": "scholarship application essay",
  "erasmus": "Erasmus motivation letter",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, documentType, language, fieldOfStudy, university, background, achievement, motivation } = await req.json();

    if (!name || !documentType || !university || !fieldOfStudy || !background || !achievement || !motivation) {
      return new Response(JSON.stringify({ error: "All fields are required." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const docName = DOCUMENT_TYPE_NAMES[documentType] || "application letter";
    const langName = language || "English";

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are a skilled academic writing coach. You write in a natural, personal, and authentic tone — never robotic or formulaic. You avoid clichés like "I am passionate about" or "Since I was a child." Your writing sounds like a thoughtful student, not an AI. You produce exactly one draft with no preamble, no commentary, and no sign-off — just the body text. You write in ${langName}.`;

    const userPrompt = `Write a ${docName} in ${langName} for ${name}, who is applying to ${university}.

Background: ${background}

Biggest achievement: ${achievement}

Why they want this opportunity: ${motivation}

Write 300–400 words. Use first person. Make it specific and personal. Do not include a title, greeting, or sign-off — just the body paragraphs. Write entirely in ${langName}.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Too many requests. Please wait a moment and try again." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI usage limit reached. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      throw new Error("AI generation failed");
    }

    const data = await response.json();
    const draft = data.choices?.[0]?.message?.content?.trim();

    if (!draft) throw new Error("No content generated");

    return new Response(JSON.stringify({ draft }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-draft error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
