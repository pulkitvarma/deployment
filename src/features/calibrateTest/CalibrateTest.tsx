import "./CalibrateTest.scss";
import { totalScoreFormatter } from "../dashboard/reports/Reports";
import Modal from "./sendCalibrate/modal/Modal";
import React, { useState, useEffect } from "react";
import TabsHelper from "../../shared/tabs/tabsHelper/TabsHelper";
import SendCalibrate from "./sendCalibrate/SendCalibrate";
import { dateFormatter, getTimeStamp } from "../../shared/dateFormatter/dateFormatter";

const CalibrateTest = props => {
  const [data, setData] = useState({
    scheduled: {
      columns: [],
      rows: []
    },
    reports: {
      columns: [],
      rows: [],
      bptColumns: [],
    }
  });
  const [modal, setModal] = useState({
    open: false
  });

  const reportColumns = [
    "Email Id",
    "Test Date",
    "QA",
    "VA",
    "DI",
    "Total Score"
  ];
  const reportColumnsBpt = [
    "Email Id",
    "Test Date",
    "DS",
    "OOPs",
    "DBMS",
    "Total Score"
  ]
  const reportEmail = [
    "tony.stark@yourorg.com",
    "peter.parker@yourorg.com",
    "natasha.romanoff@yourorg.com"
  ];
  const reportTestDate = [
    "11/29/2019, 12:00 AM",
    "12/10/2019 08:23 AM",
    "01/12/2020 07:35 PM"
  ];
  const reportQuantative = ["90%", "30%", "60%"];
  const reportVerbal = ["57%", "57%", "40%"];
  const reportDataInterpret = ["57%", "57%", "20%"];
  const reportTotal = ["80%", "40%", "35%"];

  let resultReportTestDate = [];
  reportTestDate.forEach(date => {
    const result = dateFormatter("", date);
    resultReportTestDate.push({
      display: result.scheduledDate,
      timestamp: getTimeStamp(date)
    });
  });

  let reportRows = [];

  reportEmail.forEach((element, index) => {
    reportRows.push({
      email: element,
      date: resultReportTestDate[index],
      quant: reportQuantative[index],
      verbal: reportVerbal[index],
      interpret: reportDataInterpret[index],
      total: reportTotal[index]
    });
  });

  totalScoreFormatter(reportRows);

  const resend = name => { };

  const deleteClicked = name => { };

  const scheduledColumns = [
    "Email Id",
    "Scheduled Date",
    "Expiry Date",
    "Test Status",
    "Resend Test",
    "Cancel Test"
  ];
  const email = [
    "tony.stark@yourorg.com",
    "peter.parker@yourorg.com",
    "natasha.romanoff@yourorg.com"
  ];
  const testDate = [
    "11/21/2019, 12:00 AM",
    "10/10/2019 08:23 AM",
    "09/12/2019 07:35 PM"
  ];
  const expiryDate = [
    "11/29/2019, 12:00 AM",
    "12/10/2019 08:23 AM",
    "01/12/2020 07:35 PM"
  ];
  const testStatus = ["Not Started", "In Progress", "Not Started"];
  let scheduledRows = [];

  let resultTestDate = [];
  testDate.forEach(date => {
    const result = dateFormatter("", date);
    resultTestDate.push({
      display: result.scheduledDate,
      timestamp: getTimeStamp(date)
    });
  });

  let resultExpiryDate = [];
  expiryDate.forEach(date => {
    const result = dateFormatter("", date);
    resultExpiryDate.push({
      display: result.scheduledDate,
      timestamp: getTimeStamp(date)
    });
  });

  email.forEach((element, index) => {
    scheduledRows.push({
      email: element,
      date: resultTestDate[index],
      expiryDate: resultExpiryDate[index],
      status: testStatus[index]
    });
  });

  scheduledRows.forEach((element, index) => {
    element.resend = `<div value='${index}' alt="Resend Icon" onClick='${() =>
      resend(element.name)}'><i class="resend-icon"></i></div>`;
    element.delete = `<div  value='${index}' alt="Delete Icon" onClick='${() =>
      deleteClicked(element.name)}'><i class="cancel-icon"></i></div>`;
  });

  useEffect(() => {
    setData({
      scheduled: {
        rows: scheduledRows,
        columns: scheduledColumns
      },
      reports: {
        rows: reportRows,
        columns: reportColumns,
        bptColumns: reportColumnsBpt
      }
    });
  }, []);

  const setModalOpen = () => {
    setModal({
      open: true
    })
  }

  const closeModal = () => {
    setModal({
      open: false
    });
  };
  return (
    <div className="calibration-test">
      <div className="calibration-area">
        <div className="vertical-line"></div>
        <div className="area">
          <label className="heading">Caliberation</label>
        </div>
        <p className="horizontal-line"></p>
        <div className="calibrate-heading">
          <div className="calibration-text-area">
            <p className="caliberation-text">
              {" "}
              You can adjust your cutoff percentage by taking a test by
              yourself, called caliberation test.
            </p>
            <p className="caliberation-text">
              {" "}
              When you or your colleague takes a caliberation test, a
              comprehensive report is generated for the test. Based on this
              report, you can set cutoff percentage of the tests you generate
              for candidates.
            </p>
            <p className="caliberation-text note-heading">Note :</p>
            <p className="caliberation-text bullet">
              • Calibration Tests have to be taken by you or your colleague
              only.
            </p>
            <p className="caliberation-text bullet">
              • Calibration tests shall be proctoring disabled. We know you
              trust your people
            </p>
          </div>
          <div className="count-wrap calibrate-test__reset">
            <p className="count-title">Test Slots Remaining</p>
            <span className="calibration-count">333</span>
            <span className="expiry-test-date">
              Notice: 30 test slots expiring in 22 days
            </span>
            <button
              onClick={() => {
                setModalOpen();
              }}
              className="btn btn-create"
            >
              Send Calibration Test
            </button>
          </div>
        </div>
      </div>
      <div className="calibration-area">
        <div className="vertical-line"></div>
        <div className="area">
          <label className="heading">Calibration Scheduled Tests</label>
          <label className="sub-heading">
            View your currently scheduled calibration tests
          </label>
        </div>
        <TabsHelper
          gat={{ columns: data.scheduled.columns, rows: data.scheduled.rows }}
          gatClass={"gat-calibrate-scheduled"}
          bpt={{ columns: data.scheduled.columns, rows: data.scheduled.rows }}
          bptClass={"bpt-calibrate-scheduled"}
          permission={false}
          uid={'calibrateScheduled'}
        />
      </div>
      <div className="calibration-area bottom">
        <div className="vertical-line"></div>
        <div className="area">
          <p className="heading">Calibration Test Reports</p>
          <p className="sub-heading">
            Keep track of the performance of all candidates
          </p>
        </div>
        <TabsHelper
          gat={{ columns: data.reports.columns, rows: data.reports.rows }}
          gatClass={"gat-calibrate-report"}
          bpt={{ columns: data.reports.bptColumns, rows: data.reports.rows }}
          bptClass={"bpt-calibrate-report"}
          permission={false}
          uid={'calibrateReports'}
        />
      </div>
      {modal.open ? (
        <div id="myModal" className="modal">
          <Modal
            width="80%"
            onClose={closeModal}
            dataToDisplay={
              <SendCalibrate
                testType={"gat"}
                onClose={closeModal}
              ></SendCalibrate>
            }
            title={"Send Calibrate Test"}
          />
        </div>
      ) : (
          <span></span>
        )}
    </div>
  );
};

export default CalibrateTest;
