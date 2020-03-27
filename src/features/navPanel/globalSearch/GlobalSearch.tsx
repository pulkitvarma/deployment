import React, { Component } from "react";
import "./GlobalSearch.scss";
import SearchResults from "./searchResults/SearchResults";

interface IProps {
  history: { push: Function };
  ppq: Function;
  zzq: Function;
  location: any;
}
interface IState {
  searchText: string;
  visib: boolean;
  searchActive: boolean;
  scheduledContent: { data: Array<{}>; more: boolean };
  reportsContent: { data: Array<{}>; more: boolean };
  count: {
    total: number;
    scheduled: number;
    reports: number;
  };
  rawData: {
    scheduled: Array<{}>;
    reports: Array<{}>;
  };
  rawFiltered: {
    scheduled: Array<{}>;
    reports: Array<{}>;
    count: {
      total: number;
      scheduled: number;
      reports: number;
    };
  };
}

export default class GlobalSearch extends Component<IProps, IState> {
  // componentDidMount() {

  // }

  email = [
    "example@gmail.com",
    "nirmit@gmail.com",
    "arpita@gmail.com",
    "hari@gmail.com",
    "anand@gmail.com"
  ];
  type = [
    "Basic Programming Test",
    "General Aptitude Test",
    "Basic Programming Test",
    "Basic Programming Test",
    "General Aptitude Test",
    "Basic Programming Test"
  ];
  id = ["1", "1", "1", "1", "1"];
  scheduledDate = [
    "16 Nov 2019, 13:23",
    "17 Nov 2019, 14:23",
    "18 Nov 2019, 15:23",
    "19 Nov 2019, 16:23",
    "20 Nov 2019, 17:23"
  ];
  expiryDate = [
    "16 Dec 2019, 13:23",
    "17 Dec 2019, 14:23",
    "18 Dec 2019, 15:23",
    "19 Dec 2019, 16:23",
    "20 Dec 2019, 17:23"
  ];
  testStatus = [
    "Scheduled",
    "In Progress",
    "In Progress",
    "Scheduled",
    "Scheduled"
  ];

  constructor(props: IProps) {
    super(props);
    this.search_reset = this.search_reset.bind(this);
    this.state = {
      searchText: "",
      visib: false,
      searchActive: false,
      scheduledContent: { data: [{}], more: false },
      reportsContent: { data: [{}], more: false },
      count: {
        total: 0,
        scheduled: 0,
        reports: 0
      },
      rawFiltered: {
        scheduled: [{}],
        reports: [{}],
        count: {
          total: 0,
          scheduled: 0,
          reports: 0
        }
      },
      rawData: {
        scheduled: [
          {
            email: "example@gmail.com",
            type: "Basic Programming Test",
            id: "1",
            scheduledDate: "16 Nov 2019, 13:23",
            expiryDate: "16 Nov 2019, 13:23",
            testStatus: "In Progress"
          },
          {
            email: "nirmit@gmail.com",
            type: "General Aptitude Test",
            id: "1",
            scheduledDate: "16 Nov 2019, 13:23",
            expiryDate: "16 Nov 2019, 13:23",
            testStatus: "Scheduled"
          },
          {
            email: "arpita@gmail.com",
            type: "Basic Programming Test",
            id: "1",
            scheduledDate: "16 Nov 2019, 13:23",
            expiryDate: "16 Nov 2019, 13:23",
            testStatus: "Scheduled"
          },
          {
            email: "hari@gmail.com",
            type: "General Aptitude Test",
            id: "1",
            scheduledDate: "16 Nov 2019, 13:23",
            expiryDate: "16 Nov 2019, 13:23",
            testStatus: "Unattempted"
          },
          {
            email: "anand@gmail.com",
            type: "Basic Programming Test",
            id: "1",
            scheduledDate: "16 Nov 2019, 13:23",
            expiryDate: "16 Nov 2019, 13:23",
            testStatus: "In Progress"
          },
          {
            email: "pulkit@gmail.com",
            type: "General Aptitude Test",
            id: "1",
            scheduledDate: "16 Nov 2019, 13:23",
            expiryDate: "16 Nov 2019, 13:23",
            testStatus: "Unattempted"
          }
        ],
        reports: [
          {
            email: "pulkit@gmail.com",
            type: "General Aptitude Test",
            id: "1",
            date: "16 Nov 2019, 13:23"
          },
          {
            email: "anand@gmail.com",
            type: "Basic Programming Test",
            id: "1",
            date: "16 Nov 2019, 13:23"
          },
          {
            email: "nirmit@gmail.com",
            type: "General Aptitude Test",
            id: "1",
            date: "16 Nov 2019, 13:23"
          },
          {
            email: "arpita@gmail.com",
            type: "Basic Programming Test",
            id: "1",
            date: "16 Nov 2019, 13:23"
          },
          {
            email: "hari@gmail.com",
            type: "Basic Programming Test",
            id: "1",
            date: "16 Nov 2019, 13:23"
          },
          {
            email: "example@gmail.com",
            type: "Basic Programming Test",
            id: "1",
            date: "16 Nov 2019, 13:23"
          }
        ]
      }
    };
  }
  handleChange(e) {
    e.persist();
    let p = document.getElementById("searchPanel");
    if (p) {
      p.style.display = "block";
    }
    this.props.ppq("hide");
    let pp = document.getElementById("accountPopUp");
    if (pp && pp.style.display !== "none") {
      pp.style.display = "none";
    }
    this.filterMasterData(e.target.value);
  }

