import React, { useEffect, useState } from "react";
import "./Reports.scss";
import CustomTabs from "../../shared/tabs/CustomTabs";
import GAT from "../../shared/tabs/gat/Gat";
import BPT from "../../shared/tabs/bpt/Bpt";
import { Features, filterRows } from "../features";
import Tags from "../../shared/tabs/tags/Tags";
import DataTransformationService from '../dataTransformation.service';
import { dateFormatter, getTimeStamp } from "../../shared/dateFormatter/dateFormatter";
interface IProps {
  history: any;
  match: any;
}

const apiColumns1Gat = [
  "Rank",
  "Email Id",
  "Test Date",
  "QA",
  "VA",
  "DI",
  "Total Score",
  "ID"
];

const apiColumns1Bpt = [
  "Rank",
  "Email Id",
  "Test Date",
  "DS",
  "OOPs",
  "DBMS",
  "Total Score",
  "ID"
];


const rank = ["1", "4", "5", "3", "2"];
const email = ["example@gmail.com", "pulkit@gmail.com", "nirmit@gmail.com", "anand@gmail.com", "hari@gmail.com"];
const testDate = ["02/11/2020, 01:23 PM",
  "11/17/2019, 12:00 PM",
  "11/18/2019, 11:23 AM",
  "11/19/2019, 10:20 PM",
  "11/20/2019, 08:23 AM"];
const quant = ["90%", "80%", "70%", "60%", "30%"];
const verbal = ["90%", "80%", "70%", "60%", "30%"];
const di = ["90%", "80%", "70%", "60%", "30%"];
const oops = ["90%", "80%", "70%", "60%", "30%"];
const ds = ["90%", "80%", "70%", "60%", "30%"];
const dbms = ["90%", "80%", "70%", "60%", "30%"];
const total = ["90%", "80%", "60%", "10%", "30%"];
const id = ["1", "2", "3", "4", "5"];

let resultTestDate = [];
testDate.forEach(date => {
  const result = dateFormatter('', date);
  resultTestDate.push({
    display: result.scheduledDate,
    timestamp: getTimeStamp(date)
  });
});

let rows = [];
rank.forEach((element, index) => {
  rows.push({
    rank: element,
    email: email[index],
    testDate: resultTestDate[index],
    quant: quant[index],
    verbal: verbal[index],
    di: di[index],
    total: total[index],
    id: id[index]
  })
});
let rowsBpt = []
rank.forEach((element, index) => {
  rowsBpt.push({
    rank: element,
    email: email[index],
    testDate: resultTestDate[index],
    ds: ds[index],
    oops: oops[index],
    dbms: dbms[index],
    total: total[index],
    id: id[index]
  })
});

export function Reports(props: IProps) {
  const [bptData, setBptData] = useState({ columns: [], rows: [] });
  const [gatData, setGatData] = useState({ columns: [], rows: [] });
  const [tags, setTags] = useState([""]);
  const [selecetedTags, setSelecetedTags] = useState([]);
  const transform = new DataTransformationService();
  useEffect(() => {
    generatingSettingRows(rows, rowsBpt);
    setTags([
      "nirmit@gmail.com",
      "pulkit@gmail.com",
      "anand@gmail.com",
      "arpita@gmail.com",
      "hari@gmail.com"
    ]);
  }, []);

  const generatingSettingRows = (rawDataGat, rawDataBpt) => {
    let generatedRows = transform.developRowsForReports([...rawDataGat], [...rawDataBpt]);
    setBptData({ columns: apiColumns1Bpt, rows: generatedRows.bpt });
    setGatData({ columns: apiColumns1Gat, rows: generatedRows.gat });
  };

  const handleChange = (e, i) => {
    let z = [...selecetedTags];
    const tagsSelected = Features(e, i, z);
    setSelecetedTags(tagsSelected);
  };

  useEffect(() => {
    if (selecetedTags.length !== 0) {
      let filterRowsGat: Array<{}> = [];
      let filterRowsBpt: Array<{}> = [];
      filterRowsGat = filterRows(rows, selecetedTags)
      filterRowsBpt = filterRows(rowsBpt, selecetedTags)
      generatingSettingRows(filterRowsGat, filterRowsBpt);
    } else {
      generatingSettingRows(rows, rowsBpt);
    }
  }, [selecetedTags]);

  return (
    <div className="reportTest-wrapper">
      <div className="report-test">
        <div className="vertical-line"></div>
        <div className="area">
          <div className="flex-area1">
            <label className="heading">Reports</label>
            <label className="sub-heading">
              Get detailed reports on the overall and section-wise performance of candidates by clicking on individual rows
            </label>
            <Tags tags={tags} change={handleChange}></Tags>
          </div>
        </div>
        {bptData.rows.length > 0 || gatData.rows.length > 0 ? (
          <div className="table-area">
            <CustomTabs
              uid='rpMaster'
              data={[
                {
                  label: "General Aptitude Test",
                  element: (
                    <GAT
                      className={"gat-reports"}
                      columns={gatData.columns}
                      rows={gatData.rows}
                      permission={true}
                      history={props.history}
                    />
                  )
                },
                {
                  label: "Basic Programming Test",
                  element: (
                    <BPT
                      className={"bpt-reports"}
                      columns={bptData.columns}
                      rows={bptData.rows}
                      permission={true}
                      history={props.history}
                    />
                  )
                }
              ]}
              activeTab={gatData.rows.length === 0 ? 1 : 0}
            />
          </div>
        ) : (
            <span></span>
          )}
      </div>
    </div>
  );
}

export default Reports;
