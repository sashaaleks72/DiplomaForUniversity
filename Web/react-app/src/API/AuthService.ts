import axios from 'axios';
import ILogin from '../models/ILogin';
import { authUrl } from './ApiUrls';
import IRegister from '../models/IRegister';
import IPersonInfo from '../models/IPersonInfo';

class AuthService {
    static async Login(loginModel: ILogin): Promise<string> {
        const token: string = await axios({
            url: `${authUrl}/login`,
            method: 'POST',
            data: loginModel,
        }).then((response) => response.data);

        return token;
    }

    static async Register(registerModel: IRegister): Promise<void> {
        await axios({
            url: `${authUrl}/register`,
            method: 'POST',
            data: registerModel,
        }).then((response) => console.log(response));
    }

    static async RefreshToken(): Promise<string> {
        const newToken = await axios({
            url: `${authUrl}/refreshToken`,
            method: 'POST',
        }).then((response) => response.data);

        return newToken;
    }

    static async GetProfile(): Promise<IPersonInfo> {
        const profile: IPersonInfo = await axios({
            url: `${authUrl}/getProfile`,
            // headers: `Bearer`,
        });

        return profile;
    }
}

export default AuthService;
