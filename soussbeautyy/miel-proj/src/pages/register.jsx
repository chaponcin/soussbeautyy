import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    accepted: false
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("userToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    if (!formData.accepted) {
      setError("Vous devez accepter les conditions.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
        credentials: "include", // <= C'EST NÉCESSAIRE POUR LES COOKIES
      });

          // Logge la réponse brute pour déboguer
    const responseText = await response.text();
    console.log("Response:", responseText);

      if (response.ok) {
        const data = await response.json();
        Cookies.set("userToken", data.token, { path: "/" });
        setIsLoggedIn(true);
        navigate("/"); // redirection page d’accueil
      } else {
        const res = await response.json();
        setError(res.error || "Erreur lors de l'inscription.");
      }
    } catch (err) {
      console.error(err);
      setError("Erreur de connexion au serveur.");
    }
  };

  return (

<div className="h-screen flex flex-col justify-center items-center">

      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-3xl font-bold mb-6"
      >
        Inscription
      </motion.h1>


      {!isLoggedIn ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-80 bg-white p-6 rounded-lg shadow-lg"
        >
          <form onSubmit={handleSubmit}>
            {error && <div className="text-red-500 mb-2">{error}</div>}

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="username">
                Nom d'utilisateur
              </label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleChange}
                className="shadow border rounded w-full py-2 px-3"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="email">
                Adresse e-mail
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="shadow border rounded w-full py-2 px-3"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="password">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="shadow border rounded w-full py-2 px-3"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2" htmlFor="confirmPassword">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="shadow border rounded w-full py-2 px-3"
                required
              />
            </div>

            <div className="mb-4 flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  id="accepted"
                  checked={formData.accepted}
                  onChange={handleChange}
                  className="mr-2"
                />
                J'accepte les termes et conditions
              </label>
            </div>

            <button type="submit" className="w-full p-2 bg-[#808000] text-white rounded hover:bg-blue-600 transition">
              S'inscrire
            </button>

            <p className="mt-4">
              <Link to="/login" className="text-[#808000] hover:underline">
                Vous avez déjà un compte ?
              </Link>
            </p>
          </form>
        </motion.div>
      ) : (
        <div className="text-green-600 font-semibold text-lg mt-10">
           Vous êtes déjà connecté
        </div>
      )}

    </div>
  );
}

export default Register;