import "./TestSlotsUsage.scss";
import React from "react";

interface IProps {
  history: { push: Function };
  match: {
    path: string;
  };
}

export default function TestSlotsUsage(props: IProps) {
  const data = [
    {
      heading: "Tests Scheduled",
      score: "300",
      description: "Till today"
    },
    {
      heading: "Tests Completed",
      score: "250",
      description: "As on today"
    },
    {
      heading: "Tests Pending",
      score: "50",
      description: "As on Today"
    },
    {
      heading: "Test Slots Remaining",
      score: "200",
      description: "As on Today"
    }
  ];

  return (
    <div className="test-slots-usage">
      <div className="vertical-line"></div>
      <div className="area">
        <div className="flex-area1">
          <label className="heading">Test Slots Usage</label>
          <label className="sub-heading">
            View your test slots usage, scheduling history and slots
            availability
          </label>
        </div>
        <button
          onClick={() => {
            props.history.push(`${props.match.path}/testSlots`);
          }}
          className="link"
        >
          View Usage History &nbsp;<i className="chevron-left bold"></i>
        </button>
      </div>
      <div className="test-area">
        <div className="test-slots-area">
          {data.map((element, index) => {
            return (
              <div
                key={index}
                className={
                  index === 0 ? "slots-box margin-left__reset" : "slots-box"
                }
              >
                <p className="test-slots-heading">{element.heading}</p>
                <p className="test-slots-score">{element.score}</p>
                <p className="test-slots-description">{element.description}</p>
              </div>
            );
          })}
        </div>
        <p className="horizontal-line"></p>
        <button
          onClick={() => {
            props.history.push(`${props.match.path}/buyTests`);
          }}
          className="more-link"
        >
          Get More Test Slots &nbsp;<i className="chevron-left bold"></i>
        </button>
      </div>
    </div>
  );
}
