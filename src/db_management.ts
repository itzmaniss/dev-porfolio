import { Database } from "bun:sqlite";
import type { Project, ExperienceDetails } from "./types.ts"

export async function update_db():Promise<void> {
    let repos: any[] = []
  
    await fetch("https://api.github.com/users/itzmaniss/repos").then(response => response.json()).then(data => repos = data);
    
    const project_info: Project[] = repos.map( rep => ({
        name: rep.name,
        repo: rep.html_url,
        desc: rep.description || "No Description Available"
    }));
  
    const db = new Database("./public/my_projects.db");
  
    const update = db.prepare(`INSERT INTO projects (name, desc, repo, display) VALUES (?,?,?,0)
                                ON CONFLICT(name) DO UPDATE SET
                                desc = excluded.desc,
                                repo = excluded.repo,
                                display = CASE WHEN display = 1 THEN 1 ELSE display = excluded.display END`);
  
    for (const project of project_info) {
        update.run(project.name, project.desc, project.repo);
    }
    db.close();    
  }
  
  
  export async function create_db():Promise<void> {
  
  
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
  
  export function get_experiences(display: Boolean): {[key: string]: ExperienceDetails}{
  
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
  