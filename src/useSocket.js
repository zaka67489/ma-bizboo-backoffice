import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "newEventBank";
const SOCKET_SERVER_URL = "adminapibein-socketio.bizboo.com";
// const SOCKET_SERVER_URL = "localhost:7569";

const useSocket = (roomId) => {
    const [messages, setMessages] = useState([]);
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: { roomId },
        });

        socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
            const incomingMessage = { message, timestame: Date.now() };
            // const incomingMessage = { message, timestame: Date.now() };
            setMessages(message);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [roomId]);

    const sendMessage = (messageBody) => {
        socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
            body: messageBody,
            // senderId: socketRef.current.id,
        });
    };

    return { messages, sendMessage };
};

export default useSocket;