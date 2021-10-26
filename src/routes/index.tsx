import { Switch } from "react-router";

import WaitingScreen from "src/containers/DoctorForm/components/WaitingScreen";

import { PrivateRoute } from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import AccountForm from "src/containers/AccountForm";
import Dashboard from "src/containers/Dashboard";
import DoctorForm from "src/containers/DoctorForm";
import DoctorProfile from "src/containers/DoctorProfile";
import HealthCheckDetail from "src/containers/HealthCheckDetail";
import HealthCheckListing from "src/containers/HealthCheckListing";
import Layout from "src/containers/Layout";
import Login from "src/containers/Login";
import VideoCall from "src/containers/VideoCall";

export const publicRoutes = [
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/account-form",
        name: "account-form",
        component: AccountForm,
    },
    {
        path: "/doctor-form",
        name: "doctor-form",
        component: DoctorForm,
    },
    {
        path: "/waiting-screen",
        name: "waiting-screen",
        component: WaitingScreen,
    },
];
export const privateRoutes = [
    {
        path: "/",
        name: "home",
        component: Dashboard,
    },
    {
        path: "/doctors",
        name: "doctor",
        component: DoctorProfile,
    },
    {
        path: "/health-checks",
        name: "health-check",
        component: HealthCheckListing,
    },
    {
        path: "/health-checks/1",
        name: "health-check-detail",
        component: HealthCheckDetail,
    },
];

export const privateWithNoLayouts = [
    {
        path: "/call/:id",
        name: "video-call",
        component: VideoCall,
    },
];

const RouteComponent = () => {
    return (
        <Switch>
            {publicRoutes.map((route) => (
                <PublicRoute
                    key={route.name}
                    exact={true}
                    path={route.path}
                    component={route.component}
                />
            ))}
            {privateWithNoLayouts.map((route) => (
                <PrivateRoute
                    exact={true}
                    key={route.name}
                    path={route.path}
                    component={route.component}
                />
            ))}
            <Layout>
                {privateRoutes.map((route) => (
                    <PrivateRoute
                        exact={true}
                        key={route.name}
                        path={route.path}
                        component={route.component}
                    />
                ))}
            </Layout>
        </Switch>
    );
};

export default RouteComponent;
