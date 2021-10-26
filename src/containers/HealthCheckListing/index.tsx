import React, { useCallback, useEffect, useRef } from "react";

import moment from "moment";

import useGetHealthCheck from "./hooks/useGetHealthCheck";
import { HealthCheck, Order } from "./models/HealthCheck.model";
import HealthCheckService from "./services/HealthCheck.service";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
    Avatar,
    Card,
    Chip,
    CircularProgress,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    TextField,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";

const HealthCheckListing: React.FC = () => {
    const { data, isLoading, isError } = useGetHealthCheck();
    const [searchTerm, setSearchTerm] = React.useState("");
    const typingTimeoutRef = useRef();
    const [dataHealth, setDataHealth] = React.useState<HealthCheck[]>([]);
    const [order, setOrder] = React.useState<Order>("desc");
    const [orderBy, setOrderBy] = React.useState<boolean>(true);
    const filtering = "string";
    // const order = "asc";
    const statusStr = "BOOKED";
    const getHealthCheck = useCallback(
        async (
            limit: number,
            offset: number,
            statusStr: string,
            order: string,
            filtering: string
        ) => {
            let healthCheckService = new HealthCheckService<HealthCheck>();
            const response = await healthCheckService.getBy(
                limit,
                offset,
                statusStr,
                order,
                filtering
            );
            //     await axios.get(`${API_ROOT_URL}/health-checks?order-type=${order}&filtering=${filtering}
            // &page-offset=${offset}&limit=${limit}`);
            if (response.status === 200) {
                // const dataH: IPagingSupport<T> = response.data;
                console.log("healthcheck", response.data);
                setDataHealth(response.data.content);
            }
        },
        []
    );

    const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setSearchTerm(value);
    };

    const handlerChangeOrder = () => {
        if (orderBy === true) {
            console.log(orderBy);
            setOrderBy(false);
            setOrder("asc");
        } else {
            setOrderBy(true);
            setOrder("desc");
        }
    };

    const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
    };
    useEffect(() => {
        getHealthCheck(20, 1, statusStr, order, filtering);
    }, [getHealthCheck, statusStr, order, filtering]);

    if (isError) {
        return <div>error</div>;
    }
    if (isLoading) {
        return <CircularProgress />;
    }

    return (
        <React.Fragment>
            <Card sx={{ minHeight: "100%", width: "50%", borderRadius: 1 }}>
                <Box sx={{ display: "flex", mb: 5, mt: 1 }}>
                    <Box sx={{}}>
                        <Typography variant="h6" component="div">
                            Danh sách lịch khám
                        </Typography>
                    </Box>

                    <Box sx={{ ml: "10rem", display: "flex" }}>
                        <IconButton onClick={() => handlerChangeOrder}>
                            <ArrowDownwardIcon />
                        </IconButton>
                        <form>
                            <TextField
                                label="Search input"
                                type="text"
                                variant="outlined"
                                value={searchTerm}
                                onChange={handleSearchTermChange}
                            />
                        </form>
                    </Box>
                </Box>

                <List
                    sx={{
                        width: "100%",
                        bgcolor: "grey",
                        position: "relative",
                        overflow: "auto",
                        maxHeight: 600,
                        "& ul": { padding: 0 },
                    }}
                >
                    {dataHealth?.map((item) => (
                        <>
                            <ListItem key={item.id}>
                                <Box
                                    sx={{
                                        borderRadius: 2,
                                        bgcolor: "#e0e0e0",
                                        width: "100%",
                                        height: "100%",
                                        display: "flex",
                                    }}
                                >
                                    <ListItemAvatar sx={{ m: 2 }}>
                                        <Avatar
                                            alt="alt"
                                            src={item.patient?.avatar}
                                            sx={{ width: 56, height: 56 }}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={item.patient?.name}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: "block" }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    {item.patient?.backgroundDisease}
                                                </Typography>
                                                <Typography
                                                    sx={{ display: "block" }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    Ngày{" "}
                                                    {moment(item?.createdTime).format("DD-MM-YYYY")}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                    <Box
                                        sx={{
                                            mt: 4,
                                            mr: 3,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            justifyItems: "center",
                                        }}
                                    >
                                        <Chip
                                            sx={{ width: 100 }}
                                            label={item?.status}
                                            size="small"
                                            color={
                                                item?.status === "COMPLETED" ? "success" : "error"
                                            }
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            mt: 3,
                                            mr: 3,
                                        }}
                                    >
                                        <IconButton>
                                            <ArrowForwardIosIcon />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </ListItem>
                        </>
                    ))}
                </List>
            </Card>
        </React.Fragment>
    );
};

export default HealthCheckListing;
