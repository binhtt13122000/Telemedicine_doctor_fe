import React, { useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory } from "react-router";

import MultipleAutocomplete from "./components/MultipleAutocomplete";
import useSnackbar from "src/components/Snackbar/useSnackbar";

import defaultImg from "../../assets/default-image.png";
import { Doctor } from "./models/Doctor.model";
import DoctorService from "./services/Doctor.service";

import { PhotoCamera } from "@mui/icons-material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Button, Card, Grid, IconButton, InputLabel, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import LocalStorageUtil from "src/utils/LocalStorageUtil";

const Input = styled("input")({
    display: "none",
});

const DoctorForm: React.FC = () => {
    const showSnackBar = useSnackbar();
    const history = useHistory();
    const [date, setDate] = useState<Date | null>(new Date("2000-01-01T21:11:54"));
    const [imgLink, setImgLink] = useState<string>(defaultImg);
    const [file, setFile] = useState<string | Blob>("");

    const {
        register,
        handleSubmit,
        setValue,
        clearErrors,
        formState: { errors },
    } = useForm<Doctor>();

    const { ref: hospitalDoctorsRef, ...hospitalDoctorsProps } = register("hospitalDoctors", {
        validate: (value) => !!value.length,
    });

    const { ref: majorDoctorsRef, ...majorDoctorsProps } = register("majorDoctors", {
        validate: (value) => !!value.length,
    });

    const changeValueHospitalDoctors = (values: number[]) => {
        const res = values.map((id) => {
            const obj = { hospitalId: id };
            return obj;
        });
        setValue("hospitalDoctors", res);
        clearErrors("hospitalDoctors");
    };

    const changeValueMajorDoctors = (values: number[]) => {
        const res = values.map((id) => {
            const obj = { majorId: id };
            return obj;
        });
        setValue("majorDoctors", res);
        clearErrors("majorDoctors");
    };

    const handleChange = (newDate: Date | null) => {
        setDate(newDate);
    };

    const uploadedFile = (event?: React.ChangeEvent<HTMLInputElement>) => {
        setImgLink(URL.createObjectURL(event?.target.files![0]));
        setFile(event?.target.files![0] as Blob);
    };

    const createDoctor = async (data: Doctor) => {
        try {
            let formData = new FormData();
            formData.append("Email", data.email);
            formData.append("PractisingCertificate", file);
            formData.append("CertificateCode", data.certificateCode);
            formData.append("PlaceOfCertificate", data.placeOfCertificate);
            formData.append("DateOfCertificate", data.dateOfCertificate);
            formData.append("ScopeOfPractice", data.scopeOfPractice);
            formData.append("Description", data.description);
            formData.append("HospitalDoctors", JSON.stringify(data.hospitalDoctors));
            formData.append("MajorDoctors", JSON.stringify(data.majorDoctors));
            const service = new DoctorService<Doctor>();
            const response = await service.create(formData);
            if (response.status === 201) {
                console.log(response.data);
                showSnackBar({
                    children: "Cập nhật thông tin thành công. Vui lòng đăng nhập lại.",
                    variant: "filled",
                    severity: "success",
                });
                history.push("/login");
            }
        } catch (e) {
            console.log(e);
            showSnackBar({
                children: "Có lỗi xảy ra. Vui lòng cập nhật đầy đủ thông tin trước khi lưu",
                variant: "filled",
                severity: "error",
            });
        }
    };

    const onSubmit: SubmitHandler<Doctor> = (data: Doctor) => {
        const res = { ...data, email: LocalStorageUtil.getUser() };
        console.log(res);
        createDoctor(res);
    };

    return (
        <Card
            sx={{
                position: "absolute" as "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "70%",
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
                encType="multipart/form-data"
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
                    <Grid item xs={3}>
                        <InputLabel>
                            <Typography variant="h6">Nơi công tác</Typography>
                        </InputLabel>
                    </Grid>
                    <Grid item xs={9}>
                        <MultipleAutocomplete
                            id="hospitals-selection"
                            query="/hospitals"
                            field="name"
                            searchField="name"
                            limit={10}
                            errors={Boolean(errors?.hospitalDoctors)}
                            errorMessage={"Vui lòng chọn nơi công tác"}
                            inputRef={hospitalDoctorsRef}
                            {...hospitalDoctorsProps}
                            changeValue={changeValueHospitalDoctors}
                            width="80%"
                        />
                    </Grid>
                </Grid>
                <Grid container columnSpacing={5}>
                    <Grid item xs={3}>
                        <InputLabel>
                            <Typography variant="h6">Chuyên ngành</Typography>
                        </InputLabel>
                    </Grid>
                    <Grid item xs={9}>
                        <MultipleAutocomplete
                            id="majors-selection"
                            query="/majors"
                            field="name"
                            searchField="name"
                            limit={10}
                            errors={Boolean(errors?.majorDoctors)}
                            errorMessage={"Vui lòng chọn chuyên ngành"}
                            inputRef={majorDoctorsRef}
                            {...majorDoctorsProps}
                            changeValue={changeValueMajorDoctors}
                            width="80%"
                        />
                    </Grid>
                </Grid>
                <Grid container columnSpacing={5}>
                    <Grid item xs={3}>
                        <InputLabel>
                            <Typography variant="h6">Chuyên khoa</Typography>
                        </InputLabel>
                    </Grid>
                    <Grid item xs={9}>
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
                    <Grid item xs={3}>
                        <InputLabel>
                            <Typography variant="h6">Mã chứng chỉ hành nghề</Typography>
                        </InputLabel>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            id="certi-code"
                            placeholder="Vd: 002761"
                            variant="outlined"
                            error={!!errors.certificateCode}
                            helperText={errors.certificateCode && "Vui lòng nhập mã chứng chỉ"}
                            {...register("certificateCode", { required: true })}
                            sx={{ width: "80%" }}
                        />
                    </Grid>
                </Grid>
                <Grid container columnSpacing={5}>
                    <Grid item xs={3}>
                        <InputLabel>
                            <Typography variant="h6">Nơi cấp</Typography>
                        </InputLabel>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            id="certi-place"
                            placeholder="Vd: Công an TP HCM"
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
                    <Grid item xs={3}>
                        <InputLabel>
                            <Typography variant="h6">Ngày cấp</Typography>
                        </InputLabel>
                    </Grid>
                    <Grid item xs={9}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                inputFormat="dd/MM/yyyy"
                                value={date}
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
                </Grid>
                <Grid container columnSpacing={5}>
                    <Grid item xs={3}>
                        <InputLabel>
                            <Typography variant="h6">Thông tin giới thiệu</Typography>
                        </InputLabel>
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            id="description"
                            variant="outlined"
                            multiline
                            rows={3}
                            {...register("description")}
                            sx={{ width: "90%" }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <img src={imgLink} alt="Certificate Image" width="100" height="100" />
                        <label htmlFor="icon-button-file">
                            <Input
                                accept="image/*"
                                id="icon-button-file"
                                type="file"
                                {...register("practisingCertificate")}
                                onChange={uploadedFile}
                            />
                            <IconButton
                                color="primary"
                                aria-label="upload picture"
                                component="span"
                            >
                                <PhotoCamera />
                            </IconButton>
                        </label>
                    </Grid>
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
                        Lưu thông tin
                    </Button>
                </Box>
            </Box>
        </Card>
    );
};

export default DoctorForm;
