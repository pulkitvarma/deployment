import React, { ReactElement } from 'react';
import './Receipt.scss';
import logo from '../../assets/logoBlue.svg';
import printer from '../../assets/printer.svg';

interface Props {

}

export default function Receipt(props: Props): ReactElement {
    let printFunction = (area) => {
        window.print();
    }
    return (
        <React.Fragment>
            <div className="receipt-container" >
                <div className="Receipt-wrapper" id="receipt">
                    <div className="receipt-head">
                        <img src={logo} alt="company" />
                        <span className="receipt-head-text">
                            Invoice
                    </span>
                    </div>
                    <div className="receipt-company-details">
                        <article className="company-address">
                            <span className="article-name">MindScribble</span>
                            <p className="company-address shadeBlue">
                                1025 & 1030, Second Floor,
                                 1st Block Koramangala,
                                Bengaluru, Karnataka 560034
                            </p>
                            <p className="official-email">Support@mindscribble.com</p>
                        </article>
                        <article className="purchase-details">
                            <aside><label className="shadeBlue">Purchase Date: </label>11/21/2019, 12:00 AM</aside>
                            <aside><label className="shadeBlue">Order ID #</label> 21321434</aside>
                            <aside>   <label className="shadeBlue">GSTIN #</label> 37AAACI1681G2Z</aside>
                        </article>
                    </div>
                    <div className="receipt-billing-info">
                        <article className="billing-info">
                            <span className="title-small">Billing To</span>
                            <span className="article-name">Cisco Systems India Pvt Ltd</span>
                            <p className="company-address shadeBlue">
                                SEZ Unit, Cessna Business Park,
                               Kadubeesanahalli Village, Hobli, Sarjapur,
                                Varthur Rd, Marathahalli, Bengaluru, Karnataka 560103
                            </p>
                            <p className="official-email">cisco@support.com</p>
                        </article>
                        <article className="payment-info">
                            <span className="title-small">Payment info</span>
                            <aside>John Doe</aside>
                            <aside><label className="shadeBlue">Status :</label>Paid</aside>
                            <aside>MasterCard#####4312</aside>
                        </article>
                    </div>
                    <table className="receipt-table">
                        <tbody>
                            <tr>
                                <th>Description</th>
                                <th>Number</th>
                                <th>Unit Price(₹)</th>
                                <th>Amount</th>
                            </tr>
                            <tr>
                                <td className="padding-fix">Test Slots</td>
                                <td className="data-align">200</td>
                                <td className="data-align">150</td>
                                <td className="data-align">37500</td>
                            </tr>
                            <tr>
                                <td colSpan={3}>
                                    <div className="data-placement">
                                        <label className="table-titile">Discount (30%)</label>
                                        <label className="table-titile">Subtotal</label>
                                        <label className="table-titile">Tax (18%) </label>
                                    </div>
                                </td>
                                <td>
                                    <div className="data-placement">
                                        <label className="table-data">- 11250</label>
                                        <label className="table-data">26250</label>
                                        <label className="table-data">4725 </label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={3}>
                                    <div className="data-placement ">
                                        <label className="margin-fix table-data">Total (₹) </label>
                                    </div>
                                </td>
                                <td className="data-align">30975</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="receipt-terms">
                        <span className="footer-titile">Terms</span>
                        <ul>
                            <li className="terms-list">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mi nullam sit tellus fermentum in urna.</li>
                            <li className="terms-list">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mi nullam sit tellus fermentum in urna.</li>
                            <li className="terms-list">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mi nullam sit tellus fermentum in urna.</li>
                            <li className="terms-list">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mi nullam sit tellus fermentum in urna.</li>
                        </ul>
                    </div>
                </div>
                <div className="receipt-footer">
                    <div className="footer-buttons">
                        <button className="receipt-close">Close</button>
                        <button className="receipt-print" onClick={() => { printFunction('receipt') }}> <img src={printer} alt="print" /> Print</button>
                    </div>
                </div>
            </div>


        </React.Fragment >
    )
}
