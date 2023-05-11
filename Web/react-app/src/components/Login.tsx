import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ModalWrapper from "./UI/ModalWrapper/ModalWrapper";
import Register from "./Register";

interface LoginProps {
    isOpened: boolean;
    setIsOpened: (state: boolean) => void;
}

const Login = ({ isOpened, setIsOpened }: LoginProps): JSX.Element => {
    const [isRegisterClicked, setIsRegisterClicked] = useState<boolean>(false);
    //const [signInModel, setSignInModel] = useState<SignInModel>();

    /*useEffect(() => {
        if (signInModel != undefined) console.log(signInModel);
    }, [signInModel]);*/

    const counter = useRef<number>(0);

    useEffect(() => {
        counter.current++;
        if (counter.current === 3) setIsOpened(false);
    }, [isRegisterClicked]);

    return (
        <ModalWrapper isVisible={isOpened} setIsVisible={setIsOpened}>
            <div>
                <div className="d-flex justify-content-between border-bottom mb-2 pb-1">
                    <div className="fs-4">Log In</div>
                    <div className="btn btn-close" onClick={() => setIsOpened(false)}></div>
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();

                        const target = e.target as typeof e.target & {
                            email: { value: string };
                            pass: { value: string };
                        };

                        /*
                        const signInModel: SignInModel = {
                            email: target.email.value,
                            pass: target.pass.value,
                        };

                        setSignInModel(signInModel);
                        */
                    }}>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input
                            name="email"
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input name="pass" type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-primary">
                            Sign In
                        </button>
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
