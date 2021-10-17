import "react";

import { useHistory, useParams } from "react-router";

import VideoCallMainScreen from "./components/VideoCallMainScreen";

import useGetCallByID from "./hooks/useGetCallById";

import { Box, Typography, Button } from "@mui/material";

const VideoCall: React.FC = () => {
    const history = useHistory();
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, isError } = useGetCallByID(id);
    if (isLoading) {
        return (
            <Box
                minHeight={600}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >
                <img
                    alt="loading"
                    width={200}
                    height={200}
                    src="https://png.pngtree.com/element_our/20190530/ourlarge/pngtree-520-couple-avatar-boy-avatar-little-dinosaur-cartoon-cute-image_1263411.jpg"
                />
                <Typography variant="h5" align="center" sx={{ marginBottom: 1, marginTop: 1 }}>
                    Chờ chút
                </Typography>
                <Typography variant="subtitle1" align="center" sx={{ marginBottom: 1 }}>
                    Hệ thống đang kết nối bạn tới phòng khám online!
                </Typography>
            </Box>
        );
    } else if (isError) {
        return (
            <Box
                minHeight={600}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >
                <img
                    alt="sorry"
                    width={200}
                    height={200}
                    src="https://png.pngtree.com/element_our/20190530/ourlarge/pngtree-520-couple-avatar-boy-avatar-little-dinosaur-cartoon-cute-image_1263411.jpg"
                />
                <Typography variant="h5" align="center" sx={{ marginBottom: 1, marginTop: 1 }}>
                    Xin lỗi
                </Typography>
                <Typography variant="subtitle1" align="center" sx={{ marginBottom: 1 }}>
                    Hiện tại bạn không thể tham gia vào cuộc gọi này!
                </Typography>
                <Box>
                    <Button onClick={() => history.goBack()} variant="contained">
                        Trở lại
                    </Button>
                </Box>
            </Box>
        );
    } else {
        if (data)
            return (
                <VideoCallMainScreen
                    channel={"main"}
                    token={
                        "006834dec7fc5144086a2fe803cb3e51fffIACEcanP0CTFI+W/MvanlEVp8EJPFUjV4EBsO4UXFum2z2TNKL8AAAAAEACOYDhkTc5sYQEAAQBMzmxh"
                    }
                    appId={"834dec7fc5144086a2fe803cb3e51fff"}
                    healthCheck={data}
                />
            );
        return <div>Error</div>;
    }
};

export default VideoCall;
