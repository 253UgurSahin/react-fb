import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ChatNav from './ChatNav';
import Message from './Message';
import MessageBar from './MessageBar';
import './scroll.css';

export default function Chat({ allRooms }) {
    const [room, setRoom] = useState([]);
    const { chatroom } = useParams();

    useEffect(() => {
        const room = allRooms.filter(room => { return room.id === chatroom });
        setRoom(room);
    }, [allRooms, chatroom]);

    return (
        <div className="overflow-hidden flex flex-col flex-grow justify-center" style={{ background: "#edf2f7" }} >
            <div className="flex-1 p-2 justify-between flex flex-col flex-grow">
                <ChatNav room={room[0]} />

                <motion.div id="messages" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex flex-col flex-grow space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                    <Message room={room[0]} />
                </motion.div>    
                
                <MessageBar room={room[0]} />
            </div>
        </div>
    );
}