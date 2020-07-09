import React, { SyntheticEvent } from "react";
import { Project } from "./Project";

interface ProjectFormProps {
  project: Project;
  onSave: (project: Project) => void;
  onCancel: () => void;
}

export default function ProjectForm(props: ProjectFormProps) {
  const { project, onSave, onCancel } = props;

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    onSave(new Project({ name: `Updated ${project.name}` }));
  };

  return (
    <form className="input-group vertical" onSubmit={handleSubmit}>
      <label htmlFor="name">Project Name</label>
      <input
        type="text"
        name="name"
        placeholder="enter name"
        value={project.name}
        readOnly
      />
      <label htmlFor="description">Project Description</label>

      <textarea name="description" placeholder="enter description"></textarea>
      <label htmlFor="budget">Project Budget</label>

      <input type="number" name="budget" placeholder="enter budget" />
      <label htmlFor="isActive">Active?</label>
      <input type="checkbox" name="isActive" />

      <div className="input-group">
        <button className="primary bordered medium" onClick={handleSubmit}>
          Save
        </button>
        <span></span>
        <button onClick={onCancel} type="button" className="bordered medium">
          cancel
        </button>
      </div>
    </form>
  );
}
