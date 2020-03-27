import React, { createRef } from "react";
import "./Account.scss";
import profile from "../../assets/default.png";
import Default from "../../assets/default.svg";
import ScoreTables from "../reports/detailedReport/violationsScoreTables/violationsScoreTables";
import AccountConfig from "./accountConfig/AccountConfig";
import Modal from "../calibrateTest/sendCalibrate/modal/Modal";
import { dateFormatter, getTimeStamp } from "../../shared/dateFormatter/dateFormatter";

interface Props { }
class Account extends React.Component<any, any> {
  private fileInputRefCompany = createRef<HTMLInputElement>();
  private fileInputRefProfile = createRef<HTMLInputElement>();
  constructor(props: any) {
    super(props);
    this.state = {
      disp: false,
      companyImageName: "Change Logo",
      compayImagePreviewUrl: null,
      profileImagePreviewUrl: null,
      toggleButton: "check",
      uploadButton: {
        buttonText: "upload"
      },
      rows: [],
      columns: []
    };
  }

  componentDidMount() {
    this.generatingData();
  }

  generatingData() {
    const apiColumnsForPurchaseHistory = [
      "Description",
      "Purchasing Date",
      "Valid Till",
      "Total Price",
      "Invoice"
    ];
    const desc = [
      "General Aptitude Tests-250",
      "General Aptitude Tests-250",
      "General Aptitude Tests-250",
      "General Aptitude Tests-250",
      "General Aptitude Tests-250",
      "General Aptitude Tests-250",
      "General Aptitude Tests-250"
    ];
    const valid = [
      "11/21/2019, 12:00 AM",
      "11/21/2019, 12:00 AM",
      "11/21/2019, 12:00 PM",
      "11/21/2019, 12:00 AM",
      "11/21/2019, 12:00 AM",
      "11/21/2019, 12:00 AM",
      "11/21/2019, 12:00 AM"
    ];
    const purchasing = [
      "06/21/2020, 12:00 AM",
      "06/21/2020, 12:00 AM",
      "06/21/2020, 12:00 AM",
      "06/21/2020, 12:00 AM",
      "06/21/2020, 12:00 AM",
      "06/21/2020, 12:00 AM",
      "06/21/2020, 12:00 AM"
    ];
    const price = [
      "₹ 37500",
      "₹ 37500",
      "₹ 37500",
      "₹ 37500",
      "₹ 37500",
      "₹ 37500",
      "₹ 37500"
    ];

    const resultValidDate = [];
    valid.forEach(date => {
      const result = dateFormatter("", date);
      resultValidDate.push({
        display: result.scheduledDate,
        timestamp: getTimeStamp(date)
      });
    });
    const resultPurchasingDate = [];
    purchasing.forEach(date => {
      const result = dateFormatter("", date);
      resultPurchasingDate.push({
        display: result.scheduledDate,
        timestamp: getTimeStamp(date)
      });
    });
    let rows = [];
    desc.forEach((element, index) => {
      rows.push({
        desc: element,
        purchasing: resultPurchasingDate[index],
        valid: resultValidDate[index],
        price: price[index]
      });
    });
    rows = this.addInvoice(rows);
    this.setState({
      ...this.state,
      rows: rows,
      columns: apiColumnsForPurchaseHistory
    });
  }

  addInvoice(rows: any) {
    rows.forEach((element, index) => {
      element.invoice = `<div value='${index}' alt="Resend Icon" onClick='${() =>
        this.goToInvoice(element)}'><i class="invoice-icon"></i></div>`;
    });
    return rows;
  }

  goToInvoice(date) {
  }

  openFileDialog = (type: string) => {
    if (type === "profile") {
      const node: any = this.fileInputRefProfile.current;
      node.click();
    } else {
      const node: any = this.fileInputRefCompany.current;
      node.click();
    }
  };
  onFileAdded = (selectorFiles: FileList | null, type: string) => {
    if (selectorFiles != null) {
      if (type === "company") {
        if (selectorFiles[0].size > 30000) {
          alert("Image size cannot be greater than 30KB");
        } else {
          let Name = selectorFiles[0].name;
          let reader = new FileReader();
          reader.onloadend = () => {
            this.setState({
              ...this.state,
              companyImageName: Name,
              compayImagePreviewUrl: reader.result
            });
          };
          reader.readAsDataURL(selectorFiles[0]);
        }
      } else {
        let reader = new FileReader();
        reader.onloadend = () => {
          this.setState({
            ...this.state,
            profileImagePreviewUrl: reader.result
          });
        };
        reader.readAsDataURL(selectorFiles[0]);
      }
    }
  };

