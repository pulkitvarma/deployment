import React from 'react';
import './CircularProgressBar.css';

const CircularProgressBar = (props: any) => {

    const colorStyle = {
        backgroundColor: props.backgroundColor ? props.backgroundColor : '#A6C44D'
    }

    const textStyle = {
        color: props.textColor ? props.textColor : '#3C5185'
    }

    return (
        <React.Fragment>
            <div className="circular">
                <div className="ko-progress-circle" data-progress={props.progress}>
                    <div className="ko-circle">
                        <div id="rotate1" className="full ko-progress-circle__slice">
                            <div id="rotate2" style={colorStyle} className="ko-progress-circle__fill"></div>
                        </div>
                        <div className="ko-progress-circle__slice">
                            <div id="rotate3" style={colorStyle} className="ko-progress-circle__fill"></div>
                            <div id="rotate4" style={colorStyle} className="ko-progress-circle__fill ko-progress-circle__bar"></div>
                        </div>
                    </div>
                    <div className="ko-progress-circle__overlay"></div>
                </div>
                <p className="data-progress" style={textStyle}>{props.progress}%</p>
            </div>
        </React.Fragment>
    )

}

export default CircularProgressBar;