"use client";

interface EmailCardProps {
  email: { id: string; subject: string; snippet: string; label?: string };
}

export default function EmailCard({ email }: EmailCardProps) {
  const colorMap: Record<string, string> = {
    Important: "bg-red-200 text-red-800",
    Promotions: "bg-green-200 text-green-800",
    Social: "bg-blue-200 text-blue-800",
    Marketing: "bg-purple-200 text-purple-800",
    Spam: "bg-gray-200 text-gray-800",
    General: "bg-yellow-200 text-yellow-800",
  };

  return (
    <div className="border p-4 rounded-xl shadow-md bg-white hover:shadow-lg hover:scale-105 transition transform">
      <h2 className="font-semibold text-lg mb-1">{email.subject}</h2>
      <p className="text-gray-600 mb-2">{email.snippet}</p>
      {email.label && (
        <span
          className={`inline-block px-3 py-1 rounded-full font-medium text-sm ${colorMap[email.label]}`}
        >
          {email.label}
        </span>
      )}
    </div>
  );
}
