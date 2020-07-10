import React, { useState } from "react";
import Project from "./Project";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

interface ProjectListProps {
  projects: Project[];
  onSave: (project: Project) => void;
  loading: boolean;
}

interface ProjectListState {
  projectBeingEdited: Project | {};
}

export default function ProjectList(props: ProjectListProps) {
  const { projects, onSave, loading } = props;
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
      {projects.map((project, index) => {
        return (
          <div key={index} className="cols-sm">
            {project !== state.projectBeingEdited ? (
              <ProjectCard key={index} project={project} onEdit={handleEdit} />
            ) : (
              <ProjectForm
                project={project}
                onSave={onSave}
                onCancel={handleCancel}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
