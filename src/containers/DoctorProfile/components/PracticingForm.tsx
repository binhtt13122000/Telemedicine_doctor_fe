import React from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import { DoctorPraticing } from "../models/Doctor.model";

import { Button, Card, Modal, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

export interface IPracticingForm {
    dataPracticing: DoctorPraticing;
    open: boolean;
    handleClose: (
        type: "SAVE" | "CANCEL",
        dataPracticing?: DoctorPraticing,
        callback?: Function
    ) => void;
}

const PracticingForm: React.FC<IPracticingForm> = (props: IPracticingForm) => {
    const { dataPracticing } = props;

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
    } = useForm<DoctorPraticing>({});

    React.useEffect(() => {
        setValue("id", dataPracticing.id);
        setValue("email", dataPracticing.email);
        setValue("name", dataPracticing.name);
        setValue("avatar", dataPracticing.avatar);
        setValue("practisingCertificate", dataPracticing.practisingCertificate);
        setValue("certificateCode", dataPracticing.certificateCode);
        setValue("placeOfCertificate", dataPracticing.placeOfCertificate);
        setValue("dateOfCertificate", dataPracticing.dateOfCertificate);
        setValue("scopeOfPractice", dataPracticing.scopeOfPractice);
        setValue("description", dataPracticing.description);
        setValue("numberOfConsultants", dataPracticing.numberOfConsultants);
        setValue("rating", dataPracticing.rating);
        setValue("isVerify", dataPracticing.isVerify);
        setValue("isActive", dataPracticing.isActive);
        // setValue("certificationDoctors", dataPracticing.certificationDoctors);
        // setValue("hospitalDoctors", dataPracticing.hospitalDoctors);
        // setValue("majorDoctors", dataPracticing.majorDoctors);
        // setValue("slots", dataPracticing.slots);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataPracticing]);
    const submitHandler: SubmitHandler<DoctorPraticing> = (dataPracticing: DoctorPraticing) => {
        // eslint-disable-next-line no-console
        console.log(dataPracticing);
        if (dataPracticing) {
            props.handleClose("SAVE", dataPracticing, clearErrors);
        }
    };

    return (
        <Modal open={props.open}>
            <Card
                sx={{
                    position: "absolute" as "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "50%",
                    minWidth: 275,
                    mx: "auto",
                    p: 1,
                    m: 2,
                    borderRadius: 1,
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "center", m: 3 }}>
                    <Typography variant="h6" component="h2">
                        Chỉnh sửa thông tin
                    </Typography>
                </Box>
                <Box
                    component="form"
                    sx={{
                        "& > :not(style)": {
                            m: 2,
                            display: "flex",
                            // justifyContent: "center",
                        },
                    }}
                >
                    <Stack direction="row" spacing={2}>
                        <TextField
                            id="name"
                            label="Tên*"
                            variant="outlined"
                            error={!!errors.name}
                            helperText={errors.name && "Tên là bắt buộc"}
                            {...register("name", { required: true })}
                        />
                        <TextField
                            id="avatar"
                            label="Họ*"
                            variant="outlined"
                            error={!!errors.avatar}
                            helperText={errors.avatar && "Hình ảnh là bắt buộc"}
                            {...register("avatar", { required: true })}
                        />
                        <TextField
                            id="practisingCertificate"
                            label="Ngày sinh*"
                            variant="outlined"
                            error={!!errors.practisingCertificate}
                            helperText={errors.practisingCertificate && "Chứng ch là bắt buộc"}
                            {...register("practisingCertificate", { required: true })}
                        />
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        <TextField
                            id="placeOfCertificate"
                            label="Mã bưu điện*"
                            variant="outlined"
                            disabled
                            error={!!errors.placeOfCertificate}
                            helperText={errors.placeOfCertificate && "Mã bưu điện là bắt buộc"}
                            {...register("placeOfCertificate", { required: true })}
                        />
                        <TextField
                            id="dateOfCertificate"
                            label="Địa phương*"
                            variant="outlined"
                            error={!!errors.dateOfCertificate}
                            helperText={errors.dateOfCertificate && "Địa phương là bắt buộc"}
                            {...register("dateOfCertificate", { required: true })}
                        />
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        <TextField
                            id="scopeOfPractice"
                            label="Địa chỉ đường phố*"
                            variant="outlined"
                            error={!!errors.scopeOfPractice}
                            helperText={errors.scopeOfPractice && "Địa chỉ đường phố là bắt buộc"}
                            {...register("scopeOfPractice", { required: true })}
                        />
                        <TextField
                            id="numberOfConsultants"
                            label="Thành phố*"
                            variant="outlined"
                            error={!!errors.numberOfConsultants}
                            helperText={errors.numberOfConsultants && "Thành phố là bắt buộc"}
                            {...register("numberOfConsultants", { required: true })}
                        />
                        <TextField
                            id="rating"
                            label="Số điện thoại*"
                            variant="outlined"
                            error={!!errors.rating}
                            helperText={errors.rating && "Số điện thoại đường phố là bắt buộc"}
                            {...register("rating", { required: true })}
                        />
                    </Stack>
                    {/* <Stack direction="row" spacing={0}>
                    <Typography
                        sx={{
                            // mx: "auto",
                            p: 1,
                            //
                            // "& > :not(style)": { m: 1 },
                        }}
                    >
                        Trạng thái:
                    </Typography>
                    <Switch
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ "aria-label": "controlled" }}
                    />
                </Stack> */}
                    <Box
                        sx={{
                            justifyContent: "center",
                            mx: "auto",
                            p: 1,
                            m: 1,
                            "& > :not(style)": { m: 1 },
                        }}
                    >
                        <Button
                            variant="outlined"
                            onClick={() => props.handleClose("CANCEL", undefined, clearErrors)}
                        >
                            Hủy
                        </Button>
                        <Button variant="contained" onClick={handleSubmit(submitHandler)} autoFocus>
                            Lưu
                        </Button>
                    </Box>
                </Box>
            </Card>
        </Modal>
    );
};

export default PracticingForm;
