import React, { useState, useEffect } from "react";
import ProjectList from "./ProjectList";
import { Project } from "./Project";
import Axios, { AxiosError } from "axios";

const baseUrl = "http://localhost:4000";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 10;
  const maxPage = 100 / limit;

  useEffect(() => {
    setLoading(true);
    loadProjects(currentPage);
  }, []);

  const loadProjects = (pageNum: number) => {
    getProjects(pageNum)
      .then((res) => {
        setProjects(res);
        setLoading(false);
      })
      .catch((e: AxiosError) => {
        setError(e.message);
        setLoading(false);
      });
  };

  const getProjects = (page: number) => {
    const url = `${baseUrl}/projects`;
    const params = {
      _page: page,
      _limit: limit,
      _sort: "name",
    };
    return Axios.get<Project[]>(url, { params }).then((res) => res.data);
  };

  const incrementPage = (pageNum: number) => {
    const nextPage = pageNum + 1;
    setCurrentPage(nextPage);
    loadProjects(nextPage);
  };

  const decrementPage = (pageNum: number) => {
    const previousPage = pageNum - 1;
    setCurrentPage(previousPage);
    loadProjects(previousPage);
  };

  const saveProject = (updatedProject: Project) => {
    const updatedProjects = projects.map((project) => {
      return project.id === updatedProject.id ? updatedProject : project;
    });

    setProjects(updatedProjects);
  };

  return (
    <>
      <h1>Projects</h1>
      <div className="row">
        <button
          onClick={() => decrementPage(currentPage)}
          disabled={loading || currentPage == 1}
        >
          Previous Page
        </button>
        <button
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

      <ProjectList projects={projects} onSave={saveProject} loading={loading} />

      {loading ? (
        <div className="center-page">
          <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
      ) : null}
    </>
  );
}
