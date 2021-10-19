import { useEffect, useState } from "react";
import React from "react";

import {
    IMicrophoneAudioTrack,
    ICameraVideoTrack,
    AgoraVideoPlayer,
    IAgoraRTCRemoteUser,
} from "agora-rtc-react";

import { HealthCheck } from "../../models/VideoCall.model";
import "./index.scss";

import { MicOffOutlined } from "@mui/icons-material";
import MicNoneIcon from "@mui/icons-material/MicNoneRounded";
import { Avatar, Box, Grid, GridSize, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";

export interface ListVideoCallProps {
    users: IAgoraRTCRemoteUser[];
    tracks: [IMicrophoneAudioTrack, ICameraVideoTrack] | null;
    trackState: {
        video: boolean;
        audio: boolean;
    };
    anotherTrackVideo: boolean;
    anotherTrackAudio: boolean;
    healthCheck: HealthCheck;
}
const ListVideoCall: React.FC<ListVideoCallProps> = (props: ListVideoCallProps) => {
    const { users, tracks, trackState, anotherTrackVideo, anotherTrackAudio, healthCheck } = props;

    const [gridSpacing, setGridSpacing] = useState<GridSize>(12);

    useEffect(() => {
        setGridSpacing(Math.max(Math.floor(12 / (users.length + 1)), 4) as GridSize);
    }, [users, tracks]);

    return (
        <Grid container sx={{ height: "100%" }}>
            {tracks && (
                <Grid item xs={gridSpacing} sx={{ height: "100%" }}>
                    <Box
                        sx={{ height: "100%", width: "100%" }}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Box
                            sx={{
                                height: "100%",
                                width: users?.length > 0 ? "90%" : "80%",
                                position: "relative",
                            }}
                        >
                            {trackState.video ? (
                                <React.Fragment>
                                    <AgoraVideoPlayer
                                        className="boder-radius"
                                        videoTrack={tracks[1]}
                                        style={{
                                            height: "100%",
                                            width: "100%",
                                            position: "absolute",
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            height: "100%",
                                            width: "100%",
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            backgroundColor: "transparent",
                                            zIndex: 2000,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                bottom: 6,
                                                left: 10,
                                                display: "flex",
                                            }}
                                        >
                                            {trackState.audio ? (
                                                <MicNoneIcon sx={{ color: "white" }} />
                                            ) : (
                                                <MicOffOutlined sx={{ color: "white" }} />
                                            )}
                                            <Typography color="white" variant="subtitle1">
                                                Bs.{" "}
                                                {healthCheck?.slots &&
                                                    healthCheck?.slots[0].doctor?.name}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </React.Fragment>
                            ) : (
                                <Box
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        border: "2px solid grey",
                                        borderRadius: "10px",
                                        position: "relative",
                                    }}
                                >
                                    <Avatar
                                        sx={{
                                            bgcolor: deepOrange[500],
                                            width: 200,
                                            height: 200,
                                        }}
                                        src={
                                            healthCheck?.slots &&
                                            healthCheck?.slots[0].doctor?.avatar
                                        }
                                    >
                                        {/* <Typography fontSize={100}>B</Typography> */}
                                    </Avatar>
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            bottom: 6,
                                            left: 10,
                                            display: "flex",
                                        }}
                                    >
                                        {trackState.audio ? (
                                            <MicNoneIcon sx={{ color: "white" }} />
                                        ) : (
                                            <MicOffOutlined sx={{ color: "white" }} />
                                        )}
                                        <Typography color="white" variant="subtitle1">
                                            Bs.{" "}
                                            {healthCheck?.slots &&
                                                healthCheck?.slots[0].doctor?.name}
                                        </Typography>
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Grid>
            )}
            {users?.length > 0 &&
                users.map((user) => {
                    if (user.videoTrack) {
                        return (
                            <Grid item key={user.uid} xs={gridSpacing} sx={{ height: "100%" }}>
                                <Box
                                    sx={{ height: "100%", width: "100%" }}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Box
                                        sx={{
                                            height: "100%",
                                            width: users?.length > 0 ? "90%" : "80%",
                                            position: "relative",
                                        }}
                                    >
                                        {anotherTrackVideo ? (
                                            <React.Fragment>
                                                <AgoraVideoPlayer
                                                    id="video-call"
                                                    className="boder-radius"
                                                    videoTrack={user.videoTrack}
                                                    style={{ height: "100%", width: "100%" }}
                                                />
                                                <Box
                                                    sx={{
                                                        height: "100%",
                                                        width: "100%",
                                                        position: "absolute",
                                                        top: 0,
                                                        left: 0,
                                                        backgroundColor: "transparent",
                                                        zIndex: 2000,
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            position: "absolute",
                                                            bottom: 6,
                                                            left: 10,
                                                            display: "flex",
                                                        }}
                                                    >
                                                        {anotherTrackAudio ? (
                                                            <MicNoneIcon sx={{ color: "white" }} />
                                                        ) : (
                                                            <MicOffOutlined
                                                                sx={{ color: "white" }}
                                                            />
                                                        )}
                                                        <Typography
                                                            color="white"
                                                            variant="subtitle1"
                                                        >
                                                            {healthCheck?.patient?.name}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </React.Fragment>
                                        ) : (
                                            <Box
                                                sx={{
                                                    width: "100%",
                                                    height: "100%",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    border: "2px solid grey",
                                                    borderRadius: "10px",
                                                    position: "relative",
                                                }}
                                            >
                                                <Avatar
                                                    sx={{
                                                        bgcolor: deepOrange[500],
                                                        width: 200,
                                                        height: 200,
                                                    }}
                                                    src={healthCheck?.patient?.avatar}
                                                ></Avatar>
                                                <Box
                                                    sx={{
                                                        position: "absolute",
                                                        bottom: 6,
                                                        left: 10,
                                                        display: "flex",
                                                    }}
                                                >
                                                    {anotherTrackAudio ? (
                                                        <MicNoneIcon sx={{ color: "white" }} />
                                                    ) : (
                                                        <MicOffOutlined sx={{ color: "white" }} />
                                                    )}
                                                    <Typography color="white" variant="subtitle1">
                                                        {healthCheck?.patient?.name}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        )}
                                    </Box>
                                </Box>
                            </Grid>
                        );
                    } else
                        return (
                            <Grid item key={user.uid} xs={gridSpacing} sx={{ height: "100%" }}>
                                <Box
                                    sx={{ height: "100%", width: "100%" }}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Box
                                        sx={{
                                            height: "100%",
                                            width: users?.length > 0 ? "90%" : "80%",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: "100%",
                                                height: "100%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                border: "2px solid grey",
                                                borderRadius: "10px",
                                                position: "relative",
                                            }}
                                        >
                                            <Avatar
                                                sx={{
                                                    bgcolor: deepOrange[500],
                                                    width: 200,
                                                    height: 200,
                                                }}
                                                src={healthCheck?.patient?.avatar}
                                            ></Avatar>
                                            <Box
                                                sx={{
                                                    position: "absolute",
                                                    bottom: 6,
                                                    left: 10,
                                                    display: "flex",
                                                }}
                                            >
                                                {anotherTrackAudio ? (
                                                    <MicNoneIcon sx={{ color: "white" }} />
                                                ) : (
                                                    <MicOffOutlined sx={{ color: "white" }} />
                                                )}
                                                <Typography color="white" variant="subtitle1">
                                                    {healthCheck?.patient?.name}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                        );
                })}
        </Grid>
    );
};

export default ListVideoCall;
