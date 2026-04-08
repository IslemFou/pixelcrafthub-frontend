import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/dashboard'); // redirection apres success
        } catch (error) {
            alert("Erreur de connexion : " + (error.response?.data?.message || "Identifiants invalides ou problème de serveur"));
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <div className="w-full max-w-md p-8 space-y-6 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl">
                <h2 className="text-3xl font-bold text-center text-white">Connexion</h2>
                <p className="text-center text-gray-400 text-sm">Accédez à votre espace PixelCraft</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 mt-1 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none text-white transition-all"
                            placeholder="votre@email.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300">Mot de passe</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 mt-1 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none text-white transition-all"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 mt-6 font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:opacity-90 shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
                    >
                        Se connecter
                    </button>
                </form>
            </div>
        </div>
    );

};

export default Login;
