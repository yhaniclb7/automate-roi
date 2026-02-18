# AutomateROI — AI Automation Savings Calculator

A lead-generation tool for AI automation consulting. Prospects input their business details and get an instant estimate of how much they'd save with AI automation — then submit their email for a personalized roadmap.

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyhaniclb7%2Fautomate-roi)

Or: Import the repo at [vercel.com/new](https://vercel.com/new) → select `yhaniclb7/automate-roi` → Deploy.

## How It Works

1. **Landing page** with compelling stats about automation ROI
2. **Calculator form**: company size, industry, manual hours, hourly rates, process types
3. **Instant results**: annual savings, payback period, 5-year value, hours freed
4. **Lead capture**: email collection with promise of personalized automation roadmap
5. **Lead storage**: JSONL file at `/data/leads.jsonl` (for Vercel, swap to a DB or webhook)

## Monetization

- **Direct lead gen** for the AI automation consulting firm
- Every calculator submission = warm lead with pre-qualified pain points
- The "personalized roadmap" follow-up is the sales call booking mechanism

## Tech Stack

- Next.js 15 + TypeScript + Tailwind CSS
- Zero external dependencies beyond Next.js
- Instant deploy on Vercel free tier

## Local Development

```bash
npm install
npm run dev
```
