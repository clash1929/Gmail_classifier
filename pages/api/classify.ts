import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { subject, snippet } = req.body;

  if (!subject || !snippet) {
    return res.status(400).json({ error: "Missing subject or snippet" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an assistant that classifies emails into the following categories:\n" +
            "Important: Emails that are personal or work-related and require immediate attention.\n" +
            "Promotions: Emails related to sales, discounts, and marketing campaigns.\n" +
            "Social: Emails from social networks, friends, and family.\n" +
            "Marketing: Emails related to marketing, newsletters, and notifications.\n" +
            "Spam: Unwanted or unsolicited emails.\n" +
            "General: If none of the above are matched, use General.",
        },
        {
          role: "user",
          content: `Classify this email:\nSubject: ${subject}\nSnippet: ${snippet}`,
        },
      ],
      max_tokens: 50,
    });

    const label =
      completion.choices?.[0]?.message?.content.trim() || "General";

    res.status(200).json({ label });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
