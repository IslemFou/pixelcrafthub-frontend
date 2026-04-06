import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    return (
        <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10 px-8 py-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-cyan-400">PixelCraftHub</Link>
            <div className="space-x-6">
                {/* <Link to="/" className="hover:text-cyan-400 transition">Accueil</Link> */}
                {user ? (
                    <>
                        <Link to="/dashboard" className="text-gray-300 hover:text-cyan-400 transition">Dashboard</Link>
                        <button
                            onClick={logout}
                            className="bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition"
                        >
                            Déconnexion
                        </button>
                    </>
                ) : (
                    <div className="">
                        <Link to="/register" className="bg-cyan-600 mx-3 px-4 py-2 rounded-lg hover:bg-cyan-500 transition text-white">
                            Register
                        </Link>
                        <Link to="/login" className="bg-cyan-600 px-4 py-2 rounded-lg hover:bg-cyan-500 transition text-white">
                            Connexion
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;