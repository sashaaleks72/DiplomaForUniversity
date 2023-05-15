import { useEffect, useState } from "react";
import IPersonInfo from "../models/IPersonInfo";

const PersonalInfo = (): JSX.Element => {
    const [personInfo, setPersonInfo] = useState<IPersonInfo>();

    const [validationProfile, setValidationProfile] = useState<IPersonInfo>({
        userId: "",
        firstName: "",
        lastName: "",
        patronymic: "",
        birthday: "",
    });

    const [firstNameErrorMessage, setFirstNameErrorMessage] = useState<string>("");
    const [lastNameErrorMessage, setLastNameErrorMessage] = useState<string>("");
    const [patronymicErrorMessage, setPatronymicErrorMessage] = useState<string>("");
    const [birthdayErrorMessage, setBirthdayErrorMessage] = useState<string>("");

    const onFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValidationProfile({
            ...validationProfile,
            firstName: e.target.value,
        });

        if (!e.target.value) {
            setFirstNameErrorMessage("The first name field must be filled!");
        } else {
            setFirstNameErrorMessage("");
        }
    };

    const onLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValidationProfile({
            ...validationProfile,
            lastName: e.target.value,
        });

        if (!e.target.value) {
            setLastNameErrorMessage("The last name field must be filled!");
        } else {
            setLastNameErrorMessage("");
        }
    };

    const onPatronymicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValidationProfile({
            ...validationProfile,
            patronymic: e.target.value,
        });

        if (!e.target.value) {
            setPatronymicErrorMessage("The patronymic field must be filled!");
        } else {
            setPatronymicErrorMessage("");
        }
    };

    const onBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValidationProfile({
            ...validationProfile,
            birthday: e.target.value,
        });

        if (!e.target.value) {
            setBirthdayErrorMessage("The birthday field must be filled!");
        } else {
            setBirthdayErrorMessage("");
        }
    };

    const [isAllowToEdit, setAllowanceToEdit] = useState<boolean>(false);
    const [formIsValid, setFormIsValid] = useState<boolean>(false);

    useEffect(() => {
        if (firstNameErrorMessage || lastNameErrorMessage || patronymicErrorMessage || birthdayErrorMessage)
            setFormIsValid(false);
        else setFormIsValid(true);
    }, [firstNameErrorMessage, lastNameErrorMessage, patronymicErrorMessage, birthdayErrorMessage]);

    /*
    useEffect(() => {
        const init = async () => {
            const profileFromResponse = await getProfile("ES9zC9J");
            setValidationProfile(profileFromResponse);
        };

        init();
    }, []);
    */

    /*
    useEffect(() => {
        const init = async () => {
            if (profile != undefined) await editProfile("ES9zC9J", profile);
        };

        init();
    }, [profile]);
    */

    return (
        <div>
            <div className="fs-2 fw-light text-center mb-2">Your profile</div>
            <form
                className="d-flex flex-column align-items-center"
                onSubmit={(e) => {
                    e.preventDefault();

                    const target = e.target as typeof e.target & {
                        firstName: { value: string };
                        lastName: { value: string };
                        patronymic: { value: string };
                        birthday: { value: string };
                    };

                    const profile: IPersonInfo = {
                        userId: "",
                        firstName: target.firstName.value,
                        lastName: target.lastName.value,
                        patronymic: target.patronymic.value,
                        birthday: target.birthday.value,
                    };

                    setPersonInfo(profile);
                    setAllowanceToEdit(false);
                }}>
                <div className="w-75">
                    {firstNameErrorMessage && <div className="text-danger">* {firstNameErrorMessage}</div>}
                    <div className="fs-5 fw-light">First name</div>
                    <input
                        disabled={!isAllowToEdit}
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={validationProfile["firstName"]}
                        onChange={(e) => onFirstNameChange(e)}
                        required
                    />
                </div>
                <div className="w-75">
                    {lastNameErrorMessage && <div className="text-danger">* {lastNameErrorMessage}</div>}
                    <div className="fs-5 fw-light">Last name</div>
                    <input
                        disabled={!isAllowToEdit}
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={validationProfile["lastName"]}
                        onChange={(e) => onLastNameChange(e)}
                        required
                    />
                </div>
                <div className="w-75">
                    {patronymicErrorMessage && <div className="text-danger">* {patronymicErrorMessage}</div>}
                    <div className="fs-5 fw-light">Patronymic</div>
                    <input
                        disabled={!isAllowToEdit}
                        type="text"
                        className="form-control"
                        name="patronymic"
                        value={validationProfile["patronymic"]}
                        onChange={(e) => onPatronymicChange(e)}
                        required
                    />
                </div>
                <div className="w-75">
                    {birthdayErrorMessage && <div className="text-danger">* {birthdayErrorMessage}</div>}
                    <div className="fs-5 fw-light">Date of birth</div>
                    <input
                        disabled={!isAllowToEdit}
                        type="date"
                        className="form-control"
                        name="birthday"
                        value={validationProfile["birthday"]}
                        onChange={(e) => onBirthdayChange(e)}
                        required
                    />
                </div>

                <div className="text-center mt-3">
                    {!isAllowToEdit && (
                        <div className="btn btn-success" role="button" onClick={(e) => setAllowanceToEdit(true)}>
                            Edit profile
                        </div>
                    )}
                    <input
                        disabled={!formIsValid}
                        type={isAllowToEdit ? "submit" : "hidden"}
                        className="btn btn-primary"
                        value={"Save changes"}
                    />
                </div>
            </form>
        </div>
    );
};

export default PersonalInfo;
