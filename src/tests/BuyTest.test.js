import React from "react";
import { mount, shallow } from "enzyme";
import BuyTest from "../features/buyTest/BuyTest";
import ReactDOM from "react-dom";
const setUp = () => {
  const component = mount(<BuyTest />, { attachTo: document.body });
  return component;
};
describe("BuyTest Compoenent,", () => {
  let component = setUp();
  let instance = component.instance();
  it("should render the page", () => {
    expect(instance).toBeInstanceOf(BuyTest);
  });
  it("show more function should add offers to the list offers when more is passed", () => {
    const div = document.createElement("div");
    ReactDOM.render(<BuyTest />, div);
    instance.showMoreLess("more");
    expect(instance.state.offerShown).toStrictEqual([
      "Buy 10 or more test slots to get 10% slots extra",
      "Buy 500 or more test slots to get 20% slots extra",
      "Buy 1000 or more test slots to get 30% slots extra"
    ]);
    expect(instance.state.show).toBeFalsy();
  });
  it("show more function should delete offers to the list offers when less is passed", () => {
    instance.showMoreLess("less");
    expect(instance.state.offerShown).toStrictEqual([
      "Buy 10 or more test slots to get 10% slots extra"
    ]);
    expect(instance.state.show).toBeTruthy();
  });
  it("qtyChangeHandler function value range >=1000", () => {
    const div = document.createElement("div");
    const component = mount(<BuyTest />);
    component.find("#qtyInput").simulate("change", { target: { value: 1300 } });
    component.update();
    let instance = component.instance();
    let mockState = {
      moneyObject: {
        totalCost: 258700,
        discount: { percent: 50, value: 130000 },
        subTotal: 128700,
        gst: 23166,
        masterTotal: 151866
      },
      qty: 1300,
      freeSlots: {
        open: true,
        qty: 390,
        message: "Add 9 more to get total 1 free slot"
      }
    };
    expect(instance.state.moneyObject).toStrictEqual(mockState.moneyObject);
    expect(instance.state.freeSlots).toStrictEqual(mockState.freeSlots);
    expect(instance.state.qty).toStrictEqual(mockState.qty);
  });
  it("qtyChangeHandler function value range >=10 <=499", () => {
    const div = document.createElement("div");
    const component = mount(<BuyTest />);
    component.find("#qtyInput").simulate("change", { target: { value: 123 } });
    component.update();
    let instance = component.instance();
    let mockState = {
      moneyObject: {
        totalCost: 24477,
        discount: { percent: 50, value: 12300 },
        subTotal: 12177,
        gst: 2191.86,
        masterTotal: 14368.86
      },
      qty: 123,
      freeSlots: {
        open: true,
        qty: 12,
        message: "Add 9 more to get total 1 free slot"
      }
    };
    expect(instance.state.moneyObject).toStrictEqual(mockState.moneyObject);
    expect(instance.state.freeSlots).toStrictEqual(mockState.freeSlots);
    expect(instance.state.qty).toStrictEqual(mockState.qty);
  });
  it("qtyChangeHandler function value range >=500 <=999", () => {
    const div = document.createElement("div");
    const component = mount(<BuyTest />);
    component.find("#qtyInput").simulate("change", { target: { value: 510 } });
    component.update();
    let instance = component.instance();
    let mockState = {
      moneyObject: {
        totalCost: 101490,
        discount: { percent: 50, value: 51000 },
        subTotal: 50490,
        gst: 9088.2,
        masterTotal: 59578.2
      },
      qty: 510,
      freeSlots: {
        open: true,
        qty: 102,
        message: "Add 9 more to get total 1 free slot"
      }
    };
    expect(instance.state.moneyObject).toStrictEqual(mockState.moneyObject);
    expect(instance.state.freeSlots).toStrictEqual(mockState.freeSlots);
    expect(instance.state.qty).toStrictEqual(mockState.qty);
  });
  it("qtyChangeHandler function value range <10", () => {
    const div = document.createElement("div");
    const component = mount(<BuyTest />);
    component.find("#qtyInput").simulate("change", { target: { value: 7 } });
    component.update();
    let instance = component.instance();
    let mockState = {
      moneyObject: {
        totalCost: 1393,
        discount: { percent: 50, value: 700 },
        subTotal: 693,
        gst: 124.74,
        masterTotal: 817.74
      },
      qty: 7,
      freeSlots: {
        open: false,
        qty: 0,
        message: "Add 9 more to get total 1 free slot"
      }
    };
    expect(instance.state.moneyObject).toStrictEqual(mockState.moneyObject);
    expect(instance.state.freeSlots).toStrictEqual(mockState.freeSlots);
    expect(instance.state.qty).toStrictEqual(mockState.qty);
  });
  it("should make api call when all the fileds are valid", async () => {
    const div = document.createElement("div");
    const component = mount(<BuyTest />);
    await component
      .find("#fNameInput")
      .simulate("change", { target: { value: "nirmit", name: "fullName" } });
    component.find("#add1Input").simulate("change", {
      target: { value: "hello123344", name: "addressLine1" }
    });
    await component
      .find("#zipInput")
      .simulate("change", { target: { value: "123456", name: "zipCode" } });
    await component.find("#stateInput").simulate("change", {
      target: { value: "Karnataka", name: "countryState" }
    });
    await component
      .find("#cityInput")
      .simulate("change", { target: { value: "hello123", name: "city" } });
    await component
      .find("#countryInput")
      .simulate("change", { target: { value: "India", name: "country" } });
    await component.find("#chkOutBtn").simulate("click", {});
    component.update();
  });
});
