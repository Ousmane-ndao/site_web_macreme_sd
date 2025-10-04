
import React, { useState } from 'react'
// Ajoute cette ligne quelque part dans ton composant
const _reactRef = React

import { motion } from 'framer-motion'
import { Minus, Plus, Trash2, ShoppingBag, CreditCard, MapPin, Clock, MessageCircle } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import WhatsAppOrder from '../components/WhatsAppOrder'

const Order = () => {
  const { cartItems, updateQuantity, removeFromCart, total, clearCart } = useCart()
  const { user } = useAuth()
  const [orderType, setOrderType] = useState('pickup')
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [orderNote, setOrderNote] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [showWhatsAppOrder, setShowWhatsAppOrder] = useState(false)

  const deliveryFee = orderType === 'delivery' ? 3.50 : 0
  const finalTotal = total + deliveryFee

  const handleQuantityChange = (id, newQuantity) => {
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

    // Si WhatsApp est sélectionné, afficher le formulaire WhatsApp
    if (paymentMethod === 'whatsapp') {
      setShowWhatsAppOrder(true)
      return
    }

    // Pour les autres méthodes de paiement
    setIsProcessing(true)

    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    alert('Commande confirmée ! Vous recevrez un email de confirmation.')
    clearCart()
    setIsProcessing(false)
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
              {/* Order Type */}
              <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-xl font-bold font-serif text-brown mb-4">
                  Mode de récupération
                </h3>
                <div className="space-y-3">
                  <button
                      onClick={() => setOrderType('pickup')}
                      className={`w-full flex items-center p-4 rounded-xl border-2 transition-all ${
                          orderType === 'pickup'
                              ? 'border-brown bg-cream text-brown'
                              : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <MapPin size={20} className="mr-3" />
                    <div className="text-left">
                      <div className="font-semibold">Click & Collect</div>
                      <div className="text-sm text-gray-600">Retrait gratuit en magasin</div>
                    </div>
                  </button>
                  <button
                      onClick={() => setOrderType('delivery')}
                      className={`w-full flex items-center p-4 rounded-xl border-2 transition-all ${
                          orderType === 'delivery'
                              ? 'border-brown bg-cream text-brown'
                              : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <Clock size={20} className="mr-3" />
                    <div className="text-left">
                      <div className="font-semibold">Livraison</div>
                      <div className="text-sm text-gray-600">Livraison sous 30-45 min</div>
                    </div>
                  </button>
                </div>
              </motion.div>

              {/* Payment Method */}
              <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-xl font-bold font-serif text-brown mb-4">
                  Mode de paiement
                </h3>
                <div className="space-y-3">
                  <button
                      onClick={() => setPaymentMethod('card')}
                      className={`w-full flex items-center p-4 rounded-xl border-2 transition-all ${
                          paymentMethod === 'card'
                              ? 'border-brown bg-cream text-brown'
                              : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <CreditCard size={20} className="mr-3" />
                    <div className="text-left">
                      <div className="font-semibold">Paiement en ligne</div>
                      <div className="text-sm text-gray-600">Carte bancaire sécurisée</div>
                    </div>
                  </button>

                  {/* NOUVELLE OPTION WHATSAPP */}
                  <button
                      onClick={() => setPaymentMethod('whatsapp')}
                      className={`w-full flex items-center p-4 rounded-xl border-2 transition-all ${
                          paymentMethod === 'whatsapp'
                              ? 'border-green-600 bg-green-50 text-green-700'
                              : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <MessageCircle size={20} className="mr-3" />
                    <div className="text-left">
                      <div className="font-semibold">Commander via WhatsApp</div>
                      <div className="text-sm text-gray-600">Simple et rapide</div>
                    </div>
                  </button>

                  {orderType === 'pickup' && (
                      <button
                          onClick={() => setPaymentMethod('cash')}
                          className={`w-full flex items-center p-4 rounded-xl border-2 transition-all ${
                              paymentMethod === 'cash'
                                  ? 'border-brown bg-cream text-brown'
                                  : 'border-gray-200 hover:border-gray-300'
                          }`}
                      >
                        <span className="text-xl mr-3">💰</span>
                        <div className="text-left">
                          <div className="font-semibold">Paiement sur place</div>
                          <div className="text-sm text-gray-600">Espèces ou carte</div>
                        </div>
                      </button>
                  )}
                </div>
              </motion.div>

              {/* Order Note */}
              <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
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
                  transition={{ duration: 0.6, delay: 0.5 }}
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
                  {orderType === 'delivery' && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Livraison</span>
                        <span className="font-semibold">{deliveryFee.toFixed(2)} FCFA</span>
                      </div>
                  )}
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-xl font-bold text-brown">
                      <span>Total</span>
                      <span>{finalTotal.toFixed(2)} FCFA</span>
                    </div>
                  </div>
                </div>

                {user ? (
                    <button
                        onClick={handlePlaceOrder}
                        disabled={isProcessing}
                        className={`w-full mt-6 py-4 rounded-xl font-semibold text-lg transition-all ${
                            isProcessing
                                ? 'bg-gray-400 text-white cursor-not-allowed'
                                : paymentMethod === 'whatsapp'
                                    ? 'bg-green-600 hover:bg-green-700 text-white transform hover:scale-105'
                                    : 'bg-brown hover:bg-warm-brown text-white transform hover:scale-105'
                        }`}
                    >
                      {isProcessing
                          ? 'Traitement en cours...'
                          : paymentMethod === 'whatsapp'
                              ? '📱 Commander via WhatsApp'
                              : 'Confirmer la commande'
                      }
                    </button>
                ) : (
                    <Link
                        to="/connexion"
                        className="block w-full mt-6 py-4 bg-brown hover:bg-warm-brown text-white rounded-xl font-semibold text-lg text-center transition-all transform hover:scale-105"
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