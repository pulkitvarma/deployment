import React from "react";
import "./ChartCard.scss";
import UPRChart from "../../../../shared/charts/uprChart";
interface IProps {
  dataX: Array<number>;
  bar: Array<number>;
  dataY: Array<{}>;
}
export default function ChartCard(props: IProps) {
  return (
    <div>
      <div className="vertical-line"></div>
      <div className="child3child1">
        <div className="headersFont">Performance charts</div>
      </div>
      <div className="reportGraphWrapper">
        <div className="ppr-wrapping">
          <div className="vertical-line highlight-fix"></div>
          <div className="pprWrapper">
            <div className="graphTitle">Planet Performance Report</div>
            <div className="ppr">
              <UPRChart
                xAxisText="Percetile"
                yAxisText="Total Score"
                xAxisValues={props.dataX}
                barLabel="Percentile"
                barColor="#3C5185"
                barData={props.bar}
                lineLabel="Score"
                lineData={props.dataY}
                lineBgColor="rgba(60, 81, 133, 0.1)"
                lineBorderColor="rgba(60, 81, 133, 0.1)"
                linePointBorderColor="rgba(75,192,192,1)"
                linePointBackgroundColor="#fff"
                linePointHoverBackgroundColor="rgba(75,192,192,1)"
                linePointHoverBorderColor="rgba(220,220,220,1)"
              />
            </div>
          </div>
        </div>
        <div className="upr-wrapping">
          <div className="vertical-line highlight-fix"></div>
          <div className="uprWrapper">
            <div className="graphTitle">Universal Performance Report</div>
            <div className="upr">
              <UPRChart
                xAxisText="Percetile"
                yAxisText="Score"
                xAxisValues={props.dataX}
                barLabel="Percentile"
                barColor="#3C5185"
                barData={props.bar}
                lineLabel="Score"
                lineData={props.dataY}
                lineBgColor="rgba(60, 81, 133, 0.1)"
                lineBorderColor="rgba(60, 81, 133, 0.1)"
                linePointBorderColor="rgba(75,192,192,1)"
                linePointBackgroundColor="#fff"
                linePointHoverBackgroundColor="rgba(75,192,192,1)"
                linePointHoverBorderColor="rgba(220,220,220,1)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
