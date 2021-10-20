import { useMutation, useQueryClient } from "react-query";

import { Account } from "../models/Account.model";
import { AccountStateKeysEnum } from "./useGetAccount";

import AccountService from "src/containers/Account/services/Account.service";

const usePutAccount = () => {
    let accountService = new AccountService<Account>();
    const cache = useQueryClient();
    const result = useMutation<Account, Error, Account>(
        [AccountStateKeysEnum.UpdateAccounts],
        async (variable) => {
            const result = await accountService.update(variable);
            return result.data;
        },
        {
            onSuccess: () => {
                cache.invalidateQueries(AccountStateKeysEnum.UpdateAccounts);
            },
            onError: () => {
                // eslint-disable-next-line no-console
                console.log("error");
            },
        }
    );
    return result;
};

export default usePutAccount;
function variable(variable: Account) {
    throw new Error("Function not implemented.");
}
