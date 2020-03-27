import React from "react";
import "./TestSummary.scss";
import Switch from "react-switch";
import { connect } from "react-redux";
import greenTick from "../../../assets/green-tick.svg";
import close from "../../../assets/close.svg";
import * as actionTypes from "../redux/types";
import Modal from "../../calibrateTest/sendCalibrate/modal/Modal";
import { dateFormatter } from '../../../shared/dateFormatter/dateFormatter';

interface IState {
  scroll: boolean;
  checked: boolean;
  scheduledData: string;
  expiryData: string;
  validEmails: string[];
  redundantEmails: string[];
  testType: string;
}
interface IProps {
  data: {
    redundantEmails: { open: boolean; emails: string[] };
    testDetails: {
      testExpiry: {
        value: number;
      };
      testDateTime: {
        value: Date;
      };
    };
    testType: string;
    validEmails: [];
  };
  setRedundantEmails: Function;
}
class TestSummary extends React.Component<IProps, IState> {
  state: IState;
  constructor(props: IProps) {
    super(props);
    this.state = {
      scroll: false,
      checked: true,
      scheduledData: "",
      expiryData: "",
      validEmails: [
        ''
      ],
      testType: '',
      redundantEmails: this.props.data.redundantEmails.emails
    };
  }

  componentDidMount() {
    const expiryTime = this.props.data.testDetails.testExpiry.value;
    const timeOfSchedule = this.props.data.testDetails.testDateTime.value.toLocaleString();
    const data: any = dateFormatter(expiryTime, timeOfSchedule);
    const validEmails = this.props.data.validEmails.map((el: { index: number, email: string }) => { return el.email })
    this.setState({
      ...this.state,
      scheduledData: data.scheduledDate,
      expiryData: data.expiryDate,
      testType: this.props.data.testType,
      validEmails: validEmails
    });
  }

  componentDidUpdate(prevProps: any): void {
    if (
      prevProps.data.redundantEmails.emails !==
      this.props.data.redundantEmails.emails
    ) {
      this.setState({
        redundantEmails: this.props.data.redundantEmails.emails
      });
    }
  }

  handleChange(): void {
    this.setState({ checked: !this.state.checked }, () => {
      let p = document.getElementsByClassName("toggle-input")[0] as HTMLElement;
      if (this.state.checked) {
        p.style.border = "1px solid #FF9800";
      } else {
        p.style.border = "1px solid #B2B7C9";
      }
    });
  }
  closeModal = (): void => {
    this.props.setRedundantEmails({
      open: false,
      emails: this.props.data.redundantEmails.emails
    });
  };

  showMore(): void {
    this.setState({ scroll: !this.state.scroll }, () => {
      let p = document.getElementsByClassName("emailBox")[0] as HTMLDivElement;
      p.scrollTop = 0;
    });
  }

  removeEmail = (email: string): void => {
    let p = this.state.redundantEmails.findIndex(el => el === email);
    let z = [...this.state.redundantEmails];
    z.splice(p, 1);
    this.setState({ redundantEmails: z });
  };
  proceed = (): void => {
    this.props.setRedundantEmails({
      open: false,
      emails: this.state.redundantEmails
    });
  };

