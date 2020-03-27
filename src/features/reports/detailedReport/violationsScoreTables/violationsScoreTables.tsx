import React from "react";
import Table from "../../../../shared/table/Table";
import "./violationsScoreTables.scss";

interface IProps {
  title: string;
  helperText: string;
  tablecss: string;
  class: string;
  apiColumns: Array<string>;
  apiRows: Array<{}>;
}

export default function ScoreTables(props: IProps) {
  return (
    <div>
      <div className="vertical-line"></div>
      <div className="child3child1">
        <div style={{ paddingBottom: "0px" }} className="headersFont">
          <div>{props.title}</div>
        </div>
        <div className="reportHelperText">{props.helperText}</div>
      </div>
      <div className={props.tablecss}>
        <Table
          className={props.class}
          columns={props.apiColumns}
          rows={props.apiRows}
          pagingPermission={false}
          searchingPermission={false}
          sortablePermission={false}
        />
      </div>
    </div>
  );
}
