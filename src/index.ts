import { Elysia, t } from "elysia";
import { staticPlugin } from '@elysiajs/static';
import { Resend } from 'resend';

// Initialize Resend client for email sending
const resend = new Resend(process.env.RESEND_API_KEY);

// Define validation schema for contact form
const contactSchema = t.Object({
  name: t.String({ minLength: 2, maxLength: 100 }),
  email: t.String({ format: 'email', maxLength: 100 }),
  subject: t.String({ minLength: 2, maxLength: 200 }),
  message: t.String({ minLength: 1, maxLength: 2000 })
});

// Create main app
const app = new Elysia()
  .use(staticPlugin({
    assets: 'public'
  }))
  // Main routes
  .get("/", Bun.file("./src/index.html"))
  .get("/projects", "projects")
  
  // Contact form handling
  .post("/api/contact", async ({ body, set }) => {
    console.log("Form submission received:", body);
    try {
      // Send email using Resend
      const { data, error } = await resend.emails.send({
        from: `Portfolio Contact <portfolio@itzmaniss.dev>`,
        to:  'contact@itzmaniss.dev',
        subject: `Portfolio Contact: ${body.subject}`,
        html: `
          <h3>New contact form submission from your portfolio:</h3>
          <p><strong>Name:</strong> ${body.name}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Message:</strong></p>
          <p>${body.message.replace(/\n/g, '<br>')}</p>
        `
      });

      if (error) {
        throw new Error(error.message);
      }
      
      // Return success HTML for htmx to swap in
      return `<div class="py-8 text-center space-y-4">
        <div class="text-emerald-400 mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
        <h3 class="text-xl font-bold text-emerald-300">Message Sent Successfully!</h3>
        <p class="text-emerald-200">Thanks for reaching out. I'll get back to you as soon as possible.</p>
        <div class="font-mono text-emerald-300 mt-4">
            <p>itzmaniss@itzmaniss.dev:~$ <span class="text-white">echo "Message delivered"</span></p>
            <p class="text-white">Message delivered ✓</p>
        </div>

      </div>`;
    } catch (error) {
      // Log the error on the server
      console.error('Error sending email:', error);
      
      // Set HTTP status to 500
      set.status = 500;
      
      // Return error HTML for htmx to display
      return `
        <form class="space-y-6" hx-post="/api/contact" hx-swap="outerHTML" hx-indicator="#form-indicator">
          <!-- Form inputs would be re-rendered here in a real implementation -->
          <div class="p-3 bg-red-900/50 border border-red-700 text-red-200 rounded-md" role="alert">
            <p class="font-mono text-sm">Failed to send message. Please try again later.</p>
          </div>
        </form>
      `;
    }
  }, {
    body: contactSchema // Apply validation
  })
  
  // Start the server
  .listen(6969);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);