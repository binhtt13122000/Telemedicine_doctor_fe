import React from "react";

import CeritificateProfile from "./components/CeritificateProfile";
import Profile from "./components/Profile";

import useGetDoctor from "./hooks/useGetListDoctor";

import { CircularProgress, Container, Grid } from "@mui/material";
import { Box } from "@mui/system";

const DoctorProfile: React.FC = () => {
    const { data, isLoading, isError } = useGetDoctor();

    if (isError) {
        return <div>Error </div>;
    }
    if (isLoading) {
        return <CircularProgress />;
    }

    return (
        <React.Fragment>
            <Box
                sx={{
                    minHeight: "100%",
                    py: 3,
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid item lg={4} md={12} xs={12}>
                            <Profile />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item lg={12} md={6} xs={12}>
                            <CeritificateProfile />
                        </Grid>
                        <Grid item lg={8} md={6} xs={12}></Grid>
                    </Grid>
                </Container>
            </Box>
        </React.Fragment>
    );
};

export default DoctorProfile;
