import React from "react";
import { mockProjects } from "./MockProjects";
import ProjectList from "./ProjectList";
import { Project } from "./Project";

export default function ProjectsPage() {
  const saveProject = (project: Project) => {
    console.log("Saving project: ", project);
  };
  return (
    <>
      <h1>Projects</h1>
      <ProjectList projects={mockProjects} onSave={saveProject} />
    </>
  );
}
