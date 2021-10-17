import { useMutation, useQueryClient } from "react-query";

import { Doctor } from "../models/Doctor.model";
import DoctorService from "../services/Doctor.service";
import { DoctorStateKeysEnum } from "./useGetDoctor";

const usePutMajor = () => {
    // let majorService = new MajorService<Major>();
    let doctorService = new DoctorService<Doctor>();
    const cache = useQueryClient();
    const result = useMutation<Doctor, Error, Doctor>(
        [DoctorStateKeysEnum.CreateMajor],
        async (variable) => {
            const result = await doctorService.update(variable);
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

export default usePutMajor;
