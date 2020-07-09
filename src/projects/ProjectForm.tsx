import React, { SyntheticEvent } from "react";
import { Project } from "./Project";

interface ProjectFormProps {
  project: Project;
  onSave: (project: Project) => void;
  onCancel: () => void;
}

interface ProjectFormState {
  project: Project;
  errors: any;
}

export default class ProjectForm extends React.Component<
  ProjectFormProps,
  ProjectFormState
> {
  state = {
    project: this.props.project,
    errors: { name: "", description: "", budget: "" },
  };

  handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!this.isValid()) {
      return;
    }
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

      const errors = this.validate(newProject);

      return { project: newProject, errors };
    });
  };

  validate = (project: Project) => {
    let errors: any = { name: "", description: "", budget: "" };
    if (project.name.length === 0) {
      errors.name = "Name is required";
    }
    if (project.name.length > 0 && project.name.length < 3) {
      errors.name = "Name needs to be at least 3 characters.";
    }
    if (project.description.length === 0) {
      errors.description = "Description is required.";
    }
    if (project.budget === 0) {
      errors.budget = "Budget must be more than $0.";
    }
    return errors;
  };

  isValid = () => {
    const { errors } = this.state;
    return (
      errors.name.length === 0 &&
      errors.description.length === 0 &&
      errors.budget.length === 0
    );
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

        {this.state.errors.name.length > 0 && (
          <div className="card error">
            <p>{this.state.errors.name}</p>
          </div>
        )}

        <label htmlFor="description">Project Description</label>
        <textarea
          name="description"
          placeholder="enter description"
          value={this.state.project.description}
          onChange={this.handleChange}
        ></textarea>

        {this.state.errors.description.length > 0 && (
          <div className="card error">
            <p>{this.state.errors.description}</p>
          </div>
        )}

        <label htmlFor="budget">Project Budget</label>
        <input
          type="number"
          name="budget"
          placeholder="enter budget"
          value={this.state.project.budget}
          onChange={this.handleChange}
        />

        {this.state.errors.budget.length > 0 && (
          <div className="card error">
            <p>{this.state.errors.budget}</p>
          </div>
        )}

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
