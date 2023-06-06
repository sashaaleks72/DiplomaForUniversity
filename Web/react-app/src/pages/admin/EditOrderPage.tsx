import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IOrder from "../../models/IOrder";
import OrderService from "../../API/OrderService";
import CustomSelect from "../../components/UI/CustomSelect/CustomSelect";
import ISelectTuple from "../../models/ISelectTuple";
import NovaPostService from "../../API/NovaPostService";
import user from "../../store/user";

const EditOrderPage = (): JSX.Element => {
    const { id } = useParams();

    const [selectedCity, setSelectedCity] = useState<string>("");
    const [typeOfDelivery, setDeliveryType] = useState<string>();
    const [deliveryAddress, setDeliveryAddress] = useState<string>("");
    const [departments, setDepartments] = useState<string[]>([]);
    const [department, setDepartment] = useState<string>("");

    const [searchValue, setSearchValue] = useState<string>("");
    const [settlements, setSettlements] = useState<string[]>([]);
    const [settlementRef, setSettlementRef] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        let isUseEffectActive = true;

        const init = async () => {
            const receivedSettlements = await NovaPostService.getSettlementsBySearchValue(searchValue);

            if (!isUseEffectActive) return;
            setSettlements(receivedSettlements);
        };

        init();

        return () => {
            isUseEffectActive = false;
        };
    }, [searchValue]);

    useEffect(() => {
        let isUseEffectActive = true;

        const init = async () => {
            if (selectedCity && typeOfDelivery === "nova poshta") {
                setIsLoading(true);
                const receivedRef = await NovaPostService.getSettlementRefBySearchValue(selectedCity);
                setIsLoading(false);

                if (!isUseEffectActive) return;
                setSettlementRef(receivedRef);
            }
        };

        init();

        return () => {
            isUseEffectActive = false;
        };
    }, [typeOfDelivery, selectedCity]);

    useEffect(() => {
        let isUseEffectActive = true;

        const init = async () => {
            if (settlementRef) {
                setIsLoading(true);
                const receivedDepartments = await NovaPostService.getDepartmentsByCityRef(settlementRef);

                if (!isUseEffectActive) return;
                setDepartments(receivedDepartments);
                setIsLoading(false);
            }
        };

        init();

        return () => {
            isUseEffectActive = false;
        };
    }, [settlementRef]);

    const [options] = useState<ISelectTuple[]>([
        { title: "Pending", value: "Waiting for accept" },
        { title: "Accepted", value: "Accepted" },
        { title: "Rejected", value: "Rejected" },
        { title: "Delivered", value: "Delivered" },
    ]);
    const [selectedValue, setSelectedValue] = useState<string>("");
    const [order, setOrder] = useState<IOrder>({
        id: "",
        firstName: "",
        lastName: "",
        patronymic: "",
        email: "",
        city: "",
        department: "",
        deliveryAddress: "",
        cartItems: [],
        orderStatus: "",
        orderDate: "",
        totalSum: 0,
        userId: "",
    });

    useEffect(() => {
        const init = async () => {
            const receivedOrder: IOrder = await OrderService.getOrderById(id!);
            setOrder(receivedOrder);
        };

        init();
    }, []);

    useEffect(() => {
        setSelectedValue(order.orderStatus);
        setSearchValue(order.city);
        setSelectedCity(order.city);
        order.deliveryAddress ? setDeliveryType("courier") : setDeliveryType("nova poshta");
        order.department && setDepartment(order.department);
        order.deliveryAddress && setDeliveryAddress(order.deliveryAddress);
    }, [order]);

    useEffect(() => {
        typeOfDelivery === "courier" && setDepartment("");
        typeOfDelivery === "nova poshta" && setDeliveryAddress("");
    }, [typeOfDelivery]);

    return (
        <div className="container">
            <div className="fs-3 text-center fw-light mb-2">EDIT ORDER</div>
            {!!order.cartItems.length && (
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();

                        const target = e.target as typeof e.target & {
                            firstName: { value: string };
                            lastName: { value: string };
                            patronymic: { value: string };
                            city: { value: string };
                            department: { value?: string };
                            deliveryAddress: { value?: string };
                            orderStatus: { value: string };
                        };

                        const preparedOrder: IOrder = {
                            id: order.id!,
                            firstName: target.firstName.value,
                            lastName: target.lastName.value,
                            patronymic: target.patronymic.value,
                            email: order.email,
                            city: selectedCity,
                            department: department ?? "",
                            deliveryAddress: deliveryAddress ?? "",
                            orderStatus: selectedValue,
                            cartItems: order.cartItems,
                            orderDate: order.orderDate,
                            totalSum: order.totalSum,
                            userId: (await user.getProfile()!).userId,
                        };

                        await OrderService.changeOrderById(order.id!, preparedOrder);
                        navigate("/admin/orders");
                    }}>
                    <div className="mb-2">
                        <div className="">Order status</div>
                        <CustomSelect
                            style={{ minWidth: "200px" }}
                            className="w-25"
                            selectOptions={options}
                            value={selectedValue}
                            setValue={setSelectedValue}
                        />
                    </div>

                    <h4>1. Contact information</h4>
                    <div className="d-flex flex-column">
                        <div className="mb-2">
                            <div className="">Users` first name</div>
                            <input
                                type="text"
                                className="form-control"
                                name="firstName"
                                required
                                defaultValue={order.firstName}
                            />
                        </div>

                        <div className="mb-2">
                            <div className="">Users` last name</div>
                            <input
                                type="text"
                                className="form-control"
                                name="lastName"
                                required
                                defaultValue={order.lastName}
                            />
                        </div>

                        <div className="mb-2">
                            <div className="">Users` patronymic</div>
                            <input
                                type="text"
                                className="form-control"
                                name="patronymic"
                                required
                                defaultValue={order.patronymic}
                            />
                        </div>
                    </div>

                    <hr className="my-4" />
                    <h4>2. Delivery</h4>

                    <div className="mt-2">
                        <label className="form-label">Delivery сity</label>
                        <div>
                            <input
                                type="text"
                                className="form-control"
                                value={searchValue}
                                onChange={(e) => {
                                    setSearchValue(e.target.value);
                                    setSelectedCity("");
                                }}
                            />
                            {searchValue.length > 3 && selectedCity.length === 0 && (
                                <CustomSelect
                                    selectOptions={settlements.map((settlement) => ({
                                        value: settlement,
                                        title: settlement,
                                    }))}
                                    defaultValue={"Choose..."}
                                    value={selectedCity}
                                    setValue={(value: string) => {
                                        console.log(value);
                                        setSelectedCity(value);
                                        setSearchValue(value);
                                    }}
                                    size={5}
                                />
                            )}
                        </div>
                    </div>

                    <div className="mt-2 form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            name="delivery"
                            onChange={(e) => setDeliveryType(e.target.value)}
                            value="courier"
                            required
                            checked={typeOfDelivery === "courier"}
                        />
                        <label className="form-check-label">Courier delivery</label>
                    </div>
                    <div className="mt-2 form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            name="delivery"
                            onChange={(e) => setDeliveryType(e.target.value)}
                            required
                            value="nova poshta"
                            checked={typeOfDelivery === "nova poshta"}
                        />
                        <label className="form-check-label">Delivery to the Nova Poshta post office</label>
                    </div>
                    {typeOfDelivery === "courier" && (
                        <div className="mt-2">
                            <label className="form-label">Delivery address</label>
                            <input
                                type="text"
                                className="form-control"
                                name="deliveryAddress"
                                value={deliveryAddress}
                                onChange={(e) => setDeliveryAddress(e.target.value)}
                                required
                                placeholder="Enter delivery address"></input>
                        </div>
                    )}

                    {typeOfDelivery === "nova poshta" && (
                        <div className="mt-2">
                            <label className="form-label">Department</label>

                            <div className="d-flex justify-content-between">
                                <select
                                    className="form-select"
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                    required
                                    disabled={isLoading}>
                                    <option disabled value="">
                                        Choose...
                                    </option>
                                    {departments?.map((department, index) => {
                                        return (
                                            <option value={department} key={index}>
                                                {department}
                                            </option>
                                        );
                                    })}
                                </select>
                                {isLoading && (
                                    <div className="d-flex justify-content-center ms-1">
                                        <div className="spinner-border spinner-width-sm">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="text-center mt-2">
                        <button type="submit" className="btn btn-primary">
                            Save changes
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default EditOrderPage;
