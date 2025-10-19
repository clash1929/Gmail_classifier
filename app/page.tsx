"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import EmailCard from "./components/EmailCard";

export default function Home() {
  const { data: session } = useSession();
  const [emails, setEmails] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchEmails = async () => {
    setLoading(true);
    setError(null);
    if (!session) return setError("Please sign in.");

    try {
      const res = await fetch("/api/fetch-emails");
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();

      const classified = await Promise.all(
        data.map(async (email: any) => {
          const classifyRes = await fetch("/api/classify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ subject: email.subject, snippet: email.snippet }),
          });
          const classifyData = await classifyRes.json();
          const label = classifyData.label || "General";
          return { ...email, label };
        })
      );

      setEmails(classified);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(emails, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "classified_emails.json";
    a.click();
  };

  if (!session) {
    return (
      <div
        className="container"
        style={{ textAlign: "center", padding: "4rem 1rem" }}
      >
        <h1
          className="title"
          style={{
            fontSize: "3rem",
            marginBottom: "2rem",
            color: "#a855f7ff",
            animation: "pulse 2s infinite",
          }}
        >
          Gmail Classifier
        </h1>
        <h2
          className="title"
          style={{
            fontSize: "1.6rem",
            marginBottom: "1rem",
            color: "#7c38bcff",
            animation: "pulse 1s infinite",
          }}
        >
          Contact Developer to gain access{" "}
          <a
            href="https://kushal1929.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "underline", color: "#7c38bcff" }}
          >
            →
          </a>
        </h2>

        <p
          style={{
            fontSize: "1.125rem",
            maxWidth: "600px",
            margin: "0 auto 2rem",
          }}
        >
          Automatically fetch your latest emails and classify them into
          Important, Promotions, Social, Marketing, Spam, or General.
        </p>
        <button
          onClick={() => signIn("google")}
          className="button"
          style={{ backgroundColor: "white", color: "#7c3aed" }}
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Welcome, {session.user?.name}</h1>
        <button onClick={() => signOut()} className="button">
          Sign Out
        </button>
      </header>

      <section className="info-box">
        <h2>Email Classifications</h2>
        <ul>
          <li><strong>Important:</strong> Personal or work emails requiring immediate attention</li>
          <li><strong>Promotions:</strong> Emails about sales, discounts, marketing</li>
          <li><strong>Social:</strong> Emails from friends, social networks</li>
          <li><strong>Marketing:</strong> Newsletters, notifications, other marketing</li>
          <li><strong>Spam:</strong> Unwanted or unsolicited emails</li>
          <li><strong>General:</strong> Emails not matched by above categories</li>
        </ul>
      </section>

      <section className="actions">
        <button
          onClick={handleFetchEmails}
          disabled={loading}
          className="button button-primary"
        >
          {loading ? "Fetching Emails..." : "Fetch Emails"}
        </button>

        {emails.length > 0 && (
          <button
            onClick={handleDownload}
            className="button button-secondary"
          >
            Download Classified Emails
          </button>
        )}
      </section>

      {error && (
        <div className="error-box">{error}</div>
      )}

      <section className="email-grid">
        {emails.map((email) => (
          <EmailCard key={email.id} email={email} />
        ))}
      </section>
    </div>
  );
}
