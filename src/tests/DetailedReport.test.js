import React from "react";
import { mount, shallow } from "enzyme";
import DetailedReport from "../features/reports/detailedReport/DetailedReport";
const setUp = () => {
  const component = mount(<DetailedReport />, { attachTo: document.body });
  return component;
};
describe("Detailed Compoenent,", () => {
  // let component = setUp();
  // let instance = component.instance();
  // console.log('************** Instance:::', instance)
  it("should render the page", () => {
    // expect(instance).toBeInstanceOf(DetailedReport);
  });
});
