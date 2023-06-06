import { makeAutoObservable } from 'mobx';
import IPersonInfo from '../models/IPersonInfo';

class User {
    isAuthorized: boolean = false;
    jwtToken?: string;
    profile?: IPersonInfo;

    constructor() {
        makeAutoObservable(this);
        this.jwtToken = localStorage.getItem('token') || "";

        if (this.jwtToken) {
            this.isAuthorized = true;
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

    setProfile(personInfo: IPersonInfo): void {
        this.profile = personInfo;
    }

    getProfile(): IPersonInfo | undefined {
        return this.profile;
    }

    singOut(): void {
        this.jwtToken = "";
        this.isAuthorized = false;
        localStorage.removeItem('token');
    }
}

export default new User();
