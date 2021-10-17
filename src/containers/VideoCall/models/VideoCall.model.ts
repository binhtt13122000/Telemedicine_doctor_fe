export type Patient = {
    id?: number;
    email?: string;
    backgroundDisease: string;
    allergy: string;
    bloodGroup: string;
    isActive: boolean;
    name: string;
    avatar?: string;
};

export type HealthCheck = {
    id?: number;
    height: number;
    weight: number;
    reasonCancel: string;
    rating: number;
    comment: string;
    advice: string;
    patientId: number;
    createdTime: string;
    canceledTime: string;
    patient: Patient;
    slots: Slots[];
    symptomHealthChecks: SymptomHealthChecks[];
    status: string;
    token: string;
    appId: string;
    chanel: string;
};

export type Slots = {
    id?: number;
    assignedDate: string;
    doctorId?: string;
    startTime: string;
    endTime: string;
    isActive: boolean;
    doctor: Doctors;
};

export type SymptomHealthChecks = {
    id?: number;
    symptomId?: number;
    healthCheckId?: number;
    evidence: string;
    isActive: boolean;
    symptom: Symptom;
};

export type Symptom = {
    id?: number;
    symptomCode: string;
    name: string;
    description?: string;
    isActive: boolean;
};

export type Doctors = {
    id?: string;
    email: string;
    practisingCertificate: string;
    certificateCode: string;
    placeOfCertificate: string;
    dateOfCertificate: string;
    scopeOfPractice: string;
    description: string;
    numberOfConsultants: string;
    rating: number;
    isVerify: string;
    certificationDoctors: Cetification[];
    hospitalDoctors: HospitalDoctor[];
    majorDoctors: Major[];
    name?: string;
    avatar?: string;
};

export type Major = {
    id: string;
    doctorId: string;
    majorId: string;
    major: {
        id: string;
        name: string;
        description: string;
    };
};
export type HospitalDoctor = {
    id?: string;
    doctorId: string;
    hospitalId: string;
    isWorking: string;
    hospital: {
        id: string;
        hospitalCode: string;
        name: string;
        address: string;
        description: string;
        lat: string;
        long: string;
    };
};

export type Cetification = {
    id?: string;
    doctorId: string;
    certificationId: string;
    evidence?: string;
    dateOfIssue: string;
    certification: {
        id: string;
        name: string;
        description: string;
    };
};
