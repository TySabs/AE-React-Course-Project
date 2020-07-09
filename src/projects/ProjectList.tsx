import React from "react";
import { Project } from "./Project";

export default function ProjectList(props: { projects: Project[] }) {
  return (
    <div className="row">
      {props.projects.map((project) => {
        return (
          <div className="cols-sm">
            <div className="card">
              <img src={project.imageUrl} alt="project name" />
              <section className="section dark">
                <h5 className="strong">
                  <strong>{project.name}</strong>
                </h5>
                <p>{project.description}</p>
                <p>Budget : ${project.budget.toLocaleString()}</p>
              </section>
            </div>
          </div>
        );
      })}
    </div>
  );
}
