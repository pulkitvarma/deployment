import React, { ReactElement } from 'react'
import './NotificationPanel.scss'
interface Props {
    expandSidebar:Function
}

export default function NotificationPanel(props: Props): ReactElement {
    return (
        <React.Fragment>
          <div id='notificationPanel' className="notification-sidebar">
            <article className="notification-head">
              <h3>Notifications</h3>
              <span onClick={() => props.expandSidebar('hide')}>
                <i className="close"></i>
              </span>
            </article>
          </div>
        </React.Fragment>
    )
}
