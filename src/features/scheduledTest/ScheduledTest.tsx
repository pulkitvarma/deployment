import "./ScheduledTest.scss";
import { Features, filterRows } from "../features";
import { updateIconsInRows } from '../dataTransformation.service';
import { dateFormatter, getTimeStamp } from "../../shared/dateFormatter/dateFormatter";
import { handleChangeFunc, formatDateFunc, rowsObjectArray, scheduleTestProps, setBptDataFunc, setGatDataFunc, setSearchRowsFunc, settingDataFunc, settingSearchDataFunc } from "./modals/scheduleTest.modals";
import BPT from "../../shared/tabs/bpt/Bpt";
import CustomTabs from "../../shared/tabs/CustomTabs";
import GAT from "../../shared/tabs/gat/Gat";
import React, { useEffect, useState } from "react";
import Tags from "../../shared/tabs/tags/Tags";

const email = ["pulkit@nineleaps.com", "roy@nineleaps.com", "hari.harasudhan@nineleaps.com", "arpita@nineleaps.com", "nirmit@nineleaps.com"];
const scheduledDate = ["03/27/2020, 01:23 PM", "03/26/2020, 12:00 PM", "03/28/2020, 11:23 AM", "11/19/2019, 10:20 PM", "11/20/2019, 08:23 AM"];
const expiryDate = ["12/11/2019, 10:23 PM", "12/11/2019, 11:23 AM", "12/11/2019, 11:13 PM", "12/11/2019, 12:23 AM", "12/11/2019, 12:23 PM"];
const testStatus = ["Scheduled", "Generating Report", "Scheduled", "In Progress", "Scheduled"];
const id = ["1", "2", "3", "4", "5"];
const apiColumns = [
  "Email Id",
  "Scheduled Date",
  "Expiry Date",
  "Test Status",
  "Resend Test Link",
  "Cancel Test"
];

export default function ScheduledTest(props: scheduleTestProps) {
  let rows: any = [];
  email.forEach((element, index) => {
    rows.push({
      email: element,
      scheduledDate: scheduledDate[index],
      expiryDate: expiryDate[index],
      testStatus: testStatus[index],
      id: id[index],
      resend: '',
      cancel: ''
    });
  });

  const [bptScheduledData, setScheduledBptData] = useState({
    columns: [],
    rows: []
  });
  const [gatScheduledData, setScheduledGatData] = useState({
    columns: [],
    rows: []
  });
  const [tags, setTags] = useState(['']);
  const [selectedTags, setSelectedTags] = useState([]);
  useEffect(() => {
    if (!props.location.state) {
      formatDate(rows);
      settingData(rows);
    }
    else {
      settingSearchData(props.location.state.data)
    }
  }, [props.location.state]);
  useEffect(() => {
    if (selectedTags.length !== 0) {
      let filterdRows: rowsObjectArray = [];
      filterdRows = filterRows(rows, selectedTags);
      setGatData(filterdRows);
      setBptData(filterdRows);
    } else if (!props.location.state) {
      settingData(rows);
    }
  }, [selectedTags]);

  const formatDate: formatDateFunc = (rows: any) => {
    rows.forEach(row => {
      let result = dateFormatter('', row.scheduledDate);
      row.scheduledDate = {
        display: result.scheduledDate,
        timestamp: getTimeStamp(row.scheduledDate)
      };
      result = dateFormatter('', row.expiryDate);
      row.expiryDate = {
        display: row.expiryDate,
        timestamp: getTimeStamp(row.expiryDate)
      };
    });
  }
  const settingSearchData: settingSearchDataFunc = (searchData) => {
    const rows = setSearchRows(searchData);
    const data = updateIconsInRows(rows);
    if (searchData.type === 'Basic Programming Test') {
      setBptData(data);
      setGatData([]);
    }
    else if (searchData.type === 'General Aptitude Test') {
      setGatData(data);
      setBptData([]);
    }
    else {
      return;
    }
  }
  const settingData: settingDataFunc = (rows) => {
    const data = updateIconsInRows(rows);
    setBptData(data);
    setGatData(data);
    setTags(["Nirmit@nineleaps.com", "pulkit@nineleaps.com", "Roy@nineleaps.com", "Arpita@nineleaps.com", "HariHarasudhan@nineleaps.com"]);
  }
  const setBptData: setBptDataFunc = (data) => {
    setScheduledBptData({
      rows: data,
      columns: apiColumns
    });
  }
  const setGatData: setGatDataFunc = (data) => {
    setScheduledGatData({
      rows: data,
      columns: apiColumns
    });
  }
  const

    setSearchRows: setSearchRowsFunc = (data) => {
      let rows = [];
      rows.push({
        email: data.email,
        scheduledDate: data.scheduledDate,
        expiryDate: data.expiryDate,
        testStatus: data.testStatus,
        id: data.id
      });
      return rows;
    }
  const handleChange: handleChangeFunc = (event, index) => {
    let tags = [...selectedTags];
    const tagsSelected = Features(event, index, tags);
    setSelectedTags(tagsSelected);
  };

  return (
    <div className="scheduled__wrapper">
      <div className="vertical-line"></div>
      <div className="scheduled__wrapper__header">
        <p className="scheduled__header__title">Scheduled Tests</p>
        <p className="scheduled__header__desc">All scheduled tests at a glance</p>
        {props.location.state ? <span></span> : <Tags tags={tags} change={handleChange}></Tags>}
      </div>
      <div className="scheduled__wrapper__content padding">
        {bptScheduledData.rows.length > 0 || gatScheduledData.rows.length > 0 ? (
          <CustomTabs
            data={[
              {
                label: "General Aptitude Test",
                element: (
                  <GAT
                    className={'gat__scheduled'}
                    columns={gatScheduledData.columns}
                    rows={gatScheduledData.rows}
                    permission={true}
                  />
                )
              },
              {
                label: "Basic Programming Test",
                element: (
                  <BPT
                    className={'bpt__scheduled'}
                    columns={bptScheduledData.columns}
                    rows={bptScheduledData.rows}
                    permission={true}
                  />
                )
              }
            ]}
            activeTab={gatScheduledData.rows.length === 0 ? 1 : 0}
          />
        ) : <span></span>}
      </div>
    </div>
  );
}