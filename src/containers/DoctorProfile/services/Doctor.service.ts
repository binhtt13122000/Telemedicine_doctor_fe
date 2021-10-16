import { IPagingSupport } from "src/common/types";

import axios from "../../../axios";
import { Doctor } from "../models/Doctor.model";

class DoctorService<T> {
    getAll(limit: number, offset: number) {
        return axios.get<IPagingSupport<T>>(`/doctors?limit=${limit}&page-offset=${offset}`);
    }

    getId(id: number) {
        return axios.get<T>(`/doctors/${id}`);
    }

    getDoctorByEmail(email: string) {
        return axios.get<T>(`/doctors/${email}?search-type=Email`);
    }

    create(data: Doctor) {
        return axios.post<T>("/doctors", data);
    }

    update(data: Doctor) {
        return axios.put<T>(`/doctors/${data.id}`, data);
    }

    delete(id: number) {
        return axios.delete<{ message: "string" }>(`/doctors/${id}`);
    }
}

export default DoctorService;
