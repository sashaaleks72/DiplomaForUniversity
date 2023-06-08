import { useEffect, useState } from "react";
import IChat from "../models/IChat";
import ChatService from "../API/ChatService";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const ChatList = (): JSX.Element => {
    const { chatId } = useParams();

    const [chats, setChats] = useState<IChat[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isStarted, setIsStarted] = useState<boolean>(false);

    const navigate = useNavigate();

    const chatBtnClass = "btn text-start p-3 border border-black border-1 border-rounded rounded-2 mb-2";

    const selectedChatBtnClass = `${chatBtnClass} bg-secondary text-white`;

    const [selectedChat, setSelectedChat] = useState<IChat>({
        id: "",
        conversationTopic: "",
    });

    useEffect(() => {
        const init = async () => {
            setIsLoading(true);
            const receivedChatList: IChat[] = await ChatService.getChatList();
            setIsLoading(false);

            setChats(receivedChatList);
        };

        init();
    }, []);

    if (isLoading) {
        return (
            <Box mt={1} sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress size={50} />
            </Box>
        );
    }

    return (
        <div className="container mt-2">
            <div className="fw-light fs-4">Chat</div>
            {chats.length ? (
                <div className="d-flex">
                    {!isStarted && (
                        <div
                            className="w-25 d-flex flex-column border border-2 p-2 pb-0"
                            style={{ minHeight: "700px" }}>
                            {chats.map((chatItem) => (
                                <div
                                    key={chatItem.id}
                                    className={chatItem.id === chatId ? selectedChatBtnClass : chatBtnClass}
                                    onClick={() => {
                                        setSelectedChat(chatItem);
                                        navigate(`/admin/chats/${chatItem.id}`);
                                    }}>
                                    {chatItem.conversationTopic}
                                </div>
                            ))}
                        </div>
                    )}
                    {chatId ? (
                        <div className="w-75">
                            <Outlet context={[isStarted, setIsStarted]} />
                        </div>
                    ) : (
                        <div className="mx-auto fs-4 fw-light">Choose a chat</div>
                    )}
                </div>
            ) : (
                <div className="text-center fs-4 fw-light">There are no any chats</div>
            )}
        </div>
    );
};

export default ChatList;
