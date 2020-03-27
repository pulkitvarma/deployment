import React, { ReactElement, useEffect } from 'react'
import radio_checked from '../../../../assets/radio_checked.png';

interface Props {
    selectType: Function
}

export default function Gat(props: Props): ReactElement {

    return (
        <div>
            <div id='gat' onClick={() => { props.selectType('gat', 'update') }} className="test-type-title">
                <span className="radio-button">
                    <img id='gatImage' src={radio_checked} className="radio" alt="Radio Button" />
                </span>
                <p id='gatTitle' className="type-title">General Aptitude Test</p></div>
            <div className="test-type-description">
                <p className="type-description">
                    General Aptitude Test evaluates the candidate’s skills on a diverse range of topics, measuring logical thought-process, comprehension
and deduction abilities.
                    </p>
                <div className="type-facts">
                    <div className="type-facts-percent">
                        <span className="type-percent">
                            <p className="type-percent-title">Quantative Aptitude</p>
                            <p className="type-percent-score">30%</p>
                        </span>
                        <span className="type-percent">
                            <p className="type-percent-title">Data Interpretation and Reasoning</p>
                            <p className="type-percent-score">40%</p>
                        </span>
                        <span className="type-percent">
                            <p className="type-percent-title">Verbal Ability</p>
                            <p className="type-percent-score">30%</p>
                        </span>
                    </div>
                    <div className="type-facts-details">
                        <span className="facts-details">
                            <p className="facts-details-title">Test Duration</p>
                            <p className="facts-details-score">90 Min</p>
                        </span>
                        <span className="facts-details">
                            <p className="facts-details-title">Total Questions</p>
                            <p className="facts-details-score">90</p>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
