import { Elysia, t } from "elysia";
import { staticPlugin } from "@elysiajs/static"
import { Database } from "bun:sqlite"

interface Project {
  name: string;
  desc: string;
  repo: string;
}

interface ExperienceDetails {
  start_date: string;
  end_date: string;
  experience: string[];
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

.post("/expereinces", () => {
  const displayed_expereinces: {[key: string]: ExperienceDetails} = get_experiences(true);

  let index:number = 0;
  let result:string = "";

  for (const exp in displayed_expereinces) {
    const details = displayed_expereinces[exp];

    let deets_html = "";

    details.experience.forEach((deet) => {
      deets_html += `<div class='deets'>${ escapehtml(deet) }</div>`;
    })
    const div = `<div class = "experience" >
      <div class = "experience-title ${ index % 2 === 0 ? "even" : "odd"}">
        <span id = "experience">${ escapehtml(exp) } </span>
        <span id = "start">${ escapehtml(details.start_date) } </span>
        <span id = "end">${ escapehtml(details.end_date) } </span>
      </div>
      ${ deets_html }
    </div>`;

    result += div;
  }
  

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

async function update_db (){
  let repos: any[] = []

  await fetch("https://api.github.com/users/itzmaniss/repos").then(response => response.json()).then(data => repos = data);
  
  const project_info: Project[] = repos.map( rep => ({
      name: rep.name,
      repo: rep.html_url,
      desc: rep.description || "No Description Available"
  }));

  const db = new Database("./public/my_projects.db")

  const update = db.prepare(`INSERT INTO projects (name, desc, repo, display) VALUES (?,?,?,0)
                              ON CONFLICT(name) DO UPDATE SET
                              desc = excluded.desc,
                              repo = excluded.repo,
                              display = CASE WHEN display = 1 THEN 1 ELSE display = excluded.display END`);

  for (const project of project_info) {
      update.run(project.name, project.desc, project.repo);
  }
  db.close()    
}


async function create_db () {


  if (await Bun.file("./public/my_projects.db").exists()) {
    return;
  }
  try {

  const db = new Database("./public/my_projects.db");
  db.run(`CREATE TABLE projects (
    name TEXT NOT NULL UNIQUE,
    desc TEXT NOT NULL,
    repo TEXT NOT NULL UNIQUE,
    display INTEGER NOT NULL,
    PRIMARY KEY (name)
    )`);

    db.run(`CREATE TABLE experiences (
      exp TEXT NOT NULL UNIQUE,
      start_date TEXT NOT NULL,
      end_date TEXT NOT NULL,
      display INTEGER NOT NULL,
      PRIMARY KEY (exp)
      )`);

      db.run(`CREATE TABLE experience_info (
        exp TEXT NOT NULL,
        deets TEXT NOT NULL,
        PRIMARY KEY (deets)
        )`);

  db.close();

  await update_db();

  }
  catch (error) {
    console.log("Error creating Database!!!")
  }
}

function insert_db (table: string, rows: string, values: string) {
  try {
    const db = new Database("./public/my_projects.db");
    db.run(`INSERT INTO ${ table } ${ rows } VALUES `)
  }
  catch(error) {
    console.log("ERROR INSERTING INTO DB!")
  }
}

function get_experiences(display: Boolean) {

  let query = `SELECT e.exp, e.start_date, e.end_date, i.deets
    FROM experiences e
    JOIN experience_info i ON e.exp = i.exp `;

  if (display) {
    query += `WHERE e.display = 1`;
  }
  const db = new Database("./public/my_projects.db", {readonly: true});
  const rows = db.prepare(query).all() as {exp: string, start_date: string, end_date: string, deets: string}[];
  
  
  const result:  {[key: string]: ExperienceDetails} = {};
  rows.forEach(line => {
    if (!result[line.exp]){
      result[line.exp] = {
        start_date: line.start_date,
        end_date: line.end_date,
        experience: []
      };
    }    
    result[line.exp].experience.push(line.deets);
  });

  db.close();

  return result;
}

create_db();

console.log(get_experiences(true));


console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
