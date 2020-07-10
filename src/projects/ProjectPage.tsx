import Axios, { AxiosError, AxiosResponse } from "axios";
import React from "react";
import Project from "./Project";
import ProjectDetail from "./ProjectDetail";

interface ProjectPageState {
  loading: boolean;
  project: Project | undefined;
  error: string | undefined;
}

class ProjectPage extends React.Component<any, ProjectPageState> {
  state = {
    loading: false,
    project: undefined,
    error: "",
  };

  componentDidMount() {
    const id = Number(this.props.match.params.id);
    this.getProject(id);
  }

  translateStatusToErrorMessage = (status: number | undefined) => {
    switch (status) {
      case 401:
        return "Please login again.";
      case 403:
        return "You do not have permission to view the project(s).";
      case 404:
        return "The requested project could not be found.";
      default:
        return "There was an unexpected error retrieving the project. Please try again.";
    }
  };

  checkStatus = (response: AxiosResponse<Project>): AxiosResponse<Project> => {
    if (response.status === 200) {
      return response;
    } else {
      throw response;
    }
  };

  getProject = (projectId: number) => {
    this.setState({
      loading: true,
      project: undefined,
      error: "",
    });

    Axios.get<Project>(`http://localhost:4000/projects/${projectId}`)
      .then((res) => this.checkStatus(res))
      .then((res) =>
        this.setState({
          loading: false,
          project: res.data,
        })
      )
      .catch((error: AxiosError) => {
        const errorMessage = this.translateStatusToErrorMessage(
          error.response?.status
        );

        this.setState({
          error: errorMessage,
          loading: false,
        });
      });
  };

  render() {
    const { loading, project, error } = this.state;
    return (
      <>
        <h1>Project Detail</h1>

        {loading && (
          <div className="center-page">
            <span className="spinner primary"></span>
            <p>Loading...</p>
          </div>
        )}

        {error && (
          <div className="row">
            <div className="card large error">
              <section>
                <p>
                  <span className="icon-alert inverse "></span> {error}
                </p>
              </section>
            </div>
          </div>
        )}

        {project && <ProjectDetail project={project} />}
      </>
    );
  }
}

export default ProjectPage;
