import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Données fictives pour l'utilisateur (remplace par une API ou des props)
const userData = {
  nom: "Dupont",
  prenom: "Jean",
  email: "jean.dupont@example.com",
  adresse: "123 Rue Principale",
  ville: "Paris",
  codePostal: "75001",
  telephone: "+33 6 12 34 56 78",
  dateNaissance: "15/03/1985",
};

// Données fictives pour les commandes (remplace par une requête API Laravel)
const mockOrders = [
  { id: 1, date: "2025-05-01", montant: 59.99, statut: "Livré" },
  { id: 2, date: "2025-04-20", montant: 129.99, statut: "En cours" },
  { id: 3, date: "2025-04-10", montant: 29.99, statut: "Annulé" },
];

function User() {
  const [user, setUser] = useState(userData);
  const [isEditing, setIsEditing] = useState(false);
  const [orders, setOrders] = useState([]);

  // Animation variants pour une entrée fluide
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
  };

  // Simuler la récupération des commandes (remplace par une requête API Laravel)
  useEffect(() => {
    // Exemple : fetch("https://ton-api-laravel.com/api/user/orders")
    //   .then(response => response.json())
    //   .then(data => setOrders(data))
    //   .catch(error => console.error("Erreur lors de la récupération des commandes :", error));
    setOrders(mockOrders); // Données fictives pour l'instant
  }, []);

  // Gérer les changements dans les inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // Basculer entre mode édition et lecture
  const toggleEdit = () => {
    if (isEditing) {
      // Simuler l'enregistrement (remplace par une requête API si nécessaire)
      alert("Profil enregistré !");
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="min-h-screen bg-yellow-100 flex flex-col items-center justify-center p-4">
      {/* Header avec titre */}
      <motion.h1
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-4xl font-bold text-gray-800 mb-8"
      >
        Profil Utilisateur
      </motion.h1>

      {/* Conteneur flex pour les deux boîtes */}
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-6">
        {/* Boîte des informations utilisateur (gauche) */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="w-full md:w-1/2 bg-white rounded-xl shadow-xl p-8"
        >
          {/* Informations utilisateur */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Nom :</span>
              {isEditing ? (
                <input
                  type="text"
                  name="nom"
                  value={user.nom}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-2 py-1 w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <span className="text-gray-800">{user.nom}</span>
              )}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Prénom :</span>
              {isEditing ? (
                <input
                  type="text"
                  name="prenom"
                  value={user.prenom}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-2 py-1 w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <span className="text-gray-800">{user.prenom}</span>
              )}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Email :</span>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-2 py-1 w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <span className="text-gray-800">{user.email}</span>
              )}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Adresse :</span>
              {isEditing ? (
                <input
                  type="text"
                  name="adresse"
                  value={user.adresse}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-2 py-1 w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <span className="text-gray-800">{user.adresse}</span>
              )}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Ville :</span>
              {isEditing ? (
                <input
                  type="text"
                  name="ville"
                  value={user.ville}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-2 py-1 w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <span className="text-gray-800">{user.ville}</span>
              )}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Code postal :</span>
              {isEditing ? (
                <input
                  type="text"
                  name="codePostal"
                  value={user.codePostal}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-2 py-1 w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <span className="text-gray-800">{user.codePostal}</span>
              )}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Téléphone :</span>
              {isEditing ? (
                <input
                  type="tel"
                  name="telephone"
                  value={user.telephone}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-2 py-1 w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <span className="text-gray-800">{user.telephone}</span>
              )}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Date de naissance :</span>
              {isEditing ? (
                <input
                  type="text"
                  name="dateNaissance"
                  value={user.dateNaissance}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg px-2 py-1 w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <span className="text-gray-800">{user.dateNaissance}</span>
              )}
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="mt-8 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              onClick={toggleEdit}
            >
              {isEditing ? "Enregistrer" : "Modifier le profil"}
            </motion.button>
          </div>
        </motion.div>

        {/* Boîte des commandes (droite) */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="w-full md:w-1/2 bg-white rounded-xl shadow-xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Mes Commandes</h2>
          {orders.length === 0 ? (
            <p className="text-gray-600">Aucune commande trouvée.</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="border border-gray-200 rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="text-gray-800 font-medium">Commande #{order.id}</p>
                    <p className="text-gray-600 text-sm">Date : {order.date}</p>
                    <p className="text-gray-600 text-sm">Statut : {order.statut}</p>
                  </div>
                  <p className="text-gray-800 font-bold">{order.montant} €</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default User;