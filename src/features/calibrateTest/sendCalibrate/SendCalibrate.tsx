import './SendCalibrate.scss';
import * as calibrationTypes from '../calibrateRedux/types';
import { connect } from 'react-redux';
import { selectType } from '../../generateTest/testType/TestType';
import BptTestType from '../../generateTest/testType/bpt/Bpt';
import GatTestType from '../../generateTest/testType/gat/Gat';
import InputBox from './inputBox/InputBox';
import React, { useEffect, useState } from 'react';

interface IState {
    calibrateTest: {
        state: {
            testType: string,
            emails: []
        }
    }
}

interface IProps {
    testType: string,
    calibrateTest: {
        testType: string,
        emails: []
    },
    onClose: any,
    setTestType: Function
}

const SendCalibrate = (props: any) => {
    const [state, setState] = useState({
        inputNumber: [''],
        disabled: true,
        number: 1,
        boxIndex: [1],
        toLoad: true
    });

    useEffect(() => {
        testTypeSelection(props.testType);
        props.setEmails('', state.number);
    }, []);

    if (props.calibrateTest.emails) {
        const emails = props.calibrateTest.emails;
        const index = emails.findIndex(email => email === '')
        if (index !== -1 && !state.disabled) {
            setState({
                ...state,
                disabled: true
            });
        }
        else if (index === -1 && state.disabled) {
            const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            emails.forEach((email, index) => {
                if (!regEx.test(email)) {
                    return;
                }
                else if (index === emails.length - 1) {
                    setState({
                        ...state,
                        disabled: false
                    })
                }
            });
        }
    }

    const testTypeSelection = async (value: string) => {
        await selectType(value);
        props.setTestType(value)
    }

    const addInputBox = () => {
        if (state.inputNumber.length <= 4) {
            const numberOfInput = state.inputNumber;
            let number = ++state.number;
            const boxIndex = state.boxIndex;
            boxIndex.push(number);
            props.setEmails('', state.number);
            numberOfInput.push(number.toString())
            setState({
                ...state,
                inputNumber: numberOfInput,
                boxIndex: boxIndex
            });
        }
    }

    const deleteInputBox = (id: number) => {
        setState({
            ...state,
            toLoad: false
        })
        props.delete(id);
        let inputBoxes = state.boxIndex;
        inputBoxes.length--;
        const numberOfInput = state.inputNumber;
        numberOfInput.pop();
        setState({
            ...state,
            boxIndex: inputBoxes,
            toLoad: true
        });
    }

    const sendCalibrateTest = () => {
        const body = {
            testType: props.calibrateTest.testType,
            emails: props.calibrateTest.emails
        }
        console.log(body);
        props.onClose();
    }

    if (state.toLoad) {
        return (
            <div className="calibrate-generation-flow">
                <div className="calibrate-test-type-wrapper">
                    <p className="test-type-heading">Select a test type</p>
                    <div className="test-type-options">
                        <div className="test-type">
                            <GatTestType selectType={testTypeSelection} />
                        </div>
                        <div className="test-type">
                            <BptTestType selectType={testTypeSelection} />
                        </div>
                    </div>
                    <div className="calibrate-email-assignment">
                        <p className="heading">Assign Test Takers Email Id</p>
                        <p className="sub-heading">Enter e-mail ids to which you want the calibration test link to be sent. You can only send 5 Calibration tests.</p>
                        {state.boxIndex.map((element, index) => {
                            return (<InputBox key={index} index={index} add={addInputBox} boxNumber={index} onClose={deleteInputBox} maxValue={state.inputNumber.length - 1} focus={state.inputNumber.length === 1 ? true : false} />);
                        })
                        }
                        {state.inputNumber.length <= 4 ?
                            <span className="add-new-link" onClick={addInputBox}>Add New Email Id</span>
                            : <span></span>
                        }
                        <p className="test-link-expiry-days">Test Link Expiry : 3 days</p>
                    </div>
                </div>
                <div className="horizontal-line"></div>
                <div className="buttons">
                    <button className="cancel-button" onClick={props.onClose}>Cancel</button>
                    <button disabled={state.disabled} className={!state.disabled ? "send-calibrate-test" : " send-calibrate-test disabled"} onClick={sendCalibrateTest}>Send Test Links</button>
                </div>
            </div>
        )
    }
    else {
        return (<span></span>)
    }
}

const mapDispatchToProps = (dispatch: Function) => {
    return {
        setEmails: (value: string, index: number) => {
            dispatch({
                type: 'SET_EMAIL',
                payload: { email: value, index: index }
            })
        },
        setTestType: (testType: string) => {
            dispatch({
                type: calibrationTypes.SET_CALIBRATION_TEST_TYPE,
                payload: testType
            })
        },
        delete: (index: number) => {
            dispatch({
                type: 'DELETE',
                payload: index
            })
        }
    }
}

const mapStateToProps = (state: IState) => {
    return {
        calibrateTest: state.calibrateTest
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SendCalibrate);

