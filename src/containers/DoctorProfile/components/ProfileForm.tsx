import React, { useCallback, useEffect, useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import { Account } from "../models/Account.model";
import AddressService from "../services/Address.service";

import { Autocomplete, Button, Card, Grid, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

interface Area {
    name: string;
    code: number;
    codename: string;
    division_type: string;
}
interface Province extends Area {
    phone_code: number;
    districts: District[];
}

interface District extends Area {
    province_code: number;
    wards: Ward[];
}

interface Ward extends Area {
    district_code: number;
}
export interface IProfileForm {
    dataProfile: Account;
    open: boolean;
    handleClose: (type: "SAVE" | "CANCEL", dataProfile?: Account, callback?: Function) => void;
}

const ProfileForm: React.FC<IProfileForm> = (props: IProfileForm) => {
    const { dataProfile } = props;
    const [checked, setChecked] = useState<boolean>(dataProfile.active);
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [disableDistrict, setDisableDistrict] = useState<boolean>(true);
    const [disableWard, setDisableWard] = useState<boolean>(true);

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
        setValue("ward", dataProfile.ward);
        setValue("streetAddress", dataProfile.streetAddress);
        setValue("locality", dataProfile.locality);
        setValue("city", dataProfile.city);
        setValue("postalCode", dataProfile.postalCode);
        setValue("phone", dataProfile.phone);
        setValue("dob", dataProfile.dob);
        setValue("isMale", dataProfile.isMale);
        setValue("active", dataProfile.active);
        setChecked(dataProfile.active);
    }, [dataProfile, setValue, setChecked]);

    const submitHandler: SubmitHandler<Account> = (dataProfile: Account) => {
        // eslint-disable-next-line no-console
        // console.log(dataProfile);
        if (dataProfile) {
            props.handleClose("SAVE", dataProfile, clearErrors);
        }
    };
    const onChangeProvince = (newProvince: Province | null) => {
        // if (dataProfile.city) {
        //     setValue("city", dataProfile.city);
        //     console.log("City 1", dataProfile.city);
        // }
        if (newProvince) {
            setValue("city", newProvince.name);
            fetchDistricts(newProvince.code);
            setDisableDistrict(false);
        } else {
            setDistricts([]);
            setValue("ward", "");
            setDisableDistrict(true);
            setValue("locality", "");
            setDisableWard(true);
        }
    };

    const onChangeDistrict = (newDistrict: District | null) => {
        if (newDistrict) {
            setValue("locality", newDistrict.name);
            fetchWards(newDistrict.code);
            setDisableWard(false);
        } else {
            setWards([]);
            setValue("locality", "");
            setDisableWard(true);
        }
    };

    const fetchProvinces = useCallback(async () => {
        try {
            const service = new AddressService<Province[]>();
            const response = await service.getProvinces();
            if (response.status === 200) {
                console.log("Province", response.data);
                setProvinces(response.data);
            }
        } catch (_) {}
    }, []);

    const fetchDistricts = async (provinceCode: number) => {
        try {
            const service = new AddressService<Province>();
            const response = await service.getDistricts(provinceCode);
            if (response.status === 200) {
                setDistricts(response.data.districts);
            }
        } catch (_) {}
    };

    const fetchWards = async (districtCode: number) => {
        try {
            const service = new AddressService<District>();
            const response = await service.getWards(districtCode);
            if (response.status === 200) {
                setWards(response.data.wards);
            }
        } catch (_) {}
    };

    const { ref: city, ...cityProps } = register("city", {
        min: {
            value: 1,
            message: "Mã dịch bệnh không được để trống",
        },
    });

    useEffect(() => {
        fetchProvinces();
    }, [fetchProvinces]);

    return (
        <Modal open={props.open}>
            <Card
                sx={{
                    position: "absolute" as "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "40%",
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
                    <Grid container columnSpacing={1}>
                        <Grid item xs={3}>
                            <TextField
                                id="firstName"
                                label="Tên*"
                                variant="outlined"
                                // error={!!errors.firstName}
                                // helperText={errors.firstName && "Tên là bắt buộc"}
                                {...register("firstName", { required: true })}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="lastName"
                                label="Họ*"
                                variant="outlined"
                                // error={!!errors.lastName}
                                // helperText={errors.lastName && "Họ là bắt buộc"}
                                {...register("lastName", { required: true })}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="dob"
                                label="Ngày sinh*"
                                variant="outlined"
                                // error={!!errors.dob}
                                // helperText={errors.dob && "Ngày sinh là bắt buộc"}
                                {...register("dob", { required: true })}
                            />
                        </Grid>
                    </Grid>
                    <Grid container columnSpacing={1}>
                        <Grid item xs={4}>
                            <TextField
                                id="email"
                                label="Email*"
                                variant="outlined"
                                // error={!!errors.email}
                                // helperText={errors.email && "Email là bắt buộc"}
                                {...register("email", { required: true })}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="phone"
                                label="Số điện thoại*"
                                variant="outlined"
                                // error={!!errors.phone}
                                // helperText={errors.phone && "Số điện thoại đường phố là bắt buộc"}
                                {...register("phone", { required: true })}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                id="isMale"
                                label="Giới tính*"
                                disabled
                                variant="outlined"
                                // error={!!errors.isMale}
                                // helperText={errors.isMale && "Giới tính là bắt buộc"}
                                {...register("isMale", { required: true })}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={5}>
                            <TextField
                                id="streetAddress"
                                label="Địa chỉ đường phố*"
                                variant="outlined"
                                // error={!!errors.streetAddress}
                                // helperText={errors.streetAddress && "Địa chỉ đường phố là bắt buộc"}
                                {...register("streetAddress", { required: true })}
                            />
                        </Grid>
                        <Grid item xs={7}>
                            <TextField
                                id="postalCode"
                                label="Mã bưu điện*"
                                variant="outlined"
                                disabled
                                // error={!!errors.postalCode}
                                // helperText={errors.postalCode && "Mã bưu điện là bắt buộc"}
                                {...register("postalCode", { required: true })}
                            />
                        </Grid>
                    </Grid>
                    <Grid container columnSpacing={1}>
                        <Grid item xs={3}>
                            <Autocomplete
                                options={provinces}
                                getOptionLabel={(province: Province) => province.name}
                                isOptionEqualToValue={(option, value) => option.name === value.name}
                                onChange={(_, newProvince) => onChangeProvince(newProvince)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        id="city"
                                        variant="outlined"
                                        placeholder="Tỉnh/Thành phố"
                                        error={!!errors.city}
                                        helperText={errors.city && "Vui lòng chọn Tỉnh/Thành phố"}
                                        // inputRef={city}
                                        // {...cityProps}
                                        {...register("city", { required: true })}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Autocomplete
                                disabled={disableDistrict}
                                options={districts}
                                getOptionLabel={(district: District) => district.name}
                                isOptionEqualToValue={(option, value) => option.name === value.name}
                                onChange={(_, newDistrict) => onChangeDistrict(newDistrict)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        id="ward"
                                        variant="outlined"
                                        placeholder="Quận/Huyện"
                                        // error={!!errors.ward}
                                        // helperText={errors.ward && "Vui lòng chọn Quận/Huyện"}
                                        {...register("ward", { required: true })}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Autocomplete
                                disabled={disableWard}
                                options={wards}
                                getOptionLabel={(ward: Ward) => ward.name}
                                isOptionEqualToValue={(option, value) => option.name === value.name}
                                onChange={(_, newWard) => {
                                    if (newWard) {
                                        setValue("locality", newWard.name);
                                    }
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        id="locality"
                                        variant="outlined"
                                        placeholder="Phường/Xã"
                                        // error={!!errors.locality}
                                        // helperText={errors.locality && "Vui lòng chọn Phường/Xã"}
                                        {...register("locality", { required: true })}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
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
