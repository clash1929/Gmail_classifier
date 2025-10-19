"use client";

import "./EmailCard.css";

interface EmailCardProps {
  email: { id: string; subject: string; snippet: string; label?: string };
}

export default function EmailCard({ email }: EmailCardProps) {
  const labelClassMap: Record<string, string> = {
    Important: "label-important",
    Promotions: "label-promotions",
    Social: "label-social",
    Marketing: "label-marketing",
    Spam: "label-spam",
    General: "label-general",
  };

  return (
    <div className="email-card">
      <h2 className="email-subject">{email.subject}</h2>
      <p className="email-snippet">{email.snippet}</p>
      {email.label && (
        <span className={`email-label ${labelClassMap[email.label] || "label-general"}`}>
          {email.label}
        </span>
      )}
    </div>
  );
}
