import React from "react";
import { Project } from "./Project";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

export default function ProjectList(props: { projects: Project[] }) {
  return (
    <div className="row">
      {props.projects.map((project, index) => {
        return (
          <div className="cols-sm">
            <ProjectCard key={index} project={project} />
            <ProjectForm />
          </div>
        );
      })}
    </div>
  );
}
