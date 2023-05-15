import axios from "axios";
import IChat from "../models/IChat";
import IMessage from "../models/IMessage";

const apiUrl = "http://localhost:3001";

class ChatService {
    static async getChatList(): Promise<IChat[]> {
        const receivedData = await axios
            .get(`${apiUrl}/chats`)
            .then(response => response.data);

        return receivedData;
    }

    static async getChatById(chatId: string): Promise<IMessage[]> {
        const receivedData: IMessage[] = await axios
            .get(`${apiUrl}/chats/${chatId}`)
            .then(response => response.data);

        return receivedData;
    }
}

export default ChatService;