import React from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import CustomizeAutocomplete from "src/components/CustomizeAutocomplete";

import { Doctor } from "../models/Doctor.model";

import { Button, Card, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";

export interface IMajorForm {
    opened: boolean;
    dataMajorAdd: Doctor;
    handleClose: (type: "SAVE" | "CANCEL", dataMajorAdd?: Doctor, callback?: Function) => void;
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
    } = useForm<Doctor>({});

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
        setValue("name", dataMajorAdd.name);
        setValue("description", dataMajorAdd.description);
        setValue("isActive", dataMajorAdd.isActive);
    }, [dataMajorAdd, setValue]);

    const submitHandler: SubmitHandler<Doctor> = (dataMajorAdd: Doctor) => {
        // eslint-disable-next-line no-console
        console.log(dataMajorAdd);
        if (dataMajorAdd) {
            props.handleClose("SAVE", dataMajorAdd, clearErrors);
        }
    };
    const { ref: idRef, ...idRefProps } = register("id", {
        min: {
            value: 1,
            message: "Mã chuyên ngành không được để trống",
        },
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
                    <CustomizeAutocomplete
                        query="/majors"
                        field="groupName"
                        label="Chuyên ngành"
                        searchField="group-name"
                        limit={10}
                        errors={errors.id}
                        errorMessage={"Nhóm ngành nghề là bắt buộc"}
                        inputRef={idRef}
                        {...idRefProps}
                        changeValue={changeValue}
                    />

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
