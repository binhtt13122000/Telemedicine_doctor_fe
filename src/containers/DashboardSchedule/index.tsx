import React from "react";

import NextHealthCheck from "./components/NextHeathCheck";
import SlotManagement from "./components/Schedule";
import { Rating } from "@material-ui/lab";

import useGetDoctorByEmail from "./hooks/useGetDoctorByEmail";

import {
    Box,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Divider,
    Grid,
    Typography,
} from "@mui/material";
import { Account } from "src/common/models/Account.model";
import LocalStorageUtil from "src/utils/LocalStorageUtil";

const DashboardSchedule: React.FC = () => {
    const user = LocalStorageUtil.getItem("user") as Account;
    const { data, isLoading } = useGetDoctorByEmail(`${user.email || ""}`);
    return (
        <React.Fragment>
            <Grid container sx={{ width: "100%" }}>
                <Grid item xs={12} md={8}>
                    <NextHealthCheck />
                    <SlotManagement />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Grid container display="flex" direction="column" alignItems="center">
                        <Card sx={{ width: "90%" }}>
                            <CardHeader
                                title={<Typography variant="subtitle1">Thống kê</Typography>}
                            ></CardHeader>
                            <CardContent>
                                {isLoading && (
                                    <Box display="flex" alignItems="center" justifyContent="center">
                                        <CircularProgress />
                                    </Box>
                                )}
                                {data && (
                                    <React.Fragment>
                                        <Grid container>
                                            <Grid item xs={5}>
                                                Số bệnh nhân:
                                            </Grid>
                                            <Grid item xs={7}>
                                                {(data.numberOfConsultants || 0) +
                                                    (data.numberOfCancels || 0)}
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={5}>
                                                Đã khám:
                                            </Grid>
                                            <Grid item xs={7}>
                                                {data.numberOfConsultants || 0}
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={5}>
                                                Đã hủy:
                                            </Grid>
                                            <Grid item xs={7}>
                                                {data.numberOfCancels || 0}
                                            </Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={5}>
                                                Đánh giá:
                                            </Grid>
                                            <Grid item xs={7}>
                                                <Rating value={data.rating || 0} max={5} />
                                            </Grid>
                                        </Grid>
                                        <Divider />
                                    </React.Fragment>
                                )}
                            </CardContent>
                        </Card>
                        <Box height={10} />
                        <Card sx={{ width: "90%" }}>
                            <CardHeader
                                title={
                                    <Typography variant="subtitle1">Lịch khám tiếp theo</Typography>
                                }
                            />
                            <CardContent>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1">Nguyễn Văn A</Typography>
                                        <Typography variant="subtitle2">
                                            17:00 - 18:00 18/10/2021
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1">Nguyễn Văn A</Typography>
                                        <Typography variant="subtitle2">
                                            17:00 - 18:00 18/10/2021
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1">Nguyễn Văn A</Typography>
                                        <Typography variant="subtitle2">
                                            17:00 - 18:00 18/10/2021
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Box height={10} />
                                <Typography
                                    sx={{ cursor: "pointer" }}
                                    align="center"
                                    color="blueviolet"
                                >
                                    Xem thêm
                                </Typography>
                            </CardContent>
                        </Card>
                        <Grid padding={1} sx={{ width: "90%", mt: 5 }} container>
                            <Grid display="flex" item xs={6} alignItems="center">
                                <Box
                                    borderRadius="5px"
                                    mr={2}
                                    height={20}
                                    width={20}
                                    bgcolor="grey.400"
                                ></Box>
                                Chưa có lịch
                            </Grid>
                            <Grid display="flex" item xs={6} alignItems="center">
                                <Box
                                    borderRadius="5px"
                                    mr={2}
                                    height={20}
                                    width={20}
                                    bgcolor="orange"
                                ></Box>
                                Đang đợi
                            </Grid>
                            <Grid display="flex" item xs={6} alignItems="center">
                                <Box
                                    borderRadius="5px"
                                    mr={2}
                                    height={20}
                                    width={20}
                                    bgcolor="red"
                                ></Box>
                                Bị hủy
                            </Grid>
                            <Grid display="flex" item xs={6} alignItems="center">
                                <Box
                                    borderRadius="5px"
                                    mr={2}
                                    height={20}
                                    width={20}
                                    bgcolor="green"
                                ></Box>
                                Đã hoàn thành
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default DashboardSchedule;
