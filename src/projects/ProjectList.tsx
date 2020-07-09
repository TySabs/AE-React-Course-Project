import React, { useState } from "react";
import { Project } from "./Project";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

interface ProjectListProps {
  projects: Project[];
}

interface ProjectListState {
  editedProject: Project | {};
}

export default function ProjectList(props: ProjectListProps) {
  const [state, setState] = useState<ProjectListState>({
    editedProject: {},
  });

  const handleEdit = (project: Project) => {
    setState({ editedProject: project });
  };

  return (
    <div className="row">
      {props.projects.map((project, index) => {
        return (
          <div key={index} className="cols-sm">
            {project !== state.editedProject ? (
              <ProjectCard key={index} project={project} onEdit={handleEdit} />
            ) : (
              <ProjectForm project={project} />
            )}
          </div>
        );
      })}
    </div>
  );
}
