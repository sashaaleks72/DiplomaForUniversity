import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cart from "../store/cart";
import { observer } from "mobx-react-lite";
import NovaPostService from "../API/NovaPostService";
import CustomSelect from "../components/UI/CustomSelect/CustomSelect";
import IOrder from "../models/IOrder";
import OrderService from "../API/OrderService";
import user from "../store/user";
import IOrderRequest from "../models/IOrderRequest";

const CheckoutPage = observer((): JSX.Element => {
    const [selectedCity, setSelectedCity] = useState<string>("");
    const [typeOfDelivery, setDeliveryType] = useState<string>();
    const [deliveryAddress, setDeliveryAddress] = useState<string>("");
    const [departments, setDepartments] = useState<string[]>([]);
    const [department, setDepartment] = useState<string>("");
    const [isNotFoundCity, setIsNotFoundCity] = useState<boolean>(false);
    const [order, setOrder] = useState<IOrderRequest>({
        firstName: "",
        lastName: "",
        patronymic: "",
        email: "",
        city: "",
        department: "",
        deliveryAddress: "",
        cartItems: [],
        totalSum: 0,
        userId: "",
    });

    const [defaultCities] = useState([
        {
            value: "Харків",
            name: "Kharkiv",
        },
        {
            value: "Київ",
            name: "Kyiv",
        },
        {
            value: "Одеса",
            name: "Odessa",
        },
        {
            value: "Запоріжжя",
            name: "Zaporizhzhia",
        },
        {
            value: "Львів",
            name: "Lviv",
        },
    ]);

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

    useEffect(() => {
        const init = async () => {
            if (order.cartItems.length) {
                await OrderService.doCheckout(order);
                cart.cleanCart();
                navigate("/profile/orders");
            }
        };

        init();
    }, [order]);

    return (
        <div className="mt-3 container">
            <form
                className="row g-5"
                onSubmit={async (e) => {
                    e.preventDefault();

                    const currentDate = new Date();

                    const target = e.target as typeof e.target & {
                        email: { value: string };
                        pass: { value: string };
                        firstName: { value: string };
                        lastName: { value: string };
                        patronymic: { value: string };
                        birthday: { value: string };
                    };

                    const newOrder: IOrder = {
                        firstName: target.firstName.value,
                        lastName: target.lastName.value,
                        patronymic: target.patronymic.value,
                        email: target.email.value,
                        city: selectedCity,
                        department,
                        deliveryAddress,
                        cartItems: cart.cartItems,
                        orderStatus: "Waiting for accept",
                        orderDate: `${currentDate.getDate()}.${Number(
                            currentDate.getMonth() + 1
                        )}.${currentDate.getFullYear()}`,
                        totalSum: cart.totalPrice,
                        userId: (await user.getProfile()!).userId,
                    };

                    setOrder(newOrder);
                }}>
                <div className="col-md-5 col-lg-4 order-md-last">
                    <h4 className="d-flex justify-content-between mb-3">
                        <span className="text-primary">Your cart</span>
                        <span className="badge bg-primary rounded-pill">{cart.cartItems.length}</span>
                    </h4>
                    <div
                        style={{
                            maxHeight: "calc(100vh - 400px)",
                            overflowX: "hidden",
                            overflowY: "auto",
                        }}>
                        {cart.cartItems.map((item) => (
                            <div key={item.teapotId}>
                                <img src={item.imgName} alt="cart-item" height={100} />
                                <div>
                                    <b>Title: </b>
                                    {item.name}
                                </div>
                                <div>
                                    <b>Quantity: </b>
                                    {item.quantity}
                                </div>
                                <div>
                                    <b>Price: </b>
                                    {item.price} ₴
                                </div>
                            </div>
                        ))}
                    </div>
                    <hr />
                    <h5>Total: {cart.totalPrice} ₴</h5>
                </div>
                <div className="col-md-7 col-lg-8">
                    <h4>Contact information and delivery</h4>
                    <hr className="my-4" />
                    <h4>1. Contact information</h4>
                    <div className="">
                        <label className="form-label">First name</label>
                        <input
                            type="text"
                            name="firstName"
                            className="form-control"
                            placeholder="Enter your first name"
                            required
                        />
                    </div>
                    <div className="mt-2">
                        <label className="form-label">Last name</label>
                        <input
                            type="text"
                            name="lastName"
                            className="form-control"
                            placeholder="Enter your last name"
                            required
                        />
                    </div>

                    <div className="mt-2">
                        <label className="form-label">Patronymic</label>
                        <input
                            type="text"
                            name="patronymic"
                            className="form-control"
                            placeholder="Enter your patronymic"
                            required
                        />
                    </div>

                    <div className="mt-2">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <hr className="my-4" />
                    <h4>2. Delivery</h4>

                    <div className="mt-2">
                        <label className="form-label">City</label>

                        {!isNotFoundCity ? (
                            <select
                                className="form-select"
                                value={selectedCity}
                                onChange={(e) => setSelectedCity(e.target.value)}
                                required>
                                <option disabled value="">
                                    Choose...
                                </option>
                                {defaultCities.map((option) => {
                                    return (
                                        <option key={option.name} value={option.value}>
                                            {option.name}
                                        </option>
                                    );
                                })}
                            </select>
                        ) : (
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
                        )}
                    </div>

                    <div className="mt-2 form-check">
                        <label className="form-check-label">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                name="notfoundcity"
                                onChange={(e) => setIsNotFoundCity(e.target.checked)}
                            />
                            I didn't find the required city in this list
                        </label>
                    </div>

                    <div className="mt-2 form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            name="delivery"
                            onChange={(e) => setDeliveryType(e.target.value)}
                            value="courier"
                            required
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

                    <hr className="my-4" />
                    <div className="text-center mt-2">
                        <button type="submit" className="btn btn-primary">
                            Confirm the order
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
});

export default CheckoutPage;
