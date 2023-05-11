import { useState } from "react";

export const useFetching = (
    callback: () => Promise<void>
): [() => Promise<void>, boolean, string] => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errMsg, setErrMsg] = useState<string>("");

    const fetching = async () => {
        try {
            setIsLoading(true);
            await callback();
        } catch (e) {
            const errorMsg = (e as Error).message;
            setErrMsg(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    return [fetching, isLoading, errMsg];
};
