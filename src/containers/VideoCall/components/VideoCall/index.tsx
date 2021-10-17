import React, { useState } from "react";

import { IMicrophoneAudioTrack, ICameraVideoTrack, IAgoraRTCRemoteUser } from "agora-rtc-react";
import moment from "moment";
import { useHistory } from "react-router";

import CustomizeAutocomplete from "src/components/CustomizeAutocomplete";

import { HealthCheck } from "../../models/VideoCall.model";
import { useClient } from "../../setting";
import ListVideoCall from "../ListVideoCall";
import VideoCallWithLayout2 from "../VideoCallWithLayout2";
import VideoCallWithLayout3 from "../VideoCallWithLayout3";

import {
    Add,
    BrandingWatermark,
    CalendarViewWeek,
    DashboardOutlined,
    InfoOutlined,
    MicOffOutlined,
    Splitscreen,
    VideocamOffOutlined,
} from "@mui/icons-material";
import CallEndIcon from "@mui/icons-material/CallEnd";
import MicNoneIcon from "@mui/icons-material/MicNoneRounded";
import VideocamIcon from "@mui/icons-material/VideocamOutlined";
import {
    Button,
    Card,
    CardContent,
    Divider,
    Fab,
    Grid,
    IconButton,
    Slide,
    Step,
    StepContent,
    StepLabel,
    Stepper,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

export interface VideoCallProps {
    start: boolean;
    setStart: React.Dispatch<React.SetStateAction<boolean>>;
    users: IAgoraRTCRemoteUser[];
    ready: boolean;
    tracks: [IMicrophoneAudioTrack, ICameraVideoTrack] | null;
    healthCheck: HealthCheck;
    anotherTrackVideo: boolean;
    anotherTrackAudio: boolean;
}

const steps = [
    {
        label: "Ghi nhận và chẩn đoán bệnh",
    },
    {
        label: "Tạo đơn thuốc",
    },
];
export const VideoCall: React.FC<VideoCallProps> = (props: VideoCallProps) => {
    const [checkType, setCheckType] = useState({
        checked: false,
        type: "",
    });

    const [layoutType, setLayoutType] = useState<number>(0);

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const history = useHistory();

    const [trackState, setTrackState] = useState({ video: true, audio: true });

    const client = useClient();

    const clickIcon = (type: "info" | "dashboard") => {
        if (checkType.type !== type) {
            setCheckType({
                checked: true,
                type: type,
            });
        } else {
            setCheckType({
                ...checkType,
                checked: !checkType.checked,
            });
        }
    };

    const mute = async (type: "audio" | "video") => {
        if (props.tracks) {
            if (type === "audio") {
                await props.tracks[0].setEnabled(!trackState.audio);
                setTrackState((ps) => {
                    return { ...ps, audio: !ps.audio };
                });
            } else if (type === "video") {
                await props.tracks[1].setEnabled(!trackState.video);
                setTrackState((ps) => {
                    return { ...ps, video: !ps.video };
                });
            }
        }
    };

    const leaveChannel = async () => {
        await client.leave();
        client.removeAllListeners();
        if (props.tracks) {
            props.tracks[0].close();
            props.tracks[1].close();
        }
        props.setStart(false);
        history.push("/");
    };

    const info = () => {
        return (
            <React.Fragment>
                <Typography variant="h6">Thông tin cuộc gọi</Typography>
                <Grid container>
                    <Grid item xs={4}>
                        Bác sĩ:
                    </Grid>
                    <Grid item xs={8}>
                        {props.healthCheck?.slots && props.healthCheck?.slots[0].doctor?.name}
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={4}>
                        Bệnh nhân:
                    </Grid>
                    <Grid item xs={8}>
                        {props.healthCheck?.patient?.name}
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={4}>
                        Chiều cao:
                    </Grid>
                    <Grid item xs={8}>
                        {props.healthCheck?.height / 100 || 0}m
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={4}>
                        Cân nặng:
                    </Grid>
                    <Grid item xs={8}>
                        {props.healthCheck?.weight || 0}kg
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={4}>
                        Triệu chứng:
                    </Grid>
                    <Grid item xs={8}></Grid>
                </Grid>
                {!props.healthCheck?.symptomHealthChecks ||
                props.healthCheck?.symptomHealthChecks?.length === 0 ? (
                    <Typography>Bệnh nhân không điền triệu chứng</Typography>
                ) : (
                    props.healthCheck?.symptomHealthChecks?.map((symptom) => {
                        return (
                            <Typography key={symptom?.id}>
                                {"-"} {symptom?.symptom?.name}
                            </Typography>
                        );
                    })
                )}
            </React.Fragment>
        );
    };

    const dashboard = () => {
        return (
            <React.Fragment>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                        <Step key={step.label}>
                            <StepLabel>{step.label}</StepLabel>
                            <StepContent>
                                {index === 0 && (
                                    <React.Fragment>
                                        <Typography variant="h6">Chẩn đoán bệnh</Typography>
                                        <Grid container>
                                            <Grid item xs={4}>
                                                Ngày hiện tại:
                                            </Grid>
                                            <Grid item xs={8}>
                                                {moment(new Date()).format("DD/MM/YYYY")}
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={4}>
                                                Bệnh nhân:
                                            </Grid>
                                            <Grid item xs={8}>
                                                {props.healthCheck?.patient?.name}
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={4}>
                                                Chiều cao:
                                            </Grid>
                                            <Grid item xs={8}>
                                                {props.healthCheck?.height / 100 || 0}m
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={4}>
                                                Cân nặng:
                                            </Grid>
                                            <Grid item xs={8}>
                                                {props.healthCheck?.weight || 0}kg
                                            </Grid>
                                        </Grid>
                                        <Typography variant="subtitle1" sx={{ marginTop: 4 }}>
                                            Chẩn đoán:
                                        </Typography>
                                        <CustomizeAutocomplete
                                            query="/diseases"
                                            field="name"
                                            searchField="name"
                                            limit={10}
                                            multiple
                                            // errors={errors.drugTypeId}
                                            // errorMessage={"Phân loại thuốc không được trống"}
                                            // inputRef={drugTypeIdRef}
                                            // {...drugTypeIdRefProps}
                                            changeValue={() => {}}
                                        />
                                        <Typography variant="subtitle1" sx={{ marginTop: 4 }}>
                                            Lời khuyên của bác sĩ:
                                        </Typography>
                                        <TextField
                                            placeholder="Lời khuyên dành cho bệnh nhân"
                                            fullWidth
                                            multiline
                                            minRows={3}
                                        />
                                    </React.Fragment>
                                )}
                                {index === 1 && (
                                    <React.Fragment>
                                        <Typography variant="h6">Đơn thuốc</Typography>
                                        <Button
                                            sx={{ my: 2 }}
                                            variant="contained"
                                            endIcon={<Add />}
                                        >
                                            THÊM
                                        </Button>
                                        <Divider></Divider>
                                        <Grid container width="100%" sx={{ mb: 1 }}>
                                            <Grid item xs={12}>
                                                <CustomizeAutocomplete
                                                    query="/drugs"
                                                    field="name"
                                                    searchField="name"
                                                    limit={10}
                                                    changeValue={() => {}}
                                                    label="Tên thuốc"
                                                    size="small"
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container width="100%" spacing={1} sx={{ mb: 1 }}>
                                            <Grid item xs={6}>
                                                <TextField
                                                    size="small"
                                                    label="Ngày bắt đầu"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    size="small"
                                                    label="Ngày kết thúc"
                                                    fullWidth
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container width="100%" spacing={1}>
                                            <Grid item xs={4}>
                                                <TextField
                                                    size="small"
                                                    type="number"
                                                    label="Sáng"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <TextField
                                                    size="small"
                                                    type="number"
                                                    label="Trưa"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item xs={4}>
                                                <TextField
                                                    size="small"
                                                    type="number"
                                                    label="Chiều"
                                                    fullWidth
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container width="100%" sx={{ my: 1 }}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    size="small"
                                                    type="number"
                                                    label="Ghi chú"
                                                    fullWidth
                                                    multiline
                                                    minRows={2}
                                                />
                                            </Grid>
                                        </Grid>
                                    </React.Fragment>
                                )}
                                <Box sx={{ mb: 0, display: "flex" }}>
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        {index === steps.length - 1 ? "Hoàn thành" : "Tiếp theo"}
                                    </Button>
                                    <Button
                                        disabled={index === 0}
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Trở lại
                                    </Button>
                                </Box>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
            </React.Fragment>
        );
    };
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                alignItems: "start",
                backgroundColor: "#202124",
            }}
        >
            <CssBaseline />
            <Box
                height="50px"
                sx={{
                    width: "100%",
                    backgroundColor: "#202124",
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <IconButton
                    sx={{
                        color: "white",
                        "&:hover": {
                            backgroundColor: "#3c4043",
                            color: "white",
                        },
                    }}
                    onClick={() => setLayoutType(0)}
                >
                    <CalendarViewWeek fontSize="medium" />
                </IconButton>
                <IconButton
                    sx={{
                        color: "white",
                        "&:hover": {
                            backgroundColor: "#3c4043",
                            color: "white",
                        },
                    }}
                    onClick={() => setLayoutType(1)}
                >
                    <BrandingWatermark fontSize="medium" />
                </IconButton>
                <IconButton
                    sx={{
                        color: "white",
                        "&:hover": {
                            backgroundColor: "#3c4043",
                            color: "white",
                        },
                    }}
                    onClick={() => setLayoutType(2)}
                >
                    <Splitscreen fontSize="medium" />
                </IconButton>
            </Box>
            <Box
                display="flex"
                height="calc(100vh - 130px)"
                width={1}
                sx={{ backgroundColor: "#202124", overflow: "hidden" }}
            >
                <Box
                    height="100%"
                    width={checkType.checked ? "75%" : "100%"}
                    sx={{ backgroundColor: "#202124" }}
                >
                    {props.ready && props.start && props.tracks && layoutType === 0 && (
                        <ListVideoCall
                            anotherTrackVideo={props.anotherTrackVideo}
                            trackState={trackState}
                            users={props.users}
                            tracks={props.tracks}
                            healthCheck={props.healthCheck}
                            anotherTrackAudio={props.anotherTrackAudio}
                        />
                    )}
                    {props.ready && props.start && props.tracks && layoutType === 1 && (
                        <VideoCallWithLayout2
                            anotherTrackVideo={props.anotherTrackVideo}
                            trackState={trackState}
                            users={props.users}
                            tracks={props.tracks}
                            healthCheck={props.healthCheck}
                            anotherTrackAudio={props.anotherTrackAudio}
                        />
                    )}
                    {props.ready && props.start && props.tracks && layoutType === 2 && (
                        <VideoCallWithLayout3
                            anotherTrackVideo={props.anotherTrackVideo}
                            trackState={trackState}
                            users={props.users}
                            tracks={props.tracks}
                            healthCheck={props.healthCheck}
                            anotherTrackAudio={props.anotherTrackAudio}
                        />
                    )}
                </Box>
                <Slide direction="left" in={checkType.checked} mountOnEnter unmountOnExit>
                    <Box
                        height="100%"
                        display="flex"
                        alignItems="center"
                        justifyContent="flex-end"
                        width="25%"
                        sx={{ backgroundColor: "#202124" }}
                    >
                        <Card
                            sx={{
                                width: "100%",
                                height: "100%",
                                margin: 1,
                                borderRadius: 2,
                            }}
                        >
                            <CardContent>
                                {checkType.type === "info" ? info() : dashboard()}
                            </CardContent>
                        </Card>
                    </Box>
                </Slide>
            </Box>
            {props.ready && props.start && props.tracks && (
                <Box
                    width={1}
                    height={80}
                    component="footer"
                    sx={{
                        mt: "auto",
                        backgroundColor: "#202124",
                    }}
                >
                    <Box
                        height={80}
                        sx={{ color: "white", width: "100%", paddingLeft: 4, paddingRight: 4 }}
                        boxSizing="border-box"
                    >
                        <Grid
                            height={80}
                            container
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Grid
                                item
                                sx={{
                                    display: { xs: "none", lg: "block" },
                                }}
                            >
                                <Typography variant="body1" fontSize={20}>
                                    {moment(new Date()).format("LT")}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Grid
                                    spacing={2}
                                    sx={{
                                        height: 80,
                                    }}
                                    container
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Grid item>
                                        <Tooltip title="Tắt micro">
                                            <Fab
                                                size="medium"
                                                sx={{
                                                    backgroundColor: trackState.audio
                                                        ? "#3c4043"
                                                        : "red",
                                                    color: "white",
                                                    "&:hover": {
                                                        backgroundColor: trackState.audio
                                                            ? "#3c4043"
                                                            : "red",
                                                        color: "white",
                                                    },
                                                }}
                                                onClick={() => mute("audio")}
                                            >
                                                {trackState.audio ? (
                                                    <MicNoneIcon />
                                                ) : (
                                                    <MicOffOutlined />
                                                )}
                                            </Fab>
                                        </Tooltip>
                                    </Grid>
                                    <Grid item>
                                        <Tooltip title="Tắt máy ảnh">
                                            <Fab
                                                size="medium"
                                                sx={{
                                                    backgroundColor: trackState.video
                                                        ? "#3c4043"
                                                        : "red",
                                                    color: "white",
                                                    "&:hover": {
                                                        backgroundColor: trackState.video
                                                            ? "#3c4043"
                                                            : "red",
                                                        color: "white",
                                                    },
                                                }}
                                                onClick={() => mute("video")}
                                            >
                                                {trackState.video ? (
                                                    <VideocamIcon />
                                                ) : (
                                                    <VideocamOffOutlined />
                                                )}
                                            </Fab>
                                        </Tooltip>
                                    </Grid>
                                    <Grid item>
                                        <Tooltip title="Rời khỏi cuộc gọi">
                                            <Fab
                                                variant="extended"
                                                sx={{
                                                    width: 60,
                                                    backgroundColor: "red",
                                                    color: "white",
                                                    "&:hover": {
                                                        backgroundColor: "red",
                                                        color: "white",
                                                    },
                                                }}
                                                onClick={() => leaveChannel()}
                                            >
                                                <CallEndIcon />
                                            </Fab>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid
                                item
                                sx={{
                                    display: { xs: "none", lg: "block" },
                                }}
                            >
                                <Grid
                                    spacing={3}
                                    sx={{
                                        height: 80,
                                    }}
                                    container
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Grid item>
                                        <Tooltip title="Chi tiết về cuộc họp">
                                            <IconButton
                                                color="inherit"
                                                sx={{
                                                    "&:hover": {
                                                        backgroundColor: "#3c4043",
                                                        color: "white",
                                                    },
                                                }}
                                                onClick={() => clickIcon("info")}
                                            >
                                                <InfoOutlined fontSize="medium" />
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                    <Grid item>
                                        <Tooltip title="Mở trang quản lí cuộc hẹn">
                                            <IconButton
                                                color="inherit"
                                                sx={{
                                                    "&:hover": {
                                                        backgroundColor: "#3c4043",
                                                        color: "white",
                                                    },
                                                }}
                                                onClick={() => clickIcon("dashboard")}
                                            >
                                                <DashboardOutlined fontSize="medium" />
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default VideoCall;
