import axios from 'axios';
import ILogin from '../models/ILogin';
import { authUrl } from './ApiUrls';
import IRegister from '../models/IRegister';
import IPersonInfo from '../models/IPersonInfo';
import User from '../store/user';
import { response } from 'express';
import user from '../store/user';

class AuthService {
    static async Login(loginModel: ILogin): Promise<string> {
        let errorMsg: string = "";

        const token: string = await axios({
            url: `${authUrl}/login`,
            method: 'POST',
            data: loginModel,
        }).then((response) => response.data).catch(err => errorMsg = err.response.data.detail);

        user.setToken(token);
        user.isAuth = true;

        return errorMsg;
    }

    static async Register(registerModel: IRegister): Promise<string> {
        return await axios({
            url: `${authUrl}/register`,
            method: 'POST',
            data: registerModel,
        }).then((response) => console.log(response)).catch(err => err.response.data.detail);
    }

    static async RefreshToken(): Promise<void> {
        const newToken = await axios({
            url: `${authUrl}/refreshToken`,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${user.getToken()}`,
            },
        }).then((response) => response.data);

        user.setToken(newToken);
    }

    static async GetProfile(): Promise<void> {
        const profile: IPersonInfo = await axios.get(`${authUrl}/getProfile`, {
            headers: {
                Authorization: `Bearer ${user.getToken()}`,
            },
        });

        user.setProfile(profile);
    }
}

export default AuthService;
