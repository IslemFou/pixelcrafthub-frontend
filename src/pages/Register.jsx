import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from '../api/axios';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        role: 'client'
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //Appel à l'API Backend
            await axios.post('/auth/register', formData);
            alert("Account created successfully ! Login");
            navigate('/login');
        } catch (error) {
            alert(error.response?.data?.message || "Registration error")
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <div className="w-full max-w-md p-8 space-y-6 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl">
                <h2 className="text-3xl font-bold text-center text-white italic">join <span className="text-cyan-400">PixelCraft</span></h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex">
                        <div className="w-50">
                            <label className="block text-sm font-medium text-gray-300">First Name</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-3 mt-1 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-500 text-white outline-none"
                                placeholder="John"
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            />
                        </div>

                        <div className="mx-1 w-50">
                            <label className="block text-sm font-medium text-gray-300">Last Name</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-3 mt-1 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-500 text-white outline-none"
                                placeholder="Doe"
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full px-4 py-3 mt-1 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-500 text-white outline-none"
                            placeholder="pixel@craft.com"
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Phone</label>
                        <input
                            type="tel"
                            required
                            className="w-full px-4 py-3 mt-1 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-500 text-white outline-none"
                            placeholder="+33 6 12 34 56 78"
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full px-4 py-3 mt-1 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-500 text-white outline-none"
                            placeholder="••••••••"
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Je suis un :</label>
                        <select
                            className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white outline-none"
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        >
                            <option value="client">Client (Je cherche un service)</option>
                            <option value="provider">Prestataire (Je propose mes services)</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 mt-4 font-semibold text-white bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg hover:scale-[1.02] transition-all shadow-lg shadow-cyan-500/10"
                    >
                        Créer mon compte
                    </button>
                </form>

                <p className="text-center text-sm text-gray-400">
                    Déjà inscrit ? <Link to="/login" className="text-cyan-400 hover:underline">Connectez-vous</Link>
                </p>
                <p className="text-center text-sm text-gray-400"><Link to="/login" className="text-cyan-400 hover:underline">Se connecter en mode invité</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;