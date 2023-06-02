import axios from 'axios';
import ITeapot from '../models/ITeapot';
import IComment from '../models/IComment';
import { apiUrl } from './ApiUrl';

class TeapotsService {
    static async getTeapots(
        page?: number,
        limit?: number,
        sortOptions?: string,
    ): Promise<ITeapot[]> {
        let sortArr: string[] = [];

        if (sortOptions) sortArr = sortOptions.split(':');

        const recievedTeapots: ITeapot[] = await axios
            .get(`${apiUrl}/teapots?page=${page}&limit=${limit}`)
            .then((response) => response.data);

        return recievedTeapots;
    }

    static async getTeapotById(teapotId: string | undefined) {
        const recievedTeapot: ITeapot = await axios
            .get(`${apiUrl}/teapots/${teapotId}`)
            .then((response) => response.data);

        return recievedTeapot;
    }

    static async changeTeapotById(
        teapotId: string,
        changedTeapot: ITeapot,
    ): Promise<void> {
        await axios({
            url: `${apiUrl}/teapots/${teapotId}`,
            method: 'PUT',
            data: changedTeapot,
        });
    }

    static async addNewTeapot(newTeapot: ITeapot): Promise<void> {
        await axios({
            url: `${apiUrl}/teapots`,
            method: 'POST',
            data: newTeapot,
        });
    }

    static async delTeapotById(teapotId: string): Promise<void> {
        await axios({
            url: `${apiUrl}/teapots/${teapotId}`,
            method: 'DELETE',
        });
    }

    static async getCommentsByProductId(
        productId: string,
    ): Promise<IComment[]> {
        const recievedComments: IComment[] = await axios
            .get(`${apiUrl}/comments?productId=${productId}`)
            .then((response) => response.data);

        return recievedComments;
    }

    static async postUserComment(
        userId: string,
        comment: IComment,
    ): Promise<void> {
        await axios({
            url: `${apiUrl}/comments`,
            method: 'post',
            data: comment,
        });
    }

    static async getTeapotsCount(): Promise<number> {
        const quantityOfTeapots: number = await axios
            .get(`${apiUrl}/teapots`)
            .then((response) => response.data.length);

        return quantityOfTeapots;
    }
}

export default TeapotsService;
