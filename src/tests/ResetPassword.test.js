import React from "react";
import { shallow } from "enzyme";
import ResetPassword from "../core/resetPassword/ResetPassword";
const locationMock = {
  search: "?reset_id=fewfhewifehw"
};
const historyMock = { push: jest.fn() };
const setUp = () => {
  const component = shallow(<ResetPassword location={locationMock} />);
  return component;
};
describe("reset ped component", () => {
  it("should render the page", () => {
    let component = setUp();
    let instance = component.instance();
    expect(instance).toBeInstanceOf(ResetPassword);
    expect(instance.state.masterVisib).toBeTruthy();
  });
  it("should set value in state onChnage password field", () => {
    let component = setUp();
    let p = component.find("#pwdInputRp");
    p.simulate("change", {
      target: { name: "password", value: "hello123" }
    });
    component.update();
    let instance = component.instance();
    expect(instance.state.passwordRp.value).toBe("hello123");
  });
  it("should set value in state onChnage password field and set validity false if its incorrect", () => {
    let component = setUp();
    let p = component.find("#pwdInputRp");
    p.simulate("change", { target: { name: "password", value: "hell" } });
    component.update();
    let instance = component.instance();
    expect(instance.state.passwordRp.valid).toBeFalsy();
  });
  it("should display error message if passwword is invalid onBlur", () => {
    let component = setUp();
    let p = component.find("#pwdInputRp");
    p.simulate("change", { target: { name: "password", value: "hell" } });
    p.simulate("blur", { target: { name: "password" } });
    component.update();
    let instance = component.instance();
    expect(instance.state.passwordRp.errorMessage).toBe("Minimum 6 characters");
  });
  it("should display error messages if submit is pressed and form in invalid", async () => {
    let component = setUp();
    let p = component.find("#submitRp");
    await p.simulate("click", {});
    component.update();
    let instance = component.instance();
    expect(instance.state.passwordRp.errorMessage).toBe("Minimum 6 characters");
  });
  it("should make api call if form is valid", () => {
    let component = setUp();
    let p = component.find("#pwdInputRp");
    p.simulate("change", { target: { name: "password", value: "hell0123" } });
    let r = component.find("#submitRp");
    r.simulate("click");
    let instance = component.instance();
    expect(instance.state.visib).toBeFalsy();
  });
  it("should toggle password type", () => {
    let component = setUp();
    let p = component.find("#togglePwd");
    p.simulate("click", {});
    component.update();
    let instance = component.instance();
    expect(instance.state.passwordRp.type).toBeFalsy();
  });
  it("should take back to login page if route param are not there", () => {
    const locationMock2 = {
      search: "?reset_id="
    };
    const component = shallow(
      <ResetPassword history={historyMock} location={locationMock2} />
    );
    expect(historyMock.push.mock.calls[0]).toEqual(["/"]);
  });
  it("should take back to login page if cancel is clicked", () => {
    const component = shallow(
      <ResetPassword history={historyMock} location={locationMock} />
    );
    let r = component.find("#cancel");
    r.simulate("click");
    expect(historyMock.push.mock.calls[0]).toEqual(["/"]);
  });
  it("should take to login page if continue is clicked", () => {
    const component = shallow(
      <ResetPassword history={historyMock} location={locationMock} />
    );
    let instance=component.instance();
    instance.setState({visib:false})
    component.update();
    let r = component.find("#cont");
    r.simulate("click");
    expect(historyMock.push.mock.calls[0]).toEqual(["/"]);
  });
});
