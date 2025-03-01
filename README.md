# Manish's Portfolio Website

A modern, terminal-inspired developer portfolio built with Elysia.js, HTMX, and Tailwind CSS.

![Portfolio Preview](https://img.shields.io/badge/Portfolio-Live-brightgreen)

## 🚀 Features

- **Terminal-inspired UI** with neon accents and sleek design
- **Responsive layout** that works on all device sizes
- **HTMX-powered interactions** for a smooth user experience
- **Contact form** with email integration via Resend API
- **Project showcase** highlighting full-stack development skills
- **Fast performance** using Bun and Elysia.js

## 🛠️ Tech Stack

- **[Bun](https://bun.sh/)** - JavaScript runtime & package manager
- **[Elysia.js](https://elysiajs.com/)** - TypeScript framework for Bun
- **[HTMX](https://htmx.org/)** - High-power tools for HTML
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Resend](https://resend.com/)** - Email API for the contact form

## 🧰 Project Structure

```
.
├── public/
│   ├── favicon.ico
│   ├── script.js
│   └── styles.css
├── src/
│   └── index.html
├   └── index.ts
└── tailwind.config.js
```

## 📌 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine
- Resend API key for email functionality

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/itzmaniss/dev-porfolio.git
   cd dev-porfolio
   ```

2. Install dependencies
   ```bash
   bun install
   ```

3. Create a `.env` file in the root directory with your Resend API key
   ```
   RESEND_API_KEY=your_resend_api_key_here
   ```

4. Start the development server
   ```bash
   bun dev
   ```

5. Build for production
   ```bash
   bun run build
   ```

## 📝 Features

### Home Page
Showcases a modern, terminal-inspired design with a focus on developer identity.

### About Section
Highlights personal information and experiences in a visually appealing terminal window.

### Projects Section
Displays a collection of featured projects with technology stack badges and descriptions.

### Skills Section
Visualizes technical skills using Devicon library.

### Contact Form
Allows visitors to send messages directly through the website, with server-side validation and error handling.

## 🔧 Customization

### Tailwind Configuration
The project uses a custom Tailwind configuration with a safelist for dynamic classes. You can modify the theme in the `tailwind.config.js` file.

### Adding Projects
To add new projects, modify the projects section in `index.html` by duplicating the project box template.

### Email Configuration
The contact form sends emails using Resend API. You can modify the email template in the `index.ts` file.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- Design by [Rakshii](https://www.rakshiii.xyz)
- Icons by [Devicon](https://devicon.dev/)

## 📞 Contact

For any questions or suggestions, feel free to reach out:

- GitHub: [itzmaniss](https://github.com/itzmaniss)
- LinkedIn: [itzmaniss](https://linkedin.com/in/itzmaniss)
- Email: [contact@itzmaniss.dev](mailto:contact@itzmaniss.dev)