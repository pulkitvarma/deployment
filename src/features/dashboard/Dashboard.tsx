import './Dashboard.scss';
import React from 'react';
import Reports from './reports/Reports';
import ScheduledComponent from './scheduledComponent/ScheduledComponent';
import TestDescription from './testDescription/TestDescription';
import TestSlotsUsage from './testSlotsUsage/TestSlotsUsage';
import OnBoarding from './onBoarding/OnBoarding';

interface IProps {
  history: { push: Function };
  location: {
    state: string
  },
  match: {
    path: string
  }
}

const Dashboard = (props: IProps) => {

  return (
    <React.Fragment>
      <div className="dashboard-wrap" id="dashboard">
        <OnBoarding />
        <TestDescription match={props.match} history={props.history} key="testDescription" />
        <ScheduledComponent match={props.match} history={props.history} key="scheduledComponent" />
        <Reports match={props.match} history={props.history} key="reports" />
        <TestSlotsUsage match={props.match} history={props.history} key="testSlotsUsage" />
      </div>
    </React.Fragment>
  );
}

export default Dashboard;
