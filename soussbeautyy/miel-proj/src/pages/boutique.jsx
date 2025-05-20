import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

export default function HoneyProduct() {
  const pricePerJar = 8;
  const [quantity, setQuantity] = useState(1);
  const totalPrice = pricePerJar * quantity;
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col px-6 md:px-16 pt-[100px] items-center">
      {/* Title with animation */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-4xl font-bold text-center text-gray-800 mb-8"
      >
        Découvrez notre Miel
      </motion.h1>

      <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className=" "
        >

      {/* Product Card centered horizontally */}
      <div className="flex justify-center w-full">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 p-8 rounded-xl shadow-2xl bg-white mb-10 w-full max-w-xl">
          {/* Product Image */}
          <div className="w-60 h-60 md:w-72 md:h-72 relative">
            <img
              src="./src/assets/soleil.jpg"
              alt="Pot de miel"
              className="w-full h-full object-cover rounded-xl shadow-xl transition-transform duration-300 ease-in-out transform hover:scale-105"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center items-center text-center space-y-6 md:space-y-8 h-full w-full">
            <h2 className="text-2xl font-semibold text-[#808000]">
              Miel artisanal 250g
            </h2>

            {/* Price Display */}
            <p className="text-2xl font-semibold">
              {totalPrice.toFixed(2)} €
            </p>

            {/* Quantity Control */}
            <div className="flex items-center gap-6 mt-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 bg-[#808000] text-white rounded-md shadow-lg hover:bg-yellow-500 transition duration-300 ease-in-out"
              >
                -
              </button>
              <span className="text-3xl font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 bg-[#808000] text-white rounded-md shadow-lg hover:bg-yellow-500 transition duration-300 ease-in-out"
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={() => {
                addToCart(quantity);
                navigate("/pannier");
              }}
              className="mt-6 bg-[#808000] hover:bg-yellow-500 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out w-full"
            >
              Ajouter au Panier
            </button>
          </div>
        </div>
      </div>
      </motion.div>
    </div>
  );
}
