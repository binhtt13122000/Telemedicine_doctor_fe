import React from "react";

import useGetDoctor from "../hooks/useGetDoctor";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
    Button,
    Card,
    Chip,
    CircularProgress,
    Icon,
    IconButton,
    List,
    ListItem,
    Tooltip,
    Typography,
} from "@mui/material";
import { Box, BoxProps } from "@mui/system";

function Item(props: BoxProps) {
    const { sx, ...other } = props;
    return (
        <Box
            sx={{
                bgcolor: "#fafafa",
                color: "black",
                p: 1,
                m: 1,
                borderRadius: 5,
                textAlign: "left",
                fontSize: 19,
                fontWeight: "700",
                boxShadow: 5,
                ...sx,
            }}
            {...other}
        />
    );
}

const HospitalProfile: React.FC = () => {
    const { data, isLoading, isError } = useGetDoctor();

    if (isError) {
        return <div> Errord</div>;
    }
    if (isLoading) {
        return <CircularProgress />;
    }

    return (
        <React.Fragment>
            <Card sx={{ minHeight: "100%", borderRadius: 5 }}>
                <Box sx={{ ml: 2 }}>
                    <Typography variant="h6" component="div">
                        Ngành nghề
                    </Typography>
                </Box>
                <Box sx={{ display: "block", gridTemplateColumns: "repeat(3, 1fr)" }}>
                    <List
                        sx={{
                            width: "100%",
                            maxWidth: 360,
                            bgcolor: "background.paper",
                            position: "relative",
                            overflow: "auto",
                            maxHeight: 300,
                            "& ul": { padding: 0 },
                        }}
                    >
                        {data?.hospitalDoctors?.map((item) => (
                            <ListItem key={`${item}`}>
                                <Box sx={{ display: "flex", borderRadius: 5, bgcolor: "#fafafa" }}>
                                    <Box sx={{ display: "block" }}>
                                        <Typography variant="h6" component="h5">
                                            {item?.hospital?.name}
                                            {item?.hospital?.name ? (
                                                <Tooltip title="Còn hoạt động">
                                                    <IconButton>
                                                        <CheckCircleOutlineIcon color="success" />
                                                    </IconButton>
                                                </Tooltip>
                                            ) : (
                                                <Tooltip title="Không hoạt động">
                                                    <IconButton>
                                                        <CheckCircleOutlineIcon color="error" />
                                                    </IconButton>
                                                </Tooltip>
                                            )}
                                        </Typography>
                                        <Typography variant="body2" component="h5">
                                            Địa chỉ: {item?.hospital?.address}
                                        </Typography>
                                        <Typography variant="body2" component="h5">
                                            Mô tả: {item?.hospital?.description}
                                        </Typography>
                                        <Box sx={{ mt: 1 }} />
                                        <Typography variant="body2" component="h5">
                                            Tình trạng:{" "}
                                            {item?.isWorking ? (
                                                <Chip
                                                    label="Đang công tác"
                                                    variant="outlined"
                                                    color="success"
                                                />
                                            ) : (
                                                <Chip
                                                    label="Nghỉ công tác"
                                                    variant="outlined"
                                                    color="error"
                                                />
                                            )}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: "flex" }}>
                                        <Typography variant="h6" component="h5">
                                            <IconButton>
                                                <Icon color="error">delete</Icon>
                                            </IconButton>
                                            <IconButton>
                                                <Icon>edit</Icon>
                                            </IconButton>
                                        </Typography>
                                    </Box>
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                    <Box sx={{ mb: 2 }} />
                    <Box sx={{ textAlign: "center" }}>
                        <Button variant="outlined">+ Thêm bệnh viện</Button>
                    </Box>
                    <Box sx={{ mb: 2 }} />
                </Box>
            </Card>
        </React.Fragment>
    );
};

export default HospitalProfile;
