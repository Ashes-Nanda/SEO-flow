# SEO Audit Machine

A one-click SEO report generation system that automatically analyzes websites and generates comprehensive, professional SEO audit reports.

## 🚀 Features

- **One-Click Analysis**: Just enter a URL and get a complete SEO audit
- **Modular Architecture**: Independent modules for keywords, content, technical SEO, backlinks, and competitor analysis
- **Professional Reports**: Generate downloadable HTML reports with actionable recommendations
- **Real API Integrations**: Uses Serper.dev, Google PageSpeed Insights, ScraperAPI, and Gemini AI
- **Neo-Brutalism Design**: Bold, professional UI that impresses clients
- **Competitor Benchmarking**: Compare against up to 3 competitors

## 📊 Analysis Modules

### 1. Keyword Rankings
- Total indexed keywords and average position
- Top performing keywords with volume and difficulty
- Keyword opportunities and gaps
- Competitor keyword analysis

### 2. Content Audit
- Word count and readability analysis
- Meta tag optimization (title, description, H1)
- Content quality grading
- Internal/external link analysis
- Image alt text validation

### 3. Technical SEO
- Google PageSpeed Insights integration
- Core Web Vitals monitoring (LCP, FID, CLS)
- Mobile and desktop performance scores
- Technical issue identification

### 4. Backlink Profile
- Total backlinks and referring domains
- Domain authority estimation
- Anchor text distribution analysis
- Link quality assessment (spam/toxic detection)

### 5. Competitor Analysis
- Multi-competitor comparison
- Keyword gap identification
- Technical performance benchmarking
- Strategic recommendations

## 🛠 Setup & Installation

### Prerequisites
- Node.js 18+ and npm
- API keys for external services (optional - fallback keys provided)

### Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd seo-audit-machine

# Install dependencies
npm install

# Copy environment variables (optional)
cp .env.example .env

# Start development server
npm run dev
```

### API Keys Setup (Optional)

The system works with fallback API keys, but for production use, get your own:

1. **Gemini AI**: https://makersuite.google.com/app/apikey
2. **ScraperAPI**: https://www.scraperapi.com/
3. **Serper.dev**: https://serper.dev/
4. **PageSpeed Insights**: https://developers.google.com/speed/docs/insights/v5/get-started

Add them to your `.env` file:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_SCRAPER_API_KEY=your_scraper_api_key
VITE_SERPER_DEV_API_KEY=your_serper_dev_api_key
VITE_PAGESPEED_API_KEY=your_pagespeed_api_key
```

## 🎯 Usage

1. **Enter Website URL**: Input the website you want to analyze
2. **Add Competitors** (optional): Enter up to 3 competitor URLs
3. **Start Audit**: Click "START AUDIT" to begin analysis
4. **View Results**: Watch as each module loads with real-time data
5. **Download Report**: Click "DOWNLOAD REPORT" to get a comprehensive HTML report

## 📈 Report Structure

The generated report follows a professional SEO audit format:

- **Executive Summary**: Key metrics and urgent issues
- **Keyword Rankings**: Performance overview and opportunities
- **Content Audit**: Meta data analysis and content recommendations
- **Technical SEO**: PageSpeed scores and Core Web Vitals
- **Backlink Profile**: Link quality and referring domains
- **Competitor Benchmarking**: Gap analysis and strategic insights
- **3-Month Roadmap**: Prioritized recommendations with expected results

## 🏗 Architecture

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** with custom Neo-Brutalism design system
- **shadcn/ui** component library
- **React Query** for state management
- **React Hook Form** with Zod validation

### Services
- **Modular SEO Service**: Independent analysis modules
- **PDF Service**: HTML report generation with local download
- **Error Handling**: Graceful fallbacks and mock data

### APIs Used
- **Serper.dev**: Search results and backlink discovery
- **Google PageSpeed Insights**: Performance and Core Web Vitals
- **ScraperAPI**: Website content extraction
- **Gemini AI**: Content analysis and recommendations

## 🎨 Design System

The application uses a custom Neo-Brutalism design system featuring:
- Bold, high-contrast colors
- Thick borders and dramatic shadows
- Monospace typography
- Rotated card layouts
- Professional yet edgy aesthetic

## 🚀 Deployment

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

## 🔧 Development

### Project Structure
```
src/
├── components/          # React components
│   ├── seo-modules/    # Individual SEO analysis cards
│   └── ui/             # shadcn/ui components
├── services/           # API services and business logic
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── pages/              # Page components
```

### Key Files
- `src/services/seoService.ts`: Main SEO analysis logic
- `src/services/pdfService.ts`: Report generation
- `src/components/SEODashboard.tsx`: Main dashboard component
- `src/components/seo-modules/`: Individual analysis modules

## 📝 License

This project is built for demonstration purposes. Please ensure you comply with the terms of service of all integrated APIs.

## 🤝 Contributing

This is a demonstration project showcasing a 60% MVP implementation of a professional SEO audit system. The modular architecture makes it easy to extend and improve individual components.
