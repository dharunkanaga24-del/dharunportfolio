# DHARUN P — Premium Cinematic 3D Portfolio

An award-winning, cinematic, interactive 3D digital experience and developer portfolio for **DHARUN P**, First-Year B.Tech Computer Science and Engineering student specializing in **Artificial Intelligence and Machine Learning** at **SRM Institute of Science and Technology, Ramapuram, Chennai**.

Inspired by Apple, Linear, Awwwards, and modern creative developer websites.

---

## 1. Personal Identity & Verified Details

- **Name:** DHARUN P
- **Education:** B.Tech Computer Science and Engineering
- **Specialization:** Artificial Intelligence and Machine Learning
- **College:** SRM Institute of Science and Technology, Ramapuram, Chennai
- **Academic Timeline:** 2026–2030 (First Year)
- **Professional Identity:** Aspiring AI Engineer | AI & ML Student | Software Developer | Web Developer | Tech Enthusiast
- **Email:** [dharunkanaga24@gmail.com](mailto:dharunkanaga24@gmail.com)
- **Phone:** [+91 80157 21946](tel:+918015721946)
- **GitHub:** [https://github.com/dharunkanaga24-del](https://github.com/dharunkanaga24-del)
- **Instagram:** [https://www.instagram.com/_.itz_dhxx._](https://www.instagram.com/_.itz_dhxx._)
- **LinkedIn:** [https://www.linkedin.com/in/dharun-p-a8877b428](https://www.linkedin.com/in/dharun-p-a8877b428)

---

## 2. Design System & Palette

Crafted according to the requested black and red visual identity:

| Token | Hex Value | Usage |
|---|---|---|
| **Primary Background** | `#000000` | Deep pitch black interface background |
| **Dark Red** | `#830000` | Ambient glows, shadow layers, wireframe depth |
| **Medium Red** | `#BC0202` | Card borders, secondary buttons, chart baselines |
| **Bright Red** | `#FF0000` | Glowing indicators, neon vertices, highlights |
| **White** | `#FFFFFF` | Primary high-contrast typography, hero names |
| **Secondary Text** | `#B9A9A9` | Elegant editorial body text and metadata |

### Typography
- **Space Grotesk**: Prominent display headings, hero title, section banners.
- **Inter**: Body copy, technical descriptions, readable editorial typography.
- **Poppins**: Accent badges, pills, buttons, and navigation elements.

---

## 3. Architecture & File Structure

```
c:\dharunpoetfolio\
├── index.html            # Main semantic HTML5 application with SEO & Schema markup
├── css\
│   └── style.css         # Glassmorphism, responsive grid, red glow effects, variables
├── js\
│   ├── three-hero.js     # Three.js 3D glowing energy core, particles, gyro orbits & inertia
│   ├── airguard-sim.js   # Live interactive AirGuard sensor telemetry & waveform simulator
│   ├── animations.js     # Scroll progress, subtitle typing, 3D card tilt, hotkeys, scroll spy
│   └── main.js           # Modal management, contact validation, toast feedback, sound fx
├── resume.pdf            # Initial verified PDF resume file (ready to replace anytime)
└── README.md             # Documentation, run guide & deployment instructions
```

---

## 4. Key Sections & Implemented Features

1. **Smart Glass Navigation**:
   - Scroll-aware active link tracking.
   - Automatically hides when scrolling down and smoothly reappears when scrolling up.
   - Responsive mobile navigation overlay.
   - Quick "Resume" and "Let's Talk" CTA buttons.

2. **Cinematic 3D Hero Section**:
   - Real-time **Three.js WebGL** interactive scene featuring a dual-cage neon polyhedral energy core, rotating starlight particle galaxy (850+ particles), and gyroscopic orbital rings.
   - Smooth mouse-following inertia rotation on desktop and drag-to-rotate touch controls on mobile.
   - Animated subtitle typing effect (`Aspiring AI Engineer`, `Computer Science Student`, `Machine Learning Enthusiast`, `Creative Web Developer`).
   - Mouse-following ambient red spotlight.
   - Custom red ring cursor with trailing magnetic follower.

3. **Editorial About Me Section**:
   - Detailed personal background highlighting Dharun's CSE AI & ML track at SRM Ramapuram.
   - Stylized futuristic cyber monogram visual card.
   - Animated statistics counters (2026, 2030, 1st Year, 100% Commitment).

4. **Academic Journey Roadmap (2026 – 2030)**:
   - Interactive chronological timeline spanning from 2026 to 2030.
   - Strictly authentic milestones without falsely claiming future achievements.

5. **Interactive 3D Skills Showcase**:
   - Filterable categories: All, Programming (C, Python [Learning]), Web Development (HTML, CSS, JavaScript [Learning]), Tools (Git, GitHub, VS Code), Areas of Interest (AI, ML, Software Engineering), and Core Strengths.
   - 3D mouse tilt interaction on every card.
   - No fabricated proficiency percentages.

6. **AirGuard Project Showcase & Live Simulator**:
   - Featured project card for **AirGuard — Air Quality Monitoring System**.
   - **Interactive Live Telemetry Simulator**: Displays real-time AQI, PM2.5, PM10, CO2, temperature readings with an interactive animated waveform canvas graph.
   - **"Simulate Spike"** button to demonstrate how AirGuard responds to air quality spikes in real time.
   - System architecture modal detailing sensor integration and web dashboard.

7. **Verified Resume & PDF Management**:
   - High-end digital credentials preview card.
   - Direct PDF download functionality.
   - Fullscreen digital resume preview modal.

8. **Functional Contact Section**:
   - Direct working `mailto` and `tel` cards.
   - One-click "Copy" buttons for email and telephone with instant toast notifications.
   - External links to GitHub, LinkedIn, and Instagram.
   - Client-side validated form that opens pre-filled email client.

9. **Accessibility & Global Hotkeys**:
   - Press <kbd>?</kbd> anywhere on the page to open the keyboard shortcuts modal.
   - Press <kbd>H</kbd> for Home, <kbd>A</kbd> for About, <kbd>J</kbd> for Journey, <kbd>S</kbd> for Skills, <kbd>P</kbd> for Projects, <kbd>R</kbd> for Resume, <kbd>C</kbd> for Contact.
   - Press <kbd>Esc</kbd> to close any modal.
   - Full support for `prefers-reduced-motion`.

---

## 5. How to Run Locally

You can run this portfolio on any computer without needing Node.js or npm installed!

### Option A: Open directly in your browser
Simply double-click `index.html` in Windows Explorer or open it in Google Chrome, Microsoft Edge, Brave, or Firefox:
```powershell
Start-Process "c:\dharunpoetfolio\index.html"
```

### Option B: Using VS Code Live Server
1. Open the folder `c:\dharunpoetfolio` in Visual Studio Code.
2. Right-click `index.html` and click **"Open with Live Server"**.

### Option C: Using PowerShell Native Local Server
Run this one-liner in PowerShell inside `c:\dharunpoetfolio`:
```powershell
python -m http.server 3000
# Or using any static file server:
# npx serve (if node is installed)
```

---

## 6. How to Update or Replace Your Resume PDF

1. Export your latest resume as a PDF file named `resume.pdf`.
2. Place `resume.pdf` into the root directory:
   ```
   c:\dharunpoetfolio\resume.pdf
   ```
3. That's it! The "Download Resume" buttons on the website will instantly download your updated PDF.

---

## 7. How to Deploy to the Web (Free Hosting)

### Deploy to GitHub Pages
1. Initialize git in this directory:
   ```powershell
   git init
   git add .
   git commit -m "Initial commit of cinematic 3D portfolio"
   ```
2. Create a new repository on your GitHub account (`https://github.com/dharunkanaga24-del/portfolio` or `dharunkanaga24-del.github.io`).
3. Push your code:
   ```powershell
   git remote add origin https://github.com/dharunkanaga24-del/<repo-name>.git
   git branch -M main
   git push -u origin main
   ```
4. In GitHub Repository Settings &rarr; **Pages**, choose the `main` branch and root `/` folder &rarr; click **Save**. Your site will be live within 60 seconds!

### Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
2. Import your GitHub repository.
3. No build command is required (Framework Preset: **Other** / Static).
4. Click **Deploy**.

### Deploy to Netlify
1. Go to [netlify.com](https://netlify.com) &rarr; **Add new site** &rarr; **Import an existing project** (or drag and drop the `c:\dharunpoetfolio` folder).
5. Click **Deploy site**.
