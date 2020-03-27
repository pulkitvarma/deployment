import "./ScheduledComponent.scss";
import React, { useState, useEffect } from "react";
import Table from "../../../shared/table/Table";
import { dateFormatter } from "../../../shared/dateFormatter/dateFormatter";

interface IProps {
  history: { push: Function },
  match: {
    path: string
  }
}

export default function ScheduledComponent(props: IProps) {

  const [data, setData] = useState({ columns: [], rows: [] });

  const apiColumns = [
    "Email Id",
    "Test Type",
    "Scheduled Date",
    "Expiry Date",
    "Test Status",
    "Resend Test"
  ];

  const email = [
    "example@gmail.com",
    "pulkit@gmail.com",
    "nirmit@gmail.com",
    "anand@gmail.com",
    "hari@gmail.com"
  ];

  const scheduledDate = [
    "03/27/2020, 01:23 PM",
    "03/26/2020, 12:00 PM",
    "03/28/2020, 11:23 AM",
    "02/21/2020, 10:20 PM",
    "02/20/2020, 08:23 AM"
  ];

  const expiryDate = [
    "02/11/2021, 01:23 PM",
    "11/17/2021, 12:00 PM",
    "11/18/2021, 11:23 AM",
    "11/19/2020, 10:20 PM",
    "11/20/2021, 08:23 AM"
  ];

  const testStatus = [
    "Scheduled",
    "In progress",
    "Scheduled",
    "Scheduled",
    "In progress"
  ];

  const testType = [
    "Basic Programming Test",
    "General Aptitude Test",
    "Basic Programming Test",
    "General Aptitude Test",
    "General Aptitude Test"
  ];

  let resultScheduledDate = [];
  scheduledDate.forEach(date => {
    const result = dateFormatter('', date);
    resultScheduledDate.push(result.scheduledDate);
  })

  let resultExpiryDate = [];
  expiryDate.forEach(date => {
    const result = dateFormatter('', date);
    resultExpiryDate.push(result.scheduledDate);
  })

  const rows: Array<any> = generatingData(email, testType, resultScheduledDate, resultExpiryDate, testStatus);

  useEffect(() => {
    setData({ columns: apiColumns, rows: rows });
  }, []);

  if (data.rows.length !== 0) {
    return (
      <div className="scheduled-test">
        <div className="vertical-line"></div>
        <div className="area">
          <div className="flex-area1">
            <label className="heading">Scheduled Test</label>
            <label className="sub-heading">
              View your currently scheduled tests
          </label>
          </div>
          <button
            onClick={() => {
              props.history.push(`${props.match.path}/ScheduledTest`);
            }}
            className="link"
          >
            View All &nbsp;<i className="chevron-left bold"></i>
          </button>
        </div>
        <div className="table-area">
          <Table
            className={"dashboard-scheduled-test"}
            columns={data.columns}
            rows={data.rows}
            pagingPermission={false}
            searchingPermission={false}
            sortablePermission={false}
            hostory={props.history}
          />
        </div>
      </div>
    );
  }
  else {
    return null;
  }
}

export const generatingData = (...args): Array<{}> => {

  let rows = [];

  args[0].forEach((element, index) => {
    rows.push({
      email: element,
      testType: args[1][index],
      scheduledDate: args[2][index],
      expiryDate: args[3][index],
      testStatus: args[4][index]
    });
  });

  rows.forEach((element, index) => {
    element.resend = `<div value='${index}' alt="Resend Icon" onClick='${() =>
      resend(element.name)}'><i class="resend-icon"></i></div>`;
  });

  return rows;

}

const resend = name => { };


