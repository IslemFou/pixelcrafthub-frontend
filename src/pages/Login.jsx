import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    //password checking
    const [showPassword, setShowPassword] = useState(false);

    const validateForm = () => {
        let newErrors = {};

        //Nettoyage des entrées
        const email = (formData.email || "").toString().trim();
        const password = (formData.password || "").toString();

        //Validation Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(email)) {
            newErrors.email = "Invalid email format";
        }

        //validate password (juste on vérifie s'il est remplie)
        if (!password) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;

    };




    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("1. Tentative de Login...");

        if (!validateForm()) return;
        try {
            //on utilise l'instance API 127.0.0.1:3000
            const response = await API.post('/auth/login', formData);
            console.log("Réponse Backend:", response.data);

            if (response.data.success) {
                login(response.data);
                navigate('/dashboard'); // redirection apres success
            }
        } catch (error) {
            console.error("Login Error:", error);
            //on affiche le message d'erreur 
            const message = error.response?.data?.message || "Login Failed";
            setErrors({ server: message });
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
                            type="text"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={`w-full px-4 py-3 mt-1 bg-white/5 border rounded-lg focus:ring-2 focus:ring-cyan-500 text-white outline-none ${errors.email ? 'border-red-500' : 'border-white/10'}`}
                            placeholder="votre@email.com"
                            required
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={(e) => {
                                    setFormData({ ...formData, password: e.target.value });
                                }}
                                className={`w-full px-4 py-3 mt-1 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-cyan-500 outline-none pr-12 transition-all autofill:shadow-[0_0_0_30px_#1a1a1a_inset] [&-webkit-autofill]:text-cyan-500 ${errors.password ? 'border-red-500' : 'border-white/10'}`}
                                placeholder="••••••••"
                                required
                            />
                            {/* L'icône de l'œil positionnée absolument par rapport au div parent */}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 mt-0.5 text-gray-400 hover:text-white transition-colors"
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
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
