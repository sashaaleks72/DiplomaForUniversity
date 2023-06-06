import Header from "./components/Header";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import TeapotPage from "./pages/TeapotPage";
import Description from "./components/Description";
import Comments from "./components/Comments";
import Instructions from "./components/Instructions";
import CheckoutPage from "./pages/CheckoutPage";
import OrderList from "./components/OrderList";
import ProfilePage from "./pages/ProfilePage";
import WishList from "./components/WishList";
import PersonalInfo from "./components/PersonalInfo";
import EditTeapotPage from "./pages/admin/EditTeapotPage";
import AddTeapotPage from "./pages/admin/AddTeapotPage";
import TeapotAdminList from "./components/TeapotAdminList";
import ControlPanelPage from "./pages/admin/ControlPanelPage";
import OrderAdminList from "./components/OrderAdminList";
import EditOrderPage from "./pages/admin/EditOrderPage";
import ChatList from "./components/ChatList";
import Chat from "./components/Chat";
import Support from "./components/Support";
import User from "./store/user";

const App = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/catalog" element={<HomePage />} />
                <Route path="/:id" element={<TeapotPage />}>
                    <Route path="description" element={<Description />} />
                    <Route path="comments" element={<Comments />} />
                    <Route path="instructions" element={<Instructions />} />
                </Route>
                <Route path="/profile" element={<ProfilePage />}>
                    <Route path="orders" element={<OrderList />} />
                    <Route path="wish-list" element={<WishList />} />
                    <Route path="personal-info" element={<PersonalInfo />} />
                    <Route path="chat" element={<Support />} />
                </Route>
                <Route path="/admin" element={<ControlPanelPage />}>
                    <Route path="catalog" element={<TeapotAdminList />} />
                    <Route path="orders" element={<OrderAdminList />} />
                    <Route path="chats" element={<ChatList />}>
                        <Route path=":id" element={<Chat />} />
                    </Route>
                </Route>
                <Route path="/admin/edit-teapot/:id" element={<EditTeapotPage />} />
                <Route path="/admin/add-teapot" element={<AddTeapotPage />} />
                <Route path="/admin/edit-order/:id" element={<EditOrderPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="*" element={<Navigate to={"/catalog"} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
