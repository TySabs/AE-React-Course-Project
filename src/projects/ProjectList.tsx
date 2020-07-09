import React from "react";
import { Project } from "./Project";
import ProjectCard from "./ProjectCard";

export default function ProjectList(props: { projects: Project[] }) {
  return (
    <div className="row">
      {props.projects.map((project, index) => {
        return <ProjectCard key={index} project={project} />;
      })}
    </div>
  );
}
