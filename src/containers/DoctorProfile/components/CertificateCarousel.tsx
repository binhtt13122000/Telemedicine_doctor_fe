import * as React from "react";

import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

import useGetDoctor from "../hooks/useGetDoctor";
import { CetificationAdd, Doctor } from "../models/Doctor.model";
import DoctorService from "../services/Doctor.service";
import CertificationFormAdd from "./CeritificateFormAdd";

import BlockIcon from "@mui/icons-material/Block";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import VerifiedIcon from "@mui/icons-material/Verified";
import { CircularProgress, Icon, IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MobileStepper from "@mui/material/MobileStepper";
// import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const CertificateCarousel: React.FC = () => {
    const initCetificationAdd: CetificationAdd = {
        certificationId: 0,
        evidence: "",
        dateOfIssue: "2021-10-20T15:58:02.973Z",
    };
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const { data, isLoading, isError } = useGetDoctor();
    const [openAdd, setOpenAdd] = React.useState<boolean>(false);
    const [cetificationAdd] = React.useState<CetificationAdd>(initCetificationAdd);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };
    const createCetificate = async (dataCeti: CetificationAdd, file: Blob, id: number) => {
        try {
            let formData = new FormData();
            formData.append("CertificationId", JSON.stringify(dataCeti.certificationId));
            formData.append("Evidence", file);
            formData.append("DateOfIssue ", dataCeti.dateOfIssue);
            const service = new DoctorService<Doctor>();
            const response = await service.createFormData(id, formData);
            if (response.status === 200) {
                // eslint-disable-next-line no-console
                console.log(response.data);
                refreshPage();
            }
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        }
    };
    const handleCloseFormAdd = (
        type: "SAVE" | "CANCEL",
        dataCetificationAdd?: CetificationAdd,
        file?: Blob,
        clearErrors?: Function
    ) => {
        if (type === "SAVE") {
            if (dataCetificationAdd && file) {
                if (data?.id) {
                    createCetificate(dataCetificationAdd, file, data?.id);
                }
            }
        }
        if (clearErrors) {
            clearErrors();
        }
        setOpenAdd(false);
    };
    if (isError) {
        return <div> Error</div>;
    }
    if (isLoading) {
        return <CircularProgress />;
    }
    const refreshPage = () => {
        window.location.reload();
    };
    const handleCreate = () => {
        setOpenAdd(true);
    };

    return (
        <React.Fragment>
            {data && (
                <CertificationFormAdd
                    dataCetificationAdd={cetificationAdd}
                    open={openAdd}
                    handleClose={handleCloseFormAdd}
                />
            )}
            <Box sx={{}}>
                {/* <Paper
                    square
                    elevation={0}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        height: 60,
                        pl: 2,
                        bgcolor: "background.default",
                    }}
                >
                </Paper> */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        bgcolor: "background.default",
                    }}
                >
                    <Typography variant="h6" component="div">
                        Chứng chỉ
                    </Typography>
                    <Box>
                        <IconButton onClick={() => handleCreate()}>
                            <Icon>add_circle</Icon>
                        </IconButton>
                    </Box>
                </Box>
                <AutoPlaySwipeableViews
                    axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                >
                    {data?.certificationDoctors?.map((step, index) => (
                        <div key={step?.certification?.name}>
                            <Box sx={{ display: "flex" }}>
                                <Box sx={{ ml: "3rem", display: "flex" }}>
                                    <Typography variant="h6" component="div">
                                        {step?.certification?.name}
                                    </Typography>
                                    {step?.isActive ? (
                                        <IconButton>
                                            <VerifiedIcon color="success" />
                                        </IconButton>
                                    ) : (
                                        <IconButton>
                                            <BlockIcon color="error" />
                                        </IconButton>
                                    )}
                                </Box>
                            </Box>
                            {Math.abs(activeStep - index) <= 2 ? (
                                <Box
                                    component="img"
                                    sx={{
                                        height: 400,
                                        display: "block",

                                        overflow: "hidden",
                                        width: "100%",
                                    }}
                                    src={step?.evidence}
                                    alt={step?.certification?.name}
                                />
                            ) : null}
                        </div>
                    ))}
                </AutoPlaySwipeableViews>
                <MobileStepper
                    steps={10}
                    position="static"
                    activeStep={activeStep}
                    nextButton={
                        <Button size="small" onClick={handleNext} disabled={activeStep === 10 - 1}>
                            Next
                            {theme.direction === "rtl" ? (
                                <KeyboardArrowLeft />
                            ) : (
                                <KeyboardArrowRight />
                            )}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                            {theme.direction === "rtl" ? (
                                <KeyboardArrowRight />
                            ) : (
                                <KeyboardArrowLeft />
                            )}
                            Back
                        </Button>
                    }
                />
            </Box>
        </React.Fragment>
    );
};

export default CertificateCarousel;
