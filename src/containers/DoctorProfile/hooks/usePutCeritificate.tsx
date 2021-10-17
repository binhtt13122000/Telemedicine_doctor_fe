import { useMutation, useQueryClient } from "react-query";

import { Cetification } from "../models/Cetification.model";
import CertificateService from "../services/Certificate.service";

export enum MajorStateKeysEnum {
    Majors = "majors",
}

const usePutCeritificate = () => {
    // let majorService = new MajorService<Major>();
    let certificateService = new CertificateService<Cetification>();
    const cache = useQueryClient();
    const result = useMutation<Cetification, Error, Cetification>(
        [MajorStateKeysEnum.Majors],
        async (variable) => {
            const result = await certificateService.update(variable);
            return result.data;
        },
        {
            // onSuccess: () => {
            //     cache.invalidateQueries(DoctorStateKeysEnum.Doctors);
            // },
            // onError: () => {
            //     // eslint-disable-next-line no-console
            //     console.log("error");
            // },
        }
    );
    return result;
};

export default usePutCeritificate;
