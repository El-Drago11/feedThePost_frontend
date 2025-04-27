import { createContext, useContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { createSocketConnection } from "../Services/socket";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
    const { user } = useSelector((store) => store.auth);
    const socketRef = useRef(null);
    const navigate = useNavigate();
    const statusUpdateHandler = (data) => {
        const { resp } = data;
        if (resp.status === 'Block') {
            toast.error('You have been blocked by admin');
            navigate("/");
        }
    };

    // Create the socket only once
    useEffect(() => {
        socketRef.current = createSocketConnection();
        const socket = socketRef.current;

        socket.on('status-updated', statusUpdateHandler);

        return () => {
            socket.off('status-updated', statusUpdateHandler);
            socket.disconnect();
        };
    }, []);

    // Join room when user ID is available
    useEffect(() => {
        if (user && socketRef.current) {
            socketRef.current.emit("join-room", { getUserId: user._id });
            console.log('Joining room: ', user._id);
        }
    }, [user]);

    return (
        <SocketContext.Provider value={{ socket: socketRef.current }}>
            {children}
        </SocketContext.Provider>
    )
}


export const UseSocketContext = () => useContext(SocketContext);
