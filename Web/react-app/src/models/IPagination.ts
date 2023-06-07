export interface IPagination<T> {
    data: T[];
    page: number;
    limit: number;
    totalQuantity: number;
}
