import axios from "axios";
import IChat from "../models/IChat";
import { chatApiUrl } from "./ApiUrls";

class ChatService {
    static async getChatList(): Promise<IChat[]> {
        const receivedData = await axios
            .get(`${chatApiUrl}/GetChats`)
            .then(response => response.data);

        return receivedData;
    }
}

export default ChatService;