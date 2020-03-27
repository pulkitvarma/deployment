import React from "react";
import { mount, shallow } from "enzyme";
import GlobalSearch from "../features/navPanel/globalSearch/GlobalSearch";
import ReactDOM from "react-dom";
const historyMock = { push: jest.fn() };
let mockProps = {
  history: historyMock,
  ppq: jest.fn(),
  zzq: jest.fn(),
  location: { state: "hello", pathname: "/application/ScheduledTest" }
};
const setUp = () => {
  const component = mount(<GlobalSearch {...mockProps} />);
  return component;
};
describe("global search", () => {
  let component = setUp();
  let instance = component.instance();
  it("should render the page", () => {
    expect(instance).toBeInstanceOf(GlobalSearch);
  });
  it("handle input change", () => {
    component
      .find("#searchBox")
      .simulate("change", { target: { value: "nirmit" }, persist: jest.fn() });
    component.update();
    let mockState = {
      scheduled: [
        {
          email: "nirmit@gmail.com",
          type: "General Aptitude Test",
          id: "1",
          scheduledDate: "16 Nov 2019, 13:23",
          expiryDate: "16 Nov 2019, 13:23",
          testStatus: "Scheduled"
        }
      ],
      reports: [
        {
          email: "nirmit@gmail.com",
          type: "General Aptitude Test",
          id: "1",
          date: "16 Nov 2019, 13:23"
        }
      ],
      count: { total: 2, scheduled: 1, reports: 1 }
    };
    let instance = component.instance();
    expect(instance.state.rawFiltered).toStrictEqual(mockState);
  });
  it("searchText is empty", () => {
    component
      .find("#searchBox")
      .simulate("change", { target: { value: "" }, persist: jest.fn() });
    component.update();
    // let mockState = {
    //  visib
    // };
    let instance = component.instance();
    expect(instance.state.visib).toBeFalsy();
  });
  it("rediredct to scheduled table if schedules search result is called", () => {
    component
      .find("#searchBox")
      .simulate("change", { target: { value: "nirmit" }, persist: jest.fn() });
    component.update();
    component.find("#scheduledContent").simulate("click");
    expect(historyMock.push.mock.calls[0]).toEqual([
      {
        pathname: "/application/ScheduledTest",
        state: {
          data: {
            email: "nirmit@gmail.com",
            expiryDate: "16 Nov 2019, 13:23",
            id: "1",
            scheduledDate: "16 Nov 2019, 13:23",
            testStatus: "Scheduled",
            type: "General Aptitude Test"
          },
          message: "fromSearch"
        }
      }
    ]);
  });
  it("rediredct to reports table if reports search result is called", () => {
    let g = document.createElement("div");
    g.setAttribute("id", "mainPanel");
    document.body.appendChild(g);
    component
      .find("#searchBox")
      .simulate("change", { target: { value: "nirmit" }, persist: jest.fn() });
    component.update();
    component.find("#reportsContent").simulate("click");
    expect(historyMock.push.mock.calls[1]).toEqual([
      {
        pathname: "/application/reports/detailedReport",
        state: {
          data: {
            email: "nirmit@gmail.com",
            type: "General Aptitude Test",
            id: "1",
            date: "16 Nov 2019, 13:23"
          },
          message: "fromSearch"
        }
      }
    ]);
  });
  it("show more reports", () => {
    component
      .find("#searchBox")
      .simulate("change", { target: { value: "gmai" }, persist: jest.fn() });
    component.update();
    component.find("#showMoreReports").simulate("click");
    component.update();
    let instance = component.instance();
    let mockState = {
      data: [
        {
          email: "pulkit@gmail.com",
          type: "General Aptitude Test",
          id: "1",
          date: "16 Nov 2019, 13:23"
        },
        {
          email: "anand@gmail.com",
          type: "Basic Programming Test",
          id: "1",
          date: "16 Nov 2019, 13:23"
        },
        {
          email: "nirmit@gmail.com",
          type: "General Aptitude Test",
          id: "1",
          date: "16 Nov 2019, 13:23"
        },
        {
          email: "arpita@gmail.com",
          type: "Basic Programming Test",
          id: "1",
          date: "16 Nov 2019, 13:23"
        },
        {
          email: "hari@gmail.com",
          type: "Basic Programming Test",
          id: "1",
          date: "16 Nov 2019, 13:23"
        },
        {
          email: "example@gmail.com",
          type: "Basic Programming Test",
          id: "1",
          date: "16 Nov 2019, 13:23"
        }
      ],
      more: false
    };
    expect(instance.state.reportsContent).toStrictEqual(mockState);
  });
  it("show more scheduled", () => {
    component
      .find("#searchBox")
      .simulate("change", { target: { value: "gmai" }, persist: jest.fn() });
    component.update();
    component.find("#showMoreScheduled").simulate("click");
    component.update();
    let instance = component.instance();
    let mockState = {
      data: [
        {
          email: "example@gmail.com",
          type: "Basic Programming Test",
          id: "1",
          scheduledDate: "16 Nov 2019, 13:23",
          expiryDate: "16 Nov 2019, 13:23",
          testStatus: "In Progress"
        },
        {
          email: "nirmit@gmail.com",
          type: "General Aptitude Test",
          id: "1",
          scheduledDate: "16 Nov 2019, 13:23",
          expiryDate: "16 Nov 2019, 13:23",
          testStatus: "Scheduled"
        },
        {
          email: "arpita@gmail.com",
          type: "Basic Programming Test",
          id: "1",
          scheduledDate: "16 Nov 2019, 13:23",
          expiryDate: "16 Nov 2019, 13:23",
          testStatus: "Scheduled"
        },
        {
          email: "hari@gmail.com",
          type: "General Aptitude Test",
          id: "1",
          scheduledDate: "16 Nov 2019, 13:23",
          expiryDate: "16 Nov 2019, 13:23",
          testStatus: "Unattempted"
        },
        {
          email: "anand@gmail.com",
          type: "Basic Programming Test",
          id: "1",
          scheduledDate: "16 Nov 2019, 13:23",
          expiryDate: "16 Nov 2019, 13:23",
          testStatus: "In Progress"
        },
        {
          email: "pulkit@gmail.com",
          type: "General Aptitude Test",
          id: "1",
          scheduledDate: "16 Nov 2019, 13:23",
          expiryDate: "16 Nov 2019, 13:23",
          testStatus: "Unattempted"
        }
      ],
      more: false
    };
    expect(instance.state.scheduledContent).toStrictEqual(mockState);
  });
  const component1 = mount(<GlobalSearch {...mockProps} />, {
    attachTo: document.body
  });
  it("search expand", () => {
    component1.find("#searchBox").simulate("click");
    component1.update();
    instance = component1.instance();
    expect(instance.state.searchActive).toBeTruthy();
  });
  it("search reset on scheduled page", () => {
    component1
      .find("#searchBox")
      .simulate("change", { target: { value: "gmai" }, persist: jest.fn() });
    component1.update();
    let instance = component1.instance();
    let g = document.createElement("div");
    g.setAttribute("id", "mainPanel");
    document.body.appendChild(g);
    instance.search_reset();
    expect(historyMock.push.mock.calls[2]).toEqual([
      "/application/ScheduledTest"
    ]);
    component1.unmount();
  });
  it("search reset on reports page", () => {
    let mockProps2 = {
      history: historyMock,
      ppq: jest.fn(),
      zzq: jest.fn(),
      location: { state: "hello", pathname: "/application/reports/detailedReport" }
    };
    const component2 = mount(<GlobalSearch {...mockProps2} />, {
      attachTo: document.body
    });
    component2
      .find("#searchBox")
      .simulate("change", { target: { value: "gmai" }, persist: jest.fn() });
    component2.update();
    let instance = component2.instance();
    let g = document.createElement("div");
    g.setAttribute("id", "mainPanel");
    document.body.appendChild(g);
    instance.search_reset();
    expect(historyMock.push.mock.calls[3]).toEqual([
      "/application/reports"
    ]);
  });
});
