import React from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import { DoctorFromAdd } from "../models/Doctor.model";
import MultipleAutocomplete from "./MultipleAutocomplete";

import { Button, Card, Grid, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";

export interface IMajorForm {
    opened: boolean;
    dataMajorAdd: DoctorFromAdd;
    handleClose: (
        type: "SAVE" | "CANCEL",
        dataMajorAdd?: DoctorFromAdd,
        callback?: Function
    ) => void;
}

const MajorFormAdd: React.FC<IMajorForm> = (props: IMajorForm) => {
    const { dataMajorAdd } = props;

    const changeValue = (value: number) => {
        setValue("id", value);
        clearErrors("id");
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
    } = useForm<DoctorFromAdd>({});

    React.useEffect(() => {
        // setValue("id", dataMajorAdd.id);
        // setValue("email", dataMajorAdd.email);
        // setValue("name", dataMajorAdd.name);
        // setValue("avatar", dataMajorAdd.avatar);
        // setValue("practisingCertificate", dataMajorAdd.practisingCertificate);
        // setValue("certificateCode", dataMajorAdd.certificateCode);
        // setValue("placeOfCertificate", dataMajorAdd.placeOfCertificate);
        // setValue("dateOfCertificate", dataMajorAdd.dateOfCertificate);
        // setValue("scopeOfPractice", dataMajorAdd.scopeOfPractice);
        // setValue("description", dataMajorAdd.description);
        // setValue("numberOfConsultants", dataMajorAdd.numberOfConsultants);
        // setValue("rating", dataMajorAdd.rating);
        // setValue("isVerify", dataMajorAdd.isVerify);
        // setValue("isActive", dataMajorAdd.isActive);
        // setValue("certificationDoctors", dataMajorAdd.certificationDoctors);
        // setValue("hospitalDoctors", dataMajorAdd.hospitalDoctors);
        // setValue("majorDoctors", dataMajorAdd.majorDoctors);
        setValue("id", dataMajorAdd.id);
        // setValue("email", dataHospital.email);
        setValue("certificateCode", dataMajorAdd.certificateCode);
        setValue("placeOfCertificate", dataMajorAdd.placeOfCertificate);
        setValue("dateOfCertificate", dataMajorAdd.dateOfCertificate);
        setValue("scopeOfPractice", dataMajorAdd.scopeOfPractice);
        setValue("isActive", dataMajorAdd.isActive);
    }, [dataMajorAdd, setValue]);

    const submitHandler: SubmitHandler<DoctorFromAdd> = (dataMajorAdd: DoctorFromAdd) => {
        // eslint-disable-next-line no-console
        console.log(dataMajorAdd);
        if (dataMajorAdd) {
            props.handleClose("SAVE", dataMajorAdd, clearErrors);
        }
    };

    const changeValueMajorDoctors = (values: number[]) => {
        const res = values.map((id) => {
            const obj = { majorId: id };
            return obj;
        });
        setValue("majorDoctors", res);
        clearErrors("majorDoctors");
    };

    const { ref: majorDoctorsRef, ...majorDoctorsProps } = register("majorDoctors", {
        validate: (value) => !!value.length,
    });
    return (
        <Modal open={props.opened}>
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
                        Thông tin Chuyên ngành
                    </Typography>
                </Box>
                <Box
                    component="form"
                    sx={{
                        "& > :not(style)": {
                            m: 2,
                            display: "flex",
                            justifyContent: "center",
                        },
                    }}
                >
                    <Grid container columnSpacing={1}>
                        <Grid item xs={3}>
                            <Typography variant="h6">Chuyên ngành:</Typography>
                        </Grid>
                        <Grid item xs={8}>
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

export default MajorFormAdd;
