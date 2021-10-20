import * as React from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import { CetificationAdd } from "../models/Cetification.model";

import { Card, Modal, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";

export interface ICertificationForm {
    open: boolean;
    dataCetificationAdd: CetificationAdd;
    handleClose: (
        type: "SAVE" | "CANCEL",
        dataCetificationAdd?: CetificationAdd,
        callback?: Function
    ) => void;
}
const CertificationFormAdd: React.FC<ICertificationForm> = (props: ICertificationForm) => {
    const { dataCetificationAdd } = props;

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
    } = useForm<CetificationAdd>({});

    React.useEffect(() => {
        setValue("certificationId", dataCetificationAdd.certificationId);
        setValue("evidence", dataCetificationAdd.evidence);
        setValue("dateOfIssue", dataCetificationAdd.dateOfIssue);
    }, [dataCetificationAdd, setValue]);

    const submitHandler: SubmitHandler<CetificationAdd> = (
        dataCetificationAdd: CetificationAdd
    ) => {
        // reset();
        if (dataCetificationAdd) {
            props.handleClose("SAVE", dataCetificationAdd, clearErrors);
        }
    };
    return (
        <Modal
            open={props.open}
            aria-labelledby="certificate-dialog"
            aria-describedby="alert-certificate-description"
        >
            <form onSubmit={handleSubmit(submitHandler)}>
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
                            Thông tin chứng chỉ
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            "& > :not(style)": {
                                m: 2,
                                display: "flex",
                                // justifyContent: "center"
                            },
                        }}
                    >
                        <TextField
                            id="certificationId"
                            label="Tên chứng chỉ *"
                            variant="outlined"
                            error={!!errors.certificationId}
                            helperText={errors.certificationId && "Mã chứng chỉ là bắt buộc"}
                            {...register("certificationId", { required: true })}
                        />
                        <TextField
                            id="evidence"
                            label="Tên chứng chỉ *"
                            variant="outlined"
                            error={!!errors.evidence}
                            helperText={errors.evidence && "Bằng chứng là bắt buộc"}
                            {...register("evidence", { required: true })}
                        />
                        <TextField
                            id="dateOfIssue"
                            label="Tên chứng chỉ *"
                            variant="outlined"
                            defaultValue="2000-08-08T00:00:00"
                            error={!!errors.dateOfIssue}
                            helperText={errors.dateOfIssue && "Mã chứng chỉ là bắt buộc"}
                            {...register("dateOfIssue", { required: true })}
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
                            <Button variant="contained" type="submit" autoFocus>
                                Lưu
                            </Button>
                        </Box>
                    </Box>
                </Card>
            </form>
        </Modal>
    );
};

export default CertificationFormAdd;
