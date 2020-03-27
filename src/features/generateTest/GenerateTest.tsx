import * as actionTypes from './redux/types'
import './GenerateTest.scss';
import AssignEmails from "./assignEmails/AssignEmails";
import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import Stepper from "./stepper/Stepper";
import TestDetails from "./testDetails/TestDetails";
import TestSummary from "./testSummary/TestSummary";
import TestType from "./testType/TestType";

interface IProps {
  history: { push: Function },
  match: {
    path: string
  }
  location: {},
  invalid: Array<string>,
  valid: Array<string>,
  buttontext: string,
  error: boolean,
  setRedundantEmails: Function
}

interface RedundantEmailsData {
  open: boolean,
  emails: Array<string>
}

interface GenerateTestState {
  generateTest: {
    invalidEmails: Array<string>,
    validEmails: Array<string>,
    rawEmails: {
      buttonText: string
    },
    generateError: boolean
  }
}

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <TestType />
    case 1:
      return <TestDetails />
    case 2:
      return <AssignEmails></AssignEmails>
    case 3:
      return <TestSummary></TestSummary>;
    default:
      return "Unknown step";
  }
}

function GenerateTest(props: IProps) {

  const steps = [{ title: 'Test Type' }, { title: 'Test Schedule' }, { title: 'Test Takers' }, { title: 'Test Summary' }];
  const [state, setState] = useState({
    activeStep: 1,
    completed: 0,
    disabled: false
  });

  if (state.activeStep === 3 && !state.disabled && (props.valid.length === 0 || props.invalid.length !== 0)) {
    setState({
      ...state,
      disabled: true
    })
  }

  if (state.disabled && state.activeStep === 3 && props.invalid.length === 0 && props.valid.length !== 0) {
    setState({
      ...state,
      disabled: false
    })
  }

  if (props.error && state.activeStep === 2 && !state.disabled) {
    setState({
      ...state,
      disabled: true
    })
  }

  else if (!props.error && state.activeStep === 2 && state.disabled) {
    setState({
      ...state,
      disabled: false
    })
  }

  const handleOnClickStepper = (step) => {
    setState({
      ...state,
      activeStep: step,
      disabled: false
    });
    if (step === 3) {
      setState({
        ...state,
        activeStep: step,
        disabled: true
      })
    }
  }

  const handleOnNextClick = () => {
    let nextStep = state.activeStep + 1;
    if (nextStep === 4) {
      setState({
        ...state,
        activeStep: nextStep,
        completed: 4,
      })
    }
    else if (state.activeStep <= state.completed) {
      setState({
        ...state,
        activeStep: nextStep,
      })
    }
    else {
      if (nextStep !== 3) {
        setState({
          ...state,
          activeStep: nextStep,
          completed: nextStep - 1,
        })
      }
      else {
        setState({
          ...state,
          activeStep: nextStep,
          completed: nextStep - 1,
          disabled: true
        })
      }
    }
  }

  const handleFinish = () => {
    props.setRedundantEmails({ open: true, emails: ['nirmit@dewd.com', 'alok@dewd.com', 'arpita@dewd.com', 'pulkit@dewd.com', 'anand@dewd.com', 'hari@dewd.com', 'girish@dewd.com'] })
  }

  const handleOnClickBack = () => {
    let prevStep = state.activeStep - 1;
    if (prevStep !== 3) {
      setState({
        ...state,
        activeStep: prevStep,
        disabled: false
      })
    }
    else {
      setState({
        ...state,
        activeStep: prevStep,
      })
    }
  }

  useEffect(() => {
    document.getElementsByClassName('stepper-item-inner-active')[0].parentElement.classList.add('sizeparent');
    document.getElementsByClassName('stepper-item-inner-active')[0].parentElement.classList.add('sizeparent');
    document.getElementsByClassName('stepper-item-inner-active')[0].parentElement.style.pointerEvents = 'auto';
    for (let i = 1; i < state.activeStep; i++) {
      document.getElementsByClassName(`${i}`)[0].classList.add('completed');
    }
    for (let j = 0; j < state.completed; j++) {
      document.getElementsByClassName('stepper-item-inner')[j].classList.add('step-completed');
      document.getElementsByClassName('step-completed')[0].parentElement.style.pointerEvents = 'auto';
    }
  })
  useEffect(() => {
    let p = document.getElementById('mainContainer')
    if (p) {
      p.scrollTop = 0;
    }
  }, [state.activeStep]);

  return (
    <div className="generate">
      <div className="generate-description">
        <div className="vertical-line"></div>
        <div className="generate-body">
          <div className="generate-title">
            Send Tests
      </div>
          <div className="generate-subtitle">
            Send tests in 4 simple steps
      </div>
          <div className="generate-footer">
            <div className="score-head">
              <label className="score-heading">Available Test Slots</label>
              <label className="score">250</label>
            </div>
            <div onClick={() => { props.history.push('/application/buyTests') }} className='getMore'>
              Get More Test Slots
              <i style={{ marginLeft: '6px' }} className='chevron-left bold'></i>
            </div>
          </div>
        </div>
        <div className="description-box">
          <div className="stepper">
            <Stepper
              steps={steps}
              activeStep={state.activeStep}
              onSelect={handleOnClickStepper}
              showNumber={false} />
            <div className="stepper-body">
              <div className="vertical-line"></div>
              {getStepContent(state.activeStep - 1)}
              <div className="buttons" >
                {state.activeStep === 1 ? <button type="button" disabled className="previous-button" onClick={handleOnClickBack} >Previous</button> : <button type="button" className="previous-button" onClick={handleOnClickBack} >Back</button>}
                <button type="button" className={state.disabled ? state.activeStep === steps.length ? "disabled finish-button" : "disabled next-button" : state.activeStep === steps.length ? "finish-button" : "next-button"} disabled={state.disabled}
                  onClick={state.activeStep === steps.length ? handleFinish : handleOnNextClick} >{state.activeStep === steps.length ? 'Create & Send Test Links' : 'Next'}</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: GenerateTestState) => {
  return {
    invalid: state.generateTest.invalidEmails,
    valid: state.generateTest.validEmails,
    buttontext: state.generateTest.rawEmails.buttonText,
    error: state.generateTest.generateError
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    setRedundantEmails: (redundantEmailsData: RedundantEmailsData) => {
      dispatch({
        type: actionTypes.SET_REDUNDANT_EMAIL,
        payload: redundantEmailsData
      })
    },

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(GenerateTest)