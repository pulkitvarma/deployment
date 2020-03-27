import React from "react";
import { mount, shallow } from "enzyme";
import NavPanel from "../features/navPanel/NavPanel";
import { BrowserRouter as Router } from "react-router-dom";
describe("nav panel comp", () => {
  let mockProps = {
    location: { pathname: "/application", state: {} },
    match: { path: "/application" }
  };
  const component = shallow(<NavPanel {...mockProps} />, {
    attachTo: document.body
  });
  it("should render the page", () => {
    let instance = component.instance();
    expect(instance).toBeInstanceOf(NavPanel);
    component.unmount();
  });
  it("setting popup", () => {
    const component = mount(
      <Router>
        <NavPanel {...mockProps} />
      </Router>,
      {
        attachTo: document.body
      }
    );
    let g = document.createElement("div");
    let h = document.createElement("div");
    let i = document.createElement("div");
    g.setAttribute("id", "accountPopUp");
    h.setAttribute("id", "searchPanel");
    i.setAttribute("id", "searchBox");
    document.body.appendChild(g);
    document.body.appendChild(h);
    document.body.appendChild(i);
    let p = component.find("#profDiv");
    p.simulate("click");
    component.unmount();
  });
  it("setting popup2", () => {
    const component = mount(
      <Router>
        <NavPanel {...mockProps} />
      </Router>,
      {
        attachTo: document.body
      }
    );
    let g = document.createElement("div");
    let h = document.createElement("div");
    let i = document.createElement("div");
    g.setAttribute("id", "accountPopUp");
    h.setAttribute("id", "searchPanel");
    i.setAttribute("id", "searchBox");
    document.body.appendChild(g);
    document.body.appendChild(h);
    document.body.appendChild(i);
    let p = component.find("#profDiv");
    component.instance().q = true;
    component.update();
    p.simulate("click");
    component.unmount();
  });
  it("expand SideBar", () => {
    const component = mount(
      <Router>
        <NavPanel {...mockProps} />
      </Router>,
      {
        attachTo: document.body
      }
    );
    let g = document.createElement("div");
    let h = document.createElement("div");
    g.setAttribute("id", "notificationPanel");
    h.setAttribute("id", "mainPanel");
    document.body.appendChild(g);
    document.body.appendChild(h);
    let p = component.find("#notifBell");
    p.simulate("click");
    component.unmount();
  });
  it("contract SideBar", () => {
    const component = mount(
      <Router>
        <NavPanel {...mockProps} />
      </Router>,
      {
        attachTo: document.body
      }
    );
    let g = document.createElement("div");
    let h = document.createElement("div");
    let i = document.createElement("div");
    let j = document.createElement("div");
    let k = document.createElement("div");
    g.setAttribute("id", "accountPopUp");
    h.setAttribute("id", "searchPanel");
    i.setAttribute("id", "searchBox");
    j.setAttribute("id", "notificationPanel");
    k.setAttribute("id", "mainPanel");
    document.body.appendChild(g);
    document.body.appendChild(h);
    document.body.appendChild(i);
    document.body.appendChild(j);
    document.body.appendChild(k);
    let p = component.find("#wrapContain");
    p.simulate("click");
    component.unmount();
  });
  it("didupdate and section Active other than dashboard", () => {
    let mockProps2 = {
      location: { pathname: "/application/buyTest" },
      match: { path: "/application" }
    };
    const component = mount(<Router><NavPanel {...mockProps2} /></Router>, {
      attachTo: document.body
    });
    console.log(component.debug());
    
    let instance = component.instance();
    expect(instance).toBeInstanceOf(Router);
    component.unmount();
  });
});
