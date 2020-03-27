import React from "react";
import { shallow } from "enzyme";
import ForgotPassword from "../core/forgotPassword/ForgotPassword";

const setUp = () => {
  const component = shallow(<ForgotPassword />);
  return component;
};

describe("Forgot Password Component", () => {
  it("should render the page", () => {
    let component = setUp();
    let instance = component.instance();
    expect(instance).toBeInstanceOf(ForgotPassword);
  });
  it("should set value in state onChnage emailfp field", () => {
    let component = setUp();
    let p = component.find("#emailfpInput");
    p.simulate("change", {
      target: { name: "email", value: "hello@gmail.com" }
    });
    component.update();
    let instance = component.instance();
    expect(instance.state.emailfp.value).toBe("hello@gmail.com");
  });
  it("should set value in state onChnage emailfp field and set validity false if its incorrect", () => {
    let component = setUp();
    let p = component.find("#emailfpInput");
    p.simulate("change", { target: { name: "email", value: "hell0" } });
    component.update();
    let instance = component.instance();
    expect(instance.state.emailfp.valid).toBeFalsy();
  });
  it("should display error message if emailfp is invalid onBlur", () => {
    let component = setUp();
    let p = component.find("#emailfpInput");
    p.simulate("change", { target: { name: "email", value: "hell0" } });
    p.simulate("blur", { target: { name: "email" } });
    component.update();
    let instance = component.instance();
    expect(instance.state.emailfp.errorMessage).toBe("Enter Valid Email");
  });
  it("should display error messages if submit is pressed and form in invalid", async () => {
    let component = setUp();
    let p = component.find("#forgotPwd");
    await p.simulate("click", {});
    component.update();
    let instance = component.instance();
    expect(instance.state.emailfp.errorMessage).toBe("Enter Valid Email");
  });
  it("should make api call if form is valid and shpe confirm message", async () => {
    // const historyMock = { push: jest.fn() };
    const component = shallow(<ForgotPassword />);
    let p = component.find("#emailfpInput");
    p.simulate("change", {
      target: { name: "email", value: "nirmit@yahoo.com" }
    });
    let r = component.find("#forgotPwd");
    await r.simulate("click");
    component.update();
    let instance = component.instance();
    expect(instance.state.visib).toBeFalsy();
  });
});
