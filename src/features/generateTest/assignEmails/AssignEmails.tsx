import React from "react";
import BulkEmailValidator from "../../../shared/validators/bulkEmailValidator";
import "./AssignEmails.scss";
import ValidInvalidList from "./validInvalidList/ValidInvalidList";
import { connect } from "react-redux";
import * as actionTypes from "../redux/types";
import OnlyValidOrInvalid from "./onlyValidOrInvalid/OnlyValidOrInvalid";
interface IProps {
  setValidEmails: Function;
  setInValidEmails: Function;
  comp: any;
  compToBeDisplayed: Function;
  rawEmails: {
    value: string;
    error: string;
  };
  validEmails: Array<{ email: string; index: number }>;
  invalidEmails: Array<{ email: string; index: number }>;
  setRawEmails: Function;
}

interface IState {
  enteredEmails: {
    value: string;
    error: string;
  };
  comp: any;
}

class AssignEmails extends React.Component<IProps, IState> {
  validatorService = new BulkEmailValidator();
  state: IState;
  constructor(props: IProps) {
    super(props);
    this.state = {
      enteredEmails: {
        value: this.props.rawEmails.value,
        error: this.props.rawEmails.error,
      },
      comp: <span></span>
    };
  }
  componentDidMount() {
    let p = document.getElementById('emailArea') as HTMLTextAreaElement
    p.focus()
  }
  componentDidUpdate(prevProps: IProps) {
    if (prevProps.validEmails !== this.props.validEmails || prevProps.invalidEmails !== this.props.invalidEmails) {
      this.compDobeDisplayed({
        validEmails: this.props.validEmails,
        invalidEmails: this.props.invalidEmails
      });
    }
    if (prevProps.rawEmails !== this.props.rawEmails) {
      this.setState({
        enteredEmails: {
          value: this.props.rawEmails.value,
          error: this.props.rawEmails.error,
        }
      }, () => { this.cleanRawEmails() })
    }
  }

  validateEmails(): void {
    this.setState(
      {
        enteredEmails: {
          value: this.state.enteredEmails.value,
          error: "",
        }
      },
      () => {
        this.props.setRawEmails(this.state.enteredEmails);
      }
    );
    this.cleanRawEmails()
  }

  cleanRawEmails() {
    let emails0 = this.state.enteredEmails.value.replace(/\n|\r/g, ",");
    let emails1 = emails0.replace(/\s/g, "").split(/,|;/);
    emails1 = emails1.filter(el => {
      return el !== "";
    });
    let emails2 = new Set(emails1);
    let emails3 = Array.from(emails2);
    if (emails3.length <= 200) {
      let data = this.validatorService.getValidInvalid(emails3);
      this.setState({
        enteredEmails: {
          ...this.state.enteredEmails,
          error: "",
        }
      }, () => {
        this.disEnableTextArea('disable');
      });
      this.props.setValidEmails(data.validEmails);
      this.props.setInValidEmails(data.invalidEmails);
    } else {
      this.setState(
        {
          enteredEmails: {
            value: this.state.enteredEmails.value,
            error: "Max Length < = 200",
          }
        },
        () => {
          this.props.setRawEmails(this.state.enteredEmails);
        }
      );
    }
  }
  compDobeDisplayed(data: { invalidEmails: Array<{ email: string; index: number }>, validEmails: Array<{ email: string; index: number }> }) {
    if (data.invalidEmails.length === 0 && data.validEmails.length > 1) {
      this.props.compToBeDisplayed({ comp: <OnlyValidOrInvalid type={'valid'} quantity={'all'} data={data.validEmails.length} /> });
    } else if (data.invalidEmails.length === 0 && data.validEmails.length === 1) {
      this.props.compToBeDisplayed({ comp: <OnlyValidOrInvalid type={'valid'} quantity={'single'} data={data.validEmails[0].email} /> });
    } else if (data.validEmails.length === 0 && data.invalidEmails.length === 1) {
      this.props.compToBeDisplayed({ comp: <OnlyValidOrInvalid type={'invalid'} quantity={'single'} data={data.invalidEmails[0].email} /> });
    } else if (data.validEmails.length === 0 && data.invalidEmails.length > 1) {
      this.props.compToBeDisplayed({ comp: <OnlyValidOrInvalid type={'invalid'} quantity={'all'} data={data.invalidEmails.length} /> });
    } else {
      this.props.compToBeDisplayed({ comp: <ValidInvalidList /> });
    }
  }
  changeHandler = (e: any): void => {
    this.setState({
      enteredEmails: {
        value: e.target.value,
        error: this.state.enteredEmails.error,
      }
    });
  };
  disEnableTextArea(action: string) {
    let p = document.getElementsByClassName('textInput')[0] as HTMLInputElement;
    if (action === 'enable') {
      p.style.color = '#3C5185'
    } else {
      p.style.color = '#b2b7c9'
    }
  }
  public render() {
    return (
      <React.Fragment>
        <div className="test-generation-flow">
          <div className="box">3. Test Takers</div>
          <span className="upperText">Assign Email Id’s</span>
          <p className="uHelperText">
            Enter e-mail ids to which you want to send the test link. Each e-mail id should be separated by a single comma.
          </p>
          <div className="textArea">
            <textarea
              id='emailArea'
              placeholder="Enter Email Id’s here..."
              className="textInput"
              value={this.state.enteredEmails.value}
              onChange={e => this.changeHandler(e)}
              onClick={() => { this.disEnableTextArea('enable') }}
              onBlur={() => { this.disEnableTextArea('diable') }}
            ></textarea>
          </div>
          <span className="maxError">{this.state.enteredEmails.error}</span>
          <span onClick={() => this.validateEmails()} className="validate">
            Validate E-Mail Id's >
          </span>
        </div>
        <div className='emailListComponent'>
          {this.props.comp}
        </div>
        <div className="dashed-line-for-send-test"></div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (
  dispatch: Function
): {
  setValidEmails: Function;
  setInValidEmails: Function;
  compToBeDisplayed: Function;
  setRawEmails: Function;
} => {
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
    compToBeDisplayed: (comp: any) => {
      dispatch({
        type: actionTypes.COMP_TO_BE_DISPLAYED,
        payload: comp.comp
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
const mapStateToProps = (state: {
  generateTest: {
    comp: any;
    rawEmails: {
      value: string;
      error: string;
      disabled: boolean;
      buttonText: string;

    };
    validEmails: Array<{}>;
    invalidEmails: Array<{}>
  };
}): {
  comp: {}; rawEmails: {}; validEmails: Array<{}>;
  invalidEmails: Array<{}>
} => {
  return {
    comp: state.generateTest.comp,
    rawEmails: state.generateTest.rawEmails,
    validEmails: state.generateTest.validEmails,
    invalidEmails: state.generateTest.invalidEmails
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AssignEmails);
