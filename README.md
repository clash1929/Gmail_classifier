# 📧 Gmail Classifier App

A **web application** that connects to your Gmail, fetches recent emails, and automatically classifies them into categories like **Important, Promotions, Social, Marketing, Spam, and General** — powered by **Next.js**, **Tailwind CSS**, **NextAuth (Google OAuth)**, and **OpenAI GPT**.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

---

## 🧭 Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Folder Structure](#folder-structure)
4. [Tailwind CSS Setup](#tailwind-css-setup)
5. [Setup Instructions](#setup-instructions)
6. [Environment Variables](#environment-variables)
7. [Running Locally](#running-locally)
8. [Getting Started](#getting-started)
9. [Learn More](#learn-more)
10. [Deploy on Vercel](#deploy-on-vercel)

---

## 🧩 Project Overview

**Tech Stack Summary:**

- **Frontend:** Next.js + Tailwind CSS
- **Authentication:** Google OAuth (NextAuth)
- **Email Fetching:** Gmail API (fetches first 15 emails)
- **Email Classification:** OpenAI GPT-4 for automatic labeling
- **Storage:** LocalStorage (for API key and session)
- **Export:** Download classified emails as JSON

---

## ✨ Features

✅ Sign in with your Google account  
✅ Fetch your latest 15 Gmail emails  
✅ Automatically classify emails into 6 categories  
✅ Download results in JSON format  
✅ Beautiful, responsive, and modern UI  
✅ Interactive hover effects & color-coded category badges

---

## 🗂️ Folder Structure

gmail-classifier/
│
├─ app/
│ ├─ page.tsx # Main frontend page
│
├─ components/
│ ├─ EmailCard.tsx # Email card with badge
│
├─ pages/api/
│ ├─ fetch-emails.ts # Fetch emails from Gmail API
│ ├─ classify.ts # Classify emails using OpenAI
│ └─ auth/[...nextauth].ts # NextAuth Google OAuth config
│
├─ public/
│ └─ favicon.ico
│
├─ .env.local # Environment variables (keys and URLs)
├─ package.json
├─ tsconfig.json
├─ tailwind.config.js
└─ README.md

## 🎨 Tailwind CSS Setup

To integrate Tailwind CSS in your Next.js project (local setup):

1. Install dependencies:
   bash
   npm install -D tailwindcss postcss autoprefixer

Initialize Tailwind:
bash
npx tailwindcss init -p
This creates tailwind.config.js and postcss.config.js.

Configure Tailwind to scan your files:
js
// tailwind.config.js
module.exports = {
content: [
"./app/**/*.{js,ts,jsx,tsx}",
"./pages/**/*.{js,ts,jsx,tsx}",
"./components/**/*.{js,ts,jsx,tsx}",
],
theme: { extend: {} },
plugins: [],
};

Create a global CSS file (styles/globals.css) and add:
css
@tailwind base;
@tailwind components;
@tailwind utilities;
Import the global CSS in \_app.tsx or app/layout.tsx:

ts
import './globals.css';
Optional: Add a build/watch script to package.json:

json
"scripts": {
"build:css": "npx tailwindcss -i ./styles/globals.css -o ./styles/output.css --watch"
}
Run it:

bash
npm run build:css
Tailwind is now ready and fully functional for your UI.

⚙️ Setup Instructions
1️⃣ Clone the GitHub Repository
bash
git clone https://github.com/kushal1929/Gmail_Classifier.git
cd gmail-classifier
2️⃣ Install Dependencies
bash
npm install
3️⃣ Setup Environment Variables
Create .env.local:

bash
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_URL=http://localhost:3000
OPENAI_API_KEY=your-openai-api-key

Where to get these:
GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET → Google Cloud Console → OAuth 2.0 Client IDs
OPENAI_API_KEY → OpenAI Dashboard → API Keys
NEXTAUTH_URL → Must match your app’s local or deployed URL (http://localhost:3000)

🚀 Running Locally
Start the development server:
npm run dev

Open http://localhost:3000
in your browser.

Sign in with Google
Click Fetch Emails
Click Download Classified Emails to save as JSON

🏁 Getting Started
npm run dev

# or

yarn dev

# or

pnpm dev

# or

bun dev

Open http://localhost:3000
to see the result.
Edit app/page.tsx — the page auto-updates.
