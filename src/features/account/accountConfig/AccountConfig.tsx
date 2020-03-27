import React from "react";
import "./AccountConfig.scss";
interface State {
  open: boolean;
  password: any;
}
class AccountConfig extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      open: false,
      currentPassword: {
        value: "",
        valid: false,
        errorMessage: "",
        type: "password"
      },
      newPassword: {
        value: "",
        valid: false,
        errorMessage: "",
        type: "password"
      }
    };
  }
  change = (e: any): void => {
    this.settingValue(
      { name: e.target.name, value: e.target.value },
      "settingValue"
    );
  };

  blur = (e: any) => {
    this.settingValue({ name: e.target.name }, "validationCheck");
  };
  settingValue(fieldData: any, action: string) {
    switch (fieldData.name) {
      case "newPassword": {
        if (action === "settingValue") {
          this.setState({
            newPassword: {
              value: fieldData.value,
              valid: this.state.newPassword.valid,
              type: this.state.newPassword.type
            }
          });
        } else if (action === "validationCheck") {
          if (this.state.newPassword.value.length < 6) {
            this.setState({
              newPassword: {
                value: this.state.newPassword.value,
                valid: false,
                errorMessage: "Min 6 Characters Required",
                type: this.state.newPassword.type
              }
            });
          } else {
            this.setState({
              newPassword: {
                value: this.state.newPassword.value,
                valid: true,
                errorMessage: "",
                type: this.state.newPassword.type
              }
            });
          }
        }
        break;
      }
      case "currentPassword": {
        if (action === "settingValue") {
          this.setState({
            currentPassword: {
              value: fieldData.value,
              valid: this.state.currentPassword.valid,
              type: this.state.currentPassword.type
            }
          });
        } else if (action === "validationCheck") {
          if (this.state.currentPassword.value.length < 6) {
            this.setState({
              currentPassword: {
                value: this.state.currentPassword.value,
                valid: false,
                errorMessage: "Min 6 Characters Required",
                type: this.state.currentPassword.type
              }
            });
          } else {
            this.setState({
              currentpassword: {
                value: this.state.currentPassword.value,
                valid: true,
                errorMessage: "",
                type: this.state.currentPassword.type
              }
            });
          }
        }
        break;
      }
    }
  }
  icon = (filedName: string) => {
    switch (filedName) {
      case "newPassword": {
        if (this.state.newPassword.type === "password") {
          return <i className="eye"></i>;
        } else {
          return <i className="eye-close"></i>;
        }
      }
      case "currentPassword": {
        if (this.state.currentPassword.type === "password") {
          return <i className="eye"></i>;
        } else {
          return <i className="eye-close"></i>;
        }
      }
    }
  };
  showPassword = (fieldValue: string) => {
    switch (fieldValue) {
      case "newPassword":
        {
          if (this.state.newPassword.type === "password") {
            this.setState({
              newPassword: {
                value: this.state.newPassword.value,
                valid: this.state.newPassword.valid,
                type: "text"
              }
            });
          } else {
            this.setState({
              newPassword: {
                value: this.state.newPassword.value,
                valid: this.state.newPassword.valid,
                type: "password"
              }
            });
          }
        }
        break;
      case "currentPassword":
        {
          if (this.state.currentPassword.type === "password") {
            this.setState({
              currentPassword: {
                value: this.state.currentPassword.value,
                valid: this.state.currentPassword.valid,
                type: "text"
              }
            });
          } else {
            this.setState({
              currentPassword: {
                value: this.state.currentPassword.value,
                valid: this.state.currentPassword.valid,
                type: "password"
              }
            });
          }
        }
        break;
    }
  };
  submit = async () => {
    for (let field in this.state) {
      this.settingValue({ name: field }, "validationCheck");
    }
    if (this.state.newPassword.valid) {
      try {
        this.setState({ visib: false });
      } catch (error) {}
    }
  };
  render() {
    return (
      <React.Fragment>
        <div className="popup-container" id="popup-container">
          <div className="popup-wrap">
            <p className="content-text">
              Use the form below to change your password. Your password cannot
              be the same as your username.
            </p>
            <div className="account-input-wrap">
              <label className="inp position-fix">
                <input
                  type={this.state.currentPassword.type}
                  name="currentPassword"
                  value={this.state.currentPassword.value}
                  onChange={(e: any) => this.change(e)}
                  onBlur={(e: any) => this.blur(e)}
                  id="inp"
                  placeholder="&nbsp;"
                />
                <span className="label">Current Password </span>
                <span className="border"></span>
                <div
                  className="toggle-eye"
                  onClick={() => {
                    this.showPassword("currentPassword");
                  }}
                >
                  {this.icon("currentPassword")}
                </div>
              </label>
              <br />

              <label className="inp position-restore">
                <input
                  type={this.state.newPassword.type}
                  name="newPassword"
                  value={this.state.newPassword.value}
                  onChange={(e: any) => this.change(e)}
                  onBlur={(e: any) => this.blur(e)}
                  id="inp"
                  placeholder="&nbsp;"
                />
                <span className="label">New Password</span>
                <span className="border"></span>
                <span className="popup-error">
                  {this.state.newPassword.errorMessage}
                </span>
                <div
                  className="toggle-eye"
                  onClick={() => {
                    this.showPassword("newPassword");
                  }}
                >
                  {this.icon("newPassword")}
                </div>
              </label>
            </div>
            <div className="popup-footer footer-fix">
              {/* <button className="footerCancel" onClick={this.closeModal}>
              Cancel
              </button> */}
              <button
                className="footerPassword"
                onClick={() => {
                  this.submit();
                }}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default AccountConfig;
