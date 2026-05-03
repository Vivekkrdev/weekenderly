# 🌟 Weekenderly — Make Your Weekends Count

<div align="center">
  <img src="logo.png" alt="Weekenderly Logo" width="180">
  <br />
  <p><strong>The #1 Social Platform for Corporate Professionals to Discover Weekend Experiences.</strong></p>
  
  [![Tech](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20JS-orange?style=for-the-badge)](https://weekenderly.com)
  [![Animations](https://img.shields.io/badge/Animations-GSAP%20%2B%20Lenis-6366f1?style=for-the-badge)](https://greensock.com/gsap/)
  [![Status](https://img.shields.io/badge/Status-Beta-success?style=for-the-badge)]()
</div>

---

## 📖 Overview

**Weekenderly** is a high-end social lifestyle platform designed specifically for working professionals in major Indian cities (Bengaluru, Mumbai, Delhi, etc.). It solves the "boring weekend" problem by connecting like-minded people through curated plans—ranging from cozy café meetups and mountain treks to high-energy live music nights and rooftop hangs.

The platform emphasizes **intentionality** and **real-world connections**, moving away from the "infinite scroll" and towards meaningful social experiences.

---

## ✨ Premium Features

### 🎨 Cinematic User Experience
- **GSAP & ScrollTrigger:** Advanced, high-performance scroll-driven animations and text reveals.
- **Lenis Smooth Scroll:** Silky smooth scrolling with velocity-based subtle skewing for a modern, fluid feel.
- **Custom Cursor:** An interactive custom cursor that reacts to hoverable elements and drag zones.
- **Magnetic Interactions:** Buttons and interactive elements that "pull" toward the cursor for a tactile experience.
- **Grainy Texture Overlay:** A subtle, premium film-grain effect applied across the site for visual depth.

### 🛠️ Functionality
- **Horizontal Scrolling Showcase:** A pinned desktop experience for exploring curated weekend activities.
- **Smart Loading Screen:** A branded entry sequence with progress tracking.
- **Interactive Stats:** Real-time counter animations for community milestones.
- **Gallery Lightbox:** A filtered, high-fidelity gallery to showcase past community events.
- **3D Tilt Effects:** Modern card designs with perspective-based 3D tilting on mouse move.
- **Responsive Navigation:** Seamless mobile-first navigation with a gesture-friendly menu.

### 🚀 SEO & Performance
- **Optimized Metadata:** Fully SEO-ready with descriptive tags and social sharing previews.
- **Schema Markup:** Integrated JSON-LD (Organization & Website) for enhanced search engine visibility.
- **Fast Loading:** Efficient asset management and lazy-loaded imagery.

---

## 🛠️ Tech Stack

### Frontend (Web)
- **Structure:** HTML5 Semantic Markup
- **Styling:** Vanilla CSS3 (Custom Design System)
- **Logic:** Vanilla JavaScript (ES6+)
- **Animation Engine:** [GSAP (GreenSock)](https://greensock.com/gsap/) & [ScrollTrigger](https://greensock.com/scrolltrigger/)
- **Smooth Scrolling:** [Lenis](https://github.com/darkroomengineering/lenis)
- **Typography:** Outfit & Poppins (via Google Fonts)

### Mobile App (Coming Soon)
- **Framework:** React Native (Expo)
- **State Management:** Zustand
- **Navigation:** React Navigation
- **Architecture:** Component-based UI with TypeScript

---

## 📂 Project Structure

```text
weekenderly/
├── mobile/             # React Native (Expo) Application
│   ├── App.tsx         # Main entry point
│   ├── assets/         # App icons and splashes
│   └── package.json    # Mobile dependencies
├── index.html          # Homepage (Hero, Stats, How it works)
├── about.html          # Vision and Mission
├── gallery.html        # Community event highlights
├── join.html           # Onboarding/Sign-up funnel
├── contact.html        # Support and WhatsApp integration
├── script.js           # Core animation and interactivity logic
├── styles.css          # Global design system & tokens
├── home.css            # Section-specific styles for Home
├── pages.css           # Internal page styling
└── assets/             # Images, logos, and videos
```

---

## 🚀 Getting Started

### Web Version
Simply open `index.html` in any modern browser. For the best experience, including smooth scrolling and GSAP animations, it is recommended to use a local development server (like VS Code's Live Server).

```bash
# If you have python installed
python -m http.server 8000
```

### Mobile Version
Navigate to the `mobile` directory and install dependencies:

```bash
cd mobile
npm install
npx expo start
```

---

## 🗺️ Roadmap
- [x] High-fidelity Web Modernization
- [x] GSAP Animation Engine Integration
- [/] React Native Mobile App (Alpha)
- [ ] User Dashboard & Profile Management
- [ ] Direct Booking for Weekend Events
- [ ] In-app Community Chat

---

## 📄 License
This project is proprietary. All rights reserved.

---

<div align="center">
  Built with ❤️ by <strong>Vivekkrdev</strong> for <strong>Weekenderly</strong>
</div>
