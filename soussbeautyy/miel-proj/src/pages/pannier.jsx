import { useCart } from "../contexts/CartContext";
import { useEffect, useState } from "react";

export default function Pannier() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * 8, 0);
    setTotal(totalPrice);
  }, [cartItems]);

  return (
    <div className="pt-[100px] px-4 md:px-16">
      <h1 className="text-3xl font-bold mb-6">Votre panier</h1>

      {cartItems.length === 0 ? (
        <p className="text-lg text-gray-600">Votre panier est vide.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center justify-between border p-4 rounded-lg shadow-sm bg-white"
            >
              <div className="flex items-center space-x-4 w-full md:w-1/2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div>
                  <p className="text-lg font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">Prix: 8 €</p>
                </div>
              </div>

              <div className="flex items-center mt-4 md:mt-0 space-x-4">
                <select
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value, 10))
                  }
                  className="border border-gray-300 rounded px-2 py-1"
                >
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>

                <p className="text-md font-medium text-gray-700">
                  Total: {item.quantity * 8} €
                </p>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:text-red-800 text-sm font-semibold"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}

          <div className="text-right text-xl font-bold mt-6">
            Total à payer: {total} €
          </div>
        </div>
      )}
    </div>
  );
}
