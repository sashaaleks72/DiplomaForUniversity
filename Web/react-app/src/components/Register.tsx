import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IRegister from "../models/IRegister";
import ModalWrapper from "./UI/ModalWrapper/ModalWrapper";
import facebook from "../images/facebook.svg";
import google from "../images/google.svg";

interface RegisterProps {
    isModalOpened: boolean;
    setIsModalOpened: (state: boolean) => void;
}

const Register = ({ isModalOpened, setIsModalOpened }: RegisterProps): JSX.Element => {
    const navigate = useNavigate();
    const [signUpModel, setSignUpModel] = useState<IRegister>();
    const [signUpValidationModel, setSignUpValidationModel] = useState<IRegister>({
        firstName: "",
        lastName: "",
        patronymic: "",
        birthday: "",
        pass: "",
        email: "",
    });

    useEffect(() => {
        if (signUpModel) {
            setIsModalOpened(false);
            navigate(-1);
        }
    }, [signUpModel]);

    const [emailErrorMessage, setEmailErrorMessage] = useState<string>("The email field can't be empty!");
    const [passErrorMessage, setPassErrorMessage] = useState<string>("The password field can't be empty!");
    const [confirmPassErrorMessage, setConfirmPassErrorMessage] = useState<string>(
        "The confirm password field can't be empty!"
    );
    const [firstNameErrorMessage, setFirstNameErrorMessage] = useState<string>("The first name field can't be empty!");
    const [lastNameErrorMessage, setLastNameErrorMessage] = useState<string>("The last name field can't be empty!");
    const [patronymicErrorMessage, setPatronymicErrorMessage] = useState<string>(
        "The patronymic field can't be empty!"
    );
    const [birthdayErrorMessage, setBirthdayErrorMessage] = useState<string>("The date of birth field can't be empty!");

    const [confirmPass, setConfirmPass] = useState<string>("");

    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        setSignUpValidationModel({
            ...signUpValidationModel,
            email: e.target.value,
        });

        if (String(e.target.value).toLowerCase().match(re)) {
            setEmailErrorMessage("");
        } else {
            setEmailErrorMessage("Email isn't valid!");
        }
    };

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let re = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{10,16}$/;

        setSignUpValidationModel({
            ...signUpValidationModel,
            pass: e.target.value,
        });

        if (String(e.target.value).match(re)) {
            setPassErrorMessage("");
        } else {
            setPassErrorMessage("Invalid password!");
        }
    };

    const onConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPass(e.target.value);

        if (e.target.value !== signUpValidationModel["pass"]) {
            setConfirmPassErrorMessage("Passwords don't match!");
        } else {
            setConfirmPassErrorMessage("");
        }
    };

    const onFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpValidationModel({
            ...signUpValidationModel,
            firstName: e.target.value,
        });

        if (!e.target.value) {
            setFirstNameErrorMessage("The first name field must be filled!");
        } else {
            setFirstNameErrorMessage("");
        }
    };

    const onLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpValidationModel({
            ...signUpValidationModel,
            lastName: e.target.value,
        });

        if (!e.target.value) {
            setLastNameErrorMessage("The last name field must be filled!");
        } else {
            setLastNameErrorMessage("");
        }
    };

    const onPatronymicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpValidationModel({
            ...signUpValidationModel,
            patronymic: e.target.value,
        });

        if (!e.target.value) {
            setPatronymicErrorMessage("The patronymic field must be filled!");
        } else {
            setPatronymicErrorMessage("");
        }
    };

    const onBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpValidationModel({
            ...signUpValidationModel,
            birthday: e.target.value,
        });

        if (!e.target.value) {
            setBirthdayErrorMessage("The birthday field must be filled!");
        } else {
            setBirthdayErrorMessage("");
        }
    };

    const [formIsValid, setFormIsValid] = useState<boolean>(false);

    useEffect(() => {
        if (
            emailErrorMessage ||
            passErrorMessage ||
            confirmPassErrorMessage ||
            firstNameErrorMessage ||
            lastNameErrorMessage ||
            patronymicErrorMessage ||
            birthdayErrorMessage
        )
            setFormIsValid(false);
        else setFormIsValid(true);
    }, [
        emailErrorMessage,
        passErrorMessage,
        confirmPassErrorMessage,
        firstNameErrorMessage,
        lastNameErrorMessage,
        patronymicErrorMessage,
        birthdayErrorMessage,
    ]);

    /*
    useEffect(() => {
        const init = async () => {
            if (signUpModel) {
                await signUp(signUpModel);
                navigate(-1);
            }
        };

        init();
    }, [signUpModel]);
    */

    return (
        <ModalWrapper isVisible={isModalOpened} setIsVisible={setIsModalOpened}>
            <div>
                <div className="d-flex justify-content-between border-bottom mb-2 pb-1">
                    <div className="fs-4">Sign up</div>
                    <div className="btn btn-close" onClick={() => setIsModalOpened(false)}></div>
                </div>
                <div className="d-flex">
                    <form
                        className="d-flex w-50 flex-column pe-2 border-end"
                        onSubmit={(e) => {
                            e.preventDefault();

                            const target = e.target as typeof e.target & {
                                email: { value: string };
                                pass: { value: string };
                                firstName: { value: string };
                                lastName: { value: string };
                                patronymic: { value: string };
                                birthday: { value: string };
                            };

                            const signUpModel: IRegister = {
                                email: target.email.value,
                                pass: target.pass.value,
                                firstName: target.firstName.value,
                                lastName: target.lastName.value,
                                patronymic: target.patronymic.value,
                                birthday: target.birthday.value,
                            };

                            setSignUpModel(signUpModel);
                        }}>
                        <div className="mb-3">
                            {emailErrorMessage && <div className="text-danger">* {emailErrorMessage}</div>}
                            <div>Email</div>
                            <input
                                type="text"
                                className="form-control"
                                name="email"
                                value={signUpValidationModel["email"]}
                                onChange={(e) => onEmailChange(e)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            {passErrorMessage && <div className="text-danger">* {passErrorMessage}</div>}
                            <div>Password</div>
                            <input
                                type="password"
                                className="form-control"
                                name="pass"
                                value={signUpValidationModel["pass"]}
                                onChange={(e) => onPasswordChange(e)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            {confirmPassErrorMessage && <div className="text-danger">* {confirmPassErrorMessage}</div>}
                            <div>Confirm password</div>
                            <input
                                type="password"
                                className="form-control"
                                name="confirmPass"
                                value={confirmPass}
                                onChange={(e) => onConfirmPasswordChange(e)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            {firstNameErrorMessage && <div className="text-danger">* {firstNameErrorMessage}</div>}
                            <div>First name</div>
                            <input
                                type="text"
                                className="form-control"
                                name="firstName"
                                value={signUpValidationModel["firstName"]}
                                onChange={(e) => onFirstNameChange(e)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            {lastNameErrorMessage && <div className="text-danger">* {lastNameErrorMessage}</div>}
                            <div>Last name</div>
                            <input
                                type="text"
                                className="form-control"
                                name="lastName"
                                value={signUpValidationModel["lastName"]}
                                onChange={(e) => onLastNameChange(e)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            {patronymicErrorMessage && <div className="text-danger">* {patronymicErrorMessage}</div>}
                            <div>Patronymic</div>
                            <input
                                type="text"
                                className="form-control"
                                name="patronymic"
                                value={signUpValidationModel["patronymic"]}
                                onChange={(e) => onPatronymicChange(e)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            {birthdayErrorMessage && <div className="text-danger">* {birthdayErrorMessage}</div>}
                            <div>Date of birth</div>
                            <input
                                type="date"
                                className="form-control"
                                name="birthday"
                                onChange={(e) => onBirthdayChange(e)}
                                required
                            />
                        </div>

                        <button disabled={!formIsValid} type="submit" className="btn btn-primary">
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
                </div>
            </div>
        </ModalWrapper>
    );
};

export default Register;
