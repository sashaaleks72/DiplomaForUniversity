import { makeAutoObservable } from 'mobx';
import IPersonInfo from '../models/IPersonInfo';

class User {
    jwtToken!: string | null;
    profile!: IPersonInfo | null;

    constructor() {
        makeAutoObservable(this);
        const token = localStorage.getItem('token');
        if (token) {
            this.jwtToken = token;
        }
    }

    setToken(token: string): void {
        this.jwtToken = token;
        localStorage.setItem('token', token);
    }

    getToken(): string | null {
        return this.jwtToken;
    }

    setProfile(personInfo: IPersonInfo): void {
        this.profile = personInfo;
    }

    getProfile(): IPersonInfo | null {
        return this.profile;
    }

    singOut(): void {
        this.jwtToken = null;
        this.profile = null;
        localStorage.removeItem('token');
    }
}

export default new User();
