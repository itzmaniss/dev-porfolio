import { Elysia, t } from "elysia";
import { staticPlugin } from "@elysiajs/static"
import Database from "better-sqlite3"

interface Project {
  name: string;
  desc: string;
}

const app = new Elysia()
.use(staticPlugin())

// Displays my website
.get("/", () => Bun.file("./src/index.html"))

// Get the projects i want to display on my website from a db
.post("/projects", async () => {
  const db = new Database("my_projects.db");
  const projects = db.prepare("SELECT name, desc FROM projects WHERE display = 1").all() as Project[];
  db.close();

  const project_list = projects.map(project => `
    <li>
    ${project.name}
    </li>
    `).join(" ");
})

// Downloads my resume
.post( "/resume",  async ( {set} ) => {
  const pdf_file = Bun.file("./public/manish_resume.pdf");

  set.headers["Content-Disposition"] = "attachment; filename=manish_resume.pdf";

  return pdf_file;
},
{
  detail: {tags: ["File"]},
  response: t.File()
}) 
.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
