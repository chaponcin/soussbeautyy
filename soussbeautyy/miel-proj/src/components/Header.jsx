import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';  // <-- Import cart context
import goldBackground from '../assets/gold.png';
import logo3 from '../assets/logo3.png';

function Header() {
  const { isLoggedIn, logout } = useAuth();
  const { totalItems } = useCart(); // Get total quantity from cart context
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleHamburgerClick = () => {
    navigate('/menu');
  };

  return (
    <header
      className="footer-bg fixed left-0 z-50 px-6 w-screen bg-no-repeat bg-contain"
      style={{

      }}
    >
      <div className="flex justify-between items-start">

        {/* Hamburger button (visible on small screens) */}
        <button
          className="md:hidden text-black mt-2 py-10"
          onClick={handleHamburgerClick}
          aria-label="Menu"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-start space-x-4 mt-2 font-semibold text-xl text-black">
          <Link to="/">Home</Link>
          <Link to="/Boutique">Boutique</Link>
          <Link to="/Contact">Contact</Link>
        </nav>

        <div className="flex flex-col items-center">
          <Link to="/">
            <img src={logo3} className="h-16 object-contain" alt="Logo" />
          </Link>
        </div>

        {/* Buttons (Connexion, Inscription, Panier) */}
        <nav className="hidden md:flex items-start space-x-2 py-2 relative">
          <Link to="/pannier" className="mt-2 relative">
            <img src="./src/assets/chariot.svg" alt="Panier" className="h-8" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full select-none">
                {totalItems}
              </span>
            )}
          </Link>

          {!isLoggedIn ? (
            <>
              <Link
                to="/inscription"
                className="mt-2 text-white bg-black hover:bg-green-900 font-bold px-2 py-1 rounded-lg transition"
              >
                Inscription
              </Link>
              <Link
                to="/connexion"
                className="mt-2 text-white bg-black hover:bg-green-900 font-bold px-2 py-1 rounded-lg transition"
              >
                Connexion
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                className="text-white bg-black hover:bg-green-900 font-bold px-2 py-1 rounded-lg transition"
              >
                Mon Compte
              </Link>
              <button
                onClick={handleLogout}
                className="text-white bg-red-600 hover:bg-red-700 font-bold px-2 py-1 rounded-lg transition"
              >
                Déconnexion
              </button>
            </>
          )}
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      {false && (
        <div className="md:hidden mt-2 flex flex-col space-y-2">
          <Link to="/" className="text-black">
            Home
          </Link>
          <Link to="/Boutique" className="text-black">
            Boutique
          </Link>
          <Link to="/quisommesnous" className="text-black">
            Recettes
          </Link>
          <Link to="/Contact" className="text-black">
            Contact
          </Link>
          <Link to="/pannier">
            <img src="./src/assets/pannier.svg" alt="Panier" className="h-6" />
          </Link>
          {!isLoggedIn ? (
            <>
              <Link to="/register" className="text-white font-bold px-2 py-1  transition">
                Inscription
              </Link>
              <Link to="/login" className="text-white font-bold px-2 py-1  transition">
                Connexion
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                className="text-white bg-black hover:bg-green-900 font-bold px-2 py-1 rounded-lg transition"
              >
                Mon Compte
              </Link>
              <button
                onClick={handleLogout}
                className="text-white bg-red-600 hover:bg-red-700 font-bold px-2 py-1 rounded-lg transition"
              >
                Déconnexion
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
