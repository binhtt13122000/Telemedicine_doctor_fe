import React from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import { DoctorFromAdd } from "../models/Doctor.model";
import MultipleAutocomplete from "./MultipleAutocomplete";

// import { Hospital } from "../models/Hospital.model";
import { Button, Card, Grid, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";

export interface IHospitalForm {
    dataHospital: DoctorFromAdd;
    opened: boolean;
    handleClose: (
        type: "SAVE" | "CANCEL",
        dataHospital?: DoctorFromAdd,
        callback?: Function
    ) => void;
}

const HospitalFormAdd: React.FC<IHospitalForm> = (props: IHospitalForm) => {
    const { dataHospital } = props;

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
    } = useForm<DoctorFromAdd>({});

    React.useEffect(() => {
        setValue("id", dataHospital.id);
        // setValue("email", dataHospital.email);
        setValue("certificateCode", dataHospital.certificateCode);
        setValue("placeOfCertificate", dataHospital.placeOfCertificate);
        setValue("dateOfCertificate", dataHospital.dateOfCertificate);
        setValue("scopeOfPractice", dataHospital.scopeOfPractice);
        setValue("isActive", dataHospital.isActive);
    }, [dataHospital, setValue]);

    const submitHandler: SubmitHandler<DoctorFromAdd> = (dataHospital: DoctorFromAdd) => {
        // eslint-disable-next-line no-console
        console.log(dataHospital);
        if (dataHospital) {
            props.handleClose("SAVE", dataHospital, clearErrors);
        }
    };

    const changeValueHospitalDoctors = (values: number[]) => {
        const res = values.map((id) => {
            const obj = { hospitalId: id };
            return obj;
        });
        setValue("hospitalDoctors", res);
        clearErrors("hospitalDoctors");
    };
    const { ref: hospitalDoctorsRef, ...hospitalDoctorsProps } = register("hospitalDoctors", {
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
                        Thông tin Bệnh viện
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
                    {/* <TextField
                        id="hospital-code"
                        label="Mã bệnh viện *"
                        variant="outlined"
                        error={!!errors.id}
                        helperText={errors.id && "Mã bệnh viện là bắt buộc"}
                        {...register("id", { required: true })}
                    /> */}
                    {/* <CustomizeAutocomplete
                        query="/hospitals"
                        field="groupName"
                        label="Chuyên ngành"
                        searchField="group-name"
                        limit={10}
                        errors={errors.id}
                        errorMessage={"Nhóm ngành nghề là bắt buộc"}
                        inputRef={idRef}
                        {...idRefProps}
                        changeValue={changeValue}
                    /> */}
                    <Grid container columnSpacing={1}>
                        <Grid item xs={3}>
                            <Typography variant="h6">Nơi công tác:</Typography>
                        </Grid>
                        <Grid item xs={8}>
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

export default HospitalFormAdd;
