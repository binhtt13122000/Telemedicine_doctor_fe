import React, { useState } from "react";

import moment from "moment";

import useGetDoctor from "../hooks/useGetDoctor";

import VerifiedIcon from "@mui/icons-material/Verified";
import { Button, Card, CircularProgress, Icon, Typography } from "@mui/material";
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

const CeritificateProfile: React.FC = () => {
    const { data, isLoading, isError } = useGetDoctor();
    const [ceti, setSeti] = useState(data?.certificationDoctors);
    if (isError) {
        return <div> Errord</div>;
    }
    if (isLoading) {
        return <CircularProgress />;
    }

    return (
        <React.Fragment>
            <Card sx={{ height: 400 }}>
                <Box sx={{ ml: 2 }}>
                    <Typography variant="h6" component="div">
                        Chứng chỉ
                    </Typography>
                </Box>
                <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
                    {data?.certificationDoctors?.map((x) => (
                        <Item key={x?.id}>
                            <Box sx={{ display: "flex" }}>
                                <img src={x?.evidence} loading="lazy" width="70%" height="60%" />
                                <Box sx={{ ml: 10 }}>
                                    <Typography variant="h6" component="h5">
                                        <Icon>edit</Icon>
                                    </Typography>
                                </Box>
                            </Box>

                            <Typography variant="h6" component="h5">
                                {x?.certification?.name}
                            </Typography>
                            <Typography variant="body2" paragraph>
                                {x?.certification?.description}
                            </Typography>
                            <Box sx={{ display: "flex" }}>
                                <Typography variant="body2" paragraph>
                                    Tạo ngày {moment(x?.dateOfIssue).format("DD/MM/YYYY")}
                                </Typography>
                                <Box sx={{ ml: 22 }}>
                                    <VerifiedIcon color="success" />
                                </Box>
                            </Box>
                        </Item>
                    ))}

                    <Box sx={{ mt: 20, textAlign: "center" }}>
                        <Button variant="outlined">+ New Ceritificate</Button>
                    </Box>
                </Box>
            </Card>
        </React.Fragment>
    );
};

export default CeritificateProfile;
