import React from "react";
import { mount, shallow } from "enzyme";
import BillingInfo from "../features/buyTest/billingInfo/BillingInfo";
import ReactDOM from "react-dom";
let props = {
  ref: jest.fn(),
  buttonStatus: jest.fn()
};
const setUp = () => {
  const component = mount(<BillingInfo {...props} />);
  return component;
};
describe("BuyTest Compoenent,", () => {
  it("should render the page", () => {
    let component = setUp();
    let instance = component.instance();
    expect(instance).toBeInstanceOf(BillingInfo);
  });
  it("should display proper error messages when form is invalid", () => {
    let component = setUp();
    component
      .find("#fNameInput")
      .simulate("change", { target: { value: "nir", name: "fullName" } });
    component.find("#add1Input").simulate("change", {
      target: { value: "hell", name: "addressLine1" }
    });
    component.find("#add2Input").simulate("change", {
      target: { value: "hello123344", name: "addressLine2" }
    });
    component
      .find("#zipInput")
      .simulate("change", { target: { value: "1ss23456", name: "zipCode" } });
    component.find("#stateInput").simulate("change", {
      target: { value: "", name: "countryState" }
    });
    component
      .find("#cityInput")
      .simulate("change", { target: { value: "", name: "city" } });

    component
      .find("#fNameInput")
      .simulate("blur", { target: { name: "fullName" } });
    component.find("#add1Input").simulate("blur", {
      target: { name: "addressLine1" }
    });
    component
      .find("#zipInput")
      .simulate("blur", { target: { name: "zipCode" } });
    component.find("#stateInput").simulate("blur", {
      target: { name: "countryState" }
    });
    component.find("#cityInput").simulate("blur", { target: { name: "city" } });
    component.update();
    let instance = component.instance();
    let mockErrorObj = {
      fullName: "Minimum 5 characters",
      addressLine1: "Minimum 5 characters",
      zipCode: "Enter Valid Zip Code",
      countryState: "This Field is required",
      city: "This Field is required"
    };
    expect(instance.state.enteredInfoErrors).toStrictEqual(mockErrorObj);
  });
});
