import React, { useState } from "react";

import moment from "moment";

import useGetDoctor from "../hooks/useGetDoctor";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PersonIcon from "@mui/icons-material/Person";
import {
    Card,
    Chip,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    Icon,
    IconButton,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import Link from "@mui/material/Link";
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

const PracticingProfile: React.FC = () => {
    const { data, isLoading, isError } = useGetDoctor();
    const [open, setOpen] = useState(false);
    if (isError) {
        return <div> Errord</div>;
    }
    if (isLoading) {
        return <CircularProgress />;
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <React.Fragment>
            <Card sx={{ minHeight: "100%", borderRadius: 5 }}>
                <Box sx={{ ml: 2, display: "flex" }}>
                    <Box>
                        <Typography variant="h6" component="div">
                            Hồ sơ
                            {data?.isActive ? (
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
                    </Box>
                    <Box sx={{ ml: 27 }}>
                        <Typography variant="h6" component="h5">
                            <IconButton>
                                <Icon>edit</Icon>
                            </IconButton>
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: "block", gridTemplateColumns: "repeat(3, 1fr)" }}>
                    <Item>
                        <Box sx={{ display: "block" }}>
                            <Box sx={{ display: "flex" }}>
                                <Stack direction="row" spacing={1}>
                                    <Typography
                                        variant="body2"
                                        component="div"
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        Chứng chỉ hành nghề:
                                    </Typography>

                                    <Typography variant="body2" component="h5">
                                        <Link
                                            variant="body2"
                                            underline="none"
                                            onClick={handleClickOpen}
                                        >
                                            {" "}
                                            View
                                        </Link>
                                    </Typography>
                                </Stack>
                                <Dialog open={open} onClose={handleClose}>
                                    <DialogTitle>Chứng chỉ</DialogTitle>
                                    <DialogContent>
                                        <img
                                            width="100%"
                                            height="100%"
                                            src={data?.practisingCertificate}
                                            loading="lazy"
                                        />
                                    </DialogContent>
                                </Dialog>
                            </Box>
                            <Stack direction="row" spacing={1}>
                                <Typography
                                    variant="body2"
                                    component="div"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Mã chứng nhận:
                                </Typography>
                                <Typography variant="body2" component="h5">
                                    {data?.certificateCode}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Typography
                                    variant="body2"
                                    component="div"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Nơi cấp chứng nhận:
                                </Typography>

                                <Typography variant="body2" component="h5">
                                    {data?.placeOfCertificate}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Typography
                                    variant="body2"
                                    component="div"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Cấp ngày:
                                </Typography>

                                <Typography variant="body2" component="h5">
                                    {moment(data?.dateOfCertificate).format("DD/MM/YYYY")}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Typography
                                    variant="body2"
                                    component="div"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Phạm vi:
                                </Typography>

                                <Typography variant="body2" component="h5">
                                    {data?.scopeOfPractice}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Typography
                                    variant="body2"
                                    component="div"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Số bệnh nhân đã tư vấn:
                                </Typography>

                                <Typography variant="body2" component="h5">
                                    <Chip icon={<PersonIcon />} label={data?.numberOfConsultants} />
                                </Typography>
                            </Stack>

                            <Box sx={{ mt: 1 }} />

                            <Stack direction="row" spacing={1}>
                                <Typography
                                    variant="body2"
                                    component="div"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Tình trạng:
                                </Typography>

                                <Typography variant="body2" component="h5">
                                    {data?.isVerify ? (
                                        <Chip
                                            label="Đã xác thực"
                                            variant="outlined"
                                            color="success"
                                        />
                                    ) : (
                                        <Chip
                                            label="Chưa xác thực"
                                            variant="outlined"
                                            color="error"
                                        />
                                    )}
                                </Typography>
                            </Stack>
                        </Box>
                    </Item>
                </Box>
            </Card>
        </React.Fragment>
    );
};

export default PracticingProfile;
