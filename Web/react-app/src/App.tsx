import Header from "./components/Header";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import TeapotPage from "./pages/TeapotPage";
import Description from "./components/Description";
import Comments from "./components/Comments";
import Instructions from "./components/Instructions";

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/catalog" element={<HomePage />} />
                <Route path="/:id" element={<TeapotPage />}>
                    <Route path="description" element={<Description />}></Route>
                    <Route path="comments" element={<Comments />}></Route>
                    <Route
                        path="instructions"
                        element={<Instructions />}
                    ></Route>
                </Route>
                <Route path="/about" element={<AboutPage />} />
                <Route path="*" element={<Navigate to={"/catalog"} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
