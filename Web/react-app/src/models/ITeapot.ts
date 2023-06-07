interface ITeapot {
    id?: string;
    name: string;
    quantity: number;
    color: string;
    bodyMaterial: string;
    power: number;
    price: number;
    imgName: string;
    volume: number;
    warrantyInMonths: number;
    functions: string;
    weight: number;
    company: string;
    stockAvailable: boolean;
    manufacturerCountry: string;
    manualUrl: string;
}

export default ITeapot;
