import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import IProfileRequest from "../models/IProfileRequest";
import user from "../store/user";
import { observer } from "mobx-react-lite";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import IPersonInfo from "../models/IPersonInfo";

const PersonalInfo = observer((): JSX.Element => {
    const [isAllowToEdit, setAllowanceToEdit] = useState<boolean>(false);

    const validationSchema = yup.object().shape({
        firstName: yup.string().required("First name is a required field!"),
        lastName: yup.string().required("Last name is a required field!"),
        patronymic: yup.string().required("Patronymic is a required field!"),
        birthday: yup.string().required("Birthday is a required field!"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<IProfileRequest>({
        resolver: yupResolver(validationSchema),
        defaultValues: async () => {
            const receivedProfile = await user.getProfile();
            return receivedProfile;
        },
        mode: "all",
    });

    const onSubmit = async (data: FieldValues) => {
        var profileToUpdate = data as IProfileRequest;
        await user.updateProfile(profileToUpdate);

        setAllowanceToEdit(false);
    };

    return (
        <div>
            <div className="fs-2 fw-light text-center mb-2">Your profile</div>
            <form className="d-flex flex-column align-items-center" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="w-75 mb-3">
                    {errors.firstName && <div className="text-danger">* {errors.firstName.message}</div>}
                    <div className="fs-5 fw-light">First name</div>
                    <input disabled={!isAllowToEdit} type="text" className="form-control" {...register("firstName")} />
                </div>
                <div className="w-75 mb-3">
                    {errors.lastName && <div className="text-danger">* {errors.lastName.message}</div>}
                    <div className="fs-5 fw-light">Last name</div>
                    <input disabled={!isAllowToEdit} type="text" className="form-control" {...register("lastName")} />
                </div>
                <div className="w-75 mb-3">
                    {errors.patronymic && <div className="text-danger">* {errors.patronymic.message}</div>}
                    <div className="fs-5 fw-light">Patronymic</div>
                    <input disabled={!isAllowToEdit} type="text" className="form-control" {...register("patronymic")} />
                </div>
                <div className="w-75 mb-3">
                    {errors.birthday && <div className="text-danger">* {errors.birthday.message}</div>}
                    <div className="fs-5 fw-light">Date of birth</div>
                    <input disabled={!isAllowToEdit} type="date" className="form-control" {...register("birthday")} />
                </div>

                <div className="text-center mt-3">
                    {!isAllowToEdit && (
                        <div className="btn btn-success" role="button" onClick={(e) => setAllowanceToEdit(true)}>
                            Edit profile
                        </div>
                    )}
                    <input
                        type={isAllowToEdit ? "submit" : "hidden"}
                        className="btn btn-primary"
                        value={"Save changes"}
                    />
                </div>
            </form>
        </div>
    );
});

export default PersonalInfo;
