import { useState, useEffect } from 'react';
import { firestore } from '../firebase';
import Nav from '../Components/Nav';
import Chat from '../Components/chat/Chat';
import Rooms from '../Components/rooms/Rooms';

export default function Home() {
    const [allRooms, setAllRooms] = useState([]);
    // getting all rooms
    useEffect(() => {
        const unsub = firestore.collection('rooms')
            .orderBy('createdAt', 'desc')
            .onSnapshot((snap) => {
                let documents = [];
                snap.forEach(doc => {
                    documents.push({ ...doc.data(), id: doc.id });
                });                
                setAllRooms(documents);
            });
        return () => unsub();
    }, [])
    
    return (
        <div className="w-full flex flex-col min-h-screen">            
            <Nav />
            <div className="flex flex-row flex-grow">
                <div className="flex flex-col flex-grow max-w-sm">
                    <Rooms allRooms={allRooms} />
                </div>
                <div className="w-full flex flex-col flex-grow">
                    <Chat allRooms={allRooms} />
                </div>
            </div>
        </div>
    )
}
