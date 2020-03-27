import React, { ReactElement } from 'react'
import { Link } from "react-router-dom";
import './ProfilePopup.scss'
interface Props {
    match: any;
    settingPopUp: Function;
}

export default function ProfilePopup(props: Props): ReactElement {
    return (
        <React.Fragment>
            <div
                id="accountPopUp"
                style={{ display: "none" }}
                className=" popupWrap"
            >
                <article className="pointer"></article>
                <div className="account-container">
                    <span className="account-popup-name">John Doe</span>
                    <span className="account-popup-designation">
                        Administrator
                  </span>
                    <ul className="account-details">
                        <span
                            onClick={() => props.settingPopUp()}
                        >
                            <Link
                                to={`${props.match.path}/Account`}
                                className="account-list"
                            >
                                <i className="fa-setting"></i>Account Settings{" "}
                            </Link>
                            <li className="account-list">
                                <i className="fa-compass"></i>Need help ?
                      </li>
                            <Link to={`/`} className="account-list">
                                <i className="fa-logout"></i>
                                Log Out
                      </Link>
                        </span>
                    </ul>
                </div>
            </div>
        </React.Fragment >
    )
}
