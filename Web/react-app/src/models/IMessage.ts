import IPersonInfo from "./IPersonInfo";

interface IMessage {
    messageId?: number;
    userId: string;
    messageBody: string;
    sendingTime: string;
    chatId: string;
}

export default IMessage;