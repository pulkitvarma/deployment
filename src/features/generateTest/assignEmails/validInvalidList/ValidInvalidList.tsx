import React from "react";
import { connect } from "react-redux";
import InputField from "./inputField/InputField";
import "./ValidInvalidList.scss";
import greenTick from "../../../../assets/green-tick.svg";
import redCross from "../../../../assets/red-cross.svg";
interface IState {
  validEmails: [{ email: string; index: number }];
  inValidEmails: [{ email: string; index: number }];
  buttonVisib: boolean;
}
interface IProps {
  validEmails: [{ email: string; index: number }];
  inValidEmails: [{ email: string; index: number }];
  rawEmails: {
    value: string,
    error: string,
    disabled: boolean,
    buttonText: string
  };
}

class ValidInvalidList extends React.Component<IProps, IState> {
  state: IState;
  constructor(props: IProps) {
    super(props);
    this.state = {
      validEmails: [{ email: "", index: 0 }],
      inValidEmails: [{ email: "", index: 0 }],
      buttonVisib: false
    };
  }

  public render() {
    let i =201;
    return (
      <div className="validInvalid">
        <div className="col-md-6-column">
          <span className="valid-invalid-name">
            <img src={redCross} alt="Wrong" />
            &nbsp;&nbsp;Invalid Emails ({this.props.inValidEmails.length})
          </span>
          <div className="line invalid"></div>
          <div className="input-box invalid">
            {
              this.props.inValidEmails.map(
                (el: { email: string; index: number }) => {
                  return (
                    <div className="space" key={i++}>
                      <InputField
                        type="invalid"
                        otherMasterData={this.props.validEmails}
                        masterData={this.props.inValidEmails}
                        inputData={el}
                        rawEmails={this.props.rawEmails}
                        autofocus={el.index === 0}
                      />
                    </div>
                  );
                }
              )}
          </div>
        </div>
        <div className="col-md-6-column">
          <span className="valid-invalid-name">
            <img src={greenTick} alt="Correct" />
            &nbsp;&nbsp;Valid Email Id`s ({this.props.validEmails.length})
          </span>
          <div className="line"></div>
          <div className="input-box">
            {
              this.props.validEmails.map(
                (el: { email: string; index: number }) => {
                  return (
                    <div className="space" key={el.index}>
                      <InputField
                        type="valid"
                        otherMasterData={this.props.inValidEmails}
                        masterData={this.props.validEmails}
                        inputData={el}
                        rawEmails={this.props.rawEmails}
                        autofocus={false}
                      />
                    </div>
                  );
                }
              )}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state: {
  generateTest: {
    validEmails: [{ email: string; index: number }];
    invalidEmails: [{ email: string; index: number }];
    rawEmails: {
      value: string,
      error: string,
      disabled: boolean,
      buttonText: string
    };
  };
}): { validEmails: {}; inValidEmails: {}; rawEmails: {} } => {
  return {
    validEmails: state.generateTest.validEmails,
    inValidEmails: state.generateTest.invalidEmails,
    rawEmails: state.generateTest.rawEmails
  };
};

export default connect(mapStateToProps, null)(ValidInvalidList);
