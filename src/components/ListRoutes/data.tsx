import dashboard from "../../assets/dashboard.png";
import healthCheck from "../../assets/health-check.png";
import patient from "../../assets/patient.png";
import user from "../../assets/user.png";

export const routes = [
    {
        id: 1,
        name: "Bảng điều khiển",
        path: "/",
        icon: dashboard,
    },
    {
        id: 2,
        name: "Danh sách lịch hẹn",
        path: "/health-checks",
        icon: healthCheck,
    },
    {
        id: 3,
        name: "Bệnh nhân",
        path: "/patients",
        icon: patient,
    },
    {
        id: 4,
        name: "Thông tin cá nhân",
        path: "/doctors",
        icon: user,
    },
    // {
    //     id: 5,
    //     name: "Cấu hình chung",
    //     icon: <Settings />,
    //     children: [
    //         {
    //             id: 6,
    //             name: "Bệnh viện",
    //             path: "/hospitals",
    //             icon: <LocalHospitalIcon />,
    //         },
    //     ],
    // },
];

// export const routesControlApp = [
//     {
//         id: 15,
//         name: "About us",
//         path: "/about-us",
//         children: null,
//         icon: <Info />,
//     },
// ];
