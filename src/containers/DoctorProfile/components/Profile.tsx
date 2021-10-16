import React from "react";

import moment from "moment";

import useGetAccount from "../hooks/useGetAccount";

import { Card, CardContent, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";

export interface IProfile {
    email?: string;
}

const Profile: React.FC<IProfile> = (props: IProfile) => {
    const { data, isLoading, isError } = useGetAccount();
    if (isError) {
        return <div>error</div>;
    }
    if (isLoading) {
        return <CircularProgress />;
    }
    return (
        <React.Fragment>
            <Card>
                <CardContent sx={{ height: 400, width: 400 }}>
                    <Box
                        sx={{
                            alignItems: "left",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Typography gutterBottom variant="h5" component="div">
                            Profile doctor
                        </Typography>
                        {/* <Avatar
                            src={data?.avatar}
                            sx={{
                                height: 100,
                                width: 100,
                            }}
                        /> */}

                        <Typography gutterBottom variant="h6" component="div">
                            Họ tên:{" "}
                            {`${data?.firstName}
                        ${data?.lastName}`}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            Email: {""} {data?.email}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            Số điện thoại: {data?.phone}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            Giới tính: {data?.isMale}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            Ngày sinh: {moment(data?.dob).format("DD/MM/YYYY")}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            Địa chỉ:{" "}
                            {`${data?.streetAddress}, ${data?.locality}, ${data?.ward}, ${data?.city} `}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </React.Fragment>
    );
};

export default Profile;
