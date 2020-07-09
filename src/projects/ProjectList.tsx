import React from "react";
import { Project } from "./Project";

export default function ProjectList(props: { projects: Project[] }) {
  return (
    <>
      {props.projects.map((project) => {
        return <pre>{JSON.stringify(project, null, " ")}</pre>;
      })}
    </>
  );
}
