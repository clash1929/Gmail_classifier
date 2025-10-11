Gmail Classifier App

A web application to fetch your Gmail emails and automatically classify them into categories like Important, Promotions, Social, Marketing, Spam, and General using Next.js, Tailwind CSS, NextAuth (Google OAuth), and OpenAI GPT.

Table of Contents:
1.Project Overview
2.Features
3.Folder Structure
4.Setup Instructions
5.Environment Variables
6.Running Locally

Project Tech Overview
Frontend: Next.js + Tailwind CSS
Authentication: Google OAuth using NextAuth
Email Fetching: Gmail API (first 15 emails)
Email Classification: OpenAI GPT-4 for automatic classification
Storage: LocalStorage for OpenAI API key and session
Download Option: Export classified emails as JSON


Features:
Sign in with Google account
Fetch your latest 15 Gmail emails
Automatic classification into 6 categories
Download emails in JSON format
Beautiful, responsive, and modern UI with interactive buttons
Hover effects and color-coded email badges for better UX

folder Structure

gmail-classifier/
│
├─ app/
│  ├─ page.tsx                 # Main frontend page
│
├─ components/
│  ├─ EmailCard.tsx            # Email card component with badge
│
├─ pages/api/
│  ├─ fetch-emails.ts          # Fetch emails from Gmail API
│  ├─ classify.ts              # Classify emails using OpenAI
│  └─ auth/[...nextauth].ts    # NextAuth Google OAuth config
│
├─ public/
│  └─ favicon.ico
│
├─ .env.local                  # Environment variables (keys and URLs)
├─ package.json
├─ tsconfig.json
├─ tailwind.config.js
└─ README.md


Setup Instructions
1. Clone the GitHub Repository
git clone https://github.com/<your-username>/gmail-classifier.git
cd gmail-classifier

2. Install Dependencies
npm install

3. Setup Environment Variables

Create a file named .env.local in the root folder:

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_URL=http://localhost:3000
OPENAI_API_KEY=your-openai-api-key

GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET: From Google Cloud Console → OAuth 2.0 Client IDs
OPENAI_API_KEY: From OpenAI dashboard → API keys
NEXTAUTH_URL: Must match your local URL (http://localhost:3000)


5. Start the App
npm run dev
Open http://localhost:3000
 in your browser.
Sign in with Google and click Fetch Emails.

6. Download Classified Emails
Once emails are fetched and classified, click Download Classified Emails to save as JSON.
