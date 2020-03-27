import React, { ReactElement } from 'react'
import { Money } from '../BuyTest';
import './MyOrder.scss'
import CountrySelect from './countrySelect/CountrySelect'
interface Props {
    country: Function
    currencySymbol: string
    unitCost: number
    qty: number
    qtyChangeHandler: Function
    moneyObject: Money
    freeSlots: { open: boolean; qty: number; message: string };
    offerShown: string[];
    show: boolean;
    showMoreLess: Function
}

export default function MyOrder(props: Props): ReactElement {
    return (
        <div>
            <div className='myOrderWrapper'>
                <div className="myorder">My Order</div>
                <div>
                    {/* <ReactFlagsSelect
                        onSelect={props.country}
                        defaultCountry="IN"
                        searchable={true}
                        countries={["IN"]}
                    /> */}
                    <CountrySelect shownCountries={['IN']} onSelect={props.country} defaultCountry='IN' />
                </div>
            </div>
            <hr className='horizontalLineSolid'></hr>
            <div className="qtyMaster">
                <div className='descWrapper'>
                    <div className="qtylabel">Description</div>
                    <div className="qtyValue">Test Slots</div>
                    <span className='desc'>General Aptitude Test & Basic Programming Test</span>
                </div>
                <div className='qtyWrapper' >
                    <div className="qtylabel">
                        Unit Cost ({props.currencySymbol})
                    </div>
                    <div className="qtyValue">
                        <div>
                            {/* {this.state.unitCost} */}
                            {Math.floor(props.unitCost / 2)}
                        </div>
                        <span className='cutCost'>
                            199
                        </span>
                        {/* <span>
                      {Math.floor(this.state.unitCost/2)}
                      </span> */}
                    </div>
                </div>
                <div className='qtyWrapper'>
                    <div className="qtylabel">Quantity</div>
                    <div className="qtyValue">
                        <div className="buyPopup">
                            <article className="buyPointer"></article>
                            <article className="buyPointerDesc">
                                <p className="buySlotDesc">
                                    Enter the total number of tests based on your requirement.
                          </p>
                            </article>
                        </div>
                        <input
                            value={props.qty.toString()}
                            onChange={e => {
                                props.qtyChangeHandler(e);
                            }}
                            className="inputFieldQty"
                            type="text"
                            id='qtyInput'
                        />
                    </div>
                </div>
                <div className='qtyWrapper'>
                    <div className="qtylabel">
                        Sub Total ({props.currencySymbol})
                    </div>
                    <div className="qtyValue">{props.moneyObject.subTotal.toLocaleString('en-IN')}</div>
                </div>
            </div>
            {props.freeSlots.open ? (
                <div className="promptWrapper">
                    <div className="verticalLine0"></div>
                    <div>
                        <div className="promptHeader0">
                            You get {props.freeSlots.qty} free test slots
                      </div>
                        {/* <div className="promptSubText">
                          {this.state.freeSlots.lalach}
                        </div> */}
                    </div>
                </div>
            ) : (
                    <span></span>
                )}
            <hr className='horizontalLineDashed'></hr>
            <div className="discount">
                <div className="offers">
                    <div className="offerChild1">Offers</div>
                    <div className="offerChild2">
                        <ul className="offerList">
                            {props.offerShown.map((el, i) => {
                                return <li key={i}>{el}</li>;
                            })}
                        </ul>
                        <div className="lessMore">
                            {props.show ? (
                                <span
                                    id='more'
                                    onClick={() => {
                                        props.showMoreLess("more");
                                    }}
                                >
                                    Show More <i className="chevron-down"></i>
                                </span>
                            ) : (
                                    <span
                                        id='less'
                                        onClick={() => {
                                            props.showMoreLess("less");
                                        }}
                                    >
                                        Show Less <i className="chevron-up"></i>
                                    </span>
                                )}
                        </div>
                    </div>
                </div>
                {/* <div className="promoCode">
                      <div className="promoText">Have a Promo Code ?</div>
                      <div
                        style={{
                          marginTop: "4%",
                          border: "1px solid #e5e7ed",
                          borderRadius: "4px",
                          position: "relative"
                        }}
                      >
                        <input
                          placeholder="Enter Promo code"
                          className="inputPromo"
                          type="text"
                        />
                        <button className="applyBtn">Apply</button>
                      </div>
                    </div> */}
            </div>
            {/* <img className="razor" src={razorpay} alt="" /> */}
        </div>
    )
}
