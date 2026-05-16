//Si token existe → Affiche le Dashboard.
//Si token absent → Redirige vers / login
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, role }) {
    //children = la page à protéger (ex: <Dashboard />).
    //role = optionnel, pour restreindre selon le rôle (freelancer ou company).
    const { isAuthenticated, user, loading } = useAuth();
    //On récupère 3 infos depuis le contexte : est-ce que l'utilisateur est connecté ? qui est-il ? est-ce qu'on a fini de lire le localStorage ?
    if (loading) return null; //attend que localstorage soit lu
    //Au démarrage de la page, React a besoin d'une fraction de seconde pour lire le localStorage. Pendant ce temps, on n'affiche rien — sinon il croirait que personne n'est connecté et redirigerait trop tôt.
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    //Si pas de token → on envoie directement vers /login. replace fait que le bouton "retour" du navigateur ne ramène pas sur /dashboard.
    if (role && user?.role !== role) return <Navigate to="/" replace />;
    //Si un rôle est exigé (ex: role="company") mais que l'utilisateur est freelancer → on le renvoie à l'accueil. Le ?. évite un crash si user est encore null.
    //Tout est OK → on affiche la page normalement. children c'est ce qu'on met entre les balises dans App.jsx, donc <Dashboard />.
    return children;
}