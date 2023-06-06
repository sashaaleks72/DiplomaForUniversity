import axios from 'axios';
import ILogin from '../models/ILogin';
import { authUrl } from './ApiUrls';
import IRegister from '../models/IRegister';
import IPersonInfo from '../models/IPersonInfo';
import User from '../store/user';
import { response } from 'express';
import user from '../store/user';
import IProfileRequest from '../models/IProfileRequest';

class AuthService {
    static async Login(loginModel: ILogin): Promise<{ token: string, error: string }> {
        const responseData = {
            token: "",
            error: ""
        }

        const token: string = await axios({
            url: `${authUrl}/login`,
            method: 'POST',
            data: loginModel,
        }).then((response) => responseData.token = response.data).catch(err => responseData.error = err.response.data.detail);

        return responseData;
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

    static async GetProfile(): Promise<IPersonInfo> {
        const profile: IPersonInfo = await axios.get(`${authUrl}/GetProfile`, {
            headers: {
                Authorization: `Bearer ${user.getToken()}`,
            },
        }).then((response) => response.data);

        return profile;
    }

    static async UpdateProfile(updatedProfile: IProfileRequest): Promise<IPersonInfo> {
        const profile: IPersonInfo = await axios({
            url: `${authUrl}/UpdateProfile`,
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${user.getToken()}`,
            },
            data: updatedProfile,
        }).then((response) => response.data);

        return profile;
    }
}

export default AuthService;
