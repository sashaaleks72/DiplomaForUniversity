import { useState } from "react";
import ITeapot from "../../models/ITeapot";
import { useNavigate } from "react-router-dom";
import TeapotsService from "../../API/TeapotsService";

const AddTeapotPage = (): JSX.Element => {
    const navigate = useNavigate();

    return (
        <div className="container">
            <div className="fs-3 text-center fw-light mb-2">ADD PRODUCT</div>
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

                    const preparedTeapot: ITeapot = {
                        id: "",
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
                        company: target.company.value,
                        stockAvailable: Number(target.quantity.value) ? true : false,
                    };

                    await TeapotsService.addNewTeapot(preparedTeapot);
                    navigate("/admin/catalog");
                }}>
                <div className="d-flex">
                    <div className="d-flex flex-column w-25">
                        <div className="mb-3">
                            <div className="">Title</div>
                            <input type="text" className="form-control" name="name" required />
                        </div>

                        <div className="mb-3">
                            <div className="">Price</div>
                            <input type="number" className="form-control" name="price" required />
                        </div>

                        <div className="mb-3">
                            <div className="">Quantity</div>
                            <input type="number" className="form-control" name="quantity" required />
                        </div>

                        <div className="mb-3">
                            <div className="">Manufacturer country</div>
                            <input type="text" className="form-control" name="manufacturerCountry" required />
                        </div>
                    </div>

                    <div className="d-flex flex-column w-25 ms-auto">
                        <div className="mb-3">
                            <div className="">Warranty</div>
                            <input type="number" className="form-control" name="warrantyInMonths" required />
                        </div>

                        <div className="mb-3">
                            <div className="">Body material</div>
                            <input type="text" className="form-control" name="bodyMaterial" required />
                        </div>

                        <div className="mb-3">
                            <div className="">Volume</div>
                            <input type="number" className="form-control" name="volume" required />
                        </div>

                        <div className="mb-3">
                            <div className="">Color</div>
                            <input type="text" className="form-control" name="color" required />
                        </div>
                    </div>

                    <div className="d-flex flex-column ms-auto w-25">
                        <div className="mb-3">
                            <div className="">Weight</div>
                            <input type="number" className="form-control" name="weight" required />
                        </div>

                        <div className="mb-3">
                            <div className="">Company</div>
                            <input type="text" className="form-control" name="company" required />
                        </div>

                        <div className="mb-3">
                            <div className="">Power</div>
                            <input type="number" className="form-control" name="power" required />
                        </div>

                        <div className="mb-3">
                            <div className="">Functions</div>
                            <input type="text" className="form-control" name="functions" required />
                        </div>
                    </div>
                </div>

                <div className="mb-3">
                    <div className="">Img url</div>
                    <div className="d-flex">
                        <input type="text" className="form-control" name="imgName" required />
                    </div>
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                        Add product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTeapotPage;
