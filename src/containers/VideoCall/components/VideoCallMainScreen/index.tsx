import React, { useEffect, useState } from "react";

import { IAgoraRTCRemoteUser } from "agora-rtc-react";

import { HealthCheck } from "../../models/VideoCall.model";
import { useClient, useMicrophoneAndCameraTracks } from "../../setting";
import VideoCall from "../VideoCall";

export interface VideoCallMainScreenProps {
    appId: string;
    token: string;
    channel: string;
    healthCheck: HealthCheck;
}

const VideoCallMainScreen: React.FC<VideoCallMainScreenProps> = (
    props: VideoCallMainScreenProps
) => {
    const { appId, channel, token, healthCheck } = props;

    const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);
    const [start, setStart] = useState(false);
    const client = useClient();
    const { ready, tracks } = useMicrophoneAndCameraTracks();

    const [anotherTrackVideo, setAnotherTrackVideo] = useState<boolean>(true);
    const [anotherTrackAudio, setAnotherTrackAudio] = useState<boolean>(true);

    useEffect(() => {
        let init = async (name: string) => {
            client.on("user-published", async (user, mediaType) => {
                await client.subscribe(user, mediaType);
                if (mediaType === "video") {
                    // eslint-disable-next-line no-console
                    console.log(user);
                    setUsers((prevUsers) => {
                        if (prevUsers.findIndex((x) => x.uid === user.uid) === -1) {
                            return [...prevUsers, user];
                        }
                        return [...prevUsers];
                    });
                }
                if (mediaType === "audio") {
                    if (user.audioTrack) {
                        user.audioTrack.play();
                    }
                }
            });

            client.on("user-unpublished", (user, mediaType) => {
                if (mediaType === "audio") {
                    if (user.audioTrack) user.audioTrack.stop();
                }
                if (mediaType === "video") {
                    // setUsers((prevUsers) => {
                    //     return prevUsers.filter((User) => User.uid !== user.uid);
                    // });
                }
            });

            client.on("user-left", (user) => {
                setUsers((prevUsers) => {
                    return prevUsers.filter((User) => User.uid !== user.uid);
                });
            });

            client.on("user-info-updated", (uid, msg) => {
                if (msg === "mute-video") {
                    setAnotherTrackVideo(false);
                } else if (msg === "unmute-video") {
                    setAnotherTrackVideo(true);
                } else if (msg === "mute-audio") {
                    setAnotherTrackAudio(false);
                } else if (msg === "unmute-audio") {
                    setAnotherTrackAudio(true);
                }
            });

            try {
                await client.join(appId, name, token, null);
            } catch (error) {
                // eslint-disable-next-line no-console
                console.log("error");
            }

            if (tracks) await client.publish([tracks[0], tracks[1]]);
            setStart(true);
        };

        if (ready && tracks) {
            try {
                init(channel);
            } catch (error) {
                // eslint-disable-next-line no-console
                console.log(error);
            }
        }
    }, [channel, appId, token, client, ready, tracks]);

    useEffect(() => {
        // eslint-disable-next-line no-console
        console.log("user:");
        // eslint-disable-next-line no-console
        console.log(users);
    }, [users]);
    return (
        <React.Fragment>
            <VideoCall
                ready={ready}
                tracks={tracks}
                start={start}
                setStart={setStart}
                users={users}
                healthCheck={healthCheck}
                anotherTrackVideo={anotherTrackVideo}
                anotherTrackAudio={anotherTrackAudio}
            />
        </React.Fragment>
    );
};

export default VideoCallMainScreen;
