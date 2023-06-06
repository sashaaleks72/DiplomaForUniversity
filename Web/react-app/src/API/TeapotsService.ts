import axios from 'axios';
import ITeapot from '../models/ITeapot';
import IComment from '../models/IComment';
import { catalogUrl } from './ApiUrls';
import { IPagination } from '../models/IPagination';
import user from '../store/user';
import ITeapotRequest from '../models/ITeapotRequest';

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
            .get(`${catalogUrl}/Teapots?page=${page}&limit=${limit}&sort=${sort}&order=${order}`)
            .then((response) => response.data);

        return recievedTeapots;
    }

    static async getTeapotById(teapotId: string | undefined) {
        const recievedTeapot: ITeapot = await axios
            .get(`${catalogUrl}/Teapot/${teapotId}`)
            .then((response) => response.data);

        return recievedTeapot;
    }

    static async changeTeapotById(
        teapotId: string,
        changedTeapot: ITeapotRequest,
    ): Promise<void> {
        await axios({
            url: `${catalogUrl}/Edit/${teapotId}`,
            method: 'PUT',
            data: changedTeapot,
            headers: {
                Authorization: `Bearer ${user.getToken()}`,
            },
        });
    }

    static async addNewTeapot(newTeapot: ITeapot): Promise<void> {
        await axios({
            url: `${catalogUrl}/Add`,
            method: 'POST',
            data: newTeapot,
            headers: {
                Authorization: `Bearer ${user.getToken()}`,
            },
        });
    }

    static async delTeapotById(teapotId: string): Promise<void> {
        await axios({
            url: `${catalogUrl}/Delete/${teapotId}`,
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${user.getToken()}`,
            },
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
            headers: {
                Authorization: `Bearer ${user.getToken()}`,
            },
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
