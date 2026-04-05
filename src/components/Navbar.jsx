import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10 px-8 py-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-cyan-400">PixelCraftHub</Link>
            <div className="space-x-6">
                <Link to="/" className="hover:text-cyan-400 transition">Accueil</Link>
                <Link to="/login" className="bg-cyan-600 px-4 py-2 rounded-lg hover:bg-cyan-500 transition">Connexion</Link>
            </div>
        </nav>
    );
};

export default Navbar;