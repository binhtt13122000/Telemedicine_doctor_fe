import axios from "src/axios";
import { API_ROOT_URL } from "src/configurations";
import { auth } from "src/configurations/firebase";

import useSnackbar from "src/components/Snackbar/useSnackbar";

import {
    AuthProvider,
    FacebookAuthProvider,
    GoogleAuthProvider,
    signInWithPopup,
} from "@firebase/auth";
import { Account } from "src/common/models/Account.model";
import LocalStorageUtil from "src/utils/LocalStorageUtil";

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

const useAuth = () => {
    const showSnackBar = useSnackbar();
    const login = async (provider: AuthProvider) => {
        try {
            let response = await signInWithPopup(auth, provider);
            if (response) {
                let tokenId = await response.user.getIdToken();
                let responseLogin = await axios.post<{ account: Account; accessToken: string }>(
                    `${API_ROOT_URL}/login`,
                    {
                        tokenId: tokenId,
                        loginType: 1,
                    }
                );
                if (responseLogin.status === 200) {
                    if (responseLogin.data.account) {
                        LocalStorageUtil.setItem("user", responseLogin?.data?.account);
                        LocalStorageUtil.setItem("token", responseLogin?.data.accessToken);
                        LocalStorageUtil.setItem(
                            "id_app",
                            responseLogin?.data.account.id
                                ? responseLogin?.data.account.id.toString()
                                : "0"
                        );
                        window.location.reload();
                    } else {
                        console.log(responseLogin.data);
                        LocalStorageUtil.setItem("user", Object.values(responseLogin.data)[0]);
                        history.push("/form1");
                    }
                }
            }
        } catch (exception) {
            // eslint-disable-next-line no-console
            console.log(exception);
            showSnackBar({
                severity: "error",
                children: "Đăng nhập thất bại",
            });
        }
    };

    return { login };
};

export default useAuth;
