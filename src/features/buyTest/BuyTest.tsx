import React from "react";
import "./BuyTest.scss";
import pm from "../../assets/pm.png";
import razorpay from "../../assets/razorpay.png";
import BillingInfo from "./billingInfo/BillingInfo";
import MyOrder from './myOrder/MyOrder'
import OrderSummary from "./orderSummary/OrderSummary";

export interface Money {
  totalCost: number;
  discount: { percent: number; value: number };
  subTotal: number;
  gst: number;
  masterTotal: number;
}
interface IState {
  offerShown: string[];
  offerHidden: string[];
  show: boolean;
  qty: number;
  moneyObject: Money;
  freeSlots: { open: boolean; qty: number; message: string };
  countryCode: string;
  currencySymbol: string;
  unitCost: number;
  billingInfoStatus: number;
}
interface IProps { }
class BuyTest extends React.Component<IProps, IState> {
  state: IState;
  ppq;
  ddq = 0;
  constructor(props: IProps) {
    super(props);
    this.ppq = React.createRef();
    this.state = {
      offerShown: ["Buy 10 or more test slots to get 10% slots extra"],
      offerHidden: [
        "Buy 500 or more test slots to get 20% slots extra",
        "Buy 1000 or more test slots to get 30% slots extra"
      ],
      show: true,
      qty: 1,
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
      countryCode: "IN",
      currencySymbol: "₹",
      unitCost: 199,
      billingInfoStatus: 0
    };

    this.country = this.country.bind(this);

  }
  componentDidMount(): void {
    document.addEventListener('click', this.clickEventListener);
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.clickEventListener)
  }

  clickEventListener() {
    const p = document.getElementsByClassName('buyPopup')[0] as HTMLElement;
    p.style.display = 'none';
  }
  componentDidUpdate() {
    this.changeButtonColor()
  }
  changeButtonColor(val?: number) {
    if (val === 0 || val === 1) {
      this.ddq = val
    }
    let q = document.getElementById('chkOutBtn') as HTMLButtonElement
    if (this.state.qty <= 0 || this.ddq === 0) {
      q.style.background = '#EDAE5D'
    } else {
      q.style.background = 'radial-gradient(49.96% 50.8% at 49.96% 49.86%,#ff8800 0%,#f08800 100%)'
    }
  }
  billingInfoValid(val: number) {
    this.changeButtonColor(val)
  }
  showMoreLess = (text: string): void => {
    if (text === "more") {
      this.setState({
        offerShown: this.state.offerShown.concat(this.state.offerHidden),
        show: false
      });
    } else {
      this.setState({
        offerShown: this.state.offerShown.slice(0, 1),
        show: true
      });
    }
  };
  qtyChangeHandler(e): void {
    const re = /^([1-9][0-9]{0,4})$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      this.calculateAndSetVAlues(e)
    }
  }
  calculateAndSetVAlues(e) {
    let moneyObj: Money;
    let freeSlots: number;
    if (+e.target.value >= 10 && +e.target.value <= 499) {
      moneyObj = this.generateValues(50.25125628140704, +e.target.value);
      freeSlots = this.freeSlotsCalc(+e.target.value, 10);
    } else if (+e.target.value >= 500 && +e.target.value <= 999) {
      moneyObj = this.generateValues(50.25125628140704, +e.target.value);
      freeSlots = this.freeSlotsCalc(+e.target.value, 20);
    } else if (+e.target.value >= 1000) {
      moneyObj = this.generateValues(50.25125628140704, +e.target.value);
      freeSlots = this.freeSlotsCalc(+e.target.value, 30);
    } else {
      moneyObj = this.generateValues(50.25125628140704, +e.target.value);
      freeSlots = this.freeSlotsCalc(+e.target.value, 0);
    }
    this.setState({
      moneyObject: moneyObj,
      qty: e.target.value,
      freeSlots: {
        open: freeSlots > 0 ? true : false,
        qty: freeSlots,
        message: "Add 9 more to get total 1 free slot"
      }
    });
  }

  generateValues = (discount: number, value: number): Money => {
    let tc = this.state.unitCost * value;
    let dis = { percent: discount, value: Math.round((tc * discount) / 100) };
    let sT = tc - dis.value;
    let gst = sT * 0.18;
    let mt = sT + gst;
    return {
      totalCost: tc,
      discount: { percent: Math.floor(dis.percent), value: dis.value },
      subTotal: +sT.toFixed(2),
      gst: +gst.toFixed(2),
      masterTotal: +mt.toFixed(2)
    };
  };

  freeSlotsCalc = (value: number, slab: number): number => {
    return Math.floor(value * (slab / 100));
  };

  country(countryCode): void {
    // if (countryCode === "ID") {
    //   this.setCountryAndUnitCost(38709.59, "ID", "Rp")
    // } else {
    //   this.setCountryAndUnitCost(199, "IN", "₹")
    // }
  }

  // setCountryAndUnitCost(unitCost: number, countryCode: string, currencySymbol: string) {
  //   this.setState(
  //     { unitCost: unitCost, countryCode: countryCode, currencySymbol: currencySymbol },
  //     () => {
  //       let paisa1 = this.generateValues(50.25125628140704, this.state.qty);
  //       this.setState({ moneyObject: paisa1 });
  //     }
  //   );
  // }

  async submit() {
    let z = await this.ppq.current.validate();
    if (this.state.qty > 0 && z.valid === 1) {

    }
  }

  public render() {
    return (
      <React.Fragment>
        <div className="buy-test-wrapper pos-rel">
          <div className="masterWrapperBT">
            <div className="vertical-line"></div>
            <div className="btChild1">
              <div className="btc1subChild1">
                <div className="btc1s1Child1">Buy Test Slots</div>
                <div className="btc1s1Child2">
                  Purchase as many tests as needed, even if it's just 1.
                </div>
              </div>
              <div className="btc1subChild2">
                <div className="btc1s2Child1">Tests Slots Remaining</div>
                <div className="btc1s2Child2">00</div>
              </div>
            </div>
            <div className="btChild2">
              <div className="vertical-line line-bold"></div>
              <div className='childWrapper'>
                <div className="btChild2Col1">
                  <MyOrder
                    country={this.country}
                    currencySymbol={this.state.currencySymbol}
                    unitCost={this.state.unitCost}
                    qty={this.state.qty}
                    qtyChangeHandler={(e) => this.qtyChangeHandler(e)}
                    moneyObject={this.state.moneyObject}
                    freeSlots={this.state.freeSlots}
                    show={this.state.show}
                    offerShown={this.state.offerShown}
                    showMoreLess={this.showMoreLess} />
                </div>
                <BillingInfo
                  ref={this.ppq}
                  buttonStatus={val => this.billingInfoValid(val)}
                />
              </div>
              <div className='helo'>
                <OrderSummary
                  qty={this.state.qty}
                  freeSlots={this.state.freeSlots}
                  currencySymbol={this.state.currencySymbol}
                  moneyObject={this.state.moneyObject}
                  submit={() => this.submit()}
                />
              </div>
            </div>
            <div>
              <hr className='horizontalLinePG' />
            </div>
            <div className="downImgs">
              <div>
                <img src={razorpay} alt="" />
              </div>
              <div className="pm">
                <img src={pm} alt="" />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment >
    );
  }
}

export default BuyTest;
