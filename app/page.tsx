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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white text-center px-6">
        <h1 className="text-6xl font-bold mb-6 animate-pulse">Gmail Classifier</h1>
        <p className="text-lg max-w-xl mb-8">
          Automatically fetch your latest emails and classify them into Important, Promotions, Social, Marketing, Spam, or General.
        </p>
        <button
          onClick={() => signIn("google")}
          className="bg-white text-purple-700 font-bold px-8 py-3 rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition transform"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-700">Welcome, {session.user?.name}</h1>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white px-5 py-2 rounded-xl shadow hover:bg-red-600 hover:scale-105 transition"
        >
          Sign Out
        </button>
      </div>

      <div className="bg-gradient-to-r from-purple-100 via-pink-50 to-yellow-50 p-6 rounded-xl mb-6 shadow-lg">
        <h2 className="font-semibold text-xl mb-3">Email Classifications</h2>
        <ul className="list-disc ml-6 text-gray-700 space-y-1">
          <li><strong>Important:</strong> Personal or work emails requiring immediate attention</li>
          <li><strong>Promotions:</strong> Emails about sales, discounts, marketing</li>
          <li><strong>Social:</strong> Emails from friends, social networks</li>
          <li><strong>Marketing:</strong> Newsletters, notifications, other marketing</li>
          <li><strong>Spam:</strong> Unwanted or unsolicited emails</li>
          <li><strong>General:</strong> Emails not matched by above categories</li>
        </ul>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={handleFetchEmails}
          disabled={loading}
          className="bg-blue-500 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-600 hover:scale-105 transition"
        >
          {loading ? "Fetching Emails..." : "Fetch Emails"}
        </button>

        {emails.length > 0 && (
          <button
            onClick={handleDownload}
            className="bg-green-400 text-white px-6 py-2 rounded-xl shadow hover:bg-green-500 hover:scale-105 transition"
          >
            Download Classified Emails
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded-xl">
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {emails.map((email) => (
          <EmailCard key={email.id} email={email} />
        ))}
      </div>
    </div>
  );
}
