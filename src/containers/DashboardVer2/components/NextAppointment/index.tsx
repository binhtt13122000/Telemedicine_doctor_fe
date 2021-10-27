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
            <CardContent sx={{ height: 250 }}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography component="div">
                            <Box
                                sx={{
                                    fontWeight: "medium",
                                    fontSize: 18,
                                    textAlign: "center",
                                }}
                            >
                                Bắt đầu lúc 10:00
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Avatar src="" variant="rounded" sx={{ width: 80, height: 80 }} />
                    </Grid>
                    <Grid item xs={9}>
                        <Typography component="div">
                            <Box
                                sx={{
                                    fontWeight: "medium",
                                    fontSize: 18,
                                }}
                            >
                                Ngoc Nguyen
                            </Box>
                        </Typography>
                        <Typography color="text.primary">Chiều cao: 150cm</Typography>
                        <Typography color="text.primary">Cân nặng: 45kg</Typography>
                        <Typography color="text.primary">Dị ứng: Không có</Typography>
                        <Typography color="text.primary">Bệnh nền: Không có</Typography>
                        <Typography color="text.primary">
                            Triệu chứng: Chưa có triệu chứng
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-end",
                }}
            >
                <Button variant="outlined" color="success" startIcon={<CallRoundedIcon />}>
                    Call
                </Button>
            </CardActions>
        </Card>
    );
};

export default NextAppointment;
