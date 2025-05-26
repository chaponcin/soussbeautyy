// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/login';
import Register from './pages/register';
import Pannier from './pages/pannier';
import Boutique from './pages/boutique';
import Contact from './pages/contact';
import User from './pages/user';
import Achete from './pages/achat';
import Hamburger from './pages/hamburger';
import Admin from './pages/admin';
import Livraison from './pages/livraison';
import { CartProvider } from './contexts/CartContext'; // ✅ Import your context

import './App.css';


function App() {
  return (
    <CartProvider> {/* ✅ Wrap the app with CartProvider */}
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-white-100 p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pannier" element={<Pannier />} />
            <Route path="/connexion" element={<Login />} />
            <Route path="/inscription" element={<Register />} />
            <Route path="/boutique" element={<Boutique />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/user" element={<User />} />
            <Route path="/achat" element={<Achete />} />
            <Route path="/menu" element={<Hamburger />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/livraison" element={<Livraison />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
