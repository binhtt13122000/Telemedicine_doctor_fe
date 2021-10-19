export type Doctor = {
    email: string;
    name: string;
    avatar: string;
    practisingCertificate: string;
    certificateCode: string;
    placeOfCertificate: string;
    dateOfCertificate: string;
    scopeOfPractice: string;
    description: string;
    certificationDoctors: [
        {
            certificationId: number;
            evidence: string;
            dateOfIssue: string;
        }
    ];
    hospitalDoctors: [
        {
            hospitalId: number;
        }
    ];
    majorDoctors: [
        {
            majorId: number;
        }
    ];
};
