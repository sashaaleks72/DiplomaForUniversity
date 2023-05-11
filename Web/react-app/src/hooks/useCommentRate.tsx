import { useEffect, useState } from "react";
import unfilled_star from "../images/star-regular.svg";
import filled_star from "../images/star-solid.svg";

export const useCommentRate = (
    starsCount: number
): [
    number,
    string[],
    (index: number) => void,
    (index: number) => void,
    () => void,
    (rate: number) => void
] => {
    const [rate, setRate] = useState<number>(0);

    const [starsSrcs, setStarsSrcs] = useState<string[]>([]);

    useEffect(() => {
        const starsSrcsToSet: string[] = [];

        for (let i = 0; i < starsCount; i++) {
            starsSrcsToSet.push(unfilled_star);
        }

        setStarsSrcs([...starsSrcsToSet]);
    }, []);

    const onStarMouseEnter = (index: number): void => {
        const starsSrcsToSet = starsSrcs.map((el, i) => {
            if (i <= index) return filled_star;
            return unfilled_star;
        });

        setStarsSrcs([...starsSrcsToSet]);
    };

    const onStarClick = (index: number): void => {
        setRate(index + 1);
    };

    const onStarMouseLeave = (): void => {
        const starsSrcsToSet = starsSrcs.map((el, i) => {
            if (i < rate) return filled_star;
            else if (rate === 0) return unfilled_star;
            else {
                return unfilled_star;
            }
        });

        setStarsSrcs([...starsSrcsToSet]);
    };

    return [
        rate,
        starsSrcs,
        onStarMouseEnter,
        onStarClick,
        onStarMouseLeave,
        setRate,
    ];
};
