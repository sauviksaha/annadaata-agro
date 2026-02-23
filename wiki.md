# Project Summary

The Annadaata Agro Industries project aims to develop a responsive landing page for a rice manufacturing company. This website will enhance brand presence, provide comprehensive information about rice products, and generate leads through an intuitive user interface. The project leverages modern web technologies to create an engaging digital experience that reflects the company's commitment to quality and sustainability in the rice industry.

# Project Module Description

The project consists of several functional modules:

- **Landing Page**: Core content and navigation structure.
- **Responsive Design**: Ensures usability across all devices.
- **Component Library**: Utilizes Shadcn UI for consistent design.
- **Animations**: Implements micro-interactions for user engagement.
- **Asset Management**: Organized storage for images and icons.

# Directory Tree

```
annadaata-agro-industries/
├── app/
│   ├── layout.tsx           # Root layout with common elements
│   ├── page.tsx             # Homepage
│   ├── favicon.ico          # Site favicon
│   ├── globals.css          # Global styles
│   ├── fonts.ts             # Google Font configuration
│   └── not-found.tsx        # 404 page
├── components/
│   ├── ui/                  # Shadcn UI components
│   └── sections/            # Page sections
├── lib/
│   ├── utils.ts             # Utility functions
│   └── animations.ts        # Animation configurations
├── hooks/
│   └── use-animations.ts    # Custom animation hooks
├── public/
│   ├── assets/
│   │   ├── images/          # Image assets
│   │   ├── icons/           # SVG icons
│   │   └── logo/            # Logo files
│   └── fonts/               # Local font files
├── styles/
│   └── animations.css       # Custom animation styles
├── types/
│   └── index.ts             # TypeScript type definitions
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── components.json          # Shadcn UI configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Project dependencies
```

# File Description Inventory

- **app/**: Contains core application files including layout and pages.
- **components/**: Houses UI components and page sections.
- **lib/**: Utility functions and animation configurations.
- **hooks/**: Custom hooks for animations.
- **public/**: Holds static assets such as images, icons, and fonts.
- **styles/**: Contains stylesheets for animations.
- **types/**: Type definitions for TypeScript.
- **Configuration files**: For Next.js, Tailwind CSS, and PostCSS.

# Technology Stack

- **Frontend Framework**: Next.js
- **Styling**: Tailwind CSS
- **UI Library**: Shadcn UI
- **Animations**: CSS and JavaScript for micro-interactions
- **TypeScript**: For type safety and development efficiency

# Usage

To set up the project:

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Build the project: `npm run build`.
4. Run the project: `npm start`.
