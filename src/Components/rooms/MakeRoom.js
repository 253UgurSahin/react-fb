import { useState } from 'react';
import { motion } from 'framer-motion';
import { firestore } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';

export default function MakeRoom({ allRooms }) {
    const [modalState, setModalState] = useState(false);

    return (
        <>
            <button onClick={() => setModalState(true)} className="bg-blue-500 hover:bg-blue-400 text-white text-4xl font-bold h-10 px-2 border-b-4 border-blue-700 hover:border-blue-500 rounded flex items-center">
                <span className="mb-3">+</span>
            </button>
            { modalState && <Modal allRooms={allRooms} setState={setModalState}/> }
        </>
    )
}


function Modal({ setState, allRooms }) {    
    const [nameOfRoom, setNameOfRoom] = useState('');
    const  [error, setError] = useState();
    const { currentUserInfo } = useAuth();

    function makeNewRoom(e) {
        e.preventDefault();
        setError('');

        var checkName = allRooms.filter(room => {
            return room.name.toLowerCase() === nameOfRoom.toLowerCase();
        });

        if (checkName.length !== 0 || nameOfRoom === '') {
            setError('Given name is unavailable!');
            console.log('error');
        } else {
            const collectionRef = firestore.collection('rooms');
            const createdAt = new Date().getTime();
            collectionRef.add({ name: nameOfRoom, creator: currentUserInfo.username, total: 1, createdAt })
                .then(() => setState(false));
        }
    }
    
    return (
        <motion.div className="fixed top-0 right-0 w-full h-screen flex justify-center items-center" initial={{ opacity: 0 }} animate={{ opacity: .5 }} transition={{ delay: .3 }}>
            <div className="absolute top-0 right-0 w-full h-screen bg-gray-600" onClick={() => setState(false)}></div>
            
            <form onSubmit={makeNewRoom} className="text-left shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                <input className="w-full px-5 py-3 outline-none bg-white rounded-lg" onChange={(e) => setNameOfRoom(e.target.value)} type="text" placeholder="New Chat Room" />
                { error && <span className="py-1 px-5 font-semibold border border-red-600 text-red-600 bg-red-200 rounded ">{error}</span> }
            </form>
        </motion.div>
    )
}