import { getSession } from "next-auth/react";

export default async function handler(req: any, res: any) {
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  const { accessToken } = session;

  try {
    const messagesRes = await fetch(
      "https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=15",
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    if (!messagesRes.ok) {
      const text = await messagesRes.text();
      return res.status(messagesRes.status).json({ error: text });
    }

    const data = await messagesRes.json();

    const messages = await Promise.all(
      (data.messages || []).map(async (msg: any) => {
        const messageData = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=full`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        ).then((res) => res.json());

        return {
          id: messageData.id,
          subject:
            messageData.payload.headers.find((h: any) => h.name === "Subject")
              ?.value || "No Subject",
          snippet: messageData.snippet,
        };
      })
    );

    res.status(200).json(messages);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to fetch emails: " + err.message });
  }
}
