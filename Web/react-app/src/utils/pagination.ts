import TeapotsService from "../API/TeapotsService";

export const getQuantityOfPages = async (limit: number): Promise<number> => {
    const recievedCount: number = await TeapotsService.getTeapotsCount();
    const quantityOfPages = Math.ceil(recievedCount / limit);

    return quantityOfPages;
};
