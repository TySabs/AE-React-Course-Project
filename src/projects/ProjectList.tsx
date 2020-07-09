import React from "react";
import { Project } from "./Project";
import ProjectCard from "./ProjectCard";

export default function ProjectList(props: { projects: Project[] }) {
  return (
    <div className="row">
      {props.projects.map((project) => {
        return <ProjectCard project={project} />;
      })}
    </div>
  );
}
