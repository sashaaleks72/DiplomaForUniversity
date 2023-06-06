import { parseJwt } from './../utils/auth';
import { response } from 'express';
import { makeAutoObservable } from 'mobx';
import IPersonInfo from '../models/IPersonInfo';
import AuthService from '../API/AuthService';
import IProfileRequest from '../models/IProfileRequest';
import ILogin from '../models/ILogin';

class User {
    isAuthorized: boolean = false;
    isAdmin: boolean = false;
    jwtToken?: string;
    profile?: IPersonInfo;

    constructor() {
        makeAutoObservable(this);
        this.jwtToken = localStorage.getItem('token') || "";

        if (this.jwtToken) {
            this.isAuthorized = true;
            const parsedToken = parseJwt(this.jwtToken);

            if (parsedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === "Admin") {
                this.isAdmin = true;
            }
        }
    }

    get isAuth(): boolean {
        return this.isAuthorized;
    }

    set isAuth(value: boolean) {
        this.isAuthorized = value;
    }

    setToken(token: string): void {
        this.jwtToken = token;
        localStorage.setItem('token', token);
    }

    getToken(): string | undefined {
        return this.jwtToken;
    }

    async login(credentials: ILogin): Promise<string> {
        const response = await AuthService.Login(credentials);

        if (!response.error) {
            const parsedToken = parseJwt(response.token);

            this.setToken(response.token);
            this.isAuth = true;

            if (parsedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === "Admin") {
                this.isAdmin = true;
            }
        }


        return response.error;
    }

    async getProfile(): Promise<IPersonInfo> {
        if (!this.profile) {
            this.profile = await AuthService.GetProfile();
        }

        return this.profile;
    }

    async updateProfile(updatedProfile: IProfileRequest) {
        let needUpdate: boolean = false;

        for (let prop in updatedProfile) {
            if (this.profile![prop as keyof IPersonInfo] !== updatedProfile[prop as keyof IProfileRequest]) {
                needUpdate = true;
            }
        }

        if (needUpdate) {
            let responseProfile: IPersonInfo = await AuthService.UpdateProfile(updatedProfile);
            this.profile = responseProfile;
        }
    }

    signOut(): void {
        this.jwtToken = "";
        this.isAuthorized = false;
        this.isAdmin = false;
        localStorage.removeItem('token');
    }
}

export default new User();
