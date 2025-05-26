import React from 'react';
import goldBackground from '../assets/gold.png'; // Adjust path as needed

function Footer() {
  return (
    <footer
      className="text-white py-4 px-8 bg-no-repeat bg-cover bg-center flex items-center"
      style={{ backgroundImage: `url(${goldBackground})` }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm w-full">
        <div className="flex space-x-4 text-black">
          <a href="/mentions-legales" className="hover:underline">Mentions légales</a>
          <a href="/politique-confidentialite" className="hover:underline">Confidentialité</a>
          <a href="/livraison" className="hover:underline">Livraison</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
