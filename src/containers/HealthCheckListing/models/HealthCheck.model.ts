import { Patient } from "src/containers/VideoCall/models/VideoCall.model";

export type HealthCheck = {
    id?: number;
    height: number;
    weight: number;
    reasonCancel: string;
    rating: string;
    comment: string;
    advice: string;
    paatientId: number;
    createdTime: string;
    canceledTime: string;
    status: string;
    patient?: Patient;
    healthCheckDiseases: [];
    prescription: [];
    slots: [];
    symptomHealthChecks: [];
};

export type Order = "asc" | "desc";
