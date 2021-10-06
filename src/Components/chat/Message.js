import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";

export default function Message() {
    const { chatroom } = useParams();
    const [allMessages, setAllMessages] = useState([]);
    const { currentUserInfo } = useAuth();

    useEffect(() => {
        if (chatroom) {
            const unsub = firestore.collection('messages')
                .where('roomid', '==', chatroom)
                .orderBy('createdAt', 'desc')
                .onSnapshot((snap) => {
                    let documents = [];
                    snap.forEach(doc => {
                        documents.push({ ...doc.data(), id: doc.id });
                    });                
                    setAllMessages(documents);
                });

        
            return () => unsub();
        }
    }, [chatroom]);

    function theDate(t) {
        var date_future = new Date().getTime();
        let date_now = new Date(t);
            date_now.toLocaleString();

        var seconds = Math.floor((date_future - (date_now))/1000);
        var minutes = Math.floor(seconds/60);
        var hours = Math.floor(minutes/60);
        var days = Math.floor(hours/24);

        if (days > 5) { return `More than a week ago` }
        else if (days > 0) { return `${days} days ago` }
        else if (hours > 22) { return `1 day ago` } 
        else if (hours > 1) { return `${hours} hours ago` }
        else if (minutes > 50) { return '1 hour ago' }
        else if (minutes < 50) { return `${minutes} min ago` }
    }

    return (
        <>
            {
                allMessages && allMessages.map((mes, i) => (
                    <div key={i} className="chat-message">
                        <div className={`flex items-end ${currentUserInfo.id === mes.creator ? "justify-end" : ""}`}>
                            <div className={`flex flex-col space-y-2 text-md max-w-xs mx-2 ${currentUserInfo.id === mes.creator ? "order-1 items-end" : "order-2 items-start"}`}>
                                <div><span className={`px-4 py-2 rounded-lg inline-block ${currentUserInfo.id === mes.creator ? "rounded-br-none bg-blue-600 text-white" : "rounded-bl-none bg-gray-300 text-gray-600"}`}>{mes.message}</span></div>
                            </div>
                            <span className={`text-xs ${currentUserInfo.id === mes.creator ? "" : "order-2"}`}>{ theDate(mes.createdAt) }</span>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
