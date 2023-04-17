import ITeapot from "../models/ITeapot";
import TeapotItem from "./TeapotItem";

interface TeapotListProps {
    teapots: ITeapot[];
}

const TeapotList = ({ teapots }: TeapotListProps): JSX.Element => {
    return (
        <div className="container">
            <div className="row row-cols-xs-1 row-cols-md-2 row-cols-xl-3 g-4">
                {teapots.map((teapot) => (
                    <TeapotItem key={teapot.id} teapot={teapot}></TeapotItem>
                ))}
            </div>
        </div>
    );
};

export default TeapotList;
