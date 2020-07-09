import React, { useState } from "react";
import { Project } from "./Project";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

interface ProjectListProps {
  projects: Project[];
}

interface ProjectListState {
  projectBeingEdited: Project | {};
}

export default function ProjectList(props: ProjectListProps) {
  const [state, setState] = useState<ProjectListState>({
    projectBeingEdited: {},
  });

  const handleEdit = (project: Project) => {
    setState({ projectBeingEdited: project });
  };

  const handleCancel = () => {
    setState({ projectBeingEdited: {} });
  };

  return (
    <div className="row">
      {props.projects.map((project, index) => {
        return (
          <div key={index} className="cols-sm">
            {project !== state.projectBeingEdited ? (
              <ProjectCard key={index} project={project} onEdit={handleEdit} />
            ) : (
              <ProjectForm project={project} onCancel={handleCancel} />
            )}
          </div>
        );
      })}
    </div>
  );
}
