import React from "react";
import { mockProjects } from "./MockProjects";
import ProjectList from "./ProjectList";

export default function ProjectsPage() {
  return (
    <>
      <h1>Projects</h1>
      <ProjectList projects={mockProjects} />
    </>
  );
}