  public render() {
    return (
      <div className="test-generation-flow">
        <div className="box">4. Test Summary</div>
        {this.props.data.redundantEmails.open ? (
          <div id="testSummaryModal" className="modal image__popup">
            <Modal
              width="580px"
              onClose={this.closeModal}
              dataToDisplay={
                <div className="popup-container">
                  <div className="redundantPopUpContainer">
                    <div className="redundantPopUpText">
                      Test has already been scheduled for or taken by following
                      email Id(s)
                    </div>
                    <div className="emailsContainer">
                      {this.state.redundantEmails.map((el, index) => {
                        return (
                          <span key={index} className="individualEmail">
                            {el}&nbsp;&nbsp;
                            <span
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                this.removeEmail(el);
                              }}
                            >
                              &times;
                            </span>
                          </span>
                        );
                      })}
                    </div>
                    <div className="permissionText">
                      Do you still wish to send the new test link?
                    </div>
                  </div>
                  <hr
                    style={{
                      border: "1px solid #F2F4FA",
                      margin: "6px 0px 0px 0px"
                    }}
                  />
                  <div className="buttonsContainer">
                    <button
                      onClick={() => this.closeModal()}
                      className="cancelRedundant"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        this.proceed();
                      }}
                      className="proceedRedundant"
                    >
                      Proceed
                    </button>
                  </div>
                </div>
              }
              title={"Notice"}
            />
          </div>
        ) : (
            <span></span>
          )}

        <div className="content">
          <div className="firstBox">
            <div className="testSummaryWrapper">
              <div className="vertical-line"></div>
              <div className="uText">Test Overview</div>
              <div className="summary-details-wrapper">
                <div className="summary-detail">
                  <span className="title">Test type</span>
                  <span className="description">{this.state.testType === 'gat' ? 'General Aptitude Test' : 'Basic Programming Test'}</span>
                </div>
                {/* <div className="summary-detail">
                  <span className="title">Test difficulty</span>
                  <span className="description">Medium</span>
                </div> */}
              </div>
              <div className="summary-details-wrapper">
                <div className="summary-detail">
                  <span className="title">Test scheduled at</span>
                  <span className="last-description">
                    {this.state.scheduledData}
                  </span>
                </div>
                <div className="summary-detail">
                  <span className="title">Test link expires on</span>
                  <span className="last-description">
                    {this.state.expiryData}
                  </span>
                </div>
              </div>
            </div>
            <div className="toggleInputWrapper">
              <div>
                <div className="vertical-line"></div>
                <div className="uText">Proctoring</div>
              </div>
              <div className="toggle-input">
                <span>
                  <Switch
                    checked={this.state.checked}
                    onChange={() => this.handleChange()}
                    onColor="#FF9800"
                    onHandleColor="#FF9800"
                    handleDiameter={30}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={20}
                    width={48}
                    className="react-switch"
                    id="material-switch"
                  />
                </span>
                <span
                  className="proctoringText"
                  style={
                    this.state.checked
                      ? { color: "#FF9800" }
                      : { color: "#999FB7" }
                  }
                >
                  {this.state.checked ? "Enabled" : "Disabled"}
                </span>
              </div>
            </div>
          </div>
          <div className="secondBox">
            <div className="vertical-line"></div>
            <div className="emailBox" style={{ overflowY: "auto" }}>
              <div>
                <div className="ls">
                  {" "}
                  <img src={greenTick} alt="" />
                  <span style={{ marginLeft: "5px" }}>
                    List of Candiates: ({this.state.validEmails.length})
                  </span>
                </div>
              </div>
              <ol className="ol-padding__reset">
                {this.state.validEmails.map((element: string, index: number) => {
                  return (
                    <li key={index} className="liItems">
                      {element}
                    </li>
                  );
                })}
                {/* {this.state.scroll ? <span className='showLess' onClick={() => this.showMore()}>Show Less</span> : <span></span>} */}
              </ol>
              {/* {this.state.scroll ? <span></span> : <div className='showMore' onClick={() => this.showMore()} >Show More</div>} */}
            </div>
          </div>
        </div>
        <div className="dashed-line"></div>
      </div>
    );
  }
}
const mapStateToProps = (state: { generateTest }): { data: {} } => {
  return {
    data: state.generateTest
  };
};
const mapDispatchToProps = (
  dispatch: Function
): { setRedundantEmails: Function } => {
  return {
    setRedundantEmails: (rededundantEmailsData: {
      open: boolean;
      emails: string[];
    }) => {
      dispatch({
        type: actionTypes.SET_REDUNDANT_EMAIL,
        payload: rededundantEmailsData
      });
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TestSummary);
