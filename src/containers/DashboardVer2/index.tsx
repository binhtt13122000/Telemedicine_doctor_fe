import React from "react";

import NextAppointment from "./components/NextAppointment";
import TotalAppointments from "./components/TotalAppointments";
import UpcomingAppointments from "./components/UpcomingAppointments";

import { Grid, Card, CardHeader, Divider, CardContent } from "@mui/material";
import { Bar, Doughnut, Line } from "react-chartjs-2";

const Dashboard: React.FC = () => {
    const doughnutData = {
        datasets: [
            {
                data: [50, 36],
                backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
                borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
                borderWidth: 1,
            },
        ],
        labels: ["Nam", "Nữ"],
    };

    const lineData = {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        datasets: [
            {
                label: "buổi tư vấn",
                data: [12, 19, 13, 35, 29, 37, 25, 36, 15, 45, 12, 20],
                fill: false,
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgba(255, 99, 132, 0.2)",
            },
        ],
    };

    const barData = {
        labels: [
            "8:00",
            "9:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
        ],
        datasets: [
            {
                label: "buổi tư vấn",
                data: [12, 19, 13, 15, 20, 23, 19, 13, 15, 18, 10],
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
                barThickness: 4,
                fill: true,
            },
        ],
    };

    const doughnutOptions = {
        plugins: {
            legend: {
                display: true,
                position: "bottom" as "bottom",
            },
        },
    };

    const lineOptions = {
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <Grid container spacing={2}>
            <Grid container item lg={8} spacing={2}>
                <Grid item lg={6}>
                    <NextAppointment />
                </Grid>
                {/* Statistic of the number of appointments */}
                <Grid item lg={3}>
                    <Card sx={{ width: "100%", height: "100%" }}>
                        <CardHeader
                            title="Tổng lịch hẹn"
                            titleTypographyProps={{ variant: "h6" }}
                        />
                        <CardContent>
                            <Doughnut data={doughnutData} options={doughnutOptions} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid container item lg={3} spacing={2}>
                    <Grid item xs={12}>
                        <TotalAppointments title="Trong tháng 10" value={60} />
                    </Grid>
                    <Grid item xs={12}>
                        <TotalAppointments title="Đã hoàn thành" value={45} />
                    </Grid>
                </Grid>
                <Grid item lg={6}>
                    <Card sx={{ width: "100%" }}>
                        <CardHeader
                            title="Thống kê theo tháng"
                            titleTypographyProps={{ variant: "h6" }}
                        />
                        <Divider />
                        <CardContent>
                            <Line data={lineData} options={lineOptions} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg={6}>
                    <Card sx={{ width: "100%" }}>
                        <CardHeader
                            title="Thống kê theo khung giờ"
                            titleTypographyProps={{ variant: "h6" }}
                        />
                        <Divider />
                        <CardContent>
                            <Bar data={barData} options={lineOptions} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid item lg={4}>
                <UpcomingAppointments />
            </Grid>
        </Grid>
    );
};

export default Dashboard;
