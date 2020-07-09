import React, { useState } from "react";
import { mockProjects } from "./MockProjects";
import ProjectList from "./ProjectList";
import { Project } from "./Project";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(
    mockProjects as Project[]
  );

  const saveProject = (updatedProject: Project) => {
    const updatedProjects = projects.map((project) => {
      return project.id === updatedProject.id ? updatedProject : project;
    });

    setProjects(updatedProjects);
  };

  return (
    <>
      <h1>Projects</h1>
      <ProjectList projects={projects} onSave={saveProject} />
    </>
  );
}
