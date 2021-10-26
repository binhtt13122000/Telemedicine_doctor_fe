import React from "react";

import CallRoundedIcon from "@mui/icons-material/CallRounded";
import {
    Grid,
    Card,
    CardHeader,
    Divider,
    CardContent,
    Avatar,
    Typography,
    List,
    ListItemAvatar,
    ListItemText,
    ListItem,
    IconButton,
} from "@mui/material";
import { Doughnut } from "react-chartjs-2";

const Dashboard: React.FC = () => {
    const doughnutData = {
        datasets: [
            {
                //   label: '# of Votes',
                data: [50, 36],
                backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
                borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
                borderWidth: 1,
            },
        ],
        labels: ["Nam", "Nữ"],
    };

    // const doughnutOptions = {
    //     plugins: {
    //         legend: {
    //             display: true,
    //             position: "bottom",
    //         },
    //     },
    // };

    return (
        <Grid container spacing={2}>
            {/* Next Appointment */}
            <Grid container item xs={4}>
                <Card sx={{ width: "100%" }}>
                    <CardHeader title="Buổi tư vấn tiếp theo" />
                    <Divider />
                    <CardContent>
                        <Avatar src="" />
                        <Typography>10:00</Typography>
                        <Typography>10:00</Typography>
                    </CardContent>
                </Card>
            </Grid>
            {/* Statistic of the number of appointments */}
            <Grid container item xs={4} spacing={2}>
                <Grid item xs={6}>
                    <Card>
                        <Doughnut data={doughnutData} />
                    </Card>
                </Grid>
                <Grid container item xs={6} spacing={2}>
                    <Grid item>
                        <Card>
                            <CardHeader title="Lịch hẹn tháng 10" />
                            <Typography variant="h3" align="center">
                                60
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item>
                        <Card>
                            <CardHeader title="Đã hoàn thành" />
                            <Typography variant="h3" align="center">
                                45
                            </Typography>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
            {/* Upcoming Appointments */}
            <Grid item xs={4}>
                <Card>
                    <CardHeader title="Lịch tư vấn sắp tới" />
                    <Divider />
                    <List>
                        <ListItem
                            secondaryAction={
                                <IconButton edge="end" aria-label="call">
                                    <CallRoundedIcon />
                                </IconButton>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar src="" />
                            </ListItemAvatar>
                            <ListItemText
                                primary="Ngọc Nguyễn"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: "inline" }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            Triệu chứng:
                                        </Typography>
                                        {" Đau họng, sốt, ho, khó thở, mệt mỏi, đau nhức"}
                                        <Typography
                                            sx={{ display: "block" }}
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            10am - 26/10/2021
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider component="li" variant="middle" />
                        <ListItem
                            secondaryAction={
                                <IconButton edge="end" aria-label="call">
                                    <CallRoundedIcon />
                                </IconButton>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar src="" />
                            </ListItemAvatar>
                            <ListItemText
                                primary="Ngọc Nguyễn"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: "inline" }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            Triệu chứng:
                                        </Typography>
                                        {" Đau họng, sốt, ho, khó thở, mệt mỏi, đau nhức"}
                                        <Typography
                                            sx={{ display: "block" }}
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            10am - 26/10/2021
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        {/* <Divider component="li" variant="middle" />
                        <ListItem
                            secondaryAction={
                                <IconButton edge="end" aria-label="call">
                                    <CallRoundedIcon />
                                </IconButton>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar src="" />
                            </ListItemAvatar>
                            <ListItemText
                                primary="Ngọc Nguyễn"
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: "inline" }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            Triệu chứng:
                                        </Typography>
                                        {" Đau họng, sốt, ho, khó thở, mệt mỏi, đau nhức"}
                                        <Typography
                                            sx={{ display: "block" }}
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            10am - 26/10/2021
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem> */}
                    </List>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
