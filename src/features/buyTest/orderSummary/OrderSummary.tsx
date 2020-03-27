import React, { ReactElement } from 'react'
import secure from '../../../assets/secure.svg';
import { Money } from '../BuyTest';
import './OrderSummary.scss'
interface Props {
    qty: number
    freeSlots: { open: boolean; qty: number; message: string }
    currencySymbol: string
    moneyObject: Money
    submit: Function
}

export default function OrderSummary(props: Props): ReactElement {
    return (
        <div>
            <div className="btChild2Col2">
                <div className="vertical-line"></div>
                <div className="summary1">Order Summary</div>
                <div className="slots">
                    <div className="ordersHeading">Test Slots
                  <div className="numbers">
                            {props.qty}&nbsp;&nbsp;&nbsp;+&nbsp;&nbsp;&nbsp;
                      {props.freeSlots.qty}&nbsp;
                      <span className="free">(Free)</span>
                        </div>
                    </div>
                    <div>
                        <div className="ordersHeading">
                            Quantity
                        </div>
                        <div className="numbers">
                            &nbsp;&nbsp;{+props.qty + +props.freeSlots.qty}
                        </div>
                    </div>
                </div>
                <div className="quantitativeData">
                    <div className="summary2">
                        <span className="tcLabel">
                            Order Total ({props.currencySymbol})
                    </span>
                        <span className="tcValue">
                            {props.moneyObject.totalCost.toLocaleString('en-IN')}
                        </span>
                    </div>
                    <div className="summary">
                        <span className="itemLabel">
                            You Saved ({props.currencySymbol})
                    </span>
                        <span className="itemValue">
                            {props.moneyObject.discount.value.toLocaleString('en-IN')}
                        </span>
                    </div>
                    {/* <div className="summary"> */}
                    {/* <span className="itemLabel"> */}
                    {/* Discount <span style={{ color: '#666F94' }}> */}
                    {/* ({Math.floor(this.state.paisa.discount.percent)}%) */}
                    {/* 0% */}
                    {/* </span> */}
                    {/* </span> */}
                    {/* <span style={{ color: '#3C5185' }} className="itemValue"> */}
                    {/* - {this.state.paisa.discount.value} */}
                    {/* </span> */}
                    {/* </div> */}
                    <div className="summary">
                        <span className="itemLabel">
                            Sub total ({props.currencySymbol})
                    </span>
                        <span className="itemValue">
                            {props.moneyObject.subTotal.toLocaleString('en-IN')}
                        </span>
                    </div>
                    <div className="summary">
                        <span className="itemLabel">GST (18%)</span>
                        <span className="itemValue">{props.moneyObject.gst.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="summary">
                        <input
                            className="textInputBT"
                            placeholder="Enter GST ID"
                            type="text"
                        />
                    </div>
                    <hr className='horizontalSmall'></hr>
                    <div className="summary">
                        <span className="itemValue">
                            You Pay ({props.currencySymbol})
                    </span>
                        <span className="itemValue">
                            {props.moneyObject.masterTotal.toLocaleString('en-IN')}
                        </span>
                    </div>
                    <hr className='horizontalSmall'></hr>
                    <span className='checkOutButtonWrapper'>
                        <button id='chkOutBtn' onClick={() => { props.submit() }} className="chkoutbtn">Checkout</button>
                    </span>
                </div>

            </div>
            <div className='secure'>
                <img src={secure} alt="" />
            </div>
        </div>
    )
}
