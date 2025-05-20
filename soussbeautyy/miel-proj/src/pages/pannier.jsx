import { motion } from "framer-motion";
import { useCart } from "../contexts/CartContext";
import { useState } from "react";
import pot250g from "../assets/potsoleil.jpeg";

function Pannier() {
  const { cartItem, clearCart, updateQuantity } = useCart();
  const pricePerUnit = 8;
  const total = cartItem ? cartItem.quantity * pricePerUnit : 0;

  const handleQuantityChange = (event) => {
    const updatedQuantity = Number(event.target.value);
    updateQuantity(updatedQuantity);
  };

  return (
    <div className="px-6 md:px-20">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-3xl font-bold p-5 text-center mb-10 pt-[100px]"
      >
        Mon panier
      </motion.h1>

      {cartItem ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col md:flex-row justify-center items-start gap-8"
        >
          {/* Product Card */}
          <div className="relative w-full md:w-96 border rounded-lg shadow-md p-6 bg-white">
            <button
              onClick={clearCart}
              className="absolute top-2 right-2 text-red-600 text-2xl font-bold hover:text-red-800"
              title="Supprimer"
            >
              &times;
            </button>

            <div className="flex gap-4 items-center">
              <img
                src={pot250g}
                alt="Pot de miel"
                className="w-48 h-48 object-cover rounded-lg"
              />
              <div>
                <p className="text-lg font-semibold text-[#808000]">8,00 €</p>
                <p>Miel artisanal 250g</p>

                <label className="block mt-4 text-sm font-medium">Qté:</label>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(Math.max(1, cartItem.quantity - 1))}
                    className="px-2 py-1 bg-[#808000] text-white rounded-md text-lg hover:bg-[#6e6e00] transition"
                  >
                    &#8595;
                  </button>

                  <input
                    type="number"
                    value={cartItem.quantity}
                    min="1"
                    max="10"
                    step="1"
                    onChange={handleQuantityChange}
                    className="w-16 py-1 px-2 border border-gray-300 rounded-md text-center"
                  />

                  <button
                    onClick={() => updateQuantity(Math.min(10, cartItem.quantity + 1))}
                    className="px-2 py-1 bg-[#808000] text-white rounded-md text-lg hover:bg-[#6e6e00] transition"
                  >
                    &#8593;
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Total Box */}
          <div className="relative w-full md:w-80 border rounded-lg shadow-md p-6 bg-white mb-10">
            <button
              onClick={clearCart}
              className="absolute top-2 right-2 text-red-600 text-2xl font-bold hover:text-red-800"
              title="Vider le panier"
            >
              &times;
            </button>

            <div className="space-y-4 pt-6">
              <div className="flex justify-between text-lg">
                <p>Sous-total</p>
                <p className="font-semibold">{total.toFixed(2)} €</p>
              </div>
              <div className="flex justify-between text-lg">
                <p>Livraison Standard</p>
                <p className="text-green-700 font-medium">Gratuit</p>
              </div>
              <div className="flex justify-between text-xl font-bold border-t pt-4">
                <p>Total</p>
                <p>{total.toFixed(2)} €</p>
              </div>
            </div>

            <button className="mt-6 bg-[#808000] hover:bg-[#6e6e00] text-white font-bold py-2 px-6 rounded w-full transition">
              Paiement
            </button>
          </div>
        </motion.div>
      ) : (
        <p className="text-center text-xl text-gray-500 mt-20">Panier vide</p>
      )}
    </div>
  );
}

export default Pannier;
