import React from "react";
import "./NavPanel.scss";
import logoBlue from "../../assets/logoBlue.svg";
import profile from "../../assets/profile.svg";
import $ from "jquery";
import alternate from "../../assets/demo.svg";
import GlobalSearch from "./globalSearch/GlobalSearch";
import FeatureRoutes from "../FeatureRoutes";
import Loader from "../../shared/loader/Loader";
import SideMenu from "./sideMenu/SideMenu";
import ProfilePopup from "./profilePopup/ProfilePopup";
import NotificationPanel from "./notificationPanel/NotificationPanel";
import { History } from 'history';

interface IProps {
  location: {
    key: string,
    pathname: string,
    search: string,
    hash: string,
    state: any
  },
  match: any,
  history: History
}

interface IState {
  visib: boolean,
  active: boolean,
}
class NavPanel extends React.Component<IProps, IState> {
  gsRef;
  constructor(props: IProps) {
    super(props);
    this.gsRef = React.createRef();
    this.state = {
      active: false,
      visib: true
    };
  }
  q = false;

  componentDidMount() {
    this.sectionActive();
  }

  sectionActive = () => {
    var current = this.props.location.pathname;
    let URL = current.split("/");
    let checkURL;
    if (!URL[2]) {
      checkURL = `/${URL[1]}/`;
    } else {
      checkURL = `/${URL[1]}/${URL[2]}`;
    }
    this.docReady(function () {
      $("#side-menu")
        .find("a")
        .each(function () {
          if ($(this).attr("href") === checkURL) {
            $(".list-wrap ul a.active").removeClass("active");
            $(this).addClass("active");
          }
        });
    });
  };

  docReady(fn) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
      // call on next available tick
      setTimeout(fn, 1);
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }

  componentDidUpdate() {
    this.sectionActive();
    if (!this.props.location.state) {
      this.gsRef.current.search_reset()
    }
  }
  expandSidebar = (action: string) => {
    let p = document.getElementById('notificationPanel')
    let q = document.getElementById('mainPanel')
    if (action === 'show') {
      p.classList.add("show-notification")
      q.classList.add('notification__overlay')
    } else if (action === 'hide') {
      p.classList.remove("show-notification")
      q.classList.remove('notification__overlay')
    }
  };

  settingPopUp = () => {
    let p = document.getElementById("accountPopUp");
    if (!this.q) {
      p.style.display = "block";
      this.q = true;
    } else {
      p.style.display = "none";
      this.q = false;
    }
    let q = document.getElementById('searchPanel');
    if (q) {
      q.style.display = 'none';
      let z = document.getElementById("mainPanel");
      z.classList.remove("notification__overlay");
    }
    let r = document.getElementById('searchBox') as HTMLInputElement
    if (r) {
      if (r.value.length <= 0) {
        this.gsRef.current.search_reset()
      }
    }

  };
  public render() {
    return (
      <React.Fragment>
        <div className="container" id="container">
          <NotificationPanel expandSidebar={this.expandSidebar} />
          <section className="header">
            <article className="header-logo">
              <img src={logoBlue} alt="mindscribble logo" />
            </article>
            <GlobalSearch ref={this.gsRef} ppq={this.expandSidebar} zzq={this.settingPopUp} history={this.props.history} location={this.props.location} />
            <article className="wrap-header">
              <div className="notification" id='notifBell' onClick={() => this.expandSidebar('show')}>
                <i className="notificationBell"></i>
              </div>
              <div id='profDiv' className="profile" onClick={() => this.settingPopUp()}>
                <article className="companyimage">
                  <img src={alternate} alt="companylogo" />
                </article>
                <img src={profile} alt="profile" />
              </div>
              <ProfilePopup match={this.props.match} settingPopUp={this.settingPopUp} />
            </article>
          </section>
          {this.state.visib ? (
            <div
              className="wrap-contain"
              id='wrapContain'
              onClick={() => {
                this.q = true;
                this.settingPopUp();
                this.expandSidebar('hide');
              }}
            >
              <div id="mainPanel"></div>
              <div className="sidebar">
                <div className="list-wrap wrapper-top" id="side-menu">
                  <SideMenu data={this.props} />
                </div>
                <div className="copyright">
                  <p>&copy; 2019 MindScribble</p>
                </div>
              </div>
              <div className="user-row row2" id="mainContainer">
                <div id="wrapper" className="wrapper">
                  <FeatureRoutes data={this.props} />
                </div>
              </div>
            </div>
          ) : (
              <Loader />
            )}
        </div>
      </React.Fragment>
    );
  }
}

export default NavPanel;
