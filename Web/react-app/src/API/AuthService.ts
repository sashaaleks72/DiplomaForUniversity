import axios from 'axios';
import ILogin from '../models/ILogin';
import { authUrl } from './ApiUrls';
import IRegister from '../models/IRegister';
import IPersonInfo from '../models/IPersonInfo';
import User from '../store/user';

class AuthService {
    static async Login(loginModel: ILogin): Promise<void> {
        const token: string = await axios({
            url: `${authUrl}/login`,
            method: 'POST',
            data: loginModel,
        }).then((response) => response.data);

        User.setToken(token);
    }

    static async Register(registerModel: IRegister): Promise<void> {
        await axios({
            url: `${authUrl}/register`,
            method: 'POST',
            data: registerModel,
        }).then((response) => console.log(response));
    }

    static async RefreshToken(): Promise<void> {
        const newToken = await axios({
            url: `${authUrl}/refreshToken`,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${User.getToken()}`,
            },
        }).then((response) => response.data);

        User.setToken(newToken);
    }

    static async GetProfile(): Promise<void> {
        const profile: IPersonInfo = await axios.get(`${authUrl}/getProfile`, {
            headers: {
                Authorization: `Bearer ${User.getToken()}`,
            },
        });

        User.setProfile(profile);
    }
}

export default AuthService;
