import './ErrorScreen.scss'
import error404 from '../../assets/404-errorPage.png';
import error500 from '../../assets/500-errorPage.png';
import logoBlue from '../../assets/logoBlue.svg';
import profile from '../../assets/profile.svg';
import React, { useEffect } from 'react';

interface IProps {
  from: string;
  errorType: string;
  history: { push: Function };
  location: {
    state: string
  }
}

const ErrorScreen = (props: any) => {
  useEffect(() => {
    if (!props.location.state) {
      props.history.push({ pathname: '/error', state: '404' })
    }
  }, [])
  let errorDiv = <React.Fragment />;
  if (props.location.state === '500') {
    errorDiv = (
      <React.Fragment>
        <div className="error-image">
          <img src={error500} alt="500 error"></img>
        </div>
        <p className="error-definition">Don`t worry, we will fix it soon.</p>
      </React.Fragment>
    )
  }
  else if (props.location.state === '404') {
    errorDiv = (
      <React.Fragment>
        <div className="error-image">
          <img src={error404} alt="404 error"></img>
        </div>
        <p className="error-definition">Sorry! The page you are looking for doesn`t exist.</p>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div className="error-wrap">
        <section className="error-header">
          <article className="header-logo">
            <img src={logoBlue} alt="mindscribble logo" />
          </article>
          <article className="wrap-header">
            <div className="profile">
              <img src={profile} alt="profile" />
            </div>
          </article>
        </section>
        <div className="errorScreen">
          {errorDiv}
          <p className="redirect-link">Go back to <a className="redirect-link-url" href="/application">Home</a></p>
        </div>
        <div className="errorfooter">
          <span>&copy; Copyright 2019 MindScribble, All Rights Reserved</span>
        </div>
      </div>

    </React.Fragment>
  )
}

export default ErrorScreen;
