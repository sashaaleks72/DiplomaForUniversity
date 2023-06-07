import { useEffect, useState } from "react";
import send from "../images/send.svg";
import IMessage from "../models/IMessage";
import { useParams } from "react-router-dom";
import ChatService from "../API/ChatService";

const Chat = (): JSX.Element => {
    const { id } = useParams();

    const [messages, setMessages] = useState<IMessage[]>([]);
    const [message, setMessage] = useState<IMessage>({
        userName: "Admin",
        messageBody: "",
        sendingTime: Date.now().toString(),
        chatId: "",
    });

    const [isSendBtnClicked, setIsSetBtnClicked] = useState<boolean>(false);

    useEffect(() => {
        const init = async () => {
            const receivedMessages: IMessage[] = await ChatService.getMessagesByChatId(id!);
            setMessages(receivedMessages);
            setMessage({ ...message, chatId: id! });
        };

        init();
    }, [id]);

    useEffect(() => {
        const init = async () => {
            if (isSendBtnClicked === true) {
                await ChatService.sendMessage(message);
                setIsSetBtnClicked(false);
                setMessages([...messages, message]);
                setMessage({ ...message, messageBody: "" });
            }
        };

        init();
    }, [isSendBtnClicked]);

    return (
        <div
            style={{ minWidth: "700px", minHeight: "700px" }}
            className="border border-start-0 border-2 position-relative">
            <div className="d-flex flex-column">
                {messages.map((msg) => (
                    <div key={msg.id} className="ms-1">
                        <div className="fw-bold">{msg.userName}</div>
                        <div className="">{msg.messageBody}</div>
                    </div>
                ))}
            </div>

            <div className="d-flex w-100 align-items-center position-absolute bottom-0 border-top">
                <textarea
                    value={message.messageBody}
                    onChange={(e) => setMessage({ ...message, messageBody: e.target.value })}
                    style={{ resize: "none" }}
                    className="form-control border-0"
                    placeholder="Write a message..."
                    id="message"
                    rows={3}></textarea>
                <div className="btn p-0 border-0" onClick={() => message.messageBody && setIsSetBtnClicked(true)}>
                    <img src={send} height={25} />
                </div>
            </div>
        </div>
    );
};

export default Chat;
