import Axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import Project from "./Project";
import ProjectList from "./ProjectList";

const baseUrl = "http://localhost:4000";
const pageSize = 10;
const maxPage = 100 / pageSize;

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = (page: number = currentPage) => {
    const url = `${baseUrl}/projects`;
    const params = {
      _page: page,
      _limit: pageSize,
      _sort: "name",
    };
    const config = { params };

    setLoading(true);

    Axios.get<Project[]>(url, config)
      .then((res) => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch((e: AxiosError) => {
        setError(e.message);
        setLoading(false);
      });
  };

  const updateProjects = (updatedProject: Project) => {
    const url = `${baseUrl}/projects/${updatedProject.id}`;
    Axios.put<Project[]>(url, updatedProject)
      .then(() => {
        getProjects();
      })
      .catch((e: AxiosError) => {
        setError(e.message);
      });
  };

  const incrementPage = (pageNum: number) => {
    const nextPage = pageNum + 1;
    setCurrentPage(nextPage);
    getProjects(nextPage);
  };

  const decrementPage = (pageNum: number) => {
    const previousPage = pageNum - 1;
    setCurrentPage(previousPage);
    getProjects(previousPage);
  };

  const saveProject = (updatedProject: Project) => {
    updateProjects(updatedProject);
  };

  return (
    <>
      <h1>Projects</h1>
      <div className="row">
        <button
          className="primary"
          onClick={() => decrementPage(currentPage)}
          disabled={loading || currentPage === 1}
        >
          Previous Page
        </button>
        <button
          className="primary"
          onClick={() => incrementPage(currentPage)}
          disabled={loading || currentPage === maxPage}
        >
          Next Page
        </button>
      </div>

      {error ? (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse "></span>
                {error}
              </p>
            </section>
          </div>
        </div>
      ) : null}

      <ProjectList projects={projects} onSave={saveProject} />

      {loading ? (
        <div className="center-page">
          <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
      ) : null}
    </>
  );
}
