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
        role: 'freelancer', // On initialise avec une valeur par défaut
        siret: '',
        companyName: ''
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // --- 1. FONCTION DE VALIDATION ---
    const validateForm = () => {
        let newErrors = {};

        if (formData.firstName.length < 2) newErrors.firstName = "First name is too short";
        if (formData.lastName.length < 2) newErrors.lastName = "Last name is too short";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) newErrors.email = "Invalid Email";

        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(formData.phone)) newErrors.phone = "Invalid Phone number (10 digits)";

        if (formData.role === 'company') {
            if (formData.companyName.length < 2) newErrors.companyName = "Company name is too short";
            const siretRegex = /^[0-9]{14}$/;
            if (!formData.siret) {
                newErrors.siret = "SIRET is required for companies";
            } else if (!siretRegex.test(formData.siret)) {
                newErrors.siret = "SIRET must be 14 digits";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // --- 2. GESTION DE LA SOUMISSION ---
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            // On prépare les données pour le backend (mappage role -> roles si nécessaire)
            const dataToSubmit = {
                ...formData,
                roles: [formData.role]
            };

            await axios.post('/auth/register', dataToSubmit);
            alert("Account created successfully! Please log in.");
            navigate('/login');
        } catch (error) {
            alert(error.response?.data?.message || "Registration error");
        }
    };

    // --- 3. RENDU DU COMPOSANT ---
    return (
        <div className="flex items-center justify-center min-h-[80vh] p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl">
                <h2 className="text-3xl font-bold text-center text-white italic">Join <span className="text-cyan-400">PixelCraft</span></h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* First Name & Last Name */}
                    <div className="flex gap-2">
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-300">First Name</label>
                            <input
                                type="text"
                                className={`w-full px-4 py-3 mt-1 bg-white/5 border rounded-lg focus:ring-2 focus:ring-cyan-500 text-white outline-none ${errors.firstName ? 'border-red-500' : 'border-white/10'}`}
                                placeholder="John"
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            />
                            {errors.firstName && <p className="text-red-500 text-[10px] mt-1">{errors.firstName}</p>}
                        </div>

                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-300">Last Name</label>
                            <input
                                type="text"
                                className={`w-full px-4 py-3 mt-1 bg-white/5 border rounded-lg focus:ring-2 focus:ring-cyan-500 text-white outline-none ${errors.lastName ? 'border-red-500' : 'border-white/10'}`}
                                placeholder="Doe"
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            />
                            {errors.lastName && <p className="text-red-500 text-[10px] mt-1">{errors.lastName}</p>}
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Email</label>
                        <input
                            type="email"
                            className={`w-full px-4 py-3 mt-1 bg-white/5 border rounded-lg focus:ring-2 focus:ring-cyan-500 text-white outline-none ${errors.email ? 'border-red-500' : 'border-white/10'}`}
                            placeholder="pixel@craft.com"
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Phone</label>
                        <input
                            type="tel"
                            className={`w-full px-4 py-3 mt-1 bg-white/5 border rounded-lg focus:ring-2 focus:ring-cyan-500 text-white outline-none ${errors.phone ? 'border-red-500' : 'border-white/10'}`}
                            placeholder="0612345678"
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 mt-1 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-500 text-white outline-none"
                            placeholder="••••••••"
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    {/* Role Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">I'm a :</label>
                        <select
                            value={formData.role}
                            className="w-full px-4 py-3 bg-slate-800 border border-white/10 rounded-lg text-white outline-none"
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        >
                            <option value="freelancer">Freelancer, I'm looking for missions</option>
                            <option value="company">Company, I offer my services</option>
                        </select>
                    </div>

                    {/* Dynamic Company Fields */}
                    {formData.role === 'company' && (
                        <div className="space-y-4 p-4 bg-white/5 rounded-xl border border-white/10 animate-in fade-in slide-in-from-top-2 duration-300">
                            <div>
                                <label className="block text-sm font-medium text-gray-300">Company Name</label>
                                <input
                                    type="text"
                                    className={`w-full px-4 py-3 mt-1 bg-white/5 border rounded-lg focus:ring-2 focus:ring-cyan-500 text-white outline-none ${errors.companyName ? 'border-red-500' : 'border-white/10'}`}
                                    placeholder="Pixel Studio"
                                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                />
                                {errors.companyName && <p className="text-red-500 text-[10px] mt-1">{errors.companyName}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300">SIRET</label>
                                <input
                                    type="text"
                                    maxLength="14"
                                    className={`w-full px-4 py-3 mt-1 bg-white/5 border rounded-lg focus:ring-2 focus:ring-cyan-500 text-white outline-none ${errors.siret ? 'border-red-500' : 'border-white/10'}`}
                                    placeholder="14 digits"
                                    onChange={(e) => setFormData({ ...formData, siret: e.target.value })}
                                />
                                {errors.siret && <p className="text-red-500 text-xs mt-1">{errors.siret}</p>}
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 mt-4 font-semibold text-white bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg hover:scale-[1.02] transition-all shadow-lg"
                    >
                        Create my account
                    </button>
                </form>

                <div className="text-center space-y-2">
                    <p className="text-sm text-gray-400">
                        Already registered? <Link to="/login" className="text-cyan-400 hover:underline">Log in</Link>
                    </p>
                    <p className="text-sm text-gray-400">
                        <Link to="/login" className="text-cyan-400 hover:underline">Login in Guest mode</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;