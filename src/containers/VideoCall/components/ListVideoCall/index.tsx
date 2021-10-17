import { useEffect, useState } from "react";
import React from "react";

import {
    IMicrophoneAudioTrack,
    ICameraVideoTrack,
    AgoraVideoPlayer,
    IAgoraRTCRemoteUser,
} from "agora-rtc-react";

import { HealthCheck } from "../../models/VideoCall.model";

import { Avatar, Box, Grid, GridSize } from "@mui/material";
import { deepOrange } from "@mui/material/colors";

export interface ListVideoCallProps {
    users: IAgoraRTCRemoteUser[];
    tracks: [IMicrophoneAudioTrack, ICameraVideoTrack] | null;
    trackState: {
        video: boolean;
        audio: boolean;
    };
    anotherTrackVideo: boolean;
    healthCheck: HealthCheck;
}
const ListVideoCall: React.FC<ListVideoCallProps> = (props: ListVideoCallProps) => {
    const { users, tracks, trackState, anotherTrackVideo, healthCheck } = props;

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
                                height: "95%",
                                width: "80%",
                            }}
                        >
                            {trackState.video ? (
                                <AgoraVideoPlayer
                                    videoTrack={tracks[1]}
                                    style={{
                                        height: "100%",
                                        width: "100%",
                                        borderRadius: "20px !important",
                                    }}
                                />
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
                                            height: "95%",
                                            width: "80%",
                                        }}
                                    >
                                        {anotherTrackVideo ? (
                                            <AgoraVideoPlayer
                                                id="video-call"
                                                videoTrack={user.videoTrack}
                                                style={{ height: "100%", width: "100%" }}
                                            />
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
                                            height: "95%",
                                            width: "80%",
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
