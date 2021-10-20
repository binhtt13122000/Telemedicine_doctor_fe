import React, { useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import { Doctor } from "../models/Doctor.model";

import { Button, Card, Modal, Stack, Switch, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

export interface IPracticingForm {
    dataPracticing: Doctor;
    open: boolean;
    handleClose: (type: "SAVE" | "CANCEL", dataPracticing?: Doctor, callback?: Function) => void;
}

const PracticingForm: React.FC<IPracticingForm> = (props: IPracticingForm) => {
    const { dataPracticing } = props;
    const [checked, setChecked] = useState<boolean>(dataPracticing.isActive);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        // eslint-disable-next-line no-console
        console.log(event.target.checked); //true
        if (event.target.checked === true) {
            setValue("isActive", true);
            clearErrors("id");
        } else if (event.target.checked === false) {
            setValue("isActive", false);
            clearErrors("id");
        } else {
            // eslint-disable-next-line no-console
            console.log(event.target.checked);
        }
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
    } = useForm<Doctor>({});

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
        setValue("certificationDoctors", dataPracticing.certificationDoctors);
        setValue("hospitalDoctors", dataPracticing.hospitalDoctors);
        setValue("majorDoctors", dataPracticing.majorDoctors);
        setChecked(dataPracticing.isActive);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataPracticing, setChecked]);
    const submitHandler: SubmitHandler<Doctor> = (dataPracticing: Doctor) => {
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
                            id="practisingCertificate"
                            label="Chứng chỉ*"
                            variant="outlined"
                            error={!!errors.practisingCertificate}
                            helperText={errors.practisingCertificate && "Chứng chỉ là bắt buộc"}
                            {...register("practisingCertificate", { required: true })}
                        />
                        <TextField
                            id="certificateCode"
                            label="Mã chứng chỉ*"
                            variant="outlined"
                            error={!!errors.certificateCode}
                            helperText={errors.certificateCode && "Mã chứng chỉ là bắt buộc"}
                            {...register("certificateCode", { required: true })}
                        />
                        <TextField
                            id="placeOfCertificate"
                            label="Nơi cấp chứng chỉ*"
                            variant="outlined"
                            error={!!errors.placeOfCertificate}
                            helperText={
                                errors.placeOfCertificate && "Nơi cấp chứng chỉ là bắt buộc"
                            }
                            {...register("placeOfCertificate", { required: true })}
                        />
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <TextField
                            id="dateOfCertificate"
                            label="Ngày cấp chứng chỉ*"
                            variant="outlined"
                            error={!!errors.dateOfCertificate}
                            helperText={
                                errors.dateOfCertificate && "Ngày cấp chứng chỉ là bắt buộc"
                            }
                            {...register("dateOfCertificate", { required: true })}
                        />
                        <TextField
                            id="scopeOfPractice"
                            label="Phạm vi*"
                            variant="outlined"
                            error={!!errors.scopeOfPractice}
                            helperText={errors.scopeOfPractice && "Phạm vi là bắt buộc"}
                            {...register("scopeOfPractice", { required: true })}
                        />
                        <TextField
                            id="description"
                            label="Mô tả*"
                            variant="outlined"
                            error={!!errors.description}
                            helperText={errors.description && "Mô tả là bắt buộc"}
                            {...register("description", { required: true })}
                        />
                    </Stack>
                    <Stack direction="row" spacing={0}>
                        <Typography
                            sx={{
                                // mx: "auto",
                                p: 1,
                                //
                                // "& > :not(style)": { m: 1 },
                            }}
                        >
                            Trạng thái: {}
                        </Typography>
                        <Switch
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{ "aria-label": "controlled" }}
                        />
                    </Stack>
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
