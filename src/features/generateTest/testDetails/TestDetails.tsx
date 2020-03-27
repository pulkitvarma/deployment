import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TagInput from "../../../shared/tagInput/TagInput";
import { connect } from "react-redux";
import * as actionTypes from "../redux/types";
import "./TestDetails.scss";

interface IState {
  focused: boolean;
  date: { value: Date; error: string };
  expiry: { value: string; error: string };
  difficulty: string;
}
interface testDetails {
  testDateTime: { value: Date, error: string };
  testExpiry: { value: number, error: string };
  tags: string[];
  difficulty: string;
}
interface IProps {
  testDetailsData: testDetails;
  setTestDetailsData: Function;
  setCompletedSteps: Function;
  setError: Function;
}
class TestDetails extends React.Component<IProps, IState> {
  state: IState;
  payload: testDetails
  constructor(props: IProps) {
    super(props);
    this.state = {
      focused: false,
      date: { value: this.props.testDetailsData.testDateTime.value, error: this.props.testDetailsData.testDateTime.error },
      expiry: { value: this.props.testDetailsData.testExpiry.value.toString(), error: this.props.testDetailsData.testExpiry.error },
      difficulty: this.props.testDetailsData.difficulty
    };
  }


  handleDateChange = (date1: any): void => {
    this.setState(
      { date: { value: date1, error: this.state.date.error } },
      () => { this.dateTimeStore() }
    );
  };
  expiry = (action: string, event?: any): void => {
    if (action === 'setValue') {
      if (event.target.value !== '') {
        if (event.target.value !== '' && (+event.target.value >= 1 && +event.target.value <= 3)) {
          this.setState({
            expiry: { value: event.target.value, error: this.state.expiry.error }
          });
        }
      } else {
        this.setState({ expiry: { value: '', error: this.state.expiry.error } })
      }
    } else {
      this.expiryStore()
    }
  };
  clicked = () => {
    this.props.setCompletedSteps(2);
  }
  dateTimeStore() {
    let x = new Date();
    // if (this.state.date.value) {
      if (this.state.date.value.getTime() < x.getTime()) {
        this.payload = this.generateDateTimePayload('error');
        this.setState({
          date: {
            value: this.state.date.value,
            error:
              "Test time cannot be less than current time"
          }
        }, () => { this.props.setTestDetailsData(this.payload); });
        this.props.setError(true);
      } else {
        this.payload = this.generateDateTimePayload('no-error')
        this.setState({ date: { value: this.state.date.value, error: "" } });
        this.props.setTestDetailsData(this.payload);
        this.props.setError(false);
      }
    // } else {
    //   this.payload = this.generateDateTimePayload('error');
    //   this.setState({
    //     date: {
    //       value: this.state.date.value,
    //       error:
    //         "This Field is required"
    //     }
    //   }, () => { this.props.setTestDetailsData(this.payload); });
    //   this.props.setError(true);
    // }
  }
  expiryStore() {
    if (+this.state.expiry.value >= 1 && +this.state.expiry.value <= 3) {
      this.payload = this.generatingExpiryPayload('no-error')
      this.setState({
        expiry: { value: this.state.expiry.value, error: "" }
      }, () => { this.props.setTestDetailsData(this.payload); });
      this.props.setError(false);
    } else {
      this.payload = this.generatingExpiryPayload('error')
      this.setState({
        expiry: {
          value: this.state.expiry.value,
          error: "Value should be Between 1 and 3"
        }
      }, () => { this.props.setTestDetailsData(this.payload); });
      this.props.setError(true)
    }
  }
  tagStore(value) {
    this.payload = this.generatingTagsPayload(value);
    this.props.setTestDetailsData(this.payload);
  }
  addDays(days: number) {
    let today = new Date();
    today.setDate(today.getDate() + days);
    return today;
  }

  generateDateTimePayload(type: string) {
    let payload: testDetails
    if (type === 'error') {
      payload = {
        testDateTime: { value: this.state.date.value, error: 'Test time cannot be less than current time' },
        testExpiry: { value: this.props.testDetailsData.testExpiry.value, error: this.props.testDetailsData.testExpiry.error },
        tags: this.props.testDetailsData.tags,
        difficulty: this.props.testDetailsData.difficulty
      };
    } else {
      payload = {
        testDateTime: { value: this.state.date.value, error: '' },
        testExpiry: this.props.testDetailsData.testExpiry,
        tags: this.props.testDetailsData.tags,
        difficulty: this.props.testDetailsData.difficulty
      };
    }
    return (payload);
  }

