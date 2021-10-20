import React, { useState } from "react";

import useGetDoctor from "../hooks/useGetDoctor";
import usePutMajor from "../hooks/usePutMajor";
import { Doctor } from "../models/Doctor.model";
import { Major } from "../models/Major.model";
import DoctorService from "../services/Doctor.service";
import MajorForm from "./MajorForm";
import MajorFormAdd from "./MajorFormAdd";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
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
    const [openAdd, setOpenAdd] = useState<boolean>(false);
    const [reload, setReload] = useState<Function>(() => {});
    // const [loading, setLoading] = useState<boolean>(false);
    const [major, setMajor] = useState<Major>(initCetification);
    if (isError) {
        return <div> Error</div>;
    }
    if (isLoading) {
        return <CircularProgress />;
    }
    const createMajor = async (data: Doctor) => {
        try {
            let formData = new FormData();
            formData.append("id", JSON.stringify(data?.id));
            formData.append("email", data.email);
            formData.append("name", data.name);
            formData.append("avatar", data.avatar);
            formData.append("practisingCertificate", data.practisingCertificate);
            formData.append("certificateCode", data.certificateCode);
            formData.append("placeOfCertificate", data.placeOfCertificate);
            formData.append("dateOfCertificate", data.dateOfCertificate);
            formData.append("scopeOfPractice", data.scopeOfPractice);
            formData.append("description", data.description);
            formData.append("numberOfConsultants", data.numberOfConsultants.toString());
            formData.append("numberOfCancels", data.numberOfCancels.toString());
            formData.append("rating", data.rating.toString());
            formData.append("isVerify", data.isVerify.toString());
            formData.append("isActive", data.isActive.toString());
            formData.append("certificationDoctors", data.certificationDoctors.toString());
            formData.append("hospitalDoctors", data.hospitalDoctors.toString());
            formData.append("majorDoctors", data.majorDoctors.toString());
            console.log("Certificate", data.certificationDoctors.toString());
            const service = new DoctorService<Doctor>();
            const response = await service.updateFormData(formData);
            if (response.status === 201) {
                // eslint-disable-next-line no-console
                console.log(response.data);
            }
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e);
        }
    };

    // Edit major
    const handleClose = (type: "SAVE" | "CANCEL", dataMajor?: Major, clearErrors?: Function) => {
        // setLoading(isLoading);
        if (type === "SAVE") {
            if (dataMajor) {
                if (dataMajor.id) {
                    mutate({
                        id: dataMajor.id,
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
    // Edit major
    //Add major
    const handleCreate = () => {
        setOpenAdd(true);
    };

    const handleCloseMajorAdd = (
        type: "SAVE" | "CANCEL",
        dataMajorAdd?: Doctor,
        clearErrors?: Function
    ) => {
        // setLoading(isLoading);
        if (type === "SAVE") {
            dataMajorAdd && createMajor(dataMajorAdd);
        }
        if (clearErrors) {
            clearErrors();
        }

        setOpenAdd(false);
    };

    // useEffect(() => {
    //     data;
    //     // eslint-disable-next-line no-console
    // }, [data]);
    //Add major
    return (
        <React.Fragment>
            {data && (
                <MajorFormAdd
                    dataMajorAdd={data}
                    opened={openAdd}
                    handleClose={handleCloseMajorAdd}
                />
            )}
            <MajorForm dataMajor={major} opened={open} handleClose={handleClose} />
            <Card sx={{ height: "100%", borderRadius: 5 }}>
                <Box sx={{ ml: 2 }}>
                    <Typography variant="h6" component="div">
                        Chuyên khoa
                        <IconButton>
                            <ControlPointIcon />
                        </IconButton>
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
                            <>
                                <ListItem key={item?.id}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            borderRadius: 5,
                                            bgcolor: "#fafafa",
                                        }}
                                    >
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
                                                <IconButton onClick={() => handleOpen(item?.major)}>
                                                    <Icon>edit</Icon>
                                                </IconButton>
                                            </Typography>
                                        </Box>
                                    </Box>
                                </ListItem>
                            </>
                        ))}
                    </List>
                    <Box sx={{ mb: 2 }} />
                    <Box sx={{ textAlign: "center" }}>
                        <Button variant="outlined" onClick={() => handleCreate()}>
                            + Thêm chuyên khoa
                        </Button>
                    </Box>
                    <Box sx={{ mb: 2 }} />
                </Box>
            </Card>
        </React.Fragment>
    );
};

export default MajorProfile;
