import React from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../../redux/types";
import crossIcon from "../../../../../assets/input-box-cross.svg";
import "./InputField.scss";
import tick from "../../../../../assets/input-tick.svg";

interface IState {
  inputData: { email: string; index: number };
  buttonVisib: boolean;
  disabled: boolean;
  buttonSwitch: boolean;
  from: string;
}
interface IProps {
  inputData: { email: string; index: number };
  masterData: [{ email: string; index: number }];
  setValidEmails: Function;
  setInValidEmails: Function;
  setRawEmails: Function;
  type: string;
  autofocus: boolean;
  otherMasterData: [{ email: string; index: number }];
  rawEmails: {
    value: string,
    error: string,
    disabled: boolean,
    buttonText: string
  };

}

class InputField extends React.Component<IProps, IState> {
  state: IState;
  constructor(props: IProps) {
    super(props);
    this.state = {
      inputData: props.inputData,
      buttonVisib: true,
      disabled: !(this.props.inputData.index === 0 && this.props.type === 'invalid'),
      buttonSwitch: false,
      from: 'INPUT'
    };
  }

  removePost = (): void => {
    this.textAreaModify(this.props.inputData.email, '');
    let newEmails: any[] = [];
    let i = 0;
    this.props.masterData.forEach(
      (element: { email: string; index: number }) => {
        if (element.email !== this.state.inputData.email) {
          element.index = i++;
          newEmails.push(element);
        }
      }
    );
    if (this.props.type === "valid") {
      this.props.setValidEmails(newEmails)
    } else {
      this.props.setInValidEmails(newEmails);
    }
  };

  textAreaModify(oldEmail: string, newEmail: string) {
    let rawEmails = { ...this.props.rawEmails }
    // let pp = '';
    // if (newEmail === '') {
    //   pp = rawEmails.value.replace(oldEmail, newEmail);
    // } else {
    //   pp = rawEmails.value.replace(oldEmail, newEmail);
    // }
    // let zz = pp.replace(/^\s*[\r\n]/gm, '')
    // let qq = zz.replace(/^[,\s]+|[,\s]+$/g, '').replace(/,[,\s]*,/g, ',');
    let p = ''
    let modifiedRawEmails = '';
    rawEmails.value = rawEmails.value + ','
    for (let i = 0; i < rawEmails.value.length; i++) {
      p = p + rawEmails.value.charAt(i);
      if (
        rawEmails.value.charAt(i) === "," ||
        rawEmails.value.charAt(i) === "\n" ||
        rawEmails.value.charAt(i) === "\r" ||
        rawEmails.value.charAt(i) === "\r\n"
      ) {
        let t = p;
        let z = t.replace(",", "").replace(/\n|\r|\r\n/, "").replace(/ /, "");
        if (z !== oldEmail) {
          modifiedRawEmails = modifiedRawEmails + p;
        } else {
          if (rawEmails.value.charAt(i) === "," ||
            rawEmails.value.charAt(i) === "\n" ||
            rawEmails.value.charAt(i) === "\r" ||
            rawEmails.value.charAt(i) === "\r\n") {
            modifiedRawEmails = modifiedRawEmails + newEmail + rawEmails.value.charAt(i)
          } else {
            modifiedRawEmails = modifiedRawEmails + newEmail
          }
        }
        p = "";
      }
    }
    let commaEliminate = (modifiedRawEmails.substring(0, modifiedRawEmails.length - 1)).replace(/,[,\s]*,/g, ',')
    let newRawEmails = {
      value: commaEliminate,
      error: this.props.rawEmails.error,
      disabled: this.props.rawEmails.disabled,
      buttonText: this.props.rawEmails.buttonText
    }
    this.props.setRawEmails(newRawEmails)
  }

  discardChanges = (): void => {
    this.setState({ inputData: this.props.inputData, disabled: true });
  };

  componentDidMount() {
    this.docReady(function() {
      document.getElementById('invalid0').focus();
    })
  }

  docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
      // call on next available tick
      setTimeout(fn, 1);
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }

  componentDidUpdate(prevProps: IProps) {
    if (prevProps !== this.props) {
      this.docReady(function() {
        document.getElementById('invalid0').focus();
      })
      this.setState({
        inputData: this.props.inputData,
        buttonVisib: true,
        disabled: !(this.props.inputData.index === 0 && this.props.type === 'invalid'),
        buttonSwitch: false
      })
    }
  }

  editEmail = (): void => {
    let p = document.getElementById(`invalid${this.props.inputData.index}`)
    p.style.color = '#3C5185'
    this.setState({ disabled: false });
  };

  handleChange = (e: any): void => {
    this.setState({
      inputData: { email: e.target.value, index: this.state.inputData.index }
    });
  };

  submitChange = (): void => {
    let oldEmail = this.props.inputData.email
    let newEmail = this.state.inputData.email
    let validity = this.checkValidity(this.state.inputData.email);
    let newEmails: any[] = [];
    if (this.props.type === validity) {
      newEmails = [...this.props.masterData];
      newEmails[this.state.inputData.index] = {
        email: this.state.inputData.email,
        index: this.state.inputData.index
      };
      if (this.props.type === "valid") {
        this.props.setValidEmails(newEmails);
      } else {
        this.props.setInValidEmails(newEmails);
      }
    } else {
      newEmails = [...this.props.otherMasterData];
      newEmails.push({
        email: this.state.inputData.email,
        index: this.props.otherMasterData.length
      });
      let newEmails2: any[] = [];
      let i = 0;
      this.props.masterData.forEach(
        (element: { email: string; index: number }) => {
          if (this.state.inputData.index !== element.index) {
            element.index = i++;
            newEmails2.push(element);
          }
        }
      );
      if (this.props.type === "valid") {
        this.props.setInValidEmails(newEmails);
        this.props.setValidEmails(newEmails2);
      } else {
        this.props.setValidEmails(newEmails);
        this.props.setInValidEmails(newEmails2);
      }
    }
    this.textAreaModify(oldEmail, newEmail)
  };

  checkValidity(email: string): string {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regEx.test(email)) {
      return "valid";
    } else {
      return "invalid";
    }
  }
  showHideButtons = (value: boolean): void => {
    this.setState({ buttonVisib: value }, () => { });
  };

  async onBlur() {
    if (this.state.from === 'INPUT') {
      let p = document.getElementById(`invalid${this.props.inputData.index}`)
      p.style.color = '#b2b7c9'
      this.setState({ disabled: true })
    }
    else if (this.state.from === 'DISCARD') {
      return;
    }
    else if (this.state.from === 'REMOVE') {
      this.setState({
        ...this.state,
        from: 'INPUT'
      });
    }
    else {
      this.setState({
        ...this.state,
        from: 'REMOVE'
      })
    }
  }

  public render() {
    return (
      <div onBlur={() => this.onBlur()}>
        <div className="valid-invalid-list" >
          <span ></span>
          <input
            tabIndex={this.props.inputData.index}
            id={`${this.props.type}${this.props.inputData.index}`}
            type="text"
            className="valid-input-box"
            disabled={this.props.type === 'valid'}
            value={this.state.inputData.email}
            onChange={e => this.handleChange(e)}
            onClick={() => this.editEmail()}
            // autoFocus={this.props.autofocus}
            style={this.props.inputData.index === 0 && this.props.type === 'invalid' ? { color: '#3C5185' } : { color: '#b2b7c9' }}
          />
          {this.state.buttonVisib ? (
            this.state.disabled ? (
              <span id={`${this.props.type}${this.props.inputData.index}delete`} className="valid-invalid-buttons">

                <button
                  className="second"
                  onMouseDown={async () => {
                    this.setState({
                      ...this.state,
                      from: 'REMOVE'
                    })
                    this.removePost();
                  }}
                >
                  <img src={crossIcon} alt="Delete Icon" />
                </button>
              </span>
            ) : (
                <span id={`${this.props.type}${this.props.inputData.index}save`} className="valid-invalid-buttons">
                  <button
                    className="first"
                    onMouseDown={async () => {
                      this.setState({
                        ...this.state,
                        from: 'DISCARD'
                      })
                      this.discardChanges();
                    }}
                  >
                    <img src={crossIcon} alt="Delete Icon" />
                    {/* <i className='chevron-delete'></i> */}
                  </button>
                  <button
                    className="second"
                    onMouseDown={async () => {
                      this.setState({
                        ...this.state,
                        from: 'SUBMIT'
                      })
                      this.submitChange();
                    }}
                  >
                    <img src={tick} alt="Correct Icon" />
                  </button>
                </span>
              )
          ) : (
              <span></span>
            )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (
  dispatch: Function
): { setValidEmails: Function; setInValidEmails: Function; setRawEmails: Function; } => {
  return {
    setValidEmails: (validEmails: [{ email: string; index: number }]) => {
      dispatch({
        type: actionTypes.SET_VALID_EMAILS,
        payload: validEmails
      });
    },
    setInValidEmails: (inValidEmails: [{ email: string; index: number }]) => {
      dispatch({
        type: actionTypes.SET_INVALID_EMAILS,
        payload: inValidEmails
      });
    },
    setRawEmails: (rawEmails: {
      value: string;
      error: string;
      disabled: boolean;
      buttonText: string;
    }) => {
      dispatch({
        type: actionTypes.SET_RAW_EMAILS,
        payload: rawEmails
      });
    }
  };
};

export default connect(null, mapDispatchToProps)(InputField);
