import './TestDescription.scss';
import React from 'react';
import { Link } from "react-router-dom";
interface IProps {
  history: { push: Function }
  match: { path: string }
}

const TestDescription = (props: IProps) => {

  return (
    <section className="td-wrap">
      <div className="description">
        <div className="desc-details">
          <h1 className="test__testDescription__title">Hi, Arpita!</h1>
          <ul>
            <li>
              You have 3 Calibration tests. Take caliberate tests to access test difficulty yourself.
              <Link to={`${props.match.path}/calibrateTest`}>  Know more about Caliberation Tests &nbsp; <i className="chevron-left"></i> </Link>
            </li>
            <li>
              See the interface of how canditates take your tests.
            <a target='_blank' rel="noopener noreferrer" href="http://192.168.1.188:8083/startTest?email=demo@mindscribble.com">View demo tests &nbsp; <i className="chevron-left"></i></a>
            </li>
            <li>
              Need help? Contact us at support@mindscribble.in
            <a href="#dashboard"  rel="noopener noreferrer">Contact us &nbsp;  <i className="chevron-left"></i></a>
            </li>
          </ul>
        </div>
      </div>
      <div className="count-wrap">
        <p className="count-title">Test Slots Remaining</p>
        <span>333</span>
        <span className="expiry-test-date">Notice: 30 test slots expiring in 22 days</span>
        <button onClick={() => { props.history.push(`${props.match.path}/generateTest`) }} className="btn btn-create">Create New Test</button>
        <button onClick={() => { props.history.push(`${props.match.path}/buyTests`) }} className="btn btn-tests"><p className="opacity">Buy More Tests</p></button>
      </div>
    </section>
  );

}

export default TestDescription;
