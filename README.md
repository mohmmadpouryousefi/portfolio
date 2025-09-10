# 🚀 Mohammad's Portfolio

> A modern, interactive portfolio website showcasing cutting-edge web development skills with stunning animations and responsive design.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue?style=for-the-badge)](https://portfolio-1z8.pages.dev/)
[![Backend API](https://img.shields.io/badge/API-Live-green?style=for-the-badge)](https://portfolio-jwp8.onrender.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)
[![Package Manager](https://img.shields.io/badge/Package%20Manager-pnpm-orange?style=for-the-badge)](https://pnpm.io/)

## ✨ Features

### 🎨 **Modern Design & Animations**
- **GSAP-Powered Animations**: Smooth, professional animations throughout the site
- **Typewriter Effect**: Dynamic text animation in the hero section
- **Interactive Elements**: Hover effects, smooth transitions, and micro-interactions
- **Glass Morphism**: Modern glass-like effects with backdrop blur
- **Custom Color Palette**: Professional brand colors (#F29B55, #F2C855, #F2B555, #F5D206)

### 📱 **Responsive & Mobile-First**
- **Mobile-Optimized**: Perfect experience across all device sizes
- **Touch-Friendly**: Optimized buttons and navigation for mobile devices
- **Adaptive Layouts**: Seamless transitions between desktop and mobile views
- **Performance Optimized**: Fast loading and smooth animations on all devices

### 🧭 **Enhanced Navigation**
- **Smooth Scrolling**: GSAP-powered smooth section navigation
- **Active Section Detection**: Visual indicators for current page section
- **Mobile Menu**: Slide-in menu with staggered animations and icons
- **Keyboard Navigation**: Full accessibility with escape key support

### 🛠️ **Technical Excellence**
- **Modern Tech Stack**: React 18, Vite, Tailwind CSS, GSAP
- **Component Architecture**: Modular, reusable components
- **Performance Focused**: Optimized bundle size and loading times
- **SEO Optimized**: Meta tags, semantic HTML, and structured data

## 🛠️ Tech Stack

### **Frontend**
- ⚛️ **React 18** - Modern React with hooks and concurrent features
- ⚡ **Vite** - Lightning-fast build tool and dev server
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🎭 **GSAP** - Professional animation library
- 🎯 **shadcn/ui** - Beautiful, accessible UI components
- 🔧 **TypeScript** - Type-safe development

### **Backend**
- 🟢 **Node.js** - JavaScript runtime
- 🚀 **Express.js** - Fast, unopinionated web framework
- 🍃 **MongoDB** - NoSQL database
- 🔐 **JWT** - JSON Web Token authentication
- 📧 **Nodemailer** - Email functionality

### **Deployment & DevOps**
- ☁️ **Cloudflare Pages** - Frontend hosting and CDN
- 🖥️ **Render** - Backend hosting
- 📦 **pnpm** - Fast, disk-efficient package manager
- 🐳 **Docker** - Containerization (optional)

## 📁 Project Structure

```
portfolio-project/
├── 📁 public/                 # Static assets
│   └── _redirects            # SPA routing redirects
├── 📁 server/                # Backend application
│   ├── 📁 middleware/        # Express middleware
│   ├── 📁 models/           # MongoDB schemas
│   ├── 📁 routes/           # API routes
│   └── server.js            # Express server setup
├── 📁 src/                   # Frontend application
│   ├── 📁 assets/           # Images, fonts, icons
│   ├── 📁 components/       # Reusable React components
│   │   ├── Hero.jsx         # Landing section with animations
│   │   ├── Navbar.jsx       # Navigation with mobile menu
│   │   ├── About.jsx        # About section
│   │   ├── Skills.jsx       # Skills showcase
│   │   ├── Projects.jsx     # Portfolio projects
│   │   └── Footer.jsx       # Site footer
│   ├── 📁 hooks/            # Custom React hooks
│   ├── 📁 lib/              # Utility functions
│   ├── 📁 pages/            # Page components
│   │   ├── blog.jsx         # Blog listing page
│   │   ├── blogPost.jsx     # Individual blog post
│   │   ├── admin/           # Admin pages
│   ├── 📁 styles/           # CSS stylesheets
│   ├── App.jsx              # Main app component
│   └── main.jsx             # App entry point
├── 📄 package.json          # Frontend dependencies
├── 📄 vite.config.js        # Vite configuration
├── 📄 tailwind.config.js    # Tailwind CSS config
└── 📄 README.md             # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **pnpm** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mohmmadpouryousefi/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   pnpm install

   # Install backend dependencies
   cd server && pnpm install && cd ..
   ```

3. **Environment Setup**
   ```bash
   # Copy environment files
   cp .env.example .env
   cp server/.env.example server/.env

   # Edit environment variables
   nano .env
   nano server/.env
   ```

4. **Start Development Servers**
   ```bash
   # Start frontend (port 5173)
   pnpm run dev

   # Start backend (port 5000) - in new terminal
   cd server && pnpm run dev
   ```

5. **Open in Browser**
   ```
   http://localhost:5173
   ```

## 📜 Available Scripts

### Frontend Scripts
```bash
pnpm run dev          # Start development server
pnpm run build        # Build for production
pnpm run preview      # Preview production build
pnpm run lint         # Run ESLint
```

### Backend Scripts
```bash
cd server
pnpm run dev          # Start development server
pnpm run start        # Start production server
pnpm run test         # Run tests
```

## 🎨 Key Components

### **Hero Section**
- Dynamic typewriter animation
- 3D letter stagger effects
- Responsive background shapes
- Call-to-action buttons

### **Navigation**
- Smooth scroll navigation
- Active section highlighting
- Mobile slide-in menu
- GSAP-powered animations

### **Skills Section**
- Interactive skill cards
- GSAP entrance animations
- Responsive grid layout
- Hover effects

### **Projects Section**
- Project showcase cards
- Live demo links
- Technology badges
- Responsive design

## 🌟 Recent Enhancements

### **v2.1.0 - Modern UI & Animations**
- ✨ Added GSAP typewriter effect to hero section
- 🎭 Implemented glass morphism design elements
- 📱 Enhanced mobile navigation with slide animations
- 🎨 Added custom color palette and brand styling
- ⚡ Optimized performance and loading times
- 🔧 Migrated to pnpm package manager
- 📐 Improved responsive design across all devices

### **v2.0.0 - Complete Redesign**
- 🚀 Migrated to React 18 and Vite
- 🎨 Implemented modern design system
- 📱 Added comprehensive mobile optimization
- 🎭 Integrated GSAP animations library
- 🧭 Enhanced navigation system
- ⚡ Performance optimizations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## � Contact & Support

**Mohammad Pouryousefi**  
Full Stack Developer

- 📧 **Email:** mohmmadpouryousefi@gmail.com
- 💼 **LinkedIn:** [mohammad-pouryousefi](https://www.linkedin.com/in/mohammad-pouryousefi-18382b354/)
- 🌐 **Portfolio:** [portfolio-1z8.pages.dev](https://portfolio-1z8.pages.dev/)
- � **GitHub:** [mohmmadpouryousefi](https://github.com/mohmmadpouryousefi)

## 🙏 Acknowledgments

- **GSAP** for amazing animation capabilities
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** for beautiful components
- **React** ecosystem for modern development
- **Vite** for lightning-fast development experience

---

<div align="center">

**Made with ❤️ using React, GSAP & Tailwind CSS**

⭐ Star this repo if you found it helpful!

</div>
