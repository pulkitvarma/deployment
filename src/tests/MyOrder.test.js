import React from "react";
import { mount, shallow } from "enzyme";
import MyOrder from "../features/buyTest/myOrder/MyOrder";
let props = {
  country: jest.fn(),
  currencySymbol: "₹",
  unitCost: 199,
  qty: 1,
  qtyChangeHandler: jest.fn(),
  moneyObject: {
    totalCost: 199,
    discount: { percent: 50.25125628140704, value: 100 },
    subTotal: 99,
    gst: 17.82,
    masterTotal: 116.82
  },
  freeSlots: {
    open: false,
    qty: 0,
    message: "Add 9 more to get total 1 free slot"
  },
  offerShown: ["Buy 10 or more test slots to get 10% slots extra"],
  show: true,
  showMoreLess: jest.fn()
};
let props2 = {
    country: jest.fn(),
    currencySymbol: "₹",
    unitCost: 199,
    qty: 1,
    qtyChangeHandler: jest.fn(),
    moneyObject: {
      totalCost: 199,
      discount: { percent: 50.25125628140704, value: 100 },
      subTotal: 99,
      gst: 17.82,
      masterTotal: 116.82
    },
    freeSlots: {
      open: false,
      qty: 0,
      message: "Add 9 more to get total 1 free slot"
    },
    offerShown: ["Buy 10 or more test slots to get 10% slots extra"],
    show: false,
    showMoreLess: jest.fn()
  };
// const setUp = () => {
//   const component = mount(<MyOrder {...props} />);
//   return component;
// };
describe("BuyTest Compoenent,", () => {
  it("should call showMoreLess function of parent component", () => {
    const component = mount(<MyOrder {...props} />);
    component.find("#more").simulate("click");
    expect(props.showMoreLess.mock.calls[0]).toEqual(["more"]);
  });
  it("should call showMoreLess function of parent component", () => {
    const component = mount(<MyOrder {...props2} />);
    component.find("#less").simulate("click");
    expect(props2.showMoreLess.mock.calls[0]).toEqual(["less"]);
  });
});
