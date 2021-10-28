import { IPagingSupport } from "src/common/types";

import axios from "../../../axios";
import { HealthCheck } from "../models/HealthCheck.model";

class HealthCheckService<T> {
    getAll(limit: number, offset: number) {
        return axios.get<IPagingSupport<T>>(`/health-checks?limit=${limit}&page-offset=${offset}`);
    }

    getBy(limit: number, offset: number, status: string, order: string, filtering: string) {
        return axios.get<
            IPagingSupport<T>
        >(`health-checks?status=${status}&order-type=${order}&filtering=${filtering}
        &page-offset=${offset}&limit=${limit}`);
    }

    getId(id: number) {
        return axios.get<T>(`/health-checks/${id}`);
    }

    create(data: HealthCheck) {
        return axios.post<T>("/health-checks", data);
    }

    update(data: HealthCheck) {
        return axios.put<T>(`/health-checks/${data.id}`, data);
    }

    delete(id: number) {
        return axios.delete<{ message: "string" }>(`/health-checks/${id}`);
    }
}

export default HealthCheckService;
