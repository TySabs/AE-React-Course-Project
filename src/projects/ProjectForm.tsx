import React from "react";
import { Project } from "./Project";

interface ProjectFormProps {
  project: Project;
  onCancel: () => void;
}

export default function ProjectForm(props: ProjectFormProps) {
  const { project, onCancel } = props;
  return (
    <form className="input-group vertical">
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
        <button className="primary bordered medium">Save</button>
        <span></span>
        <button onClick={onCancel} type="button" className="bordered medium">
          cancel
        </button>
      </div>
    </form>
  );
}