import IPersonInfo from "./IPersonInfo";

interface IMessage {
    id?: number;
    chatId: string;
    userName: string;
    messageBody: string;
    sendingTime: string;
}

export default IMessage;