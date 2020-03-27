import React from "react";
import { shallow } from "enzyme";
import Login from "../core/login/Login";
const setUp = () => {
  const component = shallow(<Login />);
  return component;
};
describe("Login component", () => {
  it("should render the page", () => {
    let component = setUp();
    let instance = component.instance();
    expect(instance).toBeInstanceOf(Login);
  });
  it("should set value in state onChnage email field", () => {
    let component = setUp();
    let p = component.find("#loginInput");
    p.simulate("change", {
      target: { name: "email", value: "hello@gmail.com" }
    });
    component.update();
    let instance = component.instance();
    expect(instance.state.formData.email.value).toBe("hello@gmail.com");
  });
  it("should set value in state onChnage email field and set validity false if its incorrect", () => {
    let component = setUp();
    let p = component.find("#loginInput");
    p.simulate("change", { target: { name: "email", value: "hell0" } });
    component.update();
    let instance = component.instance();
    expect(instance.state.formData.email.valid).toBeFalsy();
  });
  it("should display error message if email is invalid onBlur", () => {
    let component = setUp();
    let p = component.find("#loginInput");
    p.simulate("change", { target: { name: "email", value: "hell0" } });
    p.simulate("blur", { target: { name: "email" } });
    component.update();
    let instance = component.instance();
    expect(instance.state.formData.email.errorMessage).toBe(
      "Enter Valid Email"
    );
  });
  it("should set value in state onChnage password field", () => {
    let component = setUp();
    let p = component.find("#passwordInput");
    p.simulate("change", {
      target: { name: "password", value: "hello123" }
    });
    component.update();
    let instance = component.instance();
    expect(instance.state.formData.password.value).toBe("hello123");
  });
  it("should set value in state onChnage password field and set validity false if its incorrect", () => {
    let component = setUp();
    let p = component.find("#passwordInput");
    p.simulate("change", { target: { name: "password", value: "hell" } });
    component.update();
    let instance = component.instance();
    expect(instance.state.formData.password.valid).toBeFalsy();
  });
  it("should display error message if passwword is invalid onBlur", () => {
    let component = setUp();
    let p = component.find("#passwordInput");
    p.simulate("change", { target: { name: "password", value: "hell" } });
    p.simulate("blur", { target: { name: "password" } });
    component.update();
    let instance = component.instance();
    expect(instance.state.formData.password.errorMessage).toBe(
      "Enter Valid Password"
    );
  });
  it("should display error messages if submit is pressed and form in invalid", async () => {
    let component = setUp();
    let p = component.find("#login");
    await p.simulate("click", {});
    component.update();
    let instance = component.instance();
    expect(instance.state.formData.email.errorMessage).toBe(
      "Enter Valid Email"
    );
    expect(instance.state.formData.password.errorMessage).toBe(
      "Enter Valid Password"
    );
  });
  it("should toggle password type", () => {
    let component = setUp();
    let p = component.find("#togglePwd");
    p.simulate("click", {});
    component.update();
    let instance = component.instance();
    expect(instance.state.formData.password.type).toBeFalsy();
  });
  it("should make api call if form is valid", async () => {
    const historyMock = { push: jest.fn() };
    const component = shallow(<Login history={historyMock} />);
    let p = component.find("#passwordInput");
    p.simulate("change", { target: { name: "password", value: "hell0123" } });
    let q = component.find("#loginInput");
    q.simulate("change", {
      target: { name: "email", value: "nirmit@yahoo.com" }
    });
    let instance = component.instance();
    let r = component.find("#login");
    await r.simulate("click");
  });
});
