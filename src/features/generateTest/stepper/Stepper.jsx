import React from 'react';
import PropTypes from 'prop-types';
import './Stepper.scss';

export default class Stepper extends React.Component {

    render() {
        const { steps, showNumber, activeStep, onSelect } = this.props;
        const lastIndexOfSteps = steps.length - 1;
        return (
            <React.Fragment>
                <div className="stepper-container">
                    {steps.map((step, index) => {
                        return (
                            <React.Fragment key={index}>
                                <div className="stepper-item">
                                    <div id={index} className={`stepper-item-outer ${activeStep === (index + 1) ? 'stepper-item-outer-active' : null}`} onClick={onSelect.bind(null, index + 1)}>
                                        <div className={`stepper-item-inner ${activeStep === (index + 1) ? 'stepper-item-inner-active' : (index + 1) < activeStep ? 'stepper-item-inner-completed' : 'stepper-item-inner-future'}`}>  {showNumber && index + 1} {index + 1}.&nbsp; {step.title} </div>
                                    </div>
                                </div>
                                {lastIndexOfSteps === index ? '' : <div className={`stepper-item-outer ${index + 1}`}> </div>}
                            </React.Fragment>
                        )
                    })}
                </div>
            </React.Fragment>
        )
    }
}

Stepper.defaultProps = {
    steps: [{ title: 'Step 1' }, { title: 'Step 2' }, { title: 'Step 3' }, { title: 'Step 4' }],
    showNumber: false,
    activeStep: 2,
    onSelect: (step) => { }
}

Stepper.propTypes = {
    steps: PropTypes.arrayOf(PropTypes.shape({ title: PropTypes.string })),
    showNumber: PropTypes.bool,
    activeStep: PropTypes.number,
    onSelect: PropTypes.func
}