import { useQuery } from "react-query";
import { IPagingSupport } from "src/common/types";

import { Account } from "../models/Account.model";
import AccountService from "../services/Account.service";

import useGetDoctor from "src/containers/DoctorProfile/hooks/useGetListDoctor";

export enum AccountStateKeysEnum {
    Accounts = "accounts",
}

const useGetAccount = (limit: number = 5, offset: number = 1) => {
    let accountService = new AccountService<Account>();
    const result = useQuery<IPagingSupport<Account>, Error>(
        [AccountStateKeysEnum.Accounts, limit, offset],
        async () => {
            const result = await accountService.getAll(limit, offset);
            console.log(result);
            return result.data;
        }
    );

    return result;
};

export default useGetDoctor;
