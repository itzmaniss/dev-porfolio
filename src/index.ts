import { Elysia, t } from "elysia";
import { staticPlugin } from "@elysiajs/static"
import { Database } from "bun:sqlite"

interface Project {
  name: string;
  desc: string;
  repo: string;
}

const app = new Elysia()
.use(staticPlugin())

// Displays my website
.get("/", () => Bun.file("./src/index.html"))

// Get the projects i want to display on my website from a db
.post("/projects", () => {
  const db = new Database("./public/my_projects.db");
  const projects = db.prepare("SELECT name, desc, repo FROM projects WHERE display = 1").all() as Project[];
  db.close();

  const project_list = projects.map((project, index) => `
    <div class="project ${ index % 2 === 0 ? "even" : "odd"}">
      <img src= "./public/${ escapehtml(project.name) }.jpg" alt= "${ escapehtml(project.name) } image" class="project-image">
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
.listen(3000);

function escapehtml(text: string){
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
