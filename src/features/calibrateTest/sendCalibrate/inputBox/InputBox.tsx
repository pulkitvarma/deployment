import './InputBox.scss';
import { connect } from 'react-redux';
import React, { useState, useEffect } from 'react';

interface IProps {
    index: number,
    onClose: Function,
    setEmails: Function,
    removeEmails: Function,
    calibrateTest: {
        testType: string,
        emails: []
    },
    focus: boolean,
    maxValue: number,
    boxNumber: number
}

const InputBox = (props: IProps) => {
    const [state, setState] = useState({
        value: '',
        error: '',
        removeButton: false,
        from: 'INPUT',
        remove: false,
        boxNumber: props.boxNumber,
    });

    const findValueByIndex = (boxNumber) => {
        const emails = props.calibrateTest.emails;
        let value = '';
        if (emails) {
            for (let index = 0; index < emails.length; index++) {
                if (index === boxNumber) {
                    value = emails[index];
                    break;
                }
            }
            return value;
        }
        else {
            return '';
        }
    }

    useEffect(() => {
        const emailValue = findValueByIndex(props.index);
        setState({
            ...state,
            value: emailValue,
        })
        if (!props.focus) {
            setState({
                ...state,
                remove: false
            });
        }
        else {
            setState({
                ...state,
                remove: true
            });
        }
    }, [props.maxValue]);

    function docReady(fn) {
        // see if DOM is already available
        if (document.readyState === "complete" || document.readyState === "interactive") {
            // call on next available tick
            setTimeout(fn, 1);
        } else {
            document.addEventListener("DOMContentLoaded", fn);
        }
    }

    useEffect(() => {
        docReady(function () {
            // DOM is loaded and ready for manipulation here
            document.getElementById((props.maxValue.toString())).focus();
        });

        const emailValue = findValueByIndex(props.index);
        setState({
            ...state,
            value: emailValue,
        })
    }, []);

    const changedContent = (event) => {
        const emailValue = event.target.value;
        if (state.error === 'This email address is already taken!') {
            return setState({
                ...state,
                value: emailValue,
                error: ''
            });
        }
        else if (state.error === 'This email address is invalid!') {
            const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (regEx.test(emailValue)) {
                return setState({
                    ...state,
                    value: emailValue,
                    error: ''
                });
            }
            else {
                return setState({
                    ...state, value: emailValue
                })
            }
        }
        else {
            return setState({
                ...state,
                value: emailValue
            })
        }
    }

    const checkEmailValidity = (event) => {
        const emailValue = event.target.value;
        setState({
            ...state,
            value: emailValue
        });
        if (state.from === 'INPUT') {
            const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const email = emailValue;
            if (email !== '') {
                const reduxEmail = props.calibrateTest.emails;
                const indexOfFind = reduxEmail.findIndex((element, index) => {
                    return (element === email && index !== props.index)
                });
                const indexOfDuplicate = reduxEmail.findIndex((element, index) => {
                    return (element === email && index === props.index)
                });
                if (!regEx.test(email)) {
                    props.setEmails(email, props.index);
                    return setState({
                        ...state,
                        value: emailValue,
                        error: 'This email address is invalid!',
                        removeButton: false,
                        from: 'INPUT'
                    })
                }
                else if (indexOfFind !== -1) {
                    props.setEmails(email, props.index);
                    return setState({
                        ...state,
                        value: emailValue,
                        error: 'This email address is already taken!',
                        removeButton: false,
                        from: 'INPUT'
                    })
                }
                else if (indexOfDuplicate === -1 && indexOfFind === -1) {
                    props.setEmails(email, props.index);
                    return setState({
                        ...state,
                        value: emailValue,
                        error: '',
                        removeButton: false,
                        from: 'INPUT'
                    })
                }
                else {
                    return setState({
                        ...state,
                        value: emailValue,
                        removeButton: false,
                        from: 'INPUT'
                    })
                }
            }
            else {
                return setState({
                    ...state,
                    value: emailValue,
                    removeButton: false,
                    from: 'INPUT'
                });
            }
        }
        else {
            return setState({
                ...state,
                value: emailValue,
                removeButton: false,
                from: 'INPUT'
            });
        }
    }

    const deleteEmail = async () => {
        const email = state.value;
        if (email !== '') {
            setState({
                ...state,
                value: ''
            })
            props.removeEmails(props.index);
        }
    }

    const setRemoveButton = () => {
        setState({
            ...state,
            removeButton: true
        })
    }



    const removeText = async () => {
        let inputEmail = document.getElementById(props.index.toString()) as HTMLInputElement;
        if (inputEmail.value !== '') {
            inputEmail.value = '';
            props.removeEmails(props.index);
        };
        const email = '';
        setState({
            ...state,
            value: email,
            removeButton: false
        });
    }

    return (
        <React.Fragment>
            <div className="input__wrapper">
                <input type="text" id={props.index.toString()} autoComplete="off" onFocus={setRemoveButton} value={state.value} onChange={checkEmailValidity} placeholder="Enter Email Id" className="calibrate-email-input"></input>
                {state.removeButton ?
                    <span className="remove" onMouseDown={async () => {
                        setState({
                            ...state,
                            from: 'REMOVE'
                        })
                        await removeText();
                    }}>&times;</span>
                    : null}
                {!state.remove && !state.removeButton && props.maxValue !== 0 ?
                    < span onClick={async () => {
                        await deleteEmail();
                        props.onClose(state.boxNumber + 1)
                    }} className="delete">&times;</span> : null}
                <span className="error">{state.error}</span>
            </div>
        </React.Fragment >
    )
}

const mapDispatchToProps = (dispatch: Function) => {
    return {
        setEmails: (value: string, index: number) => {
            dispatch({
                type: 'SET_EMAIL',
                payload: { email: value, index: index }
            })
        },
        removeEmails: (index: number) => {
            dispatch({
                type: 'REMOVE_EMAIL',
                payload: index
            })
        }
    }
}

const mapStateToProps = (state: any) => {
    return {
        calibrateTest: state.calibrateTest
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputBox);