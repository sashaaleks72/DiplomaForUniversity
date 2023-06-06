import axios from 'axios';
import ITeapot from '../models/ITeapot';
import IComment from '../models/IComment';
import { catalogUrl } from './ApiUrls';
import { IPagination } from '../models/IPagination';

class TeapotsService {
    static async getTeapots(
        page?: number,
        limit?: number,
        sortOptions?: string,
    ): Promise<IPagination<ITeapot>> {
        let sortArr: string[] = [];

        if (sortOptions) sortArr = sortOptions.split(':');

        const sort = sortArr[0] || "-";
        const order = sortArr[1] || "-";

        const recievedTeapots: IPagination<ITeapot> = await axios
            .get(`${catalogUrl}/teapots?page=${page}&limit=${limit}&sort=${sort}&order=${order}`)
            .then((response) => response.data);

        return recievedTeapots;
    }

    static async getTeapotById(teapotId: string | undefined) {
        const recievedTeapot: ITeapot = await axios
            .get(`${catalogUrl}/teapots/${teapotId}`)
            .then((response) => response.data);

        return recievedTeapot;
    }

    static async changeTeapotById(
        teapotId: string,
        changedTeapot: ITeapot,
    ): Promise<void> {
        await axios({
            url: `${catalogUrl}/teapots/${teapotId}`,
            method: 'PUT',
            data: changedTeapot,
        });
    }

    static async addNewTeapot(newTeapot: ITeapot): Promise<void> {
        await axios({
            url: `${catalogUrl}/teapots`,
            method: 'POST',
            data: newTeapot,
        });
    }

    static async delTeapotById(teapotId: string): Promise<void> {
        await axios({
            url: `${catalogUrl}/teapots/${teapotId}`,
            method: 'DELETE',
        });
    }

    static async getCommentsByProductId(
        productId: string,
    ): Promise<IComment[]> {
        const recievedComments: IComment[] = await axios
            .get(`${catalogUrl}/comments?productId=${productId}`)
            .then((response) => response.data);

        return recievedComments;
    }

    static async postUserComment(
        userId: string,
        comment: IComment,
    ): Promise<void> {
        await axios({
            url: `${catalogUrl}/comments`,
            method: 'post',
            data: comment,
        });
    }

    static async getTeapotsCount(): Promise<number> {
        const quantityOfTeapots: number = await axios
            .get(`${catalogUrl}/teapots`)
            .then((response) => response.data.length);

        return quantityOfTeapots;
    }
}

export default TeapotsService;
