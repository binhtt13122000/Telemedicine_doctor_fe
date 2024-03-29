import React from "react";

import { useHistory } from "react-router";
import axios from "src/axios";
import { IPagingSupport } from "src/common/types";
import { API_ROOT_URL } from "src/configurations";

import logo from "../../assets/app-logo.png";

import { AccountCircle } from "@mui/icons-material";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import MenuIcon from "@mui/icons-material/Menu";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { Badge, Menu, MenuItem, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { green } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import { Account } from "src/common/models/Account.model";
import LocalStorageUtil from "src/utils/LocalStorageUtil";

interface IAppBarWithDrawer {
    drawerWidth: number;
    handleDrawerToggle: () => void;
    countOfUnread: number;
    clearUnread: () => void;
}

export type Notification = {
    id: number;
    content: string;
    userId: number;
    createdDate: string;
    isSeen: boolean;
    isActive: boolean;
    user?: Account;
    type: number;
};

export type NotificationCM = {
    content: string;
    email: string;
    type: number;
};

const AppBarWithDrawer: React.FC<IAppBarWithDrawer> = (props: IAppBarWithDrawer) => {
    const history = useHistory();
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [notifications, setNotifications] = React.useState<Notification[]>([]);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const [anchorElNoti, setAnchorElNoti] = React.useState<null | HTMLElement>(null);

    const handleNotiMenu = (event: React.MouseEvent<HTMLElement>) => {
        const user = LocalStorageUtil.getItem("user");
        if (user) {
            axios
                .get<IPagingSupport<Notification>>(
                    `/notifications?user-id=${user.id}&page-offset=1&limit=20`
                )
                .then((response) => {
                    setNotifications(response.data.content);
                    props.clearUnread();
                })
                .catch((error) => {
                    // eslint-disable-next-line no-console
                    console.log(error);
                });
        }
        setAnchorElNoti(event.currentTarget);
    };

    const getBackgroundColor = (type: number) => {
        switch (type) {
            case 1:
                return green["50"];
            default:
                break;
        }
    };

    const logout = async () => {
        try {
            const account = LocalStorageUtil.getItem("user") as Account;
            const response = await axios.post(`${API_ROOT_URL}/logout`, {
                token: LocalStorageUtil.getItem("token_subcribe"),
                email: account.email,
            });
            if (response.status === 200) {
                LocalStorageUtil.clear();
                window.location.reload();
            }
        } catch (ex) {
            // eslint-disable-next-line no-console
            console.log(ex);
        } finally {
            setAnchorEl(null);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseNoti = () => {
        setAnchorElNoti(null);
    };

    return (
        <AppBar
            position="fixed"
            style={{
                zIndex: theme.zIndex.drawer + 1,
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={props.handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: "none" } }}
                >
                    <MenuIcon />
                </IconButton>
                <Box sx={{ flexGrow: 1 }}>
                    <img src={logo} alt="telemedicine-logo" width="145" height="36" />
                </Box>
                <IconButton
                    size="large"
                    aria-label="notification"
                    aria-controls="noti-menu"
                    aria-haspopup="true"
                    onClick={handleNotiMenu}
                    color="inherit"
                >
                    {props.countOfUnread > 0 ? (
                        <Badge badgeContent={props.countOfUnread || 4} color="error">
                            <CircleNotificationsIcon />
                        </Badge>
                    ) : (
                        <Badge badgeContent={props.countOfUnread} color="error">
                            <CircleNotificationsIcon />
                        </Badge>
                    )}
                </IconButton>
                <Menu
                    id="noti-menu"
                    anchorEl={anchorElNoti}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    open={Boolean(anchorElNoti)}
                    onClose={handleCloseNoti}
                    PaperProps={{
                        style: {
                            maxHeight: 200,
                            width: "400px",
                        },
                    }}
                >
                    {notifications.length === 0 ? (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: 100,
                                p: 1,
                            }}
                        >
                            <Typography>Bạn chưa có thông báo mới</Typography>
                        </Box>
                    ) : (
                        notifications.map((item) => (
                            <MenuItem
                                key={item.id}
                                onClick={() => history.push(item.content.split("-")[1])}
                                disableRipple
                            >
                                <Box
                                    sx={{
                                        width: "100%",
                                        height: 50,
                                        backgroundColor: getBackgroundColor(item.type),
                                        display: "flex",
                                        alignItems: "center",
                                        px: 2,
                                    }}
                                >
                                    {item.type === 1 && (
                                        <VerifiedUserIcon
                                            color="success"
                                            sx={{ mr: 2 }}
                                            fontSize="large"
                                        />
                                    )}
                                    {item.content.split("-")[0]}
                                </Box>
                            </MenuItem>
                        ))
                    )}
                </Menu>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>Thông tin cá nhân</MenuItem>
                    <MenuItem onClick={logout}>Đăng xuất</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default AppBarWithDrawer;
