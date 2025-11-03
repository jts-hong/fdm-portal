# FDM Data Solution Portal

A modern, professional data solution portal for Financial Data Management (FDM) team. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 📊 **All Reports Page**: Browse all available reports with filtering and search capabilities
- 🔍 **Advanced Filtering**: Filter by reporting domain, process owner, and reporting frequency
- 👁️ **Multiple View Modes**: Switch between gallery and list views
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 🎨 **Professional Aesthetic**: Data analytics-focused design with clean, modern UI
- 📄 **Detailed Report Pages**: Comprehensive information for each report
- 🚀 **Static Site Generation**: Optimized for GitHub Pages deployment

## Getting Started

### Prerequisites

- Conda (Anaconda or Miniconda)
- Node.js 20+ (will be installed in conda environment)

### Installation

1. **Activate the conda environment:**
   ```bash
   conda activate fdm_dsp
   ```

2. **Navigate to the project directory:**
   ```bash
   cd fdm-portal
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
fdm-portal/
├── app/                          # Next.js app directory
│   ├── page.tsx                  # Home page (All Reports)
│   ├── layout.tsx                # Root layout with navigation
│   ├── globals.css               # Global styles
│   ├── reports/[id]/page.tsx     # Dynamic report detail pages
│   ├── access-instructions/      # Access instructions page
│   └── contacts/                 # Contacts page
├── components/                   # React components
│   ├── Navigation.tsx            # Main navigation bar
│   ├── Hero.tsx                  # Hero section with logo
│   ├── FilterSidebar.tsx         # Filtering component
│   └── ReportCard.tsx            # Report display cards
├── data/                         # Data storage
│   └── reports.json              # Reports data (easy to manage)
├── types/                        # TypeScript types
│   └── report.ts                 # Report type definitions
└── public/                       # Static assets
```

## Managing Reports

Reports are stored in `data/reports.json` for easy management and replication. Each report has the following structure:

```json
{
  "id": "unique-report-id",
  "name": "Report Name",
  "reportingDomain": "Domain Name",
  "processOwner": "Owner Name",
  "reportingFrequency": "Daily|Weekly|Monthly|Quarterly|Annual",
  "shortDescription": "Brief description...",
  "detailedDescription": "Detailed description...",
  "features": ["Feature 1", "Feature 2"],
  "accessInstructions": "How to access...",
  "contactEmail": "contact@fdm.com",
  "lastUpdated": "YYYY-MM-DD"
}
```

### Adding a New Report

1. Open `data/reports.json`
2. Add a new report object to the array
3. Save the file
4. The report will automatically appear in the portal

### Updating a Report

1. Find the report in `data/reports.json` by its `id`
2. Update the desired fields
3. Save the file

## Deployment to GitHub Pages

### Initial Setup

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository settings on GitHub
   - Navigate to "Pages" in the left sidebar
   - Under "Source", select "GitHub Actions"

3. **The site will automatically deploy** when you push to the main branch

### Manual Deployment

You can also trigger a manual deployment from the Actions tab in your GitHub repository.

### Build for Production

To build the static site locally:

```bash
npm run build
```

The built site will be in the `out` directory.

## Technologies Used

- **Next.js 16**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS 4**: Utility-first CSS framework
- **React 19**: Latest React features

## Customization

### Updating the Logo

Replace the logo placeholder in `components/Hero.tsx` with your actual logo image.

### Changing Colors

Update the CSS variables in `app/globals.css`:

```css
:root {
  --primary-navy: #1e3a5f;
  --secondary-navy: #2c4f6f;
  --accent-blue: #4a90e2;
  /* ... other colors */
}
```

### Adding New Pages

1. Create a new directory in `app/` (e.g., `app/new-page/`)
2. Add a `page.tsx` file in that directory
3. Update the navigation in `components/Navigation.tsx`

## Support

For questions or issues, please contact the FDM team.

## License

Internal use only - FDM Team
