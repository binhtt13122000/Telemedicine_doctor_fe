import React, { useCallback, useEffect, useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory } from "react-router";

import useSnackbar from "src/components/Snackbar/useSnackbar";

import { Account } from "./models/Account.model";
import AccountService from "./services/Account.service";
import AddressService from "./services/Address.service";

import { PhotoCamera } from "@mui/icons-material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
    Autocomplete,
    Avatar,
    Button,
    Card,
    FormControlLabel,
    Grid,
    IconButton,
    InputLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import LocalStorageUtil from "src/utils/LocalStorageUtil";

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

const Input = styled("input")({
    display: "none",
});

const AccountForm: React.FC = () => {
    const [date, setDate] = useState<Date | null>(new Date("1990-01-01T21:11:54"));
    const [imgLink, setImgLink] = useState<string>();
    const [file, setFile] = useState<string | Blob>("");
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [disableDistrict, setDisableDistrict] = useState<boolean>(true);
    const [disableWard, setDisableWard] = useState<boolean>(true);
    const history = useHistory();
    const showSnackBar = useSnackbar();

    const handleChange = (newValue: Date | null) => {
        setDate(newValue);
    };

    const {
        register,
        handleSubmit,
        setValue,
        clearErrors,
        formState: { errors },
    } = useForm<Account>();

    const createAccount = async (data: Account) => {
        try {
            let formData = new FormData();
            formData.append("Email", data.email);
            formData.append("FirstName", data.firstName);
            formData.append("LastName", data.lastName);
            formData.append("Image", file);
            formData.append("Ward", data.ward);
            formData.append("StreetAddress", data.streetAddress);
            formData.append("Locality", data.locality);
            formData.append("City", data.city);
            formData.append("PostalCode", data.postalCode);
            formData.append("Phone", data.phone);
            formData.append("Dob", data.dob);
            formData.append("IsMale", data.isMale.toString());
            formData.append("RoleId", data.roleId.toString());
            const service = new AccountService<Account>();
            const response = await service.create(formData);
            if (response.status === 201) {
                // console.log(response.data);
                history.push("/doctor-form");
            }
        } catch (_) {
            // console.log(e);
            showSnackBar({
                children: "Có lỗi xảy ra. Vui lòng cập nhật đầy đủ thông tin trước khi lưu",
                variant: "filled",
                severity: "error",
            });
        }
    };

    const onSubmit: SubmitHandler<Account> = (data: Account) => {
        if (data.isMale === "true") {
            data.isMale = true;
        } else {
            data.isMale = false;
        }
        const res: Account = { ...data, postalCode: "0", roleId: 1 };
        createAccount(res);
    };

    const uploadedFile = (event?: React.ChangeEvent<HTMLInputElement>) => {
        setImgLink(URL.createObjectURL(event?.target.files![0]));
        setFile(event?.target.files![0] as Blob);
    };

    const onChangeProvince = (newProvince: Province | null) => {
        if (newProvince) {
            setValue("city", newProvince.name);
            clearErrors("city");
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
            setValue("ward", newDistrict.name);
            clearErrors("ward");
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

    useEffect(() => {
        setValue("email", LocalStorageUtil.getItem("email"));
        fetchProvinces();
    }, [fetchProvinces, setValue]);

    return (
        <Card
            sx={{
                position: "absolute" as "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "80%",
                p: 1,
                m: 2,
                borderRadius: 1,
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "center", m: 3 }}>
                <Typography variant="h5" component="h2">
                    Thông tin tài khoản
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
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-end" }}>
                    <Avatar src={imgLink} alt="avatar" sx={{ width: 130, height: 130 }} />
                    <label htmlFor="icon-button-file">
                        <Input
                            accept="image/*"
                            id="icon-button-file"
                            type="file"
                            {...register("avatar")}
                            onChange={uploadedFile}
                        />
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                        </IconButton>
                    </label>
                </Box>
                <Grid container columnSpacing={5}>
                    <Grid item xs={2}>
                        <InputLabel>
                            <Typography variant="h6">Họ</Typography>
                        </InputLabel>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="last-name"
                            placeholder="Họ"
                            variant="outlined"
                            error={!!errors.lastName}
                            helperText={errors.lastName && "Họ không được trống"}
                            {...register("lastName", { required: true })}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <InputLabel>
                            <Typography variant="h6">Giới tính</Typography>
                        </InputLabel>
                    </Grid>
                    <Grid item xs={4}>
                        <RadioGroup
                            aria-label="isMale"
                            defaultValue="true"
                            name="radio-buttons-group"
                            sx={{ display: "flex", flexDirection: "row" }}
                        >
                            <FormControlLabel
                                {...register("isMale", { required: true })}
                                value="true"
                                control={<Radio />}
                                label="Nam"
                                sx={{ pr: 2 }}
                            />
                            <FormControlLabel
                                {...register("isMale", { required: true })}
                                value="false"
                                control={<Radio />}
                                label="Nữ"
                                sx={{ pr: 2 }}
                            />
                            <FormControlLabel
                                {...register("isMale", { required: true })}
                                value="null"
                                control={<Radio />}
                                label="Khác"
                            />
                        </RadioGroup>
                    </Grid>
                </Grid>
                <Grid container columnSpacing={5}>
                    <Grid item xs={2}>
                        <InputLabel>
                            <Typography variant="h6">Tên</Typography>
                        </InputLabel>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="first-name"
                            placeholder="Tên"
                            variant="outlined"
                            error={!!errors.firstName}
                            helperText={errors.firstName && "Vui lòng nhập tên"}
                            {...register("firstName", { required: true })}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <InputLabel>
                            <Typography variant="h6">Ngày sinh</Typography>
                        </InputLabel>
                    </Grid>
                    <Grid item xs={4}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                inputFormat="dd/MM/yyyy"
                                value={date}
                                onChange={handleChange}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        sx={{ width: 210.4 }}
                                        error={!!errors.dob}
                                        helperText={errors.dob && "Vui lòng nhập ngày sinh"}
                                        {...register("dob", { required: true })}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
                <Grid container columnSpacing={5}>
                    <Grid item xs={2}>
                        <InputLabel>
                            <Typography variant="h6">Email</Typography>
                        </InputLabel>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField id="email" variant="outlined" disabled {...register("email")} />
                    </Grid>
                    <Grid item xs={2}>
                        <InputLabel>
                            <Typography variant="h6">Số điện thoại</Typography>
                        </InputLabel>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id="phone"
                            variant="outlined"
                            placeholder="0123456789"
                            error={!!errors.phone}
                            helperText={errors.phone && "Vui lòng nhập số điện thoại"}
                            {...register("phone", { required: true })}
                        />
                    </Grid>
                </Grid>
                <Grid container columnSpacing={5}>
                    <Grid item xs={2}>
                        <InputLabel>
                            <Typography variant="h6">Địa chỉ</Typography>
                        </InputLabel>
                    </Grid>
                    <Grid item xs={10}>
                        <TextField
                            id="streetAddress"
                            variant="outlined"
                            placeholder="Số nhà/tên đường"
                            error={!!errors.streetAddress}
                            helperText={errors.streetAddress && "Vui lòng nhập địa chỉ cụ thể"}
                            {...register("streetAddress", { required: true })}
                            sx={{ width: "84%" }}
                        />
                    </Grid>
                </Grid>
                <Grid container columnSpacing={5}>
                    <Grid item xs={2}></Grid>
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
                                    {...register("city", { required: true })}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={3}>
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
                                    error={!!errors.ward}
                                    helperText={errors.ward && "Vui lòng chọn Quận/Huyện"}
                                    {...register("ward", { required: true })}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Autocomplete
                            disabled={disableWard}
                            options={wards}
                            getOptionLabel={(ward: Ward) => ward.name}
                            isOptionEqualToValue={(option, value) => option.name === value.name}
                            onChange={(_, newWard) => {
                                if (newWard) {
                                    setValue("locality", newWard.name);
                                    clearErrors("locality");
                                }
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    id="locality"
                                    variant="outlined"
                                    placeholder="Phường/Xã"
                                    error={!!errors.locality}
                                    helperText={errors.locality && "Vui lòng chọn Phường/Xã"}
                                    {...register("locality", { required: true })}
                                />
                            )}
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
                        onClick={() => {
                            history.push("/login");
                        }}
                    >
                        Hủy bỏ
                    </Button>
                    <Button variant="contained" type="submit">
                        Lưu
                    </Button>
                </Box>
            </Box>
        </Card>
    );
};

export default AccountForm;
