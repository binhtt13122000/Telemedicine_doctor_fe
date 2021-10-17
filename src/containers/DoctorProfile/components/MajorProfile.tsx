import React, { useState } from "react";

import useGetDoctor from "../hooks/useGetDoctor";
import { Major } from "../models/Major.model";

// import MajorForm from "./MajorForm";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
    Button,
    Card,
    CircularProgress,
    Icon,
    IconButton,
    List,
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

const MajorProfile: React.FC = () => {
    const { data, isLoading, isError } = useGetDoctor();
    const [open, setOpen] = useState<boolean>(false);
    if (isError) {
        return <div> Errord</div>;
    }
    if (isLoading) {
        return <CircularProgress />;
    }

    const handleClose = (type: "SAVE" | "CANCEL", data?: Major, clearErrors?: Function) => {
        if (type === "SAVE") {
            if (data) {
                if (data.id) {
                } else {
                }
            }
        }
        if (clearErrors) {
            clearErrors();
        }
        setOpen(false);
    };
    return (
        <React.Fragment>
            <Card sx={{ height: "100%", borderRadius: 5 }}>
                <Box sx={{ ml: 2 }}>
                    <Typography variant="h6" component="div">
                        Chuyên khoa
                    </Typography>
                </Box>
                <Box sx={{ display: "block", gridTemplateColumns: "repeat(3, 1fr)" }}>
                    <List>
                        {data?.majorDoctors?.map((x) => (
                            <>
                                <Item key={x?.id}>
                                    <Box sx={{ display: "flex" }}>
                                        <Box sx={{ display: "block" }}>
                                            <Typography variant="h6" component="h5">
                                                {x?.major?.name}
                                                {x?.major?.name ? (
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
                                                Mô tả: Chuyên chữa trị các bệnh nội ngoại tiết{" "}
                                                {x?.major?.description}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: "flex", ml: 10 }}>
                                            <Typography variant="h6" component="h5">
                                                <IconButton>
                                                    <Icon color="error">delete</Icon>
                                                </IconButton>
                                                <IconButton>
                                                    {" "}
                                                    <Icon>edit</Icon>
                                                </IconButton>
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Typography variant="h6" component="h5">
                                        {x?.major?.description}
                                    </Typography>
                                </Item>
                                {/* <MajorForm opened={open} data={x.major} handleClose={handleClose} /> */}
                            </>
                        ))}
                    </List>
                    <Box sx={{ textAlign: "center" }}>
                        <Button variant="outlined">+ Thêm chuyên khoa</Button>
                    </Box>
                </Box>
            </Card>
        </React.Fragment>
    );
};

export default MajorProfile;
