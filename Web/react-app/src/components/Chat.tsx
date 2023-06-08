import { useState } from "react";
import send from "../images/send.svg";
import IMessage from "../models/IMessage";
import { useOutletContext, useParams } from "react-router-dom";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { chatHubUrl } from "../API/ApiUrls";
import user from "../store/user";

const Chat = (): JSX.Element => {
    const { chatId } = useParams();

    const [messages, setMessages] = useState<IMessage[]>([]);
    const [messageStructure, setMessageStructure] = useState<IMessage>({
        user: "",
        message: "",
    });

    const [isStarted, setIsStarted] = useOutletContext<[boolean, (state: boolean) => void]>();

    const [conversationTopic, setConversationTopic] = useState<string>("");

    const [connection, setConnection] = useState<HubConnection | null>();

    const joinRoom = async () => {
        const profile = await user.getProfile();
        const userId = profile.userId;
        const userFullName = `${profile.firstName} ${profile.lastName}`;

        try {
            const connection = new HubConnectionBuilder()
                .withUrl(chatHubUrl)
                .configureLogging(LogLevel.Information)
                .build();

            connection.on("ReceiveMessage", (user, message) => {
                setMessages((prevMsgs) => [...prevMsgs, { user, message }]);
            });

            connection.onclose((e) => {
                setConnection(null);
                setMessages([]);
            });

            await connection.start();
            await connection.invoke("JoinRoom", { userId, conversationTopic, userFullName, chatId });
            setConnection(connection);
            setConversationTopic("");
        } catch (e) {
            console.log(e);
        }
    };

    const closeConnection = async () => {
        try {
            await connection?.stop();
        } catch (e) {
            console.log(e);
        }
    };

    const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await connection?.invoke("SendMessage", messageStructure.message);
        } catch (e) {
            console.log(e);
        }

        setMessageStructure({
            ...messageStructure,
            message: "",
        });
    };

    if (!connection) {
        return (
            <div className="d-flex flex-column mt-2">
                {!user.isAdmin && (
                    <div>
                        <label>Write topic of conversation: </label>
                        <input
                            className="form-control"
                            type="text"
                            value={conversationTopic}
                            onChange={(e) => setConversationTopic(e.target.value)}
                        />
                    </div>
                )}

                <button
                    disabled={!conversationTopic.length && !user.isAdmin}
                    className="btn btn-primary mx-auto mt-1 w-25"
                    onClick={() => {
                        joinRoom();
                        setIsStarted(true);
                    }}>
                    Start conversation
                </button>
            </div>
        );
    }

    return (
        <>
            {connection && (
                <div>
                    <div
                        className="btn btn-danger mt-1 me-auto"
                        onClick={() => {
                            closeConnection();
                            setIsStarted(false);
                        }}>
                        Leave conversation
                    </div>

                    <div
                        style={{ minWidth: "700px", minHeight: "700px" }}
                        className="mt-2 border border-2 position-relative">
                        <div className="d-flex justify-content-end ms-1 flex-column">
                            {messages.map((msg, index) => (
                                <div key={index} className="d-inline-flex flex-column align-items-end">
                                    <div
                                        style={{ display: "inline-block" }}
                                        className="message bg-primary border rounded-4 p-1 text-white">
                                        {msg.message}
                                    </div>
                                    <div style={{ fontSize: "14px", marginTop: "-3px" }} className="fw-light">
                                        {msg.user}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <form
                            onSubmit={sendMessage}
                            className="d-flex w-100 align-items-center position-absolute bottom-0 border-top">
                            <textarea
                                value={messageStructure.message}
                                onChange={(e) => setMessageStructure({ ...messageStructure, message: e.target.value })}
                                style={{ resize: "none" }}
                                className="form-control border-0"
                                placeholder="Write a message..."
                                id="message"
                                rows={3}></textarea>
                            <button type="submit" className="btn p-0 border-0">
                                <img src={send} height={25} />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chat;
