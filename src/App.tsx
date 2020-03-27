import React, { Suspense, lazy } from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { HashRouter } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import Loader from './shared/loader/Loader'
import ScrollToTop from './scrollToTop'
const Login = lazy(() => import('./core/login/Login'));
const NavPanel = lazy(() => import('./features/navPanel'));
const ForgotPassword = lazy(() => import('./core/forgotPassword/ForgotPassword'));
const ResetPassword = lazy(() => import('./core/resetPassword/ResetPassword'));
const Receipt = lazy(() => import('./features/receipt/Receipt'));
const ErrorScreen = lazy(() => import('./shared/errorScreens/ErrorScreen'));
const DetailedReport = lazy(() => import("./features/reports/detailedReport/DetailedReport"));


const App: React.FC = () => {

  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<Loader />}>
        <Switch>
          <HashRouter basename='/'>
            <Route path='/application' component={NavPanel} />
            <Route exact path='/fp' component={ForgotPassword} />
            <Route path='/rp' component={ResetPassword} />
            <Route exact path='/error' component={ErrorScreen} />
            <Route exact path='/receipt' component={Receipt} />
            <Route exact path='/' component={Login} />
            {/* <Route
            path={`/reports/detailedReport`}
            component={DetailedReport}
          /> */}
            <Route component={ErrorScreen} />
          </HashRouter>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
