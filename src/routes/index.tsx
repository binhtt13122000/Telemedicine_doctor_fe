import { Switch } from "react-router";

import { PrivateRoute } from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import AccountForm from "src/containers/AccountForm";
import DoctorForm from "src/containers/DoctorForm";
import HospitalManagement from "src/containers/HospitalManagement";
import Layout from "src/containers/Layout";
import Login from "src/containers/Login";

export const publicRoutes = [
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/form1",
        name: "form1",
        component: AccountForm,
    },
];
export const privateRoutes = [
    {
        path: "/",
        name: "home",
        component: HospitalManagement,
    },
    {
        path: "/form2",
        name: "form2",
        component: DoctorForm,
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
