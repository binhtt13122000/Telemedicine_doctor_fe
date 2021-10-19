import React, { useState } from "react";

import moment from "moment";

import useGetAccount from "../hooks/useGetAccount";
import usePutAccount from "../hooks/usePutAccount";
import { Account } from "../models/Account.model";
import ProfileForm from "./ProfileForm";

import {
    Avatar,
    Card,
    CircularProgress,
    Icon,
    IconButton,
    Rating,
    Stack,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";

export interface IProfile {
    email?: string;
}

const Profile: React.FC = () => {
    const initAccount: Account = {
        id: 1,
        email: "",
        firstName: "",
        lastName: "",
        ward: "",
        streetAddress: "",
        locality: "",
        city: "",
        postalCode: "",
        phone: "",
        avatar: "",
        dob: "",
        isMale: true,
        active: true,
    };
    const { data, isLoading, isError } = useGetAccount();
    const [value, setValue] = React.useState<number | null>(4);
    const { mutate } = usePutAccount();
    const [open, setOpen] = useState<boolean>(false);
    const [account, setAccount] = useState<Account>(initAccount);
    if (isError) {
        return <div>error</div>;
    }
    if (isLoading) {
        return <CircularProgress />;
    }
    const handleOpenModal = () => {
        setOpen(true);
        data && setAccount(data);
    };
    const handleClose = (
        type: "SAVE" | "CANCEL",
        dataProfile?: Account,
        clearErrors?: Function
    ) => {
        if (type === "SAVE") {
            if (dataProfile) {
                if (dataProfile.id) {
                    mutate({
                        id: dataProfile?.id,
                        email: dataProfile?.email,
                        firstName: dataProfile?.firstName,
                        lastName: dataProfile?.lastName,
                        ward: dataProfile?.ward,
                        streetAddress: dataProfile?.streetAddress,
                        locality: dataProfile?.locality,
                        city: dataProfile?.city,
                        postalCode: dataProfile?.postalCode,
                        phone: dataProfile?.phone,
                        avatar: dataProfile?.avatar,
                        dob: dataProfile?.dob,
                        isMale: dataProfile?.isMale,
                        active: dataProfile?.active,
                    });
                } else {
                    // postDrug(data);
                }
            }
        }
        if (clearErrors) {
            clearErrors();
        }
        setOpen(false);
        if (isLoading) {
            return <CircularProgress />;
        }
    };

    return (
        <React.Fragment>
            {data && <ProfileForm dataProfile={account} open={open} handleClose={handleClose} />}
            <Card sx={{ minHeight: "100%", width: 450, borderRadius: 5, pl: 5 }}>
                <Box sx={{ display: "flex" }}>
                    <Typography variant="h6" component="div">
                        Profile doctor
                    </Typography>
                    <Box sx={{ ml: 29 }}>
                        <Typography variant="h6" component="h5">
                            <IconButton onClick={() => handleOpenModal()}>
                                <Icon>edit</Icon>
                            </IconButton>
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ mt: 2 }} />
                <Box>
                    <Box
                        sx={{
                            ml: 15,
                        }}
                    >
                        <Avatar
                            sx={{ borderRadius: 10, width: 150, height: 150 }}
                            variant="square"
                            alt="Remy Sharp"
                            src="https://taimuihongsg.com/wp-content/uploads/2018/05/Kim-Bun-ThuongE-01.jpg"
                        />
                    </Box>
                    <Box
                        sx={{
                            ml: 17,
                        }}
                    >
                        <Rating name="simple-controlled" value={value} />
                    </Box>
                </Box>
                <Box sx={{ mt: 2 }} />
                <Box
                    sx={{
                        alignItems: "left",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {/* <Avatar
                            src={data?.avatar}
                            sx={{
                                height: 100,
                                width: 100,
                            }}
                        /> */}
                    <Stack direction="row" spacing={1}>
                        <Typography variant="h6" component="div">
                            {data?.isMale ? "Bà" : "Ông"}{" "}
                            {`${data?.firstName}
                        ${data?.lastName}`}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        <Typography variant="h6" component="div">
                            Email:
                        </Typography>
                        <Typography variant="h6" component="div" sx={{ fontWeight: "normal" }}>
                            {data?.email}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        <Typography variant="h6" component="div">
                            Số điện thoại:
                        </Typography>
                        <Typography
                            gutterBottom
                            variant="h6"
                            component="div"
                            sx={{ fontWeight: "normal" }}
                        >
                            {data?.phone}
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                        <Typography variant="h6" component="div">
                            Ngày sinh:
                        </Typography>
                        <Typography
                            gutterBottom
                            variant="h6"
                            component="div"
                            sx={{ fontWeight: "normal" }}
                        >
                            {moment(data?.dob).format("DD/MM/YYYY")}
                        </Typography>
                    </Stack>
                    <Box sx={{ display: "inline" }}>
                        <Typography variant="h6" component="div">
                            Địa chỉ:{" "}
                            {`${data?.streetAddress}, ${data?.locality}, ${data?.ward}, ${data?.city} `}
                        </Typography>
                    </Box>
                </Box>
            </Card>
        </React.Fragment>
    );
};

export default Profile;
