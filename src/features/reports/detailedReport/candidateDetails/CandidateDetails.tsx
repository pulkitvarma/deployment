import React, { ReactElement } from 'react'
import GaugeChart from "react-gauge-chart";
import './CandidateDetails.scss'
interface Props {
    percent: number
}

export default function CandidateDetails(props: Props): ReactElement {
    const chartStyle = {
        height: "250",
        width: "80%"
    };
    return (
        <React.Fragment>
            <div className="details ">
                <div className="vertical-line"></div>
                <div className="headersFont paddings detailsHeader">
                    Test Details
                </div>
                <div className="firstSet">
                    <div className='detailedReportEmailWrapper'>
                        <div className="subLabel">Email</div>
                        <div className="headersFont">example@gmail.com</div>
                    </div>
                    <div className='detailedReportTestTypeWrapper'>
                        <div className="subLabel">Test Type</div>
                        <div className="headersFont">general aptitude test</div>
                    </div>
                    {/* <div style={{ paddingLeft: "25px" }}>
                    <div className="subLabel">Difficulty Level</div>
                    <div className="headersFont">Medium</div>
                  </div> */}
                </div>
                <div className="secondSet">
                    <div className='testDateWrapper'>
                        <div className="subLabel">Test Date</div>
                        <div className="headersFont">16 Nov 2019</div>
                    </div>
                    <div className='testInfoWrapper'>
                        <div className="subLabel">Start Time</div>
                        <div className="headersFont">09:30 AM</div>
                    </div>
                    <div className='testInfoWrapper'>
                        <div className="subLabel">End Time</div>
                        <div className="headersFont">11:00 AM</div>
                    </div>
                    <div className='testInfoWrapper' >
                        <div className="subLabel">Test Duration</div>
                        <div className="headersFont">90 Min</div>
                    </div>
                    <div style={{ paddingLeft: "25px" }}>
                        <div className="subLabel">Availed time</div>
                        <div className="headersFont">69 Min</div>
                    </div>
                </div>
            </div>
            <div className="GatScore">
                <div className="vertical-line"></div>
                <div className="headersFont paddings gatScoreHeader">
                    GAT Score
                </div>
                <div className="report-status">
                    <p>Excellent {props.percent * 100}%</p>
                </div>
                <div className="chart">
                    <GaugeChart
                        id="gauge-chart2"
                        style={chartStyle}
                        nrOfLevels={5}
                        percent={props.percent}
                        hideText={true}
                        textColor={"red"}
                        arcWidth={0.1}
                        cornerRadius={2}
                        arcPadding={0.01}
                        needleColor={"#CCCFDB"}
                        needleBaseColor={"#CCCFDB"}
                        animate={false}
                        className="ppz"
                        colors={[
                            "#F37529",
                            "#F0B400",
                            "#D7AF0D",
                            "#A8A426",
                            "#559352"
                        ]}
                    />
                </div>
            </div>
        </React.Fragment>
    )
}
