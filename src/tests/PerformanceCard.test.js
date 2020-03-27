import React from "react";
import { mount, shallow } from "enzyme";
import PerformanceCard from "../features/reports/detailedReport/performanceCard/PerformanceCard";
let mockProps = {
  performance: { value: 71, color: "#A6C44D", level: "Excellent" },
  ethics: { value: 90, color: "#559352", level: "Conscientious" },
  ranks: { universe: 114, org: 2 }
};
let mockProps2 = {
  performance: { value: 71, color: "#A6C44D", level: "Excellent" },
  ethics: { value: 90, color: "#559352", level: "Conscientious" },
  ranks: { universe: 114, org: 1 }
};
let mockProps3 = {
  performance: { value: 71, color: "#A6C44D", level: "Excellent" },
  ethics: { value: 90, color: "#559352", level: "Conscientious" },
  ranks: { universe: 114, org: 3 }
};

describe("PerformanceCard Compoenent,", () => {
  it("should render the page", () => {
    let component = mount(<PerformanceCard {...mockProps} />);
    let instance = component.instance();
    // expect(instance).toBeInstanceOf(PerformanceCard);
  });
  it("should render the page", () => {
    let component = mount(<PerformanceCard {...mockProps2} />);
    let instance = component.instance();
    // expect(instance).toBeInstanceOf(PerformanceCard);
  });
  it("should render the page", () => {
    let component = mount(<PerformanceCard {...mockProps3} />);
    let instance = component.instance();
    // expect(instance).toBeInstanceOf(PerformanceCard);
  });
});
