import { useState } from "react";
import ITeapot from "../models/ITeapot";
import TabItems from "../components/TabItems";
import { Outlet, useParams } from "react-router-dom";
import ITabItem from "../models/ITabItem";

const TeapotPage = (): JSX.Element => {
    const { id } = useParams();

    const [tabItems] = useState<ITabItem[]>([
        { title: "Description", href: `/${id}/description` },
        { title: "Comments", href: `/${id}/comments` },
        { title: "Instructions", href: `/${id}/instructions` },
    ]);

    const [teapot, setTeapot] = useState<ITeapot>({
        id: "id1",
        name: "The smartest teapot in the world - ITeapot M100",
        quantity: 12,
        color: "black",
        bodyMaterial: "plastic",
        power: 1200,
        price: 2499,
        imgName:
            "https://content.rozetka.com.ua/goods/images/big_tile/163131692.jpg",
        volume: 1.8,
        functions: "heating by choosen temperature",
        weight: 1,
        warrantyInMonths: 12,
        stockAvailable: true,
        company: "Tefal",
        manufacturerCountry: "China",
    });

    return (
        <div className="container">
            <h2 className="display-6 mt-1">{teapot.name}</h2>
            <TabItems tabItems={tabItems} />
            <Outlet />
        </div>
    );
};

export default TeapotPage;
