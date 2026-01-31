# Office Slang Translator

A Next.js web application that translates corporate/office language into clear, simple English.

## Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up OpenAI API key (optional, for GPT fallback):
   - Copy `.env.local.example` to `.env.local`
   - Add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```
   - Get your API key from: https://platform.openai.com/api-keys
   
   **Note:** The app works without GPT! It uses pattern matching first, and only falls back to GPT if no pattern matches.

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── globals.css      # Global styles with Tailwind
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── components/
│   ├── Translator.tsx   # Main translator component
│   ├── InputArea.tsx    # Input textarea and buttons
│   └── OutputDisplay.tsx # Output display component
└── package.json
```

## How It Works

The app uses a **hybrid approach**:

1. **Pattern Matching (First)**: Fast, free, instant responses for 20+ common office phrases
2. **GPT Fallback (If needed)**: Handles any office language not in the pattern list
   - Only calls GPT if no pattern matches
   - Requires OpenAI API key (optional)
   - Works offline if GPT is not configured (falls back to generic analysis)

## Features

- ✅ Pattern matching for common phrases (instant, free)
- ✅ GPT integration for unlimited phrases (requires API key)
- ✅ Sensitive content filtering
- ✅ Office-related content validation
- ✅ Urgency level detection (Low/Medium/High)
- ✅ Error handling and loading states

## Indexing & Google Search Console

The app is set up for indexing and Search Console:

- **Metadata**: Title, description, keywords, Open Graph, Twitter cards
- **robots.txt**: Served at `/robots.txt` (allows crawlers, disallows `/api/`, points to sitemap)
- **Sitemap**: Served at `/sitemap.xml` for Search Console
- **JSON-LD**: WebApplication structured data for rich results
- **Verification**: Optional meta tag via `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`

### How to index on Google

1. Deploy to Vercel (e.g. `officeslangs.vercel.app`).
2. Go to [Google Search Console](https://search.google.com/search-console).
3. Add a property: **URL prefix** → `https://officeslangs.vercel.app` (or your custom domain).
4. Verify ownership:
   - Choose **HTML tag**.
   - Copy the `content` value (e.g. `abc123xyz`).
   - In Vercel: Project → Settings → Environment Variables → add:
     - `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` = that content value
   - Redeploy, then click **Verify** in Search Console.
5. Submit the sitemap: **Sitemaps** → add `https://officeslangs.vercel.app/sitemap.xml` → Submit.

Optional: set `NEXT_PUBLIC_SITE_URL` in Vercel to your exact live URL (e.g. custom domain) so canonical URLs and sitemap use it.
