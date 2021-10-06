import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function Room({id, name, total}) {
    const { chatroom } = useParams();
    
    function randomColor() { return Math.floor(Math.random()*16777215).toString(16); }

    return (
        <motion.div className="w-full mb-3" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>  
            <Link to={`/room/${id}`} className={`flex items-center rounded border-b py-3 shadow ${id === chatroom ? "bg-blue-500 border-blue-500" : "bg-white border-gray-200"}`}>
                <div className="flex items-start justify-between w-full">
                    <div className="pl-3 w-full">
                        <p className="focus:outline-none text-xl font-medium leading-5 text-gray-800" style={{color: `#${randomColor()}`}}>{name}</p>
                        <p className="focus:outline-none text-sm leading-normal pt-2 text-gray-500">{total} members</p>
                    </div>
                </div>
            </Link>      
        </motion.div>
    )
}

