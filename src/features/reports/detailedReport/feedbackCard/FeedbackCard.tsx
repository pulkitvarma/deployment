import React, { ReactElement } from 'react'
import './FeedbackCard.scss'
interface Props {

}

export default function FeedBackCard(props: Props): ReactElement {
    return (
        <div>
            <div className="vertical-line"></div>
            <div className="child3child1">
                <div className="headersFont">Overall Feedback</div>
            </div>
            <div className="feedBackWrapper">
                <div>
                    The candidate has a good problem solving skills and reasoning.
                    Candidate also has an acceptable grip over verbal ability. We
                    recommend this candidate for profiles involving programming,
                    decision making, etc
                </div>
                <div className='secondPara'>
                    Above all, the candidate has demonstrated high level of
                    integrity and honesty while taking the test and is highly
                    recommended.
                </div>
            </div>
        </div>
    )
}
