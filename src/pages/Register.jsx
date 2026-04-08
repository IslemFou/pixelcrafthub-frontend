import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from '../api/axios';

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

    //password checking
    const [showPassword, setShowPassword] = useState(false);
    const [strength, setStrength] = useState(0);

    const checkStrength = (pass) => {
        let score = 0;
        if (pass.length > 0) score++;      // Commencé
        if (pass.length >= 8) score++;     // Longueur
        if (/[A-Z]/.test(pass)) score++;   // Majuscule
        if (/[0-9]/.test(pass)) score++;   // Chiffre
        if (/[^A-Za-z0-9]/.test(pass)) score++; // Caractère spécial
        setStrength(score);
    };

    // --- 1. FONCTION DE VALIDATION ---
    const validateForm = () => {
        let newErrors = {};
        const firstName = (formData.firstName || "").toString().trim();
        const lastName = (formData.lastName || "").toString().trim();
        const email = (formData.email || "").toString().trim();
        const phone = (formData.phone || "").toString().trim();
        const password = (formData.password || "").toString();
        if (firstName.length < 2) newErrors.firstName = "First name is too short";
        if (lastName.length < 2) newErrors.lastName = "Last name is too short";

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) newErrors.email = "Invalid Email";

        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone.replace(/[\s-]/g, ''))) {
            newErrors.phone = "Invalid Phone number (10 digits)";
        }

        if (formData.role === 'company') {
            const companyName = (formData.companyName || "").toString().trim();
            const siret = (formData.siret || "").toString().trim();

            if (companyName.length < 2) newErrors.companyName = "Company name is too short";

            const siretRegex = /^[0-9]{14}$/;
            if (!siret) {
                newErrors.siret = "SIRET is required for companies";
            } else if (!siretRegex.test(siret)) {
                newErrors.siret = "SIRET must be 14 digits";
            }
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!password) {
            newErrors.password = "Password is required";
        } else if (!passwordRegex.test(password)) {
            newErrors.password = "Must contain 8+ chars, 1 uppercase, 1 lowercase and 1 number";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // --- 2. GESTION DE LA SOUMISSION ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("1. Tentative de soumission...");

        const isValid = validateForm();
        console.log("2. Résultat validation :", isValid);
        // console.log("3. Erreurs actuelles :", newErrors); // Si isValid est false, regarde ici

        if (!isValid) {
            alert("Formulaire invalide ! Vérifiez les champs."); // Ajoute ça pour voir
            return;
        }

        if (!validateForm()) return;

        try {
            // On prépare les données pour le backend (mappage role -> roles si nécessaire)
            const dataToSubmit = {
                ...formData,
                roles: [formData.role]
            };

            const response = await API.post('/auth/register', dataToSubmit);
            console.log("Réponse Backend:", response.data);

            // On vérifie si le backend a renvoyé success: true
            if (response.data.success) {
                alert("Account created successfully! Please log in.");
                navigate('/login');
            }

        } catch (error) {
            console.error("ERREUR DÉTAILLÉE :", error);
            // Affiche le vrai message du serveur s'il existe
            const message = error.response?.data?.message || "Registration error";
            alert(message);
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
                                value={formData.firstName}
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
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            />
                            {errors.lastName && <p className="text-red-500 text-[10px] mt-1">{errors.lastName}</p>}
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email"
                            className="block text-sm font-medium text-gray-300">Email</label>
                        <input
                            id="email"
                            type="text"
                            className={`w-full px-4 py-3 mt-1 bg-white/5 border rounded-lg focus:ring-2 focus:ring-cyan-500 text-white outline-none ${errors.email ? 'border-red-500' : 'border-white/10'}`}
                            placeholder="pixel@craft.com"
                            value={formData.email}
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
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    {/* Password */}

                    <div className="relative group">
                        <label className="block text-sm font-medium text-gray-300">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full px-4 py-3 mt-1 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-cyan-500 text-white outline-none pr-12"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => {
                                    setFormData({ ...formData, password: e.target.value });
                                    checkStrength(e.target.value);
                                }}
                            />
                            {/* L'icône de l'œil */}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                            >
                                {showPassword ? "🙈" : "👁️"}
                                {/* Ou <EyeOff size={20} /> : <Eye size={20} /> si tu as lucide-react */}
                            </button>
                        </div>

                        {/* Barre de progression dynamique */}
                        {formData.password.length > 0 && (
                            <div className="mt-2 space-y-1">
                                <div className="flex h-1.5 w-full gap-1 overflow-hidden rounded-full bg-white/10">
                                    <div
                                        className={`h-full transition-all duration-500 ${strength <= 1 ? "w-1/4 bg-red-500" :
                                            strength <= 2 ? "w-2/4 bg-orange-500" :
                                                strength <= 3 ? "w-3/4 bg-yellow-500" :
                                                    "w-full bg-green-500"
                                            }`}
                                    />
                                </div>
                                <p className={`text-[10px] font-medium ${strength <= 1 ? "text-red-400" :
                                    strength <= 2 ? "text-orange-400" :
                                        strength <= 3 ? "text-yellow-400" :
                                            "text-green-400"
                                    }`}>
                                    {strength <= 1 && "Weak password"}
                                    {strength === 2 && "Medium password"}
                                    {strength === 3 && "Strong password"}
                                    {strength >= 4 && "Very secure password"}
                                </p>
                            </div>
                        )}
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
                            <option value="company">Company, I offer missions</option>
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
                                    value={formData.companyName}
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
                                    value={formData.siret}
                                    onChange={(e) => setFormData({ ...formData, siret: e.target.value })}
                                />
                                {errors.siret && <p className="text-red-500 text-xs mt-1">{errors.siret}</p>}
                            </div>
                        </div>
                    )}

                    <button
                        id="register-submit-btn"
                        name="submit-registration"
                        type="submit"
                        onClick={(e) => {
                            console.log("Clic forcé détecté");
                            // On laisse le onSubmit du form gérer le reste
                        }}
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