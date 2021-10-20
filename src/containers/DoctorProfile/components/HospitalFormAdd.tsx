import React from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import CustomizeAutocomplete from "src/components/CustomizeAutocomplete";

import { Hospital } from "../models/Hospital.model";

import { Button, Card, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";

export interface IHospitalForm {
    dataHospital: Hospital;
    opened: boolean;
    handleClose: (type: "SAVE" | "CANCEL", dataHospital?: Hospital, callback?: Function) => void;
}

const HospitalFormAdd: React.FC<IHospitalForm> = (props: IHospitalForm) => {
    const { dataHospital } = props;

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
    } = useForm<Hospital>({});

    React.useEffect(() => {
        setValue("id", dataHospital.id);
        setValue("hospitalCode", dataHospital.hospitalCode);
        setValue("name", dataHospital.name);
        setValue("address", dataHospital.address);
        setValue("description", dataHospital.description);
        setValue("isActive", dataHospital.isActive);
    }, [dataHospital, setValue]);
    const submitHandler: SubmitHandler<Hospital> = (dataHospital: Hospital) => {
        // eslint-disable-next-line no-console
        console.log(dataHospital);
        if (dataHospital) {
            props.handleClose("SAVE", dataHospital, clearErrors);
        }
    };

    const { ref: idRef, ...idRefProps } = register("id", {
        min: {
            value: 1,
            message: "Mã bệnh viện không được để trống",
        },
    });

    const changeValue = (value: number) => {
        setValue("id", value);
        clearErrors("id");
    };
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
                    <CustomizeAutocomplete
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

export default HospitalFormAdd;
