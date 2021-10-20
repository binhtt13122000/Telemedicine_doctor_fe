import { useQuery } from "react-query";

import DoctorService from "../services/Doctor.service";

import { Doctor } from "src/containers/VideoCall/models/VideoCall.model";

export enum ServerStateKeysEnum {
    NearestHealthCheck = "NearestHealthCheck",
}
const useGetDoctorById = (id: string) => {
    let doctorService = new DoctorService();
    const result = useQuery<Doctor, Error>(["doctor", id], async () => {
        const result = await doctorService.getDoctorById(id);
        return result.data;
    });
    return result;
};

export default useGetDoctorById;
