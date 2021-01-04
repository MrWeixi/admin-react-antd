import { setUserToken, resetUser } from './user';
import { reqLogin, reqLogout } from "@/api/login";
import { setToken, removeToken } from "@/utils/cookieAuth";

export const login = (username, password) => (dispatch) => {
    return new Promise((resolve, reject) => {
        reqLogin({ username: username.trim(), password: password }).then(res => {
            const { data } = res;
            if (data.status === 0) {
                dispatch(setUserToken(data.token));
                setToken(data.token)
                resolve(data)
            } else {
                const msg = data.message;
                reject(msg)
            }
        }).catch((error) => {
            reject(error);
        });
    })
}
export const logout = (token) => (dispatch) => {
    return new Promise((resolve, reject) => {
      reqLogout(token)
        .then((response) => {
          const { data } = response;
          if (data.status === 0) {
            dispatch(resetUser());
            removeToken();
            resolve(data);
          } else {
            const msg = data.message;
            reject(msg);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  