  handleFilter(e: any) {
    // let p = document.getElementById('reportTagWrapper') as HTMLSpanElement
    // let q = document.getElementById('scheduleTagWrapper') as HTMLSpanElement
    // if (e.target.value === 'reports') {
    //   this.setState({ scheduledContent: [{}], reportsContent: this.state.rawFiltered.reports, count: { total: this.state.rawFiltered.count.reports, scheduled: 0, reports: this.state.rawFiltered.count.reports } }, () => {
    //     p.classList.add('tagsSearchResultsChecked')
    //     q.classList.remove('tagsSearchResultsChecked')
    //   })
    // } else if (e.target.value === 'scheduled') {
    //   this.setState({ reportsContent: [{}], scheduledContent: this.state.rawFiltered.scheduled, count: { total: this.state.rawFiltered.count.scheduled, reports: 0, scheduled: this.state.rawFiltered.count.scheduled } }, () => {
    //     q.classList.add('tagsSearchResultsChecked')
    //     p.classList.remove('tagsSearchResultsChecked')
    //   })
    // } else {
    //   this.setState({ reportsContent: this.state.rawFiltered.reports, scheduledContent: this.state.rawFiltered.scheduled, count: this.state.rawFiltered.count })
    //   q.classList.remove('tagsSearchResultsChecked')
    //   p.classList.remove('tagsSearchResultsChecked')
    //   let z = document.getElementsByName('filter') as NodeListOf<HTMLInputElement>
    //   z.forEach((el) => { el.checked = false })
    // }
  }

  filterMasterData(keyString: string) {
    this.setState({ searchText: keyString }, () => {
      if (this.state.searchText.length === 0) {
        this.setState({ visib: false });
        this.overlay("show");
      } else {
        let resultsScheduled = this.filterIt(
          this.state.rawData.scheduled,
          keyString.trim()
        );
        let resultsReports = this.filterIt(
          this.state.rawData.reports,
          keyString.trim()
        );
        let count = {
          total: resultsReports.length + resultsScheduled.length,
          scheduled: resultsScheduled.length,
          reports: resultsReports.length
        };
        this.setState(
          {
            scheduledContent: {
              data:
                count.scheduled > 5
                  ? resultsScheduled.slice(0, 5)
                  : resultsScheduled,
              more: count.scheduled > 5 ? true : false
            },
            reportsContent: {
              data:
                count.reports > 5 ? resultsReports.slice(0, 5) : resultsReports,
              more: count.reports > 5 ? true : false
            },
            visib: true,
            count: count,
            rawFiltered: {
              scheduled: resultsScheduled,
              reports: resultsReports,
              count: count
            }
          }
        );
        this.overlay("hide");
      }
    });
  }

