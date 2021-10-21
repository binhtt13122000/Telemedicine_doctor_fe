import React from "react";

import moment from "moment";

import useGetNearestHealthCheck from "../../hooks/useGetNearestHealthCheck";

import { Call, Cancel, Person } from "@mui/icons-material";
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Grid,
    IconButton,
    Tooltip,
    Typography,
} from "@mui/material";
import { Account } from "src/common/models/Account.model";
import LocalStorageUtil from "src/utils/LocalStorageUtil";

const NextHealthCheck: React.FC = () => {
    const user = LocalStorageUtil.getItem("user") as Account;
    const refenrenceId = LocalStorageUtil.getItem("refenrenceId") as string;
    const { data, isLoading, isError } = useGetNearestHealthCheck(
        `${refenrenceId || 0}`,
        "NEAREST"
    );
    return (
        <Card sx={{ width: "100%", minHeight: "100px" }}>
            {isError && (
                <React.Fragment>
                    <CardHeader
                        title={
                            <Typography variant="h6">
                                Xin chào {user.firstName} {user.lastName}. Chúc bạn một ngày làm
                                việc hiệu quả!
                            </Typography>
                        }
                    />
                    <CardContent>
                        <Box
                            sx={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Typography variant="subtitle2">
                                Sắp tới bạn không có lịch hẹn nào!
                            </Typography>
                        </Box>
                    </CardContent>
                </React.Fragment>
            )}
            {isLoading ? (
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : (
                data && (
                    <React.Fragment>
                        <CardHeader
                            title={
                                <Typography variant="h6">
                                    Xin chào {user.firstName} {user.lastName}. Chúc bạn một ngày làm
                                    việc hiệu quả!
                                </Typography>
                            }
                        />
                        <CardContent>
                            <Grid
                                container
                                sx={{ width: "100%" }}
                                alignItems="center"
                                justifyContent="center "
                            >
                                <Grid item xs={9}>
                                    <Typography variant="subtitle1">Lượt khám tiếp theo</Typography>
                                    <Typography variant="h6">{data.patient?.name}</Typography>
                                    <Typography variant="subtitle2">
                                        {data.slots &&
                                            data.slots[0] &&
                                            data.slots[0]?.startTime?.slice(0, 5)}{" "}
                                        {"- "}
                                        {data.slots[0]?.endTime?.slice(0, 5)}{" "}
                                        {moment(data.slots[0]?.assignedDate).format(`DD/MM/YYYY`)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Grid
                                        container
                                        alignItems="center"
                                        justifyContent="center"
                                        spacing="3"
                                    >
                                        <Grid item>
                                            <Tooltip title="Tham gia cuộc gọi">
                                                <IconButton
                                                    color="success"
                                                    aria-label="call"
                                                    component="span"
                                                >
                                                    <Call />
                                                </IconButton>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item>
                                            <Tooltip title="Xem thông tin bệnh nhân">
                                                <IconButton
                                                    color="primary"
                                                    aria-label="call"
                                                    component="span"
                                                >
                                                    <Person />
                                                </IconButton>
                                            </Tooltip>
                                        </Grid>
                                        <Grid item>
                                            <Tooltip title="Hủy cuộc hẹn">
                                                <IconButton
                                                    color="error"
                                                    aria-label="call"
                                                    component="span"
                                                >
                                                    <Cancel />
                                                </IconButton>
                                            </Tooltip>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </React.Fragment>
                )
            )}
        </Card>
    );
};

export default NextHealthCheck;
