import { useEffect, useState } from "react";
import ITeapot from "../models/ITeapot";
import TabItems from "../components/TabItems";
import { Outlet, useParams } from "react-router-dom";
import ITabItem from "../models/ITabItem";
import TeapotsService from "../API/TeapotsService";

const TeapotPage = (): JSX.Element => {
    const { id } = useParams();

    const [tabItems] = useState<ITabItem[]>([
        { title: "Description", href: `/${id}/description` },
        { title: "Comments", href: `/${id}/comments` },
        { title: "Instructions", href: `/${id}/instructions` },
    ]);

    const [teapot, setTeapot] = useState<ITeapot>({
        name: "",
        quantity: 0,
        color: "",
        bodyMaterial: "",
        power: 0,
        price: 0,
        imgName: "",
        volume: 0,
        warrantyInMonths: 0,
        functions: "",
        weight: 0,
        company: "",
        stockAvailable: false,
        manufacturerCountry: "",
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const init = async () => {
            setIsLoading(true);
            const recievedTeapot = await TeapotsService.getTeapotById(id);
            setTeapot(recievedTeapot);

            setIsLoading(false);
        };

        init();
    }, []);

    return (
        <div className="container">
            <h2 className="display-6 mt-1">{teapot.name}</h2>
            <TabItems tabItems={tabItems} />

            {!isLoading && <Outlet context={[teapot, setTeapot]} />}

            {isLoading && (
                <div className="d-flex justify-content-center ms-auto">
                    <div style={{ width: "3rem", height: "3rem" }} className="spinner-border">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeapotPage;
