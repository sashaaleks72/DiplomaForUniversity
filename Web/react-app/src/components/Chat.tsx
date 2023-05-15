import { useState } from "react";
import send from "../images/send.svg";
import IMessage from "../models/IMessage";
import { useParams } from "react-router-dom";

const Chat = (): JSX.Element => {
    const { id } = useParams();

    const [messages, setMessages] = useState<IMessage[]>([]);
    const [message, setMessage] = useState<IMessage>({
        userId: "",
        messageBody: "",
        sendingTime: "",
        chatId: "",
    });

    return (
        <div
            style={{ minWidth: "700px", minHeight: "700px" }}
            className="border border-start-0 border-2 position-relative">
            <div className="d-flex w-100 align-items-center position-absolute bottom-0 border-top">
                <textarea
                    style={{ resize: "none" }}
                    className="form-control border-0"
                    placeholder="Write a message..."
                    id="messageArea"
                    rows={3}></textarea>
                <div className="btn p-0 border-0">
                    <img src={send} height={25} />
                </div>
            </div>
        </div>
    );
};

export default Chat;
