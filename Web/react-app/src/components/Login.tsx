import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ModalWrapper from "./UI/ModalWrapper/ModalWrapper";
import Register from "./Register";
import { FieldValues, useForm } from "react-hook-form";
import AuthService from "../API/AuthService";
import IRegister from "../models/IRegister";
import ILogin from "../models/ILogin";
import user from "../store/user";

interface LoginProps {
    isOpened: boolean;
    setIsOpened: (state: boolean) => void;
}

const Login = ({ isOpened, setIsOpened }: LoginProps): JSX.Element => {
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [isRegisterClicked, setIsRegisterClicked] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<ILogin>();

    const counter = useRef<number>(0);

    useEffect(() => {
        counter.current++;
        if (counter.current === 3) setIsOpened(false);
    }, [isRegisterClicked]);

    const onSubmit = async (data: FieldValues) => {
        var loginData = data as ILogin;
        const err = await user.login(loginData);

        if (err) {
            setErrorMsg(err);
            return;
        }

        setIsOpened(false);
    };

    return (
        <ModalWrapper isVisible={isOpened} setIsVisible={setIsOpened}>
            <div>
                <div className="d-flex justify-content-between border-bottom mb-2 pb-1">
                    <div className="fs-4">Log In</div>
                    <div className="btn btn-close" onClick={() => setIsOpened(false)}></div>
                </div>
                <form className="position-relative" onSubmit={handleSubmit(onSubmit)}>
                    {errorMsg && <div className="text-danger">* {errorMsg}</div>}
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input
                            {...register("email")}
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            {...register("password")}
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                        />
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center">
                            <button type="submit" className="btn btn-primary">
                                Sign In
                            </button>
                            {isSubmitting && (
                                <div className="spinner-border ms-2" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            )}
                        </div>
                        <div
                            className="btn p-0 border-0 text-primary text-decoration-underline align-self-center"
                            onClick={() => {
                                setIsRegisterClicked(true);
                            }}>
                            I am not registered
                        </div>
                    </div>
                </form>
                {isRegisterClicked && (
                    <Register isModalOpened={isRegisterClicked} setIsModalOpened={setIsRegisterClicked} />
                )}
            </div>
        </ModalWrapper>
    );
};

export default Login;
