import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IRegister from "../models/IRegister";
import ModalWrapper from "./UI/ModalWrapper/ModalWrapper";
import facebook from "../images/facebook.svg";
import google from "../images/google.svg";
import AuthService from "../API/AuthService";
import { FieldValue, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import "yup-phone";
import { yupResolver } from "@hookform/resolvers/yup";
import YupPassword from "yup-password";
YupPassword(yup);

interface RegisterProps {
    isModalOpened: boolean;
    setIsModalOpened: (state: boolean) => void;
}

const Register = ({ isModalOpened, setIsModalOpened }: RegisterProps): JSX.Element => {
    const navigate = useNavigate();

    const validationSchema = yup.object().shape({
        email: yup.string().email("It doesn't seem like an email").required("Email is a required field!"),
        password: yup
            .string()
            .min(
                6,
                "Password must contain 6 or more characters with at least one of each: uppercase, lowercase, number and special character"
            )
            .minLowercase(1, "Password must contain at least 1 lower case letter")
            .minUppercase(1, "Password must contain at least 1 upper case letter")
            .minNumbers(1, "Password must contain at least 1 number")
            .minSymbols(1, "Password must contain at least 1 special character")
            .required(),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("password")], "Password doesn't match!")
            .required(),
        firstName: yup.string().required("First name is a required field!"),
        lastName: yup.string().required("Last name is a required field!"),
        patronymic: yup.string().required("Patronymic is a required field!"),
        phoneNumber: yup
            .string()
            .matches(/^\+380\d{9}$/, "Number isn't valid!")
            .required("Phone number is a required field"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useForm<IRegister>({ resolver: yupResolver(validationSchema) });

    const onSubmit = (data: FieldValues) => {
        var registerData = data as IRegister;
        console.log(registerData);
        AuthService.Register(registerData);

        setIsModalOpened(false);
    };

    return (
        <ModalWrapper isVisible={isModalOpened} setIsVisible={setIsModalOpened}>
            <div className="position-relative">
                <div className="d-flex justify-content-between border-bottom mb-2 pb-1">
                    <div className="fs-4">Sign up</div>
                    <div className="btn btn-close" onClick={() => setIsModalOpened(false)}></div>
                </div>
                <div className="d-flex p-1" style={{ maxHeight: "600px", overflowY: "scroll" }}>
                    <form className="d-flex w-50 flex-column pe-2 border-end" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            {errors.email && <div className="text-danger">* {errors.email?.message}</div>}
                            <div>Email</div>
                            <input type="text" className="form-control" {...register("email")} />
                        </div>
                        <div className="mb-3">
                            {errors.password && <div className="text-danger">* {errors.password?.message}</div>}
                            <div>Password</div>
                            <input type="password" className="form-control" {...register("password")} />
                        </div>

                        <div className="mb-3">
                            {errors.confirmPassword && (
                                <div className="text-danger">* {errors.confirmPassword?.message}</div>
                            )}
                            <div>Confirm password</div>
                            <input type="password" className="form-control" {...register("confirmPassword")} />
                        </div>
                        <div className="mb-3">
                            {errors.firstName && <div className="text-danger">* {errors.firstName?.message}</div>}
                            <div>First name</div>
                            <input type="text" className="form-control" {...register("firstName")} name="firstName" />
                        </div>
                        <div className="mb-3">
                            {errors.lastName && <div className="text-danger">* {errors.lastName?.message}</div>}
                            <div>Last name</div>
                            <input type="text" className="form-control" {...register("lastName")} name="lastName" />
                        </div>
                        <div className="mb-3">
                            {errors.patronymic && <div className="text-danger">* {errors.patronymic?.message}</div>}
                            <div>Patronymic</div>
                            <input
                                type="text"
                                className="form-control"
                                {...register("patronymic")}
                                name="patronymic"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <div>Gender</div>
                            <select className="form-select" {...register("gender")}>
                                <option value="other">Other</option>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <div>Date of birth</div>
                            <input type="date" className="form-control" {...register("birthday")} required />
                        </div>
                        <div className="mb-3">
                            {errors.phoneNumber && <div className="text-danger">* {errors.phoneNumber?.message}</div>}
                            <div>Phone number</div>
                            <input type="text" className="form-control" {...register("phoneNumber")} required />
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Sign up
                        </button>
                    </form>
                    <div className="d-flex flex-column justify-content-center w-50 align-items-center">
                        <div className="text-black-50 fw-bold mb-1">Sign in as a user</div>
                        <div style={{ minWidth: "150px" }} className="btn d-flex border rounded-2 px-3 py-2 bg-light">
                            <img className="me-1" src={google} width={25} />
                            <div>Google</div>
                        </div>
                        <div
                            style={{ minWidth: "150px" }}
                            className="btn d-flex border rounded-2 px-3 py-2 bg-light mt-1">
                            <img className="me-1" src={facebook} width={25} />
                            <div className="">Facebook</div>
                        </div>
                    </div>
                    {isSubmitting && (
                        <div className="spinner-border position-absolute end-0 bottom-0 mx-3" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    )}
                </div>
            </div>
        </ModalWrapper>
    );
};

export default Register;