  generatingExpiryPayload(type: string) {
    let payload: testDetails
    if (type === 'error') {
      payload = {
        testDateTime: this.props.testDetailsData.testDateTime,
        testExpiry: { value: +this.state.expiry.value, error: 'Value should be Between 1 and 3' },
        tags: this.props.testDetailsData.tags,
        difficulty: this.props.testDetailsData.difficulty
      };
    } else {
      payload = {
        testDateTime: this.props.testDetailsData.testDateTime,
        testExpiry: { value: +this.state.expiry.value, error: '' },
        tags: this.props.testDetailsData.tags,
        difficulty: this.props.testDetailsData.difficulty
      };
    }
    return (payload);
  }
  generatingTagsPayload(value) {
    let payload: testDetails = {
      testDateTime: this.props.testDetailsData.testDateTime,
      testExpiry: this.props.testDetailsData.testExpiry,
      tags: value,
      difficulty: this.props.testDetailsData.difficulty
    };
    return (payload);
  }
  //Future-Difficulty
  handleDateChangeRaw = (e) => {
    e.preventDefault();
  }

  public render() {
    return (
      <div className="test-generation-flow">
        <div className="box">2. Test Schedule</div>
        {/* Future-Difficulty */}
        <span className="upperText">Test Schedule</span>
        <span className="uHelperText">
          Decide on the date & time when you want the candidate to take the test
        </span>
        <div className="pickers">
          <div className="dateCom">
            <div className="date">Date</div>
            <DatePicker
              className="datePicker"
              selected={this.state.date.value}
              onChange={date => this.handleDateChange(date)}
              minDate={new Date()}
              maxDate={this.addDays(7)}
              placeholderText="Enter Date"
              dateFormat="dd/MM/yyyy"
              onChangeRaw={this.handleDateChangeRaw}
            />
          </div>
          <div className="timeCom">
            <div className="time">Time</div>
            <DatePicker
              className="timePicker"
              selected={this.state.date.value}
              onChange={date => this.handleDateChange(date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={10}
              timeCaption="Time"
              placeholderText="Enter Time"
              dateFormat="h:mm aa"
              onChangeRaw={this.handleDateChangeRaw}
            />
            <span className="error">{this.state.date.error}</span>
          </div>
        </div>
        <div className="expiry">
          <span className="upperText">Test Link expiry</span>
          <span className="uHelperText">
            The test link you share with the candidate will stay active for the number of days mentioned in the expiry section
          </span>
          <span className="expiryText">Enter Expiry Time</span>
          <div className="expiry-wrapper">
            <input
              className="expiryInput"
              value={this.state.expiry.value}
              onBlur={() => this.expiry('validate')}
              placeholder="Enter from 1 to 3 days"
              onChange={e => this.expiry('setValue', e)}
              type="text"
            />
            <span className="error">{this.state.expiry.error}</span>
          </div>
        </div>
        <div className="tags">
          <div className="tagText">Tags</div>
          <TagInput
            setStore={(value: [""]) => {
              this.tagStore(value);
            }}
            existingTags={this.props.testDetailsData.tags}
            placeHolder={this.props.testDetailsData.tags.length === 0 ? ("Enter tags of your choice, e.g., College Name, Profile Name, etc..") : ('')}
            predefinedTags={["MTS-2", "MTS-1", "SDE-1", "GE"]}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (
  dispatch: Function
) => {
  return {
    setTestDetailsData: (testDetailsData: {
      testDateTime: Date;
      testExpiry: number;
      tags: string[];
      difficulty: string;
    }) => {
      dispatch({
        type: actionTypes.SET_TEST_DETAILS_DATA,
        payload: testDetailsData
      });
    },
    setCompletedSteps: (step: number) => {
      dispatch({
        type: actionTypes.SET_COMPLETE_STEPS,
        payload: step
      })
    },
    setError: (error: boolean) => {
      dispatch({
        type: actionTypes.SET_ERROR,
        payload: error
      })
    }
  };
};
const mapStateToProps = (state: {
  generateTest: {
    testDetails: {
      testDateTime: { value: Date, error: string };
      testExpiry: { value: number, error: string };
      tags: string[];
      difficulty: string;
    };
  };
}): { testDetailsData: {} } => {
  return {
    testDetailsData: state.generateTest.testDetails
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TestDetails);
