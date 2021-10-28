import CallRoundedIcon from "@mui/icons-material/CallRounded";
import {
    Grid,
    Card,
    CardHeader,
    Divider,
    CardContent,
    Avatar,
    Typography,
    CardActions,
    Button,
} from "@mui/material";
import { Box } from "@mui/system";

const NextAppointment: React.FC = () => {
    return (
        <Card sx={{ width: "100%", height: "100%" }}>
            <CardHeader title="Buổi tư vấn tiếp theo" titleTypographyProps={{ variant: "h6" }} />
            <Divider />
            <CardContent sx={{ height: 230 }}>
                <Grid container spacing={1}>
                    <Grid item xs={3}>
                        <Avatar src="" variant="rounded" sx={{ width: 80, height: 80 }} />
                    </Grid>
                    <Grid item xs={9}>
                        <Typography component="div">
                            <Box
                                sx={{
                                    fontWeight: "medium",
                                    fontSize: 18,
                                    pb: 1,
                                }}
                            >
                                Ngoc Nguyen
                            </Box>
                        </Typography>
                        <Grid container>
                            <Grid item xs={5}>
                                <Typography color="text.primary">Chiều cao:</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography color="text.secondary">150cm</Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={5}>
                                <Typography color="text.primary">Cân nặng:</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography color="text.secondary">49kg</Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={5}>
                                <Typography color="text.primary">Dị ứng:</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography color="text.secondary">Thit, cá, trứng, sữa</Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={5}>
                                <Typography color="text.primary">Bệnh nền:</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography color="text.secondary">Không có</Typography>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={5}>
                                <Typography color="text.primary">Triệu chứng:</Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography color="text.secondary">
                                    Ho, sốt, khó thở, tức ngực
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    "& > :not(style)": { p: 1 },
                }}
            >
                <Typography component="div">
                    <Box
                        sx={{
                            fontWeight: "medium",
                            fontSize: 18,
                            // pl: 1,
                        }}
                    >
                        Bắt đầu lúc 10:00
                    </Box>
                </Typography>
                <Box>
                    <Button variant="outlined" color="success" startIcon={<CallRoundedIcon />}>
                        Call
                    </Button>
                </Box>
            </CardActions>
        </Card>
    );
};

export default NextAppointment;
