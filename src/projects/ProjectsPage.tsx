import React from "react";
import { MOCK_PROJECTS } from "./MockProjects";

export default function ProjectsPage() {
  const mockProjects = MOCK_PROJECTS;
  return (
    <>
      <h1>Projects</h1>
      <pre>{JSON.stringify(mockProjects, null, " ")}</pre>
    </>
  );
}