  upload = () => {
    if (this.state.uploadButton.buttonText === "upload") {
      return (
        <div
          className="upload-btn"
          onClick={() => {
            this.openFileDialog("company");
          }}
          id="uploadButton"
        >
          Upload
          <input
            ref={this.fileInputRefCompany}
            id="fileInput"
            className="FileInput"
            type="file"
            accept="image/png"
            multiple
            onChange={e => {
              this.onFileAdded(e.target.files, "company");
            }}
          />
        </div>
      );
    }
  };
  save = () => {
    if (this.state.compayImagePreviewUrl !== null) {
      document.getElementById('uploadButton').style.display = 'none';
      return (
        <div
          className="upload-btn"
          onClick={() => {
            this.openFileDialog("company");
          }}
        >
          Save
          <input
            ref={this.fileInputRefCompany}
            id="fileInput"
            className="FileInput"
            type="file"
            multiple
            onChange={e => {
              this.onFileAdded(e.target.files, "company");
            }}
          />
        </div>
      );
    }
  };
  defaultLogo = (type: string) => {
    if (type === "company") {
      if (this.state.compayImagePreviewUrl === null) {
        return Default;
      } else {
        return this.state.compayImagePreviewUrl;
      }
    } else {
      if (this.state.profileImagePreviewUrl === null) {
        return profile;
      } else {
        return this.state.profileImagePreviewUrl;
      }
    }
  };
  setModalOpen = () => {
    this.setState({
      ...this.state,
      disp: true
    });
  };

  closeModal = () => {
    this.setState({
      ...this.state,
      disp: false
    });
  };
  public render() {
    return this.state.rows.length !== 0 && this.state.columns.length !== 0 ? (
      <React.Fragment>
        <div id="accountSettingMaster" className="account-wrapper">
          <div className="profile-wrapper">
            <div className="panel">
              <div className="profileimage">
                <img
                  src={this.defaultLogo("profile")}
                  alt="profile"
                  className="profilepreview"
                />
                <div
                  className="edit"
                  onClick={() => {
                    this.openFileDialog("profile");
                  }}
                >
                  <input
                    ref={this.fileInputRefProfile}
                    className="FileInput"
                    type="file"
                    multiple
                    onChange={e => {
                      this.onFileAdded(e.target.files, "profile");
                    }}
                  />
                  <i className="camera"></i>
                </div>
              </div>
              <h3 className="name">John doe</h3>
              <h6 className="profile-email">Johndoe@mail.com</h6>
              <h6 className="designation">Administrator</h6>
              <button
                className=" password-btn"
                onClick={() => {
                  this.setModalOpen();
                }}
              >
                Change Password
              </button>
            </div>
            <div className="posrel">
              <div className="vertical-line line-fix"></div>
              <div className="org-info">
                <h1 className="info-desc">Organisation Info</h1>
                <article className="org-box">
                  <div className="company-logo-container">
                    <img
                      src={this.defaultLogo("company")}
                      className="imagedefault"
                      alt="default"
                    />
                  </div>

                  <div className="uploadbox">
                    <article className="input-area">
                      <span className="picname">
                        {this.state.companyImageName}{" "}
                      </span>
                      {this.upload()}
                      {this.save()}
                    </article>
                  </div>
                </article>
                <ul>
                  Image Requirements
                  <li>• Logo Resolution: 320 x 132 pixels</li>
                  <li>• Maximum file size: 30KB (PNG)</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="info-wrapper">
            <div className="padding-left-fix">
              <div className="vertical-line info-fix"></div>
              <div className="Info">
                <span className="info-desc">General Info</span>
                <div className="input-wrap">
                  <div className="input-wrap-row1">
                    <label className="inp">
                      <input type="text" id="inp" placeholder="&nbsp;" />
                      <span className="label">Full Name</span>
                      <span className="border"></span>
                    </label>
                    <label className="inp">
                      <input type="text" id="inp" placeholder="&nbsp;" />
                      <span className="label">Organisation Name </span>
                      <span className="border"></span>
                    </label>
                  </div>
                  <div className="input-wrap-row1">
                    <label className="inp">
                      <input type="text" id="inp" placeholder="&nbsp;" />
                      <span className="label"> Mobile Number</span>
                      <span className="border"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="history-table">
              <div className="vertical-line"></div>
              <ScoreTables
                title="Purchase History"
                class={"purchaseHistory"}
                tablecss={"reportTables padding-top-fix"}
                helperText="View your purchases and invoices"
                apiColumns={this.state.columns}
                apiRows={this.state.rows}
              />
            </div>
          </div>
        </div>
        {this.state.disp ? (
          <div id="accountModal" className="modal">
            <Modal
              width="728px"
              onClose={this.closeModal}
              dataToDisplay={<AccountConfig />}
              title={"Change Password"}
            />
          </div>
        ) : (
            <span></span>
          )}
      </React.Fragment>
    ) : (
        <span></span>
      );
  }
}
export default Account;
