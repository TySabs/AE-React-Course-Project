import React, { SyntheticEvent, useState } from "react";
import { Project } from "./Project";

interface ProjectFormProps {
  project: Project;
  onSave: (project: Project) => void;
  onCancel: () => void;
}

interface ProjectFormState {
  project: Project;
}

export default class ProjectForm extends React.Component<
  ProjectFormProps,
  ProjectFormState
> {
  state = {
    project: this.props.project,
  };

  handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    this.props.onSave(this.state.project);
  };

  handleChange = (event: any) => {
    const { type, name, value, checked } = event.target;
    let updatedValue = type === "checkbox" ? checked : value;
    if (type === "number") {
      updatedValue = +updatedValue;
    }

    const updatedProject = {
      [name]: updatedValue,
    };

    this.setState((previousState: ProjectFormState) => {
      const newProject = Object.assign(
        new Project(),
        previousState.project,
        updatedProject
      );

      return { project: newProject };
    });
  };

  render() {
    return (
      <form className="input-group vertical" onSubmit={this.handleSubmit}>
        <label htmlFor="name">Project Name</label>
        <input
          type="text"
          name="name"
          placeholder="enter name"
          value={this.state.project.name}
          onChange={this.handleChange}
        />

        <label htmlFor="description">Project Description</label>
        <textarea
          name="description"
          placeholder="enter description"
          value={this.state.project.description}
          onChange={this.handleChange}
        ></textarea>

        <label htmlFor="budget">Project Budget</label>
        <input
          type="number"
          name="budget"
          placeholder="enter budget"
          value={this.state.project.budget}
          onChange={this.handleChange}
        />

        <label htmlFor="isActive">Active?</label>
        <input
          type="checkbox"
          name="isActive"
          checked={this.state.project.isActive}
          onChange={this.handleChange}
        />

        <div className="input-group">
          <button className="primary bordered medium" type="submit">
            Save
          </button>
          <span></span>
          <button
            onClick={this.props.onCancel}
            type="button"
            className="bordered medium"
          >
            cancel
          </button>
        </div>
      </form>
    );
  }
}
