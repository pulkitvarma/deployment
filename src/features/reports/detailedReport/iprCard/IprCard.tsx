import React from "react";
import "./IprCard.scss";
import CircularProgressBar from "../../../../shared/circularProgressBar/CircularProgressBar";

interface IProps {
  totalScore: { value: string; color: string; text: string };
  qa: { value: string; color: string; text: string };
  va: { value: string; color: string; text: string };
  di: { value: string; color: string; text: string };
}

export default function IprCard(props: IProps) {
  return (
    <div>
      <div className="vertical-line"></div>
      <div className="child3child1">
        <div className="headersFont">Individual Performance Report</div>
      </div>
      <div className="circlesWrapper">
        <div className='outerDiv'>
          <div className="vertical-line highlight-fix"></div>
          <div className="totalScoreWrapper">
            <div className="sectionTitle">Total Score</div>
            <div className="circleMessageWrapper">
              <div className="circlecss">
                <CircularProgressBar progress={props.totalScore.value} backgroundColor={props.totalScore.color}></CircularProgressBar>
              </div>
              <div className="remark">{props.totalScore.text}</div>
            </div>
          </div>
        </div>
        <div style={{ width: "80%" }}>
          <div className="vertical-line highlight-fix"></div>
          <div className="sectionalScoreWrapper">
            <div className="sectionTitle">Sectional Score</div>
            <span style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ width: "30%" }}>
                <div className="circleMessageWrapper">
                  <div className="circlecss">
                  <CircularProgressBar progress={props.qa.value} backgroundColor={props.qa.color}></CircularProgressBar>
                  </div>
                  <div className="remark">{props.qa.text}</div>
                </div>
              </span>
              <span style={{ width: "30%" }}>
                <div className="circleMessageWrapper">
                  <div className="circlecss">
                  <CircularProgressBar progress={props.va.value} backgroundColor={props.va.color}></CircularProgressBar>
                  </div>
                  <div className="remark">{props.va.text}</div>
                </div>
              </span>
              <span style={{ width: "30%" }}>
                <div className="circleMessageWrapper">
                  <div className="circlecss">
                  <CircularProgressBar progress={props.di.value} backgroundColor={props.di.color}></CircularProgressBar>
                  </div>
                  <div className="remark">{props.di.text}</div>
                </div>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
