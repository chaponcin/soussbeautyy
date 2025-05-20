import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Header() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleHamburgerClick = () => {
    navigate('/menu');
  };

  return (

<header className="footer-bg fixed left-0  z-50 px-6   bg-no-repeat top-[-40px]  w-screen bg-contain h-[135px]">


      <div className="flex justify-between items-start">
        <h1 className="text-xl font-bold text-black mt-9">
          <Link to="/">
            <img src="./src/assets/logo.png" className="h-23" alt="Logo" />
          </Link>
        </h1>

        {/* Hamburger button (visible on small screens) */}
        <button
          className="md:hidden text-black mt-2 py-10"
          onClick={handleHamburgerClick}
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

        <nav className="hidden md:flex items-start space-x-4 mt-9 font-semibold text-xl">

          <Link to="/" className="text-black">Home</Link>
          <Link to="/Boutique" className="text-black">Boutique</Link>
          <Link to="/quisommes-nous" className="text-black">Qui sommes-nous</Link>
          <Link to="/recettes" className="text-black">Nos recettes</Link>
          <Link to="/Contact" className="text-black">Contact</Link>
        </nav>


        {/* Buttons (Connexion, Inscription, Panier) */}
        <nav className="hidden md:flex items-start space-x-2 py-12">
          <Link to="/pannier" className="mt-[-10px]">

            <img src="./src/assets/pannier.svg" alt="Panier" className="h-8" />
          </Link>

          {!isLoggedIn ? (
            <>

              <Link to="/inscription" className="mt-[-10px] text-white bg-black hover:bg-green-900 font-bold px-2 py-1 rounded-lg transition">Inscription</Link>
              <Link to="/connexion" className="mt-[-10px] text-white bg-black hover:bg-green-900 font-bold px-2 py-1 rounded-lg transition">Connexion</Link>

            </>
          ) : (
            <>
              <Link to="/profile" className="text-white bg-black hover:bg-green-900 font-bold px-2 py-1 rounded-lg transition">Mon Compte</Link>
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
        <div className="md:hidden mt-2 flex flex-col space-y-2 bg-[#fafafa]">
          <Link to="/" className="text-black">Home</Link>
          <Link to="/Boutique" className="text-black">Boutique</Link>
          <Link to="/quisommesnous" className="text-black">Recettes</Link>
          <Link to="/Contact" className="text-black">Contact</Link>
          <Link to="/pannier">
            <img src="./src/assets/pannier.svg" alt="Panier" className="h-6" />
          </Link>
          {!isLoggedIn ? (
            <>
              <Link to="/register" className="text-white bg-black hover:bg-green-900 font-bold px-2 py-1 rounded-lg transition">Inscription</Link>
              <Link to="/login" className="text-white bg-black hover:bg-green-900 font-bold px-2 py-1 rounded-lg transition">Connexion</Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="text-white bg-black hover:bg-green-900 font-bold px-2 py-1 rounded-lg transition">Mon Compte</Link>
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