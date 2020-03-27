import React, { ReactElement } from 'react'
import radio_unchecked from '../../../../assets/radio_unchecked.svg';
interface Props {
    selectType: Function
}

export default function Bpt(props: Props): ReactElement {
    return (
        <div>
            <div id='bpt' onClick={() => { props.selectType('bpt', 'update') }} className="test-type-title">
                <span>
                    <img id='bptImage' src={radio_unchecked} alt="Radio button unchecked" />
                </span>
                <p id='bptTitle' className="type-title">Basic Programming Test</p></div>
            <div className="test-type-description">
                <p className="type-description">
                    Basic Programming Test is designed to evaluate a candidate's programming aptitude, familiarity with coding principles and concept clarity.
                    </p>
                <div className="type-facts">
                    <div className="type-facts-percent">
                        <span className="type-percent">
                            <p className="type-percent-title">DS & Algorithms</p>
                            <p className="type-percent-score">60%</p>
                        </span>
                        <span className="type-percent">
                            <p className="type-percent-title">OOPs & Coding Principles</p>
                            <p className="type-percent-score">10%</p>
                        </span>
                        <span className="type-percent">
                            <p className="type-percent-title">DBMS & Languages</p>
                            <p className="type-percent-score">30%</p>
                        </span>
                    </div>
                    <div className="type-facts-details">
                        <span className="facts-details">
                            <p className="facts-details-title">Test Duration</p>
                            <p className="facts-details-score">60 Min</p>
                        </span>
                        <span className="facts-details">
                            <p className="facts-details-title">Total Questions</p>
                            <p className="facts-details-score">60</p>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
