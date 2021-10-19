import React from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import { Doctor } from "./models/Doctor.model";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Button, Card, Grid, InputLabel, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";

// const MenuProps = {
//     PaperProps: {
//         style: {
//             width: 250,
//         },
//     },
// };

const Input = styled("input")({
    display: "none",
});

const DoctorForm: React.FC = () => {
    const [value, setValue] = React.useState<Date | null>(new Date("2000-01-01T21:11:54"));
    const [file, setFile] = React.useState<string>();

    const handleChange = (newValue: Date | null) => {
        setValue(newValue);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Doctor>();

    const onSubmit: SubmitHandler<Doctor> = (data: Doctor) => {
        console.log(data);
    };

    const uploadedFile = (event?: React.ChangeEvent<HTMLInputElement>) => {
        setFile(URL.createObjectURL(event?.target.files![0]));
        console.log(URL.createObjectURL(event?.target.files![0]));
    };

    return (
        <Card
            sx={{
                p: 1,
                m: 2,
                borderRadius: 1,
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "center", m: 3 }}>
                <Typography variant="h5" component="h2">
                    Thông tin chứng chỉ/chuyên ngành
                </Typography>
            </Box>
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    "& > :not(style)": {
                        m: 2,
                        display: "flex",
                        alignItems: "center",
                    },
                }}
            >
                <Grid container columnSpacing={5}>
                    <Grid item xs={2}>
                        <InputLabel>
                            <Typography variant="h6">Chuyên khoa</Typography>
                        </InputLabel>
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            id="major"
                            variant="outlined"
                            placeholder="Chuyên khoa"
                            error={!!errors.scopeOfPractice}
                            helperText={errors.scopeOfPractice && "Vui lòng chọn chuyên khoa"}
                            {...register("scopeOfPractice", { required: true })}
                            sx={{ width: "80%" }}
                        />
                    </Grid>
                </Grid>
                <Grid container columnSpacing={5}>
                    <Grid item xs={2}>
                        <InputLabel>
                            <Typography variant="h6">Nơi công tác</Typography>
                        </InputLabel>
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            id="hospitals"
                            variant="outlined"
                            placeholder="Tên bệnh viện/phòng khám"
                            error={!!errors.hospitalDoctors}
                            helperText={errors.hospitalDoctors && "Vui lòng chọn nơi công tác"}
                            {...register("hospitalDoctors", { required: true })}
                            sx={{ width: "80%" }}
                        />
                    </Grid>
                </Grid>
                <Grid container columnSpacing={5}>
                    <Grid item xs={2}>
                        <InputLabel>
                            <Typography variant="h6">Tên chứng chỉ</Typography>
                        </InputLabel>
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            id="certi-name"
                            placeholder="Tên chứng chỉ"
                            variant="outlined"
                            error={!!errors.certificationDoctors}
                            helperText={
                                errors.certificationDoctors && "Vui lòng nhập tên chứng chỉ"
                            }
                            {...register("certificationDoctors", { required: true })}
                            sx={{ width: "80%" }}
                        />
                    </Grid>
                </Grid>
                <Grid container columnSpacing={5}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={10}>
                        <TextField
                            id="certi-img"
                            placeholder="Ảnh chứng chỉ"
                            variant="outlined"
                            type="file"
                            error={!!errors.practisingCertificate}
                            helperText={
                                errors.practisingCertificate && "Vui lòng chọn ảnh chứng chỉ"
                            }
                            {...register("practisingCertificate", { required: true })}
                            sx={{ width: "80%" }}
                        />
                    </Grid>
                </Grid>
                <Grid container columnSpacing={5}>
                    <Grid item xs={2}>
                        <InputLabel>
                            <Typography variant="h6">Nơi cấp</Typography>
                        </InputLabel>
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            id="certi-place"
                            placeholder="Nơi cấp chứng chỉ"
                            variant="outlined"
                            error={!!errors.placeOfCertificate}
                            helperText={
                                errors.placeOfCertificate && "Vui lòng nhập nơi cấp chứng chỉ"
                            }
                            {...register("placeOfCertificate", { required: true })}
                            sx={{ width: "80%" }}
                        />
                    </Grid>
                </Grid>
                <Grid container columnSpacing={5}>
                    <Grid item xs={2}>
                        <InputLabel>
                            <Typography variant="h6">Ngày cấp</Typography>
                        </InputLabel>
                    </Grid>
                    <Grid item xs={10}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                inputFormat="dd/MM/yyyy"
                                value={value}
                                onChange={handleChange}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        error={!!errors.dateOfCertificate}
                                        helperText={
                                            errors.dateOfCertificate && "Vui lòng nhập ngày cấp"
                                        }
                                        {...register("dateOfCertificate", { required: true })}
                                        sx={{ width: "80%" }}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                    </Grid>
                    {/* <Grid item xs={2}>
                        <InputLabel>
                            <Typography variant="h6">Giới tính</Typography>
                        </InputLabel>
                    </Grid>
                    <Grid item xs={4}>
                        <Select MenuProps={MenuProps} {...register("isMale", { required: true })}>
                            <MenuItem value="true">Nam</MenuItem>
                            <MenuItem value="false">Nữ</MenuItem>
                        </Select>
                    </Grid> */}
                </Grid>
                <Box
                    sx={{
                        justifyContent: "center",
                        mx: "auto",
                        p: 1,
                        m: 1,
                        "& > :not(style)": { m: 1 },
                    }}
                >
                    <Button variant="outlined">Hủy bỏ</Button>
                    <Button variant="contained" type="submit">
                        Lưu thay đổi
                    </Button>
                </Box>
            </Box>
        </Card>
    );
};

export default DoctorForm;
