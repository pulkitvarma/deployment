import React from "react";
import "./PerformanceCard.scss";
import CircularProgressBar from "../../../../shared/circularProgressBar/CircularProgressBar";

interface IProps {
  performance: { value: number; color: string; level: string };
  ethics: { value: number; color: string; level: string };
  ranks: { universe: number, org: number }
}
export default function PerformanceCard(props: IProps) {
  const levelPerformace = ["Outstanding", "Excellent", "High", "Moderate", "Poor"];
  const levelEthics = [
    "Ideal",
    "Conscientious",
    "Reliable",
    "Doubtful",
    "Unreliable"
  ];
  const calcRank = (rank:number) => {
    let pp = ''
    switch (rank) {
      case 1:
        pp = 'st'
        break;
      case 2:
        pp = 'nd'
        break;
      case 3:
        pp = 'rd'
        break;
      default:
        pp = 'th'
        break;
    }
    return pp
  }
  return (
    <div className="boxing">
      <div className="vertical-line"></div>
      <div className="child3child1">
        <div className="headersFont">Performance Card</div>
      </div>
      <div className="child3child2">
        <div className="rankWrapper">
          <div className="plantRankWrapper">
            <div className="rankBox">
              <div className="bigRank">{props.ranks.org}<span style={{ fontSize: '16px' }}>{calcRank(props.ranks.org)}</span></div>
            </div>
            <div style={{ marginLeft: "4%" }}>
              <div className="rankType">Organisation Rank</div>
              <div className="rankFraction">2/20</div>
            </div>
          </div>
          <div className="plantRankWrapper" style={{ marginBottom: "0px" }}>
            <div className="rankBox">
              <div className="bigRank">{props.ranks.universe}<span style={{ fontSize: '16px' }}>{calcRank(props.ranks.universe)}</span></div>
            </div>
            <div style={{ marginLeft: "4%" }}>
              <div className="rankType">Universal Rank</div>
              <div className="rankFraction">2/21000</div>
            </div>
          </div>
        </div>
        <div className="accuracy-wrapping">
          <div className="vertical-line  highlight-fix"></div>
          <div className="accuracyWrapper">
            <div className="subReportTitle">Accuracy Report</div>
            <div style={{ display: "flex" }}>
              <div className="circleCss">
              <CircularProgressBar progress={props.performance.value} backgroundColor={props.performance.color}></CircularProgressBar>
              </div>
              <div className="performanceLegend">
                {levelPerformace.map((el, i) => {
                  if (el === props.performance.level) {
                    return (
                      <div key={i}>
                        <span className="performanceTextEn">{el}</span>
                      </div>
                    );
                  } else {
                    return (
                      <div key={i}>
                        <span className="performanceTextDis">{el}</span>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="ethics-wrapping">
          <div className="vertical-line highlight-fix"></div>
          <div className="ethicsWrapper">
            <div className="subReportTitle">Ethics Report</div>
            <div className="" style={{ display: "flex"}}>
              <div className="circleCss">
                {/* <CircularProgress
                  value={props.ethics.value}
                  pathColor={props.ethics.color}
                  textColor={"#3C5185"}
                /> */}
                 <CircularProgressBar progress={props.ethics.value} backgroundColor={props.ethics.color}></CircularProgressBar>
              </div>
              <div className="performanceLegend">
                {levelEthics.map((el, i) => {
                  if (el === props.ethics.level) {
                    return (
                      <div key={i}>
                        <span className="performanceTextEn">{el}</span>
                      </div>
                    );
                  } else {
                    return (
                      <div key={i}>
                        <span className="performanceTextDis">{el}</span>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
