# Retail Calculator

A retail calculator built with Next.js that calculates total price with volume discounts and regional tax.

## Features

- Calculate subtotal based on quantity and price per item
- Automatic volume discounts based on order value
- Regional tax calculation using Strategy Pattern
- Real-time calculation with input validation

---

## Task Breakdown


| # | Issue Title | Description | Customer Value |
|---|-------------|-------------|------------|
| **1** | **Create quantity input field** | Implement "How many items" input with label and styling | Users can enter item quantity |
| **2** | **Create price per item input field** | Implement "Price per item" input with label and styling | Users can enter the unit price |
| **3** | **Calculate and display subtotal** | Show `quantity × price` result in real-time | Users see their basic order total |
| **4** | **Add region code selector** | Implement dropdown for 3-letter region codes (AUK, WLG, WAI, CHC, TAS) | Users can select their region |
| **5** | **Implement discount tier logic** | Add business logic for all 5 discount tiers ($1K→3%, $5K→5%, $7K→7%, $10K→10%, $50K→15%) | Users automatically get volume discounts |
| **6** | **Display discount breakdown** | Show discount percentage, amount saved, and price after discount | Users see exactly how much they're saving |
| **7** | **Implement tax calculation using Strategy Pattern** | Apply Strategy Pattern to handle regional tax calculation. Create a `TaxStrategy` interface with region-specific implementations (AUK 6.85%, WLG 8%, WAI 6.25%, CHC 4%, TAS 8.25%). This enables easy addition of new regions and keeps tax logic modular and testable. | Users get accurate regional tax |
| **8** | **Display final total with complete breakdown** | Show full summary: Subtotal → Discount → Tax → Final Total | Users see the complete price calculation |
| **9** | **Add input validation with error messages** | Validate inputs (positive numbers, required fields) with helpful error states | Users are prevented from making mistakes |
| **10** | **Add currency formatting** | Format all prices as `$X,XXX.XX` with proper decimals | Users see professional, readable prices |
| **11** | **Add responsive mobile design** | Ensure calculator works well on phones and tablets | Users can calculate on any device |
| **12** | **Add accessibility and clear/reset functionality** | Proper labels, keyboard navigation, ARIA attributes, and reset button | All users can access and reuse the calculator |

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- [Next.js](https://nextjs.org) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
