import { IPagination } from '../models/IPagination';

export const getQuantityOfPages = async (
    paginationObject: IPagination<any>,
): Promise<number> => {
    return Math.ceil(paginationObject.totalQuantity / paginationObject.limit);
};
