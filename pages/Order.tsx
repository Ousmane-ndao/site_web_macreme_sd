import { useState } from 'react'
import { motion } from 'framer-motion'
import { Minus, Plus, Trash2, ShoppingBag, MessageCircle } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import WhatsAppOrder from '../components/WhatsAppOrder'

const Order = () => {
  const { cartItems, updateQuantity, removeFromCart, total, clearCart } = useCart()
  const { user } = useAuth()
  const [orderNote, setOrderNote] = useState('')
  const [showWhatsAppOrder, setShowWhatsAppOrder] = useState(false)

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(id)
      return
    }
    updateQuantity(id, newQuantity)
  }

  const handlePlaceOrder = async () => {
    if (!user) {
      alert('Veuillez vous connecter pour passer commande')
      return
    }

    setShowWhatsAppOrder(true)
  }

  const handleWhatsAppOrderSent = () => {
    clearCart()
    setShowWhatsAppOrder(false)
    alert('Commande envoyée sur WhatsApp avec succès ! Nous vous contacterons rapidement.')
  }

  // Afficher le composant WhatsAppOrder si activé
  if (showWhatsAppOrder) {
    return (
        <WhatsAppOrder
            cartItems={cartItems}
            onOrderSent={handleWhatsAppOrderSent}
            onBack={() => setShowWhatsAppOrder(false)}
        />
    )
  }

  if (cartItems.length === 0) {
    return (
        <div className="min-h-screen bg-cream py-16">
          <div className="container-max text-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
              <ShoppingBag size={80} className="text-brown mx-auto mb-8" />
              <h1 className="text-4xl font-bold font-serif text-brown mb-6">
                Votre panier est vide
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Découvrez nos délicieuses créations et ajoutez-les à votre panier
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/patisserie" className="btn-primary">
                  Pâtisserie
                </Link>
                <Link to="/boulangerie" className="btn-primary">
                  Boulangerie
                </Link>
                <Link to="/restaurant" className="btn-primary">
                  Restaurant
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
    )
  }

  return (
      <div className="min-h-screen bg-cream py-16">
        <div className="container-max">
          <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
          >
            <h1 className="text-4xl font-bold font-serif text-brown mb-2">
              Votre Commande
            </h1>
            <p className="text-lg text-gray-600">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)} article{cartItems.length > 1 ? 's' : ''} dans votre panier
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                  <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="bg-white rounded-2xl shadow-lg p-6"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-xl"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-brown">{item.name}</h3>
                        <p className="text-sm text-gray-600 capitalize">{item.category}</p>
                        <p className="text-lg font-semibold text-brown">
                          {item.price.toFixed(2)} FCFA
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              {/* Payment Method - WhatsApp uniquement */}
              <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-xl font-bold font-serif text-brown mb-4">
                  Mode de paiement
                </h3>
                <div className="space-y-3">
                  <button
                      className="w-full flex items-center p-4 rounded-xl border-2 border-green-600 bg-green-50 text-green-700 transition-all transform hover:scale-105"
                  >
                    <MessageCircle size={20} className="mr-3" />
                    <div className="text-left">
                      <div className="font-semibold">Commander via WhatsApp</div>
                      <div className="text-sm text-gray-600">Simple et rapide</div>
                    </div>
                  </button>
                </div>
              </motion.div>

              {/* Order Note */}
              <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-xl font-bold font-serif text-brown mb-4">
                  Note de commande
                </h3>
                <textarea
                    value={orderNote}
                    onChange={(e) => setOrderNote(e.target.value)}
                    placeholder="Instructions spéciales, allergies..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown focus:border-transparent resize-none"
                    rows={3}
                />
              </motion.div>

              {/* Total */}
              <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-xl font-bold font-serif text-brown mb-4">
                  Récapitulatif
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sous-total</span>
                    <span className="font-semibold">{total.toFixed(2)} FCFA</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-xl font-bold text-brown">
                      <span>Total</span>
                      <span>{total.toFixed(2)} FCFA</span>
                    </div>
                  </div>
                </div>

                {user ? (
                    <button
                        onClick={handlePlaceOrder}
                        className="w-full mt-6 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold text-lg transition-all transform hover:scale-105"
                    >
                      📱 Commander via WhatsApp
                    </button>
                ) : (
                    <Link
                        to="/connexion"
                        className="block w-full mt-6 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold text-lg text-center transition-all transform hover:scale-105"
                    >
                      Se connecter pour commander
                    </Link>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Order