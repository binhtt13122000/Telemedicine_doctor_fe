import { Cetification } from "./Cetification.model";

export type CertificationDoctor = {
    id: number;
    doctorId: number;
    certificationId: number;
    evidence: string;
    dateOfIssue: string;
    certification: Cetification;
};
