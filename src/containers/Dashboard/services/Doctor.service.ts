import axios from "../../../axios";

import { Doctor } from "src/containers/VideoCall/models/VideoCall.model";

class DoctorService {
    getDoctorById(id: string) {
        return axios.get<Doctor>(`/doctors/${id}?search-type=Id`);
    }
}

export default DoctorService;
