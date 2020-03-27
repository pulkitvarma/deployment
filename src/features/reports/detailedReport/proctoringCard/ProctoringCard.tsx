import React, { ReactElement } from 'react'
import './ProctoringCard.scss'
interface Props {
    openModal: Function
    imageSrcs: Array<string>
}

export default function ProctoringCard(props: Props): ReactElement {
    return (
        <React.Fragment>
            <div className="vertical-line"></div>
            <div className="child3child1">
                <div style={{ paddingBottom: "0px" }} className="headersFont">
                    <div>Proctoring</div>
                </div>
                <div className="reportHelperText">
                    Watch the images and video of the candidate during the course of
                    the test
              </div>
            </div>
            <div className="photos">
                <video
                    className="imgs"
                    autoPlay={false}
                    controls={true}
                >
                    <source
                        src="http://techslides.com/demos/sample-videos/small.mp4"
                        type="video/mp4"
                    />
                </video>
                {props.imageSrcs.map((el, index) => {
                    return (
                        <img
                            key={index}
                            src={el}
                            onClick={() => {
                                props.openModal();
                            }}
                            className="imgs"
                        />
                    );
                })}
            </div>
        </React.Fragment>
    )
}
