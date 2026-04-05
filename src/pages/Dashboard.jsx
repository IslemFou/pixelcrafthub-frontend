import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user, logout } = useContext(AuthContext); // On ajoutera logout après
    const navigate = useNavigate();

    if (!user) {
        return <div className="text-center mt-20 text-red-400">Accès refusé. Veuillez vous connecter.</div>;
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <header className="border-b border-white/10 pb-6">
                <h1 className="text-3xl font-bold">Bienvenue, <span className="text-cyan-400">{user.email}</span> 👋</h1>
                <p className="text-gray-400 mt-2">Voici l'état de vos projets PixelCraft.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card Statistique */}
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-cyan-500/50 transition-colors">
                    <h3 className="text-gray-400 text-sm font-medium">Projets en cours</h3>
                    <p className="text-4xl font-bold mt-2 text-white">04</p>
                </div>

                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                    <h3 className="text-gray-400 text-sm font-medium">Messages non lus</h3>
                    <p className="text-4xl font-bold mt-2 text-purple-400">12</p>
                </div>

                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                    <h3 className="text-gray-400 text-sm font-medium">Revenus générés</h3>
                    <p className="text-4xl font-bold mt-2 text-emerald-400">1 250 €</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;