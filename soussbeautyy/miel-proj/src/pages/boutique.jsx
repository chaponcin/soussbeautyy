import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

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
  const [activeImage, setActiveImage] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col px-6 md:px-16 pt-[100px] items-center">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-4xl font-bold text-center text-gray-800 mb-8"
      >
        Découvrez nos produits
      </motion.h1>

      {/* Image Gallery */}
      <div className="flex flex-wrap justify-center gap-6 w-full max-w-7xl">
        {products.map((product) => (
<motion.div
  key={product.id}
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.4 }}
  className="flex flex-col items-center w-64 md:w-80 cursor-pointer"
  onClick={() => setActiveImage(product.image)}
>
  <p className="text-center text-lg font-semibold text-gray-800 mb-2">
    {product.name}
  </p>
  <img
    src={product.image}
    alt={product.name}
    className="w-full h-64 md:h-80 object-cover  transition-transform duration-300 ease-in-out transform hover:scale-105"
  />
</motion.div>

        ))}
      </div>

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            onClick={() => setActiveImage(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 cursor-zoom-out"
          >
            <motion.img
              src={activeImage}
              alt="Zoomed"
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              transition={{ duration: 0.3 }}
              className="max-w-full max-h-full"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
