import { Switch } from "react-router";

import { PrivateRoute } from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import HospitalManagement from "src/containers/HospitalManagement";
import Layout from "src/containers/Layout";
import Login from "src/containers/Login";
import VideoCall from "src/containers/VideoCall";

export const publicRoutes = [
    {
        path: "/login",
        name: "login",
        component: Login,
    },
];
export const privateRoutes = [
    {
        path: "/",
        name: "home",
        component: HospitalManagement,
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
