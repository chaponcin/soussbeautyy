import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../contexts/CartContext";
import { FaShoppingCart } from "react-icons/fa";

const products = [
  { id: 1, name: "Huile d'argan", image: "./src/assets/1.jpg" },
  { id: 2, name: "Huile de lavande", image: "./src/assets/2.jpg" },
  { id: 3, name: "Huile de ricin", image: "./src/assets/3.jpg" },
  { id: 4, name: "Huile de romarin", image: "./src/assets/4.jpg" },
  { id: 5, name: "Huile d'amande douce", image: "./src/assets/5.jpg" },
  { id: 6, name: "Huile de sesame", image: "./src/assets/6.jpg" },
  { id: 7, name: "Eau de rose", image: "./src/assets/7.jpg" },
  { id: 8, name: "Huile de nigelle", image: "./src/assets/8.jpg" },
  { id: 9, name: "Amlou amande", image: "./src/assets/9.jpg" },
  { id: 10, name: "Huile de coco", image: "./src/assets/10.jpg" },
  { id: 11, name: "Pot", image: "./src/assets/11.jpg" },
  { id: 12, name: "Pot", image: "./src/assets/12.jpg" },
  { id: 13, name: "Pot", image: "./src/assets/13.jpg" },
  { id: 14, name: "Sidr", image: "./src/assets/14.jpg" },
  { id: 15, name: "Pot", image: "./src/assets/15.jpg" },
  { id: 16, name: "Pot", image: "./src/assets/16.jpg" },
  { id: 17, name: "Tabrima", image: "./src/assets/17.jpg" },
  { id: 18, name: "Kessa", image: "./src/assets/18.jpg" },
];

export default function HoneyProduct() {
  const [activeProduct, setActiveProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (activeProduct && quantity > 0) {
      addToCart(activeProduct, quantity);
      setActiveProduct(null); // Close modal after adding
      setQuantity(1); // Reset quantity
    }
  };

  return (
    <div className="flex flex-col px-6 md:px-16 pt-[100px] items-center">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center text-gray-800 mb-8"
      >
        Découvrez nos produits
      </motion.h1>

      <div className="flex flex-wrap justify-center gap-6 w-full max-w-7xl">
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center w-64 md:w-72 border-4 border-yellow-600 p-2 rounded-lg bg-white shadow-lg cursor-pointer"
            onClick={() => {
              setActiveProduct(product);
              setQuantity(1);
            }}
          >
            <p className="text-center text-lg font-semibold text-gray-800 mb-2">
              {product.name}
            </p>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
              draggable={false}
            />
            <p className="mt-2 text-gray-700 text-base font-medium">8 €</p>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-80 flex justify-center items-center"
            onClick={() => setActiveProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-lg max-w-md w-full text-center relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activeProduct.image}
                alt={activeProduct.name}
                className="w-full h-64 object-cover rounded mb-4"
              />
              <h2 className="text-xl font-bold mb-2">{activeProduct.name}</h2>
              <p className="text-lg text-yellow-700 mb-4">8 €</p>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantité:
              </label>
              <select
                className="w-24 border border-gray-300 rounded px-2 py-1 mb-4"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              >
                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>

              <button
                onClick={handleAddToCart}
                className="mt-2 flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
              >
                <FaShoppingCart />
                Ajouter au panier
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
