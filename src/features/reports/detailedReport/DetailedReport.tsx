import * as React from "react";
import "./DetailedReport.scss";
import share from "../.././../assets/share.svg";
import download from "../.././../assets/download.svg";
import PerformanceCard from "./performanceCard/PerformanceCard";
import ChartCard from "./chartCard/ChartCard";
import IprCard from "./iprCard/IprCard";
import ScoreTables from "./violationsScoreTables/violationsScoreTables";
import a from "../../../assets/Webcam/a.jpg";
import b from "../../../assets/Webcam/b.jpg";
import c from "../../../assets/Webcam/c.jpg";
import d from "../../../assets/Webcam/d.jpg";
import e from "../../../assets/Webcam/e.jpg";
import CandidateDetails from "./candidateDetails/CandidateDetails";
import DataTransformationService from "../../dataTransformation.service";
import { downloadPDF } from '../../features';
import ProctoringCard from "./proctoringCard/ProctoringCard";
import FeedBackCard from "./feedbackCard/FeedbackCard";
import ImagePopUp from './imagePopUp/ImagePopUp';
interface IState {
  open: boolean;
  data: { type: string; url: string };
  dataX: number[];
  dataY: Array<{}>;
  bar: number[];
}

interface IProps { }

class DetailedReport extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      open: false,
      data: { type: "", url: "" },
      dataX: [],
      dataY: [{}],
      bar: []
    };
  }
  tranform = new DataTransformationService();
  imageSrcs = [a, b, c, d, e];
  apiColumnsForScoreCard = [
    "Categories",
    "Score",
    "Average Time Taken",
    "Accuracy",
    "Global Average Score",
    "Global highest score",
    "Level"
  ];
  apiRowsForScoreCard = [
    {
      categories: "Quantitative Aptitude",
      score: "x%",
      averageTime: "x min",
      accuracy: "y%",
      globalAverageScore: "x%",
      globalHighestScore: "x%",
      level: "Intermediate"
    },
    {
      categories: "Verbal Ability",
      score: "x%",
      averageTime: "x min",
      accuracy: "y%",
      globalAverageScore: "x%",
      globalHighestScore: "x%",
      level: "Intermediate"
    },
    {
      categories: "Data Interpretation",
      score: "x%",
      averageTime: "x min",
      accuracy: "y%",
      globalAverageScore: "x%",
      globalHighestScore: "x%",
      level: "Advanced"
    },
    {
      categories: "Total",
      score: "x%",
      averageTime: "",
      accuracy: "",
      globalAverageScore: "",
      globalHighestScore: "",
      level: ""
    }
  ];
  apiColumnsForViolations = [
    "Violations",
    "Quantative Aptitude",
    "Verbal Ability",
    "Data Interpretation",
    "Total Count"
  ];
  apiRowsForViolations = [
    {
      violations: "Screenshot",
      quantitativeAptitude: "x",
      verbalAbility: "x",
      dataInterpretation: "x",
      totalCount: "x"
    },
    {
      violations: "Copy Content",
      quantitativeAptitude: "x",
      verbalAbility: "x",
      dataInterpretation: "x",
      totalCount: "x"
    },
    {
      violations: "Open Dev Tools",
      quantitativeAptitude: "x",
      verbalAbility: "x",
      dataInterpretation: "x",
      totalCount: "x"
    },
    {
      violations: "Open New Tabs",
      quantitativeAptitude: "x",
      verbalAbility: "x",
      dataInterpretation: "x",
      totalCount: "x"
    },
    {
      violations: "Total Count",
      quantitativeAptitude: "x",
      verbalAbility: "x",
      dataInterpretation: "x",
      totalCount: "x"
    }
  ];

  componentDidMount(): void {
    let rawData = {
      barVal: { x: 51, y: 50 },
      tt2: [0, 4, 21, 45, 47, 51, 57, 90, 98, 100, 100]
    }
    let transformedData = this.tranform.developDataForCharts(rawData)
    this.setState({ dataX: transformedData.tt, dataY: transformedData.zz, bar: transformedData.tt1 }, () => {
    });
  }
  openModal = (): void => {
    this.setState({ open: true });
  };

  closeModal = (): void => {
    this.setState({ open: false });
  };


  public render() {

    return (
      <React.Fragment>
        <ImagePopUp open={this.state.open} closeModal={() => this.closeModal()} imageSrcs={this.imageSrcs} />
        <div className="ReportWrapper">
          <div style={{ marginTop: '30px' }} className="vertical-line"></div>
          <div className="rChild1">
            <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px' ,marginBottom:'30px'}}>
              <div>
                <div className="headersFont">Detailed Report</div>
                <div className='lastUpdated'>Last Updated: 24/11/2020</div>
              </div>
              <span className="downloadshare">
                <article className="clickable">
                  <img src={share} alt="share" className="iconsize" />
                  <span className="ppt">Share Report Link</span>
                </article>&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
              <article className="clickable">
                  <img src={download} alt="download" className="iconsize" />
                  <span onClick={() => { downloadPDF(); }} className="ppt">Download Report as PDF</span>
                </article>
              </span>
            </span>
          </div>
          <span id="myID">
            <div className="rChild2 paddings">
              <CandidateDetails percent={0.9} />
            </div>
            <div className="rChild3 paddings">
              <PerformanceCard
                performance={{ value: 71, color: "#A6C44D", level: "Excellent" }}
                ethics={{ value: 90, color: "#559352", level: "Conscientious" }}
                ranks={{ universe: 114, org: 2 }}
              />
            </div>
            <div className="rChild4">
              <ChartCard
                dataX={this.state.dataX}
                dataY={this.state.dataY}
                bar={this.state.bar}
              />
            </div>
            <div className="rChild4">
              <IprCard
                totalScore={{
                  value: "80",
                  color: "#A6C44D",
                  text: "Excellent"
                }}
                qa={{
                  value: "42",
                  color: "#FFC849",
                  text: "Quantative\xa0Aptitude"
                }}
                va={{
                  text: "Verbal\xa0Aptitude",
                  value: "90",
                  color: "#559352"
                }}
                di={{
                  text: "Data\xa0Interpretation",
                  value: "65",
                  color: "#A6C44D"
                }}
              />
            </div>
            <div className="rChild4">
              <ScoreTables
                title={"Score Card"}
                class={"score-table"}
                tablecss={"reportTables"}
                helperText={"View section wise score details"}
                apiColumns={this.apiColumnsForScoreCard}
                apiRows={this.apiRowsForScoreCard}
              />
            </div>
            <div className="rChild4">
              <ScoreTables
                title={"Violations Table"}
                class={"violations-table"}
                tablecss={"reportTables"}
                helperText={
                  "Check for violations during the test. Verify ethical candidates"
                }
                apiColumns={this.apiColumnsForViolations}
                apiRows={this.apiRowsForViolations}
              />
            </div>
            <div className="rChild4">
              <FeedBackCard />
            </div>
          </span>
          <div className="rChild4">
            <ProctoringCard openModal={this.openModal} imageSrcs={this.imageSrcs} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DetailedReport;
