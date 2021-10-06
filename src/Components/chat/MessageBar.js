import { useState, useRef } from "react"
import { useAuth } from "../../contexts/AuthContext";
import { firestore } from "../../firebase"

export default function MessageBar({ room }) {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("");
    const { currentUserInfo } = useAuth();
    const messageRef = useRef();

    console.table(currentUserInfo);

    function sendMessage(e) {
        e.preventDefault();
        setLoading(true);
        const collectionRef = firestore.collection('messages');
        const createdAt = new Date().getTime();
        collectionRef.add({ roomid: room.id, name: currentUserInfo.username, message, creator: currentUserInfo.id, createdAt })
            .then(() => { setLoading(false); setMessage(""); messageRef.current.value = ""; });
    }

    return (
        <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
            <form onSubmit={sendMessage} className="relative flex">
                <input disabled={loading} ref={messageRef} onChange={(e) => setMessage(e.target.value)} type="text" placeholder="Write Something" className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-full py-3" />
                <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">                            
                    <button type="button" className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 transform rotate-90">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    )
}
