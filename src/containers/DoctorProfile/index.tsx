import React from "react";

import CeritificateProfile from "./components/CeritificateProfile";
// import CertificateCarousel from "./components/CertificateCarousel";
import HospitalProfile from "./components/HospitalProfile";
import MajorProfile from "./components/MajorProfile";
import PracticingProfile from "./components/PracticingProfile";
import Profile from "./components/Profile";

import { Container, Divider, Grid } from "@mui/material";
import { Box } from "@mui/system";

const DoctorProfile: React.FC = () => {
    return (
        <React.Fragment>
            <Box
                sx={{
                    minHeight: "100%",
                    py: 3,
                    bgcolor: "#f5f5f5",
                }}
            >
                <Container maxWidth="lg">
                    {/* <Grid container>
                        <img
                            alt="Welcome"
                            width="100%"
                            height="100"
                            src="https://images.all-free-download.com/images/graphiclarge/beach_cloud_dawn_horizon_horizontal_landscape_ocean_601821.jpg"
                        />
                    </Grid> */}
                    <Box sx={{ mt: 2 }} />
                    <Grid container spacing={4}>
                        <Grid item xs={7}>
                            <img
                                alt="Welcome"
                                width="100%"
                                height="90%"
                                loading="lazy"
                                src="https://riseapps.co/wp-content/uploads/2020/03/7f133df7-c88e-423d-8659-8ae2f762a62b-1024x768-1024x768-min-1024x768.jpg"
                            />
                            {/* <CertificateCarousel /> */}
                        </Grid>
                        <Grid item xs={5}>
                            <Profile />
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 2 }} />
                    <Divider variant="middle" />
                    <Box sx={{ mt: 2 }} />

                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <PracticingProfile />
                        </Grid>
                        <Grid item xs={4}>
                            <MajorProfile />
                        </Grid>
                        <Grid item xs={4}>
                            <HospitalProfile />
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 2 }} />
                    <Grid container spacing={3}>
                        <Grid item lg={12} md={6} xs={12}>
                            <CeritificateProfile />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </React.Fragment>
    );
};

export default DoctorProfile;
