import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // On l'utilisera pour stocker le token
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Le div principal avec ton style Dark Mode */}
        <div className="min-h-screen bg-slate-950 text-white">

          <Navbar />

          {/* Le contenu qui change selon l'URL */}
          <main className="pt-24 px-4 max-w-7xl mx-auto">
            <Routes>
              {/* Route Accueil */}
              <Route path="/" element={
                <div className="text-center">
                  <h1 className="text-5xl font-extrabold text-cyan-400 mb-4">
                    PixelCraftHub : Connecté !
                  </h1>
                  <p className="text-gray-400">Prêt à lancer ton prochain projet ?</p>
                </div>
              } />

              {/* Route Login */}
              <Route path="/login" element={<Login />} />

              {/* Route Dashboard (à créer plus tard) */}
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>

        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;