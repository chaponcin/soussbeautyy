
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Données fictives pour les clients
const mockClients = [
  { id: 1, nom: "Dupont", prenom: "Jean", email: "jean.dupont@example.com" },
  { id: 2, nom: "Martin", prenom: "Sophie", email: "sophie.martin@example.com" },
  { id: 3, nom: "Lefevre", prenom: "Luc", email: "luc.lefevre@example.com" },
];

// Données fictives pour les commandes
const mockOrders = [
  {
    id: 1,
    clientId: 1,
    date: "2025-05-01",
    adresse: "123 Rue Principale",
    ville: "Paris",
    codePostal: "75001",
    montant: 59.99,
    statut: "Livré",
  },
  {
    id: 2,
    clientId: 2,
    date: "2025-04-20",
    adresse: "45 Avenue des Champs",
    ville: "Lyon Tibetan",
    codePostal: "69001",
    montant: 129.99,
    statut: "En cours",
  },
  {
    id: 3,
    clientId: 3,
    date: "2025-04-10",
    adresse: "7 Boulevard du Nord",
    ville: "Marseille",
    codePostal: "13001",
    montant: 29.99,
    statut: "En cours",

  },
];

function Admin() {


  const [clients, setClients] = useState([]);
  const [orders, setOrders] = useState([]);

  // Calcul des statistiques
  const totalClients = clients.length;
  const totalOrders = orders.length;
  const ordersEnCours = orders.filter((order) => order.statut === "En cours").length;
  const totalMontant = orders.reduce((sum, order) => sum + order.montant, 0).toFixed(2);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
  };

  // Simuler la récupération des données (remplace par une requête API)
  useEffect(() => {
    // Exemple : fetch("https://ton-api-laravel.com/api/admin/clients")
    //   .then(response => response.json())
    //   .then(data => setClients(data));
    // fetch("https://ton-api-laravel.com/api/admin/orders")
    //   .then(response => response.json())
    //   .then(data => setOrders(data));
    setClients(mockClients);
    setOrders(mockOrders);
  }, []);

  // Gérer le changement de statut
  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, statut: newStatus } : order
      )
    );
    // Simuler une mise à jour API
    alert(`Commande #${orderId} mise à jour : ${newStatus}`);
    // Remplace par une requête API, par exemple :
    // fetch(`https://ton-api-laravel.com/api/orders/${orderId}`, {
    //   method: "PATCH",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ statut: newStatus }),
    // });
  };

  return (
    <div className="min-h-screen bg-yellow-100 flex flex-col items-center p-25">
      {/* Titre */}
      <motion.h1
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-4xl font-bold text-gray-800 mb-8"
      >
        Tableau de Bord Administrateur
      </motion.h1>

      {/* Statistiques */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
      >
        {/* Boîte : Nombre de clients */}
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center"
        >
          <h3 className="text-lg font-semibold text-gray-600">Clients</h3>
          <p className="text-3xl font-bold text-blue-500">{totalClients}</p>
        </motion.div>

        {/* Boîte : Total des commandes */}
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center"
        >
          <h3 className="text-lg font-semibold text-gray-600">Commandes</h3>
          <p className="text-3xl font-bold text-blue-500">{totalOrders}</p>
        </motion.div>

        {/* Boîte : Commandes en cours */}
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center"
        >
          <h3 className="text-lg font-semibold text-gray-600">En cours</h3>
          <p className="text-3xl font-bold text-blue-500">{ordersEnCours}</p>
        </motion.div>

        {/* Boîte : Total en € */}
        <motion.div
          variants={cardVariants}
          className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center"
        >
          <h3 className="text-lg font-semibold text-gray-600">Total (€)</h3>
          <p className="text-3xl font-bold text-blue-500">{totalMontant} €</p>
        </motion.div>
      </motion.div>

      {/* Liste des commandes */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-6xl"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Liste des Commandes</h2>
        <div className="space-y-6">
          {orders.length === 0 ? (
            <p className="text-gray-600">Aucune commande trouvée.</p>
          ) : (
            orders.map((order) => {
              const client = clients.find((c) => c.id === order.clientId) || {};
              return (
                <motion.div
                  key={order.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                    <div className="space-y-2">
                      <p className="text-lg font-semibold text-gray-800">
                        Commande #{order.id}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Client :</span>{" "}
                        {client.nom} {client.prenom} ({client.email || "N/A"})
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Adresse :</span>{" "}
                        {order.adresse}, {order.ville}, {order.codePostal}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Date :</span> {order.date}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Montant :</span>{" "}
                        {order.montant} €
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <label className="text-gray-600 font-medium mr-2">
                        Statut :
                      </label>
                      <motion.select
                        value={order.statut}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                        whileHover={{ scale: 1.05 }}
                        className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="En cours">En cours</option>
                        <option value="Livré">Livré</option>
                      </motion.select>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </motion.div>

    </div>
  );
}



export default Admin;
