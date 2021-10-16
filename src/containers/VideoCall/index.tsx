import "react";

import { useParams } from "react-router";

import useGetCallByID from "./hooks/useGetCallById";

import { CircularProgress } from "@mui/material";

const VideoCall: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading } = useGetCallByID(id);
    if (isLoading) {
        return <CircularProgress />;
    }
    return <div>a</div>;
};

export default VideoCall;
