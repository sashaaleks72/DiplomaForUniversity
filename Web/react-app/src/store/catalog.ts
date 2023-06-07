import { makeAutoObservable } from "mobx";
import ITeapot from "../models/ITeapot";

export class Catalog {
    teapots: ITeapot[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    delTeapotById(teapotId: string): void {
        const index = this.teapots.findIndex(
            (teapot) => teapot.id === teapotId
        );

        if (index !== -1) this.teapots.splice(index, 1);
    }

    addTeapot(teapot: ITeapot): void {
        this.teapots.push(teapot);
    }

    updateTeapot(teapot: ITeapot): void {
        const index = this.teapots.findIndex((t) => t.id === teapot.id);

        if (index !== -1) this.teapots[index] = teapot;
    }

    retrieveTeapot(teapotId: string): ITeapot | undefined {
        const receivedTeapot = this.teapots.find(teapot => teapot.id === teapotId);

        return receivedTeapot;
    }

    setTeapots(teapots: ITeapot[]): void {
        this.teapots = [...teapots];
    }
}