  filterIt(arr, searchKey) {
    return arr.filter(obj =>
      Object.keys(obj).some(key => obj[key].includes(searchKey))
    );
  }
  redirect(e, type) {
    // this.props.history.push("");
    if (type === "scheduledContent") {
      this.setState({ visib: false, searchText: e.email }, () => {
        this.props.history.push({
          pathname: "/application/ScheduledTest",
          state: { data: e, message: "fromSearch" }
        });
        this.overlay("show");
      });
    } else if (type === "reportsContent") {
      this.setState({ visib: false, searchText: e.email }, () => {
        this.props.history.push({
          pathname: "/application/reports/detailedReport",
          state: { data: e, message: "fromSearch" }
        });
        this.overlay("show");
      });
    }
  }

  overlay(action: string) {
    let z = document.getElementById("mainPanel");
    if (z && action === "hide") {
      z.classList.add("notification__overlay");
    } else if (z && action === "show") {
      z.classList.remove("notification__overlay");
    }
  }

  search_expand = () => {
    this.setState({
      ...this.state,
      searchActive: true
    });
    let searchbox = document.getElementById("searchBox");
    searchbox.style.width = "85%";
    searchbox.style.backgroundColor = "white";
    let closeButton = document.getElementById("search__close_button");
    setTimeout(() => {
      closeButton.style.display = "block";
    }, 300);
  };

  search_reset = () => {
    this.setState({
      ...this.state,
      searchActive: false
    });
    let searchbox = document.getElementById("searchBox");
    searchbox.style.width = "860px";
    searchbox.style.backgroundColor = "#F2F4FA";
    let closeButton = document.getElementById("search__close_button");
    closeButton.style.display = "none";
    if (this.state.searchText) {
      this.setState({
        ...this.state,
        searchText: "",
        visib: false
      });
    }
    let z = document.getElementById("mainPanel");
    z.classList.remove("notification__overlay");
    if (
      this.props.location.state &&
      this.props.location.pathname === "/application/ScheduledTest"
    ) {
      this.props.history.push("/application/ScheduledTest");
    } else if (
      this.props.location.state &&
      this.props.location.pathname === "/application/reports/detailedReport"
    ) {
      this.props.history.push("/application/reports");
    }
  };

  showMoreRows(type: string) {
    if (type === "reports") {
      this.setState({
        reportsContent: { data: this.state.rawFiltered.reports, more: false }
      });
    } else {
      this.setState({
        scheduledContent: {
          data: this.state.rawFiltered.scheduled,
          more: false
        }
      });
    }
  }

  render() {
    // if (
    //   $(".searchstyle").css("width") !== "683px" &&
    //   $(".searchstyle").css("width") !== "960px"
    // ) {
    //   setTimeout(() => {
    //     console.log("working close");
    //     $(".search__close-btn").css("z-index", "999");
    //   }, 300);
    // } else {
    //   console.log("WORKING");
    //   console.log($(".searchstyle").css("width"));
    // }
    return (
      <React.Fragment>
        <input
          className="searchstyle"
          placeholder="Search"
          type="search"
          onChange={e => {
            this.handleChange(e);
          }}
          autoComplete="off"
          id="searchBox"
          onClick={this.search_expand}
          value={this.state.searchText}
        />
        <button
          className="search__close-btn"
          id="search__close_button"
          onClick={this.search_reset}
        >
          <i className="fa-times"></i>
        </button>
        <div className="searchResults">
          {this.state.visib ? (
            <SearchResults
              count={this.state.count}
              redirect={(e, category) => this.redirect(e, category)}
              // applyFilter={(e) => this.handleFilter(e)}
              scheduledContent={this.state.scheduledContent}
              reportsContent={this.state.reportsContent}
              showMoreRows={type => this.showMoreRows(type)}
            />
          ) : (
              <span></span>
            )}
        </div>
      </React.Fragment>
    );
  }
}
