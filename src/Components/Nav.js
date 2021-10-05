import Logout from '../Components/auth/Logout';

export default function Nav() {
    return (
        <nav className="bg-gray-800">
            <div className="container flex items-center justify-between h-14">
                <h2 className="text-white text-2xl font-semibold uppercase">Chat-app</h2>

                <Logout />
            </div>
        </nav>
    )
}