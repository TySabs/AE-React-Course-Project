import { shallow, ShallowWrapper } from "enzyme";
import React from "react";
import Project from "../Project";
import ProjectList from "../ProjectList";
import { mockProjects } from "./__mocks__/mock-projects";

describe("<ProjectList />", () => {
  let wrapper: ShallowWrapper;
  let projects: Project[];
  let handleSave: jest.Mock;

  beforeEach(() => {
    projects = mockProjects;
    wrapper = shallow(<ProjectList projects={projects} onSave={handleSave} />);
  });

  test("renders without crashing", () => {
    expect(wrapper).toBeDefined();
  });

  test("renders <ProjectCard/>s", () => {
    const projectCardWrapper = wrapper.find("ProjectCard");
    expect(projectCardWrapper.length).toBe(mockProjects.length);
  });

  //   Cannot use setState in a functional component. This would need to be made into a class component for this test to pass
  //   test("render <ProjectForm> for editingProject", () => {
  //     wrapper.setState({ projectBeingEdited: mockProjects[2] });
  //     expect(wrapper.find("Connect(ProjectForm)").length).toBe(1);
  //   });

  test("snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
