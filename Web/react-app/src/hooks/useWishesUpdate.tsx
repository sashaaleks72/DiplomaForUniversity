import { useEffect, useRef, useState } from "react";
import wishes from "../store/wishes";
import ITeapot from "../models/ITeapot";

export const useWishesUpdate = (teapot: ITeapot): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
    const [isHeartPressed, setIsHeartPressed] = useState<boolean>(false);

    const isFirstUpdate = useRef<boolean>(true);

    useEffect(() => {
        wishes.checkIsWished(teapot.id!) && setIsHeartPressed(true);
    }, []);

    useEffect(() => {
        if (isFirstUpdate.current) {
            isFirstUpdate.current = false;
            return;
        }

        isHeartPressed ? wishes.addToWishList(teapot) : wishes.removeFromWishList(teapot.id!);
    }, [isHeartPressed]);

    return [isHeartPressed, setIsHeartPressed];
};
