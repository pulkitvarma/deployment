import * as React from "react";
import Table from "../../table/Table";
import "./Gat.scss";

interface IProps {
  className: string,
  columns: Array<string>,
  rows: Array<object>,
  permission: boolean,
  history:any
}

export function GAT(props: any) {
  return (
    <div className="table-wrapper">
      <div className="table-data">
        <Table
          className={props.className}
          columns={props.columns}
          rows={props.rows}
          pagingPermission={props.permission}
          searchingPermission={props.permission}
          sortablePermission={props.permission}
          history = {props.history}
        ></Table>
      </div>
    </div>
  );
}

export default GAT;