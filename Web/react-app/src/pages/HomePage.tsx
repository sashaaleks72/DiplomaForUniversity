import { useState } from "react";
import TeapotList from "../components/TeapotList";
import ITeapot from "../models/ITeapot";

const HomePage = (): JSX.Element => {
    const [teapots, setTeapots] = useState<ITeapot[]>([
        {
            id: "id1",
            name: "Teapot1",
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
        },
        {
            id: "id2",
            name: "Teapot2",
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
        },
        {
            id: "id3",
            name: "Teapot3",
            quantity: 12,
            color: "black",
            bodyMaterial: "plastic",
            power: 1200,
            price: 2499,
            imgName:
                "https://content1.rozetka.com.ua/goods/images/big_tile/267792323.jpg",
            volume: 1.8,
            functions: "heating by choosen temperature",
            weight: 1,
            warrantyInMonths: 12,
            stockAvailable: true,
            company: "Tefal",
            manufacturerCountry: "China",
        },
        {
            id: "id4",
            name: "Teapot4",
            quantity: 12,
            color: "black",
            bodyMaterial: "plastic",
            power: 1200,
            price: 2499,
            imgName:
                "https://content1.rozetka.com.ua/goods/images/big_tile/10626237.jpg",
            volume: 1.8,
            functions: "heating by choosen temperature",
            weight: 1,
            warrantyInMonths: 12,
            stockAvailable: true,
            company: "Tefal",
            manufacturerCountry: "China",
        },
        {
            id: "id5",
            name: "Teapot5",
            quantity: 12,
            color: "black",
            bodyMaterial: "plastic",
            power: 1200,
            price: 2499,
            imgName:
                "https://content2.rozetka.com.ua/goods/images/big_tile/274310222.jpg",
            volume: 1.8,
            functions: "heating by choosen temperature",
            weight: 1,
            warrantyInMonths: 12,
            stockAvailable: true,
            company: "Tefal",
            manufacturerCountry: "China",
        },
        {
            id: "id6",
            name: "Teapot6",
            quantity: 12,
            color: "black",
            bodyMaterial: "plastic",
            power: 1200,
            price: 2499,
            imgName:
                "https://content1.rozetka.com.ua/goods/images/big_tile/64732971.jpg",
            volume: 1.8,
            functions: "heating by choosen temperature",
            weight: 1,
            warrantyInMonths: 12,
            stockAvailable: true,
            company: "Tefal",
            manufacturerCountry: "China",
        },
    ]);

    return (
        <div className="mt-2 mb-3">
            <h3 className="display-6 text-center">Teapot list</h3>
            <TeapotList teapots={teapots} />
        </div>
    );
};

export default HomePage;
