# Quality Care UAE — Portfolio Website

A responsive marketing website built for **Quality Care**, a professional cleaning & maintenance company operating across the UAE (Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, Al Ain, Umm Al Quwain). This project was built per client instructions as a freelance/contract engagement.

🔗 **Live reference:** [qualitycareuae.ae](https://qualitycareuae.ae)

## Overview

The site showcases the company's services (AC duct cleaning, water tank cleaning, HVAC disinfection, indoor air quality testing, pipeline disinfection, kitchen duct cleaning), builds trust with stats, client logos, and a "how it works" walkthrough, and drives leads through WhatsApp and call-to-action buttons.

## Features

- Fully responsive single-page layout (desktop, tablet, mobile)
- Sticky navigation with smooth-scroll anchor links
- Hero section with key trust stats (years in business, clients served, rating, support hours)
- Services grid with individual service cards linking to booking pages
- "Why Choose Us" and "How It Works" sections
- Client logos / social proof section
- City/service-area chips for all major UAE emirates
- WhatsApp-first call-to-action for instant lead capture
- Footer with contact details, sitemap-style links, and service areas

## Tech Stack

**Frontend**
- HTML5, CSS3 (custom properties / CSS variables, CSS Grid & Flexbox)
- Vanilla JavaScript
- Google Fonts (Playfair Display, DM Sans)

**Backend**
- Node.js + Express (REST API)

## Project Structure

```
qualitycare-uae-portfolio/
├── QualitycareIndex.html    # Frontend — full HTML/CSS/JS site
├── QualitycareServer.js     # Node.js + Express backend API
└── README.md
```

> Note: an earlier draft of this README referenced a `frontend/` and `backend/` folder layout with a `package.json` and `.env.example`. The current repo has the frontend and backend files at the root — reorganize into subfolders if you'd like to match that structure, and add a `package.json` if the server has dependencies to install.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- npm (comes with Node.js)

### Run the frontend
The frontend is static — no build step required. Simply open `QualitycareIndex.html` in a browser, or serve it locally:

```bash
npx serve .
```

### Run the backend
```bash
node QualitycareServer.js
```

If the server uses environment variables (e.g. for email/SMTP, database, or API keys), create a `.env` file in the project root before starting it.

## Deployment

- **Frontend:** deployable to any static host (Netlify, Vercel, GitHub Pages, or a standard web server).
- **Backend:** deployable to any Node-friendly host (Render, Railway, a VPS, etc.) alongside the frontend, or as a separate API service.

## Contact

For questions about this project, reach out via the details in the site footer:
- 📞 +971 565 656 825
- ✉ qualityc.marketing@gmail.com
- 📍 Al Murjan Tower, Office #509, Al Nahda 1, Dubai, UAE

## License

This project was built as client work for Quality Care UAE. All rights to the design and content belong to the client unless otherwise agreed.
