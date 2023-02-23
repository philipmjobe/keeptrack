import React, {useState, useEffect}from "react";
import { projectAPI } from "./projectAPI";
import ProjectList from "./ProjectList";
import { Project } from "./Project";



function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const [currentPage, setCurrentPage] = useState(1)
  useEffect(() => {
      async function loadProjects() {
        setLoading(true);
        try {
          const data = await projectAPI.get(currentPage);
          setError('');
        
        if (currentPage === 1) {
          setProjects(data)
        }else {
          setProjects((projects) => [...projects, ...data])
        }
       } catch (e) {
          if (e instanceof Error) {
            setError(e.message);
          }
          } finally {
          setLoading(false);
        }
      }
      loadProjects();
    }, [currentPage]);
  const saveProject = (project: Project) => {
    let updatedProjects = projects.map((p: Project) => {
      return p.id === project.id ? project : p
    })
    setProjects(updatedProjects)
  }
  return (
    <>
     <h1>Projects</h1>
     {error && (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse "></span>
                {error}
              </p>
            </section>
          </div>
        </div>
      )}
     <ProjectList
     onSave={saveProject}
     projects={projects} />

     {loading && (
      <div className="center-page">
        <span className="spinner primary"></span>
        <p>Loading...</p>
      </div>
     )}
    </>
  );
}

export default ProjectsPage