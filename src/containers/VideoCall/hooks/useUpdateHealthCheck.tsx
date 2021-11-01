import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import axios from "src/axios";

import { IUpdateHealthCheck } from "../components/VideoCall/IUpdateHealthCheck.model";

const useUpdateHealthCheck = () => {
    const result = useMutation<unknown, Error, IUpdateHealthCheck, unknown>(
        ["useAcceptRequest"],
        async (variable) => {
            let result = await axios.put<unknown, AxiosResponse<unknown>, IUpdateHealthCheck>(
                "/health-checks?mode=DOCTORS",
                variable
            );
            return result.data;
        },
        {
            onSuccess: () => {},
        }
    );
    return result;
};

export default useUpdateHealthCheck;
