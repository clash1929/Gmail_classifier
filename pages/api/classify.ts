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
          content: `
You are a helpful assistant that MUST classify the email strictly into ONE of these categories: Important, Promotions, Social, Marketing, Spam, General.

Only respond with exactly one of these words — no explanations, no extra text.

Categories:

- Important: Personal or work emails that need immediate attention or urgent action.
- Promotions: Emails about sales, discounts, or marketing offers.
- Social: Emails from social networks, friends, family.
- Marketing: Newsletters, notifications, marketing emails.
- Spam: Unwanted or unsolicited emails.
- General: Anything else.

Examples:

Subject: "Project deadline tomorrow" -> Important
Subject: "50% off sale this weekend" -> Promotions
Subject: "Friend request on SocialNet" -> Social
Subject: "Monthly newsletter" -> Marketing
Subject: "You've won a prize!" -> Spam

Now classify this email ONLY with one word (Important, Promotions, Social, Marketing, Spam, General):
          `.trim(),
        },
        {
          role: "user",
          content: `Subject: ${subject}\nSnippet: ${snippet}`,
        },
      ],
      max_tokens: 10,
      temperature: 0,
    });

    const rawLabel = completion.choices?.[0]?.message?.content?.trim() || "General";

    // Log raw response for debugging:
    console.log("OpenAI raw label:", rawLabel);

    // Normalize label capitalization
    const label = rawLabel.charAt(0).toUpperCase() + rawLabel.slice(1).toLowerCase();

    // Validate output label, fallback to General
    const validLabels = ["Important", "Promotions", "Social", "Marketing", "Spam", "General"];
    if (!validLabels.includes(label)) {
      return res.status(200).json({ label: "General" });
    }

    res.status(200).json({ label });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
