import "./Table.scss";
import PropTypes from 'prop-types';
import React, { Component } from "react";
require("datatables.net");
require("datatables.net-responsive");
const $ = require("jquery");

export default class Table extends Component {

  /*It integrates the Jquery DataTable into the system and processes it according to the necessary requirements.*/

  state = {
    row: this.props.rows,
    column: []
  };

  generatedColumn = []; // to generate the columns in order to remove the id element to be displayed in the table

  componentDidMount() {
    this.props.columns.forEach(element => { // to not display the ID column
      if (element !== "ID") {
        this.generatedColumn.push(element);
      }
    });
    this.setState({
      column: this.generatedColumn
    });
    this.jqueryFunction();
  };

  componentDidUpdate(prevProps) {
    if (prevProps.rows.length !== this.props.rows.length) {
      var className = this.props.className;
      this.reinitializeDataTable(className);
      this.setState({
        row: this.props.rows
      });
      this.jqueryFunction();
    }
    else {
      return;
    }
  }

  reinitializeDataTable(className) {
    if ($.fn.DataTable.isDataTable("#" + className)) {
      $("#" + className)
        .DataTable()
        .clear()
        .destroy();
    }
  }

  jqueryFunction() {
    /* to initialize dataTable and its properties */
    const className = this.props.className;
    const rowData = this.props.rows;
    const permission = this.props.pagingPermission;
    var my_columns = [];
    const that = this;
    $(document).ready(function () {
      $.each(rowData[0], function (key) {
        var my_item = {};
        if (key !== "id") {
          my_item.data = key;
          my_columns.push(my_item);
        }
      });
      if ($.fn.dataTable.isDataTable('#' + className)) { // if datatable is already initalized
        return;
      }
      else {
        if (permission) { // if paging and search permission is to be enabled on the datatable
          that.permissionEnabled(className, rowData, my_columns);
        }
        else { // if paging and search permission is to be disabled on the datatable
          that.permissionDisabled(className, rowData, my_columns);
        }
      }
      $("#" + className).addClass(className);
      $(".dataTables_length").children().css("width", "190px");
      $(".dataTables_length").css("margin-bottom", "15px")
      $(".dataTables_filter").children().children().addClass("searchBox");
      $(".dataTables_filter").children().children().attr("placeholder", "Search by email or score");
    });
  }

  clicked = (id) => {
    // window.open('http://localhost:3000/reports/detailedReport',"_blank")
    this.props.history.push('/application/reports/detailedReport');
  };

  disableParticularColumnSorting = (...args) => { // to disable sorting on particular columns 
    $("#" + args[1]).DataTable({
      responsive: {
        details: {
          type: "inline"
        }
      },
      order: [],
      data: args[2],
      columns: args[3],
      "paging": false,
      "searching": false,
      "info": false,
      columnDefs: [{ orderable: false, targets: args[0] }]
    });
  };

  disableSorting = (className, rowData, my_columns) => { // to completely disable sorting
    $("#" + className).DataTable({
      responsive: {
        details: {
          type: "inline"
        }
      },
      order: [],
      data: rowData,
      columns: my_columns,
      "paging": false,
      "searching": false,
      "info": false,
      "bSort": false
    });
  }

  disableParticularColumnSearch = (className, rowData, my_columns) => { // to completely disable search on particular columns
    $("#" + className).DataTable({
      responsive: {
        details: {
          type: "inline"
        }
      },
      order: [],
      data: rowData,
      columns: my_columns,
      columnDefs: [
        { searchable: false, targets: [1, 2, 4, 5] },
        { orderable: false, targets: [4, 5] }
      ]
    });
  };

  permissionEnabled = (className, rowData, my_columns) => {
    if (className === 'gat__scheduled' || className === 'bpt__scheduled') {
      let columns = my_columns;
      columns[1].data = {
        _: "scheduledDate.display",
        sort: "scheduledDate.timestamp"
      }
      columns[2].data = {
        _: "expiryDate.display",
        sort: "expiryDate.timestamp"
      }
      this.disableParticularColumnSearch(className, rowData, columns);
    }
    else if (className === 'gat-reports' || className === 'bpt-reports') {
      let columns = my_columns;
      columns[2].data = {
        _: "testDate.display",
        sort: "testDate.timestamp"
      }
      this.enabledInitiateDataTable(className, rowData, columns);
      const tableId = $('#' + className).DataTable();
      $('#' + className).on('click', 'tbody tr', () => {
        var data = tableId.row(this);
        this.clicked(data.id);
      });
    }
    else {
      this.enabledInitiateDataTable(className, rowData, my_columns)
    }
  }

  enabledInitiateDataTable = (className, rowData, my_columns) => {
    $('#' + className).DataTable({
      responsive: {
        details: {
          type: 'inline',
        }
      },
      "order": [],
      data: rowData,
      "columns": my_columns,
    });
  }

  disabledInitiateDataTable = (className, rowData, my_columns) => {
    $('#' + className).DataTable({
      responsive: {
        details: {
          type: 'inline',
        }
      },
      data: rowData,
      "columns": my_columns,
      "paging": false,
      "searching": false,
      "order": [],
      "info": false
    });
  }

  permissionDisabled = (className, rowData, my_columns) => {
    if (className === 'dashboard-reports') {
      this.disableSorting(className, rowData, my_columns)
    }
    else if (className === 'dashboard-scheduled-test') {
      this.disableSorting(className, rowData, my_columns);
    }
    else if (className === 'test-slots-main-table') {
      this.disableParticularColumnSorting([1, 2, 3, 4, 5, 6], className, rowData, my_columns);
    }
    else if (className === 'purchaseHistory') {
      let columns = my_columns;
      columns[1].data = {
        _: "purchasing.display",
        sort: "purchasing.timestamp"
      }
      columns[2].data = {
        _: "valid.display",
        sort: "valid.timestamp"
      }
      this.disableSorting(className, rowData, columns);
    }
    else if (className === 'gat-scheduled' || className === 'bpt-scheduled') {
      this.disableParticularColumnSorting([5], className, rowData, my_columns);
    }
    else if (className === 'gat-calibrate-scheduled' || className === 'bpt-calibrate-scheduled') {
      let columns = my_columns;
      columns[1].data = {
        _: "date.display",
        sort: "date.timestamp"
      }
      columns[2].data = {
        _: "expiryDate.display",
        sort: "expiryDate.timestamp"
      }
      this.disabledInitiateDataTable(className, rowData, columns);
    }
    else if(className === 'gat-calibrate-report' || className === 'bpt-calibrate-report'){
      let columns = my_columns;
      columns[1].data = {
        _: "date.display",
        sort: "date.timestamp"
      }
      this.disabledInitiateDataTable(className, rowData, columns);
    }
    else {
      this.disabledInitiateDataTable(className, rowData, my_columns);
    }
  }


  render() {
    let tableHeader = (
      <React.Fragment>
        {this.state.column.map((element, index) => (
          <th key={index}>{element}</th>
        ))}
      </React.Fragment>
    )
    return (
      <div>
        <table id={this.props.className} className="row-border hover nowrap">
          <thead >
            <tr>
              {tableHeader}
            </tr>
          </thead>
        </table>
      </div>
    )
  }

}

Table.propTypes = {
  className: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  pagingPermission: PropTypes.bool.isRequired,
  searchingPermission: PropTypes.bool.isRequired,
  sortablePermission: PropTypes.bool.isRequired,
  history: PropTypes.object
}
