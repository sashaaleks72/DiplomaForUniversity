import { useNavigate, useParams } from "react-router-dom";
import ITeapot from "../../models/ITeapot";
import { useEffect, useState } from "react";
import TeapotsService from "../../API/TeapotsService";
import ITeapotRequest from "../../models/ITeapotRequest";

const EditTeapotPage = (): JSX.Element => {
    const { id } = useParams();

    const [teapot, setTeapot] = useState<ITeapotRequest>({
        name: "",
        price: 0,
        quantity: 0,
        manufacturerCountry: "",
        warrantyInMonths: 0,
        volume: 0,
        color: "",
        imgName: "",
        bodyMaterial: "",
        power: 0,
        functions: "",
        weight: 0,
        companyId: 0,
    });

    const navigate = useNavigate();

    useEffect(() => {
        const init = async () => {
            const teapot: ITeapot = await TeapotsService.getTeapotById(id);
            setTeapot(teapot as unknown as ITeapotRequest);
        };

        init();
    }, []);

    return (
        <div className="container">
            <div className="fs-3 text-center fw-light mb-2">EDIT PRODUCT</div>
            {teapot.name && (
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();

                        const target = e.target as typeof e.target & {
                            name: { value: string };
                            price: { value: number };
                            quantity: { value: number };
                            manufacturerCountry: { value: string };
                            warrantyInMonths: { value: number };
                            volume: { value: number };
                            color: { value: string };
                            imgName: { value: string };
                            bodyMaterial: { value: string };
                            power: { value: number };
                            functions: { value: string };
                            weight: { value: number };
                            company: { value: string };
                        };

                        const preparedTeapot: ITeapotRequest = {
                            name: target.name.value,
                            price: target.price.value,
                            quantity: target.quantity.value,
                            manufacturerCountry: target.manufacturerCountry.value,
                            warrantyInMonths: target.warrantyInMonths.value,
                            volume: target.volume.value,
                            color: target.color.value,
                            imgName: target.imgName.value,
                            bodyMaterial: target.bodyMaterial.value,
                            power: target.power.value,
                            functions: target.functions.value,
                            weight: target.weight.value,
                            companyId: +target.company.value,
                        };

                        await TeapotsService.changeTeapotById(id!, preparedTeapot);
                        navigate("/admin/catalog");
                    }}>
                    <div className="d-flex">
                        <div className="d-flex flex-column w-25">
                            <div className="mb-3">
                                <div className="">Title</div>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    required
                                    defaultValue={teapot.name}
                                />
                            </div>

                            <div className="mb-3">
                                <div className="">Price</div>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="price"
                                    required
                                    defaultValue={teapot.price}
                                />
                            </div>

                            <div className="mb-3">
                                <div className="">Quantity</div>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="quantity"
                                    required
                                    defaultValue={teapot.quantity}
                                />
                            </div>

                            <div className="mb-3">
                                <div className="">Manufacturer country</div>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="manufacturerCountry"
                                    required
                                    defaultValue={teapot.manufacturerCountry}
                                />
                            </div>
                        </div>

                        <div className="d-flex flex-column w-25 ms-auto">
                            <div className="mb-3">
                                <div className="">Warranty</div>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="warrantyInMonths"
                                    required
                                    defaultValue={teapot.warrantyInMonths}
                                />
                            </div>

                            <div className="mb-3">
                                <div className="">Body material</div>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="bodyMaterial"
                                    required
                                    defaultValue={teapot.bodyMaterial}
                                />
                            </div>

                            <div className="mb-3">
                                <div className="">Volume</div>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="volume"
                                    required
                                    defaultValue={teapot.volume}
                                />
                            </div>

                            <div className="mb-3">
                                <div className="">Color</div>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="color"
                                    required
                                    defaultValue={teapot.color}
                                />
                            </div>
                        </div>

                        <div className="d-flex flex-column ms-auto w-25">
                            <div className="mb-3">
                                <div className="">Weight</div>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="weight"
                                    required
                                    defaultValue={teapot.weight}
                                />
                            </div>

                            <div className="mb-3">
                                <div className="">Company</div>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="company"
                                    required
                                    defaultValue={teapot.companyId}
                                />
                            </div>

                            <div className="mb-3">
                                <div className="">Power</div>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="power"
                                    required
                                    defaultValue={teapot.power}
                                />
                            </div>

                            <div className="mb-3">
                                <div className="">Functions</div>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="functions"
                                    required
                                    defaultValue={teapot.functions}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="">Img url</div>
                        <div className="d-flex">
                            <input
                                type="text"
                                className="form-control"
                                name="imgName"
                                required
                                defaultValue={teapot.imgName}
                            />
                        </div>
                    </div>

                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">
                            Save changes
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default EditTeapotPage;
