import { Elysia, t } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import type { Project, ExperienceDetails, Socials } from "./types.ts";
import * as db from "./db_management";


const app = new Elysia()
.use(staticPlugin())

// Displays my website
.get("/", () => Bun.file("./src/index.html"))

// Get the projects i want to display on my website from a db
.post("/projects", () => {
  const projects: Project[] = db.get_projects(true);

  const project_list = projects.map((project, index) => `
    <div class="project ${ index % 2 === 0 ? "even" : "odd"}">
      <img src= "./public/${ escapehtml(project.name) }.webp" alt= "${ escapehtml(project.name) } image" class="project-image">
      <div class="project-content">
        <a href= ${ escapehtml(project.repo) } class="project-name" target="_blank">${ escapehtml(project.name) } </a>
        <p class="project-desc"> ${ escapehtml(project.desc) } </p>
      </div>
    </div>
    `).join(" ");

  return project_list;
})

// Downloads my resume
.post( "/resume",  async ( {set} ) => {
  const pdf_file = Bun.file("./public/my_resume.pdf");

  set.headers["Content-Disposition"] = "attachment; filename=manish_resume.pdf";

  return pdf_file;
},
{
  detail: {tags: ["File"]},
  response: t.File()
})

//sends the experiences i want to display on the website
.post("/experiences", () => {
  const displayed_expereinces: {[key: string]: ExperienceDetails} = db.get_experiences(true);

  let index:number = 0;
  let result:string = "";

  for (const exp in displayed_expereinces) {
    const details = displayed_expereinces[exp];

    let deets_html = "";

    details.experience.forEach((deet) => {
      deets_html += `<span class='deet'> - ${ escapehtml(deet) }</span>`;
    })
    const div = `<div class = "experience" >
      <div class = "experience-title ${ index % 2 === 0 ? "even" : "odd"}">
        <span id = "experience">${ index + 1 }. ${ escapehtml(exp) } </span>
        <span id="Duration">(
          <span id = "start">${ escapehtml(details.start_date) } </span>
          -
          <span id = "end">${ escapehtml(details.end_date) } </span>)
        </span>
      </div>
      <div class="deets">
        ${ deets_html }
      </div>
    </div>`;
    index ++;
    result += div;
  }
  return result;

})

// .post("/email", async ({ body }) => {
//   const { name, message } = body as { name:string, message:string};

//   const mail_to_link = `mailto:contact@itzmaniss.dev
//                         ?subject=Hi there!
//                         &body=Hi%20Manish!%2C%0A%20%20%20%20I%20am%2C%20${ encodeURIComponent(name) }.%20I%20am%20contacting%20you%20regarding%20${ encodeURIComponent(message) }%0A%0AWarmest%20regards%2C%0A${ encodeURIComponent(name) }
//                         `
//   const escapedMailtoLink = mail_to_link.replace(/#/g, '\\#'); 
  

//   return `
//   <div hx-swap-oob="true">
//       <script>
//         setTimeout(() => {
//             window.location.href = "${escapedMailtoLink}";
//         }, 0);
//       </script>
//   </div>`;
            
                      
// })
.post("/email", async ({ body }) => {
  const { name, message } = body as { name: string; message: string };
  
  const mailtoLink = `mailto:your@email.com?subject=New Contact Form Submission&body=Name:%20${encodeURIComponent(name)}%0A%0AMessage:%20${encodeURIComponent(message)}`;

  // Escape the '#' character in the mailto link
  const escapedMailtoLink = mailtoLink.replace(/#/g, '\\#'); 

  // Use setTimeout to delay execution until after the DOM update
  return `
      <div hx-swap-oob="true">
          <script>
              setTimeout(() => {
                  window.location.href = "${escapedMailtoLink}"; 
              }, 0); 
          </script>
      </div>
  `;
})

.listen(3000);

function escapehtml(text: string){
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


app.onStart(async () => {
  await db.create_db();
})

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
