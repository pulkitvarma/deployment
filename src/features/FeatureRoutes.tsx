
import React, { Suspense, lazy } from 'react';
import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import ErrorScreen from "../shared/errorScreens/ErrorScreen";
import Loader from "../shared/loader/Loader";
import Account from "./account/Account";
const DetailedReport = lazy(() => import("./reports/detailedReport/DetailedReport"));
const Reports = lazy(() => import("./reports/Reports"));
const BuyTest = lazy(() => import("./buyTest/BuyTest"));
const GenerateTest = lazy(() => import("./generateTest/GenerateTest"));
const TestSlotsUsage = lazy(() => import("./testSlotsUsage/TestSlotsUsage"));
const ScheduledTest = lazy(() => import("./scheduledTest/ScheduledTest"));
const Dashboard = lazy(() => import("./dashboard/Dashboard"));
const Caliberate = lazy(() => import('./calibrateTest/CalibrateTest'))
export default function FeatureRoutes(props): React.ReactElement {
    return (
        <Suspense fallback={<Loader />}>
            <Switch>
                <Route
                    exact
                    path={`${props.data.match.path}`}
                    component={Dashboard}
                />
                <Route
                    exact
                    path={`${props.data.match.path}/generateTest`}
                    component={GenerateTest}
                />
                <Route
                    exact
                    path={`${props.data.match.path}/Account`}
                    component={Account}
                />
                <Route
                    exact
                    path={`${props.data.match.path}/testSlots`}
                    component={TestSlotsUsage}
                />
                <Route
                    exact
                    path={`${props.data.match.path}/reports`}
                    component={Reports}
                />
                <Route
                    exact
                    path={`${props.data.match.path}/ScheduledTest`}
                    component={ScheduledTest}
                />
                <Route
                    path={`${props.data.match.path}/reports/detailedReport`}
                    component={DetailedReport}
                />
                <Route
                    path={`${props.data.match.path}/buyTests`}
                    component={BuyTest}
                />
                <Route
                    path={`${props.data.match.path}/calibrateTest`}
                    component={Caliberate}
                />
                <Route
                    component={ErrorScreen}
                />
            </Switch>
        </Suspense>
    )
}
