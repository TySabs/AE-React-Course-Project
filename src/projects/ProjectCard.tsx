import React from "react";
import Project from "./Project";

function formatDescription(description: string): string {
  return description.substring(0, 60) + "...";
}

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
}

function ProjectCard(props: ProjectCardProps) {
  const { project, onEdit } = props;

  const handleEditClick = (editedProject: Project) => {
    onEdit(editedProject);
  };

  return (
    <div className="card">
      <img src={project.imageUrl} alt={project.name} />
      <section className="section dark">
        <h5 className="strong">
          <strong>{project.name}</strong>
        </h5>
        <p>{formatDescription(project.description)}</p>
        <p>
          Budget : ${project.budget.toLocaleString()}
          <button className="bordered" onClick={() => handleEditClick(project)}>
            <span className="icon-edit"></span>
            Edit
          </button>
        </p>
      </section>
    </div>
  );
}

export default ProjectCard;
