import { useAuth } from "../../contexts/AuthContext";

export default function ChatNav({ room }) {
    const { currentUserInfo } = useAuth();

    return (
        <div className="flex sm:items-center justify-between border-b-2 border-gray-200">
            <div className="flex items-center space-x-4">
                <div className="flex flex-col leading-tight">
                    <div className="text-2xl flex items-center">
                        <span className="text-gray-700 mr-3">{ currentUserInfo && currentUserInfo.username }</span>
                    </div>
                    <span className="text-lg text-gray-600">{ room && room.name }</span>
                </div>
            </div>
        </div>
    )
}
