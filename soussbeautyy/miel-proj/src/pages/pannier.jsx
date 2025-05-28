import { useCart } from "../contexts/CartContext";
import { useEffect, useState } from "react";
import QRCode from 'react-qr-code';

export default function Pannier() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [total, setTotal] = useState(0);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * 8, 0);
    setTotal(totalPrice);
  }, [cartItems]);

  const generateOrderId = () => {
    return "CMD" + Math.floor(Math.random() * 1000000);
  };

  const handleCommanderClick = () => {
    const newOrderId = generateOrderId();
    setOrderId(newOrderId);
    setShowPaymentOptions(true);
  };

  const IBAN = "BE12 3456 7890 1234"; // Replace with your real IBAN
  const structuredMessage = `Commande ${orderId}`;

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
              className="flex flex-col md:flex-row items-center justify-between border p-4 rounded-lg shadow-sm"
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

          <div className="text-right mt-4">
            <button
              onClick={handleCommanderClick}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Commander
            </button>
          </div>

          {showPaymentOptions && (
            <div className="mt-8 border-t pt-6">
              <h2 className="text-2xl font-bold mb-4">Méthode de paiement</h2>
              <div className="flex flex-col md:flex-row gap-4">
                <button
                  onClick={() => setPaymentMethod("virement")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Par virement bancaire
                </button>
                <button
                  onClick={() => setPaymentMethod("qr")}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
                >
                  Paiement par QR code
                </button>
              </div>

              {paymentMethod === "virement" && (
                <div className="mt-6 bg-gray-100 p-4 rounded">
                  <p><strong>Montant:</strong> {total} €</p>
                  <p>Bénéficiaire: Souss beautyy</p>
                  <p><strong>IBAN:</strong> {IBAN}</p>
                  <p><strong>Communication:</strong> {structuredMessage}</p>
             
                </div>
              )}

              {paymentMethod === "qr" && (
                <div className="mt-6 flex flex-col items-center bg-gray-100 p-4 rounded">
                  <p className="mb-2">Scannez ce code avec votre application bancaire :</p>
                  <QRCode
                    value={`BCD\n001\n1\nSCT\nNomDuBeneficiaire\n${IBAN.replace(/\s/g, '')}\nEUR${total.toFixed(2)}\n${structuredMessage}`}
                    size={200}
                  />
                  <p className="mt-2 text-sm text-gray-600">
                    {structuredMessage}
                  </p>
            
           


                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
