import React from "react";

import NextHealthCheck from "./components/NextHeathCheck";
import SlotManagement from "./components/Schedule";

import { Grid } from "@mui/material";

const Dashboard: React.FC = () => {
    return (
        <React.Fragment>
            <Grid container sx={{ width: "100%" }}>
                <Grid item xs={12} md={8}>
                    <NextHealthCheck />
                    <SlotManagement />
                </Grid>
                <Grid item xs={12} md={4}></Grid>
            </Grid>
        </React.Fragment>
    );
};

export default Dashboard;
