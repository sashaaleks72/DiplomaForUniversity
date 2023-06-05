import { useEffect, useState } from 'react';
import TeapotList from '../components/TeapotList';
import CustomSelect from '../components/UI/CustomSelect/CustomSelect';
import TeapotsService from '../API/TeapotsService';
import { useFetching } from '../hooks/useFetching';
import ITeapot from '../models/ITeapot';
import { getQuantityOfPages } from '../utils/pagination';
import { IPagination } from '../models/IPagination';

const HomePage = (): JSX.Element => {
    const [teapots, setTeapots] = useState<IPagination<ITeapot> | null>(null);
    const [sort, setSort] = useState<string>('');
    const [limit] = useState<number>(6);
    const [page, setPage] = useState<number>(1);
    const [quantityOfPages, setQuantityOfPages] = useState<number>(0);
    const [pages, setPages] = useState<number[]>([]);

    const [fetchTeapots, isLoading] = useFetching(async () => {
        const recievedTeapots = await TeapotsService.getTeapots(
            page,
            limit,
            sort,
        );
        const quantityOfPages = await getQuantityOfPages(recievedTeapots);

        setTeapots(recievedTeapots);
        setQuantityOfPages(quantityOfPages);
    });

    useEffect(() => {
        if (quantityOfPages !== 0) {
            const arrOfPages = [];

            for (let i = 0; i < quantityOfPages; i++) {
                arrOfPages.push(i + 1);
            }

            setPages(arrOfPages);
        }
    }, [quantityOfPages]);

    useEffect(() => {
        const init = async () => {
            await fetchTeapots();
        };

        init();
    }, [page, sort]);

    return (
        <div className="mt-2 mb-3">
            <div className="container">
                <h3 className="display-6 text-center">Teapot list</h3>
                <div className="d-flex">
                    <CustomSelect
                        className="w-25 mb-2"
                        selectOptions={[
                            {
                                value: 'name:asc',
                                title: 'Sort by title (ascending)',
                            },
                            {
                                value: 'name:desc',
                                title: 'Sort by title (descending)',
                            },
                            {
                                value: 'price:asc',
                                title: 'Sort by price (ascending)',
                            },
                            {
                                value: 'price:desc',
                                title: 'Sort by price (descending)',
                            },
                        ]}
                        setValue={(sortOption: string) => setSort(sortOption)}
                        value={sort}
                        defaultValue="Choose sorting option"
                        isResetBtn={true}
                    />
                    {isLoading && (
                        <div className="d-flex justify-content-center ms-auto">
                            <div className="spinner-border spinner-width-sm">
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                <TeapotList teapots={teapots?.data} />
                <div className="text-center mt-1">
                    {pages.map((el) => {
                        return (
                            <button
                                className={
                                    el === page
                                        ? 'btn btn-info text-white ms-1'
                                        : 'btn border border-info ms-1'
                                }
                                key={el}
                                onClick={() => setPage(el)}
                            >
                                {el}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
