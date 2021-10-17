import React, { useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import { Account } from "../models/Account.model";

import { Button, Card, Modal, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

export interface IProfileForm {
    dataProfile: Account;
    open: boolean;
    handleClose: (type: "SAVE" | "CANCEL", dataProfile?: Account, callback?: Function) => void;
}

const ProfileForm: React.FC<IProfileForm> = (props: IProfileForm) => {
    const { dataProfile } = props;
    const [checked, setChecked] = useState<boolean>(dataProfile.active);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        clearErrors,
    } = useForm<Account>({});

    React.useEffect(() => {
        setValue("id", dataProfile.id);
        setValue("email", dataProfile.email);
        setValue("firstName", dataProfile.firstName);
        setValue("lastName", dataProfile.lastName);
        setValue("streetAddress", dataProfile.streetAddress);
        setValue("locality", dataProfile.locality);
        setValue("city", dataProfile.city);
        setValue("postalCode", dataProfile.postalCode);
        setValue("phone", dataProfile.phone);
        setValue("dob", dataProfile.dob);
        setValue("isMale", dataProfile.isMale);
        setValue("active", dataProfile.active);
        setValue("registerTime", dataProfile.registerTime);
        setChecked(dataProfile.active);
    }, [dataProfile, setValue, setChecked]);

    const submitHandler: SubmitHandler<Account> = (dataProfile: Account) => {
        // eslint-disable-next-line no-console
        console.log(dataProfile);
        if (dataProfile) {
            props.handleClose("SAVE", dataProfile, clearErrors);
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
                    <Stack direction="row" spacing={1}>
                        <TextField
                            id="firstName"
                            label="Tên*"
                            variant="outlined"
                            error={!!errors.firstName}
                            helperText={errors.firstName && "Tên là bắt buộc"}
                            {...register("firstName", { required: true })}
                        />
                        <TextField
                            id="lastName"
                            label="Họ*"
                            variant="outlined"
                            error={!!errors.lastName}
                            helperText={errors.lastName && "Họ là bắt buộc"}
                            {...register("lastName", { required: true })}
                        />
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        <TextField
                            id="postalCode"
                            label="Mã bưu điện*"
                            variant="outlined"
                            error={!!errors.postalCode}
                            helperText={errors.postalCode && "Mã bưu điện là bắt buộc"}
                            {...register("postalCode", { required: true })}
                        />
                        <TextField
                            id="locality"
                            label="Họ*"
                            variant="outlined"
                            error={!!errors.locality}
                            helperText={errors.locality && "Địa phương là bắt buộc"}
                            {...register("locality", { required: true })}
                        />
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        <TextField
                            id="streetAddress"
                            label="Địa chỉ đường phố*"
                            variant="outlined"
                            error={!!errors.streetAddress}
                            helperText={errors.streetAddress && "Địa chỉ đường phố là bắt buộc"}
                            {...register("streetAddress", { required: true })}
                        />
                        <TextField
                            id="city"
                            label="Thành phố*"
                            variant="outlined"
                            error={!!errors.city}
                            helperText={errors.city && "Thành phố là bắt buộc"}
                            {...register("city", { required: true })}
                        />
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        <TextField
                            id="phone"
                            label="Số điện thoại*"
                            variant="outlined"
                            error={!!errors.phone}
                            helperText={errors.phone && "Số điện thoại đường phố là bắt buộc"}
                            {...register("phone", { required: true })}
                        />
                        <TextField
                            id="dob"
                            label="Ngày sinh*"
                            variant="outlined"
                            error={!!errors.dob}
                            helperText={errors.dob && "Ngày sinh là bắt buộc"}
                            {...register("dob", { required: true })}
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

export default ProfileForm;
