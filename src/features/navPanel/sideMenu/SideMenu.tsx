import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import "./SideMenu.scss";

interface Props {}

export default function SideMenu(props): ReactElement {
  return (
    <React.Fragment>
      <ul>
        <Link to={`${props.data.match.path}/`} className="nav__list">
          Dashboard
        </Link>
        <Link to={`${props.data.match.path}/reports`} className="nav__list">
          Reports
        </Link>
        <Link
          to={`${props.data.match.path}/ScheduledTest`}
          className="nav__list list-wrap"
        >
          Scheduled Tests
        </Link>
        <li className="list-title">TESTS</li>
        <Link
          to={`${props.data.match.path}/generateTest`}
          className="nav__list"
        >
          Send Tests
        </Link>
        <Link to={`${props.data.match.path}/buyTests`} className="nav__list">
          Buy Test Slots
        </Link>
        <Link to={`${props.data.match.path}/testSlots`} className="nav__list">
          Test Slots Usage
        </Link>
        <Link
          to={`${props.data.match.path}/calibrateTest`}
          className="nav__list list-wrap"
        >
          Calibrate
        </Link>
        <li className="list-title">MORE</li>
        <Link to={`${props.data.match.path}/Account`} className="nav__list">
          Account Info
        </Link>
        <li className="nav__list">How To-Instructions</li>
        <li className="nav__list">Contact Support</li>
      </ul>
    </React.Fragment>
  );
}
