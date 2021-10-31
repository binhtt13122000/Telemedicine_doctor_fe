import React from "react";

import CallRoundedIcon from "@mui/icons-material/CallRounded";
import {
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

const UpcomingAppointments: React.FC = () => {
    return (
        <Card sx={{ width: "100%", height: 670, overflow: "auto" }}>
            <CardHeader title="Lịch tư vấn sắp tới" titleTypographyProps={{ variant: "h6" }} />
            <Divider />
            <CardContent>
                <List>
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <ListItem
                            key={item}
                            secondaryAction={
                                <IconButton edge="end" aria-label="call">
                                    <CallRoundedIcon color="success" />
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
                                        {" Đau họng, sốt, ho"}
                                        <Typography
                                            sx={{ display: "block" }}
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            10:00 - 26/10/2021
                                        </Typography>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
};

export default UpcomingAppointments;
