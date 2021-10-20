export type Cetification = {
    id?: number;
    name: string;
    description: string;
    isActive: boolean;
};

export type CetificationAdd = {
    certificationId?: number;
    evidence: string;
    dateOfIssue: string;
};
