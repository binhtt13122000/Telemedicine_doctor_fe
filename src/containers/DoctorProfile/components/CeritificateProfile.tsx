import React, { useState } from "react";

import moment from "moment";

import useGetDoctor from "../hooks/useGetDoctor";
import usePutCeritificate from "../hooks/usePutCeritificate";
import { Cetification } from "../models/Cetification.model";
import CertificationForm from "./CeritificateForm";

import BlockIcon from "@mui/icons-material/Block";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Button, Card, CircularProgress, Icon, IconButton, Typography } from "@mui/material";
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
                boxShadow: 40,
                ...sx,
            }}
            {...other}
        />
    );
}

const CeritificateProfile: React.FC = () => {
    const initCetification: Cetification = {
        name: "",
        description: "",
        isActive: true,
    };
    const { data, isLoading, isError } = useGetDoctor();
    const { mutate } = usePutCeritificate();
    const [open, setOpen] = useState<boolean>(false);
    const [ab, setAb] = useState<Cetification>(initCetification);
    if (isError) {
        return <div> Errord</div>;
    }
    if (isLoading) {
        return <CircularProgress />;
    }
    const handleClose = (
        type: "SAVE" | "CANCEL",
        dataCeti?: Cetification,
        clearErrors?: Function
    ) => {
        if (type === "SAVE") {
            if (dataCeti) {
                if (dataCeti.id) {
                    mutate({
                        id: dataCeti.id,
                        name: dataCeti?.name,
                        description: dataCeti?.description,
                        isActive: dataCeti?.isActive,
                    });
                } else {
                    // postDrug(data);
                }
            }
        }
        if (clearErrors) {
            clearErrors();
        }
        setOpen(false);
        if (isLoading) {
            return <CircularProgress />;
        }
    };

    const handleOpen = async (ceti: Cetification) => {
        setOpen(true);
        setAb(ceti);
    };
    return (
        <React.Fragment>
            <Card sx={{ height: 400, borderRadius: 5 }}>
                <Box sx={{ ml: 2 }}>
                    <Typography variant="h6" component="div">
                        Chứng chỉ
                    </Typography>
                </Box>
                <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
                    {data?.certificationDoctors?.map((x, index) => {
                        return (
                            <>
                                <Item key={index}>
                                    <Box sx={{ display: "flex" }}>
                                        <img
                                            src={x?.evidence}
                                            loading="lazy"
                                            width="70%"
                                            height="60%"
                                        />
                                        <Box sx={{ ml: 9 }}>
                                            <Typography variant="h6" component="h5">
                                                <IconButton
                                                    onClick={() => handleOpen(x?.certification)}
                                                >
                                                    <Icon>edit</Icon>
                                                </IconButton>
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Typography variant="h6" component="h5">
                                        {x?.certification?.name}
                                    </Typography>

                                    <Box sx={{ display: "flex", fontWeight: "200" }}>
                                        <Typography variant="body2" paragraph>
                                            Cấp ngày {moment(x?.dateOfIssue).format("DD/MM/YYYY")}
                                        </Typography>
                                        <Box sx={{ ml: 21 }}>
                                            {x?.isActive ? (
                                                <IconButton>
                                                    <VerifiedIcon color="success" />
                                                </IconButton>
                                            ) : (
                                                <IconButton>
                                                    <BlockIcon color="error" />
                                                </IconButton>
                                            )}
                                        </Box>
                                    </Box>
                                </Item>
                            </>
                        );
                    })}
                    <CertificationForm dataCeti={ab} open={open} handleClose={handleClose} />
                    <Box sx={{ mt: 20, textAlign: "center" }}>
                        <Button variant="outlined">+ Thêm chứng chỉ</Button>
                    </Box>
                </Box>
            </Card>
        </React.Fragment>
    );
};

export default CeritificateProfile;
