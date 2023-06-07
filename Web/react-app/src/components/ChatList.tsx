import { useEffect, useState } from "react";
import IChat from "../models/IChat";
import ChatService from "../API/ChatService";
import Chat from "./Chat";
import { Outlet, useNavigate, useParams } from "react-router-dom";

const ChatList = (): JSX.Element => {
    const [chats, setChats] = useState<IChat[]>([]);

    const { id } = useParams();

    const navigate = useNavigate();

    const chatBtnClass = "btn text-start p-3 border border-black border-1 border-rounded rounded-2 mb-2";

    const selectedChatBtnClass = `${chatBtnClass} bg-secondary text-white`;

    const [selectedChat, setSelectedChat] = useState<IChat>({
        id: 0,
        userName: "",
    });

    useEffect(() => {
        const init = async () => {
            const receivedChatList: IChat[] = await ChatService.getChatList();
            setChats(receivedChatList);
        };

        init();
    }, []);

    return (
        <div className="container mt-2">
            <div className="fw-light fs-4">Chats</div>
            <div className="d-flex">
                <div className="w-25 d-flex flex-column border border-2 p-2 pb-0">
                    {chats.map((chatItem) => (
                        <div
                            key={chatItem.id}
                            className={chatItem.id === +id! ? selectedChatBtnClass : chatBtnClass}
                            onClick={() => {
                                setSelectedChat(chatItem);
                                navigate(`/admin/chats/${chatItem.id}`);
                            }}>
                            {chatItem.userName}
                        </div>
                    ))}
                </div>
                {id ? <Outlet /> : <div className="mx-auto fs-4 fw-light">Choose a chat</div>}
            </div>
        </div>
    );
};

export default ChatList;
