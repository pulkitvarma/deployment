import "./Reports.scss";
import { dateFormatter } from "../../../shared/dateFormatter/dateFormatter";
import React, { useEffect, useState } from "react";
import Table from "../../../shared/table/Table";

interface IProps {
  match: {
    path: string
  },
  history: {
    push: Function
  }
}

export default function Reports(props: IProps) {

  const [data, setData] = useState({ columns: [], rows: [] });

  const apiColumns = [
    "Email Id",
    "Test Type",
    "Test Date",
    "Org. Rank",
    "Total Score"
  ];

  const rows = generateData();

  totalScoreFormatter(rows);

  useEffect(() => {
    setData({ columns: apiColumns, rows: rows });
  }, []);

  if (data.rows.length !== 0) {
    return (
      <div className="report-test">
        <div className="vertical-line"></div>
        <div className="area">
          <div className="flex-area1">
            <label className="heading">Reports</label>
            <label className="sub-heading">
              Keep track of the performance of all candidates by clicking “View
              All”
          </label>
          </div>
          <button
            onClick={() => {
              props.history.push(`${props.match.path}/reports`);
            }}
            className="link"
          >
            View All &nbsp;<i className="chevron-left bold"></i>
          </button>
        </div>
        <div className="table-area">
          <Table
            className={"dashboard-reports"}
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

export const generateData = () => {

  const email = [
    "example@gmail.com",
    "pulkit@gmail.com",
    "nirmit@gmail.com",
    "anand@gmail.com",
    "hari@gmail.com"
  ];
  const testType = [
    "Basic Programming Test",
    "General Aptitude Test",
    "Basic Programming Test",
    "General Aptitude Test",
    "General Aptitude Test"
  ];
  const testDate = [
    "02/17/2020, 01:23 PM",
    "02/16/2019, 12:00 PM",
    "11/18/2019, 11:23 AM",
    "11/19/2019, 10:20 PM",
    "11/20/2019, 08:23 AM"
  ];
  const rank = ["3", "2", "4", "1", "5"];
  const total = ["90%", "80%", "10%", "60%", "30%"];
  let resultDate = [];
  testDate.forEach(date => {
    const result = dateFormatter('', date);
    resultDate.push(result.scheduledDate);
  })
  let rows = [];
  rank.forEach((element, index) => {
    rows.push({
      email: email[index],
      testType: testType[index],
      testDate: resultDate[index],
      rank: element,
      total: total[index]
    });
  });
  return rows;
}

export const totalScoreFormatter = (element) => {
  element.forEach((el, index) => {
    const totalScore = parseInt(
      el.total.slice(0, el.total.length - 1)
    );
    const label = `
    <label class="total-score">${totalScore + "%"}</label>
    <label class="tooltip-icon"><i class="info-icon"></i></label>`;
    if (totalScore > 80) {
      el.total = `
      <div class="total-button ${index + 1} dark-green">
       ${label}
      </div>
    `;
    } else if (totalScore > 60) {
      el.total = `
      <div class="total-button ${index + 1} light-green">
      ${label}
      </div>
    `;
    } else if (totalScore > 40) {
      el.total = `
      <div class="total-button ${index + 1} yellow">
      ${label}
      </div>
    `;
    } else if (totalScore > 20) {
      el.total = `
      <div class="total-button ${index + 1} orange">
      ${label}
      </div>
    `;
    } else {
      el.total = `
    <div class="total-button ${index + 1} red">
    ${label}
    </div>
  `;
    }
  });
}
