import React, { useState } from "react";

import useGetDoctor from "../hooks/useGetDoctor";
import usePutMajor from "../hooks/usePutMajor";
import { Major } from "../models/Major.model";
import MajorForm from "./MajorForm";

// import MajorForm from "./MajorForm";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
    Button,
    Card,
    CircularProgress,
    Icon,
    IconButton,
    List,
    ListItem,
    Tooltip,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";

const MajorProfile: React.FC = () => {
    const initCetification: Major = {
        name: "",
        description: "",
        isActive: true,
    };
    const { data, isLoading, isError } = useGetDoctor();
    const { mutate } = usePutMajor();
    const [open, setOpen] = useState<boolean>(false);
    // const [loading, setLoading] = useState<boolean>(false);
    const [major, setMajor] = useState<Major>(initCetification);
    if (isError) {
        return <div> Error</div>;
    }
    if (isLoading) {
        return <CircularProgress />;
    }

    const handleClose = (type: "SAVE" | "CANCEL", dataMajor?: Major, clearErrors?: Function) => {
        // setLoading(isLoading);
        if (type === "SAVE") {
            if (data) {
                if (data.id) {
                    mutate({
                        id: dataMajor?.id,
                        name: dataMajor?.name,
                        description: dataMajor?.description,
                        isActive: dataMajor?.isActive,
                    });
                } else {
                }
            }
        }
        if (clearErrors) {
            clearErrors();
        }

        setOpen(false);
    };
    const handleOpen = async (maj: Major) => {
        setOpen(true);
        setMajor(maj);
    };
    const handleCreate = () => {
        setOpen(true);
        setMajor(initCetification);
    };
    return (
        <React.Fragment>
            <MajorForm dataMajor={major} opened={open} handleClose={handleClose} />
            <Card sx={{ height: "100%", borderRadius: 5 }}>
                <Box sx={{ ml: 2 }}>
                    <Typography variant="h6" component="div">
                        Chuyên khoa
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
                        {data?.majorDoctors?.map((item) => (
                            <ListItem key={item?.id}>
                                <Box sx={{ display: "flex", borderRadius: 5, bgcolor: "#fafafa" }}>
                                    <Box sx={{ display: "block" }}>
                                        <Typography variant="h6" component="h5">
                                            {item?.major?.name}
                                            {item?.major?.name ? (
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
                                            {item?.major?.description}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", ml: 4 }}>
                                        <Typography variant="h6" component="div">
                                            {/* <IconButton>
                                                <Icon color="error">delete</Icon>
                                            </IconButton> */}
                                            <IconButton onClick={() => handleOpen(item?.major)}>
                                                <Icon>edit</Icon>
                                            </IconButton>
                                        </Typography>
                                    </Box>
                                </Box>
                                {/* <ListItemText primary={item?.major?.name} /> */}
                            </ListItem>
                        ))}
                    </List>
                    <Box sx={{ mb: 2 }} />
                    <Box sx={{ textAlign: "center" }}>
                        <Button variant="outlined" onClick={() => handleCreate()}>
                            + Thêm chuyên khoa
                        </Button>
                    </Box>
                </Box>
            </Card>
        </React.Fragment>
    );
};

export default MajorProfile;
