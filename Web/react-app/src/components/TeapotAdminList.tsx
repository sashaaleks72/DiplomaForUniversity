import { useEffect, useState } from "react";
import ITeapot from "../models/ITeapot";
import TeapotsService from "../API/TeapotsService";
import trash from "../images/trash.svg";
import edit from "../images/file-pen.svg";
import left from "../images/angle-left.svg";
import right from "../images/angle-right.svg";
import plus from "../images/plus.svg";
import { useNavigate } from "react-router-dom";
import { getQuantityOfPages } from "../utils/pagination";
import CustomSelect from "./UI/CustomSelect/CustomSelect";
import { IPagination } from "../models/IPagination";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const TeapotAdminList = (): JSX.Element => {
    const [teapots, setTeapots] = useState<IPagination<ITeapot> | null>(null);
    const [limit, setLimit] = useState<number>(8);
    const [page, setPage] = useState<number>(1);
    const [quantityOfPages, setQuantityOfPages] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        const init = async () => {
            setIsLoading(true);
            const receivedTeapots = await TeapotsService.getTeapots(page, limit);
            const quantityOfPages = await getQuantityOfPages(receivedTeapots);
            setIsLoading(false);

            setTeapots(receivedTeapots);
            setQuantityOfPages(quantityOfPages);
        };

        init();
    }, [page, limit]);

    if (isLoading)
        return (
            <Box textAlign="center" mt={1}>
                <CircularProgress />
            </Box>
        );

    return (
        <div className="container">
            {!teapots ? (
                <div className="text-center fs-4 fw-light">There are no any teapots!</div>
            ) : (
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Price</th>
                                <th scope="col">Stock available</th>
                                <th scope="col"></th>
                                <th
                                    className="d-flex justify-content-end btn border-0"
                                    scope="col"
                                    onClick={() => navigate("/admin/add-teapot")}>
                                    <div className="fw-light me-2">Add new teapot</div>
                                    <img src={plus} height={25} />
                                </th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {teapots?.data.map((teapot, index) => (
                                <tr key={teapot.id}>
                                    <th scope="row" className="align-middle">
                                        {index + 1}
                                    </th>
                                    <td className="align-middle">{teapot.name}</td>
                                    <td className="align-middle">{teapot.price}₴</td>
                                    <td className="align-middle">
                                        {teapot.stockAvailable ? "In stock" : "Out of stock"}
                                    </td>
                                    <td>
                                        <img src={teapot.imgName} height={50} />
                                    </td>
                                    <td className="align-middle">
                                        <div
                                            className="btn border-0 p-0 me-2"
                                            onClick={() => navigate(`/admin/edit-teapot/${teapot.id}`)}>
                                            <span className="text-primary-emphasis">EDIT</span>{" "}
                                            <img src={edit} height={25} />
                                        </div>
                                        <div
                                            className="btn border-0 p-0"
                                            onClick={async () => {
                                                await TeapotsService.delTeapotById(teapot.id!);
                                                setTeapots((prev) =>
                                                    prev
                                                        ? {
                                                              ...prev,
                                                              data: prev.data.filter((t) => t.id !== teapot.id),
                                                          }
                                                        : null
                                                );
                                            }}>
                                            <span className="text-danger">DELETE</span> <img src={trash} height={25} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="d-flex align-items-center">
                        <div className="d-flex align-items-center">
                            <div className="me-1">Rows per page:</div>
                            <CustomSelect
                                style={{ width: "70px" }}
                                selectOptions={[
                                    { value: "8", title: "8" },
                                    { value: "10", title: "10" },
                                    { value: "15", title: "15" },
                                    { value: "25", title: "25" },
                                    { value: "50", title: "50" },
                                ]}
                                value={limit}
                                setValue={setLimit}
                            />
                        </div>
                        <div className="d-flex ms-auto">
                            {page > 1 && (
                                <div className="btn border-0 p-0" onClick={() => setPage((prev) => prev - 1)}>
                                    <img src={left} height={25} />
                                    <span className="text-primary">PREV</span>
                                </div>
                            )}

                            <div className="mx-2">
                                {page} of {quantityOfPages}
                            </div>

                            {page !== quantityOfPages && (
                                <div className="btn border-0 p-0" onClick={() => setPage((prev) => prev + 1)}>
                                    <span className="text-primary">NEXT</span> <img src={right} height={25} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeapotAdminList;
