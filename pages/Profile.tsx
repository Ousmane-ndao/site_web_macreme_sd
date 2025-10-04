import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Phone, MapPin, Star, Clock, Gift, LogOut, FileEdit as Edit3, Save, X } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

const Profile: React.FC = () => {
  const { user, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  })

  if (!user) {
    return <Navigate to="/connexion" replace />
  }

  const handleSave = () => {
    // Here you would typically update the user data
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData({
      name: user.name,
      email: user.email,
      phone: user.phone || ''
    })
    setIsEditing(false)
  }

  const orderHistory = [
    {
      id: 'CMD001',
      date: '2025-01-15',
      items: ['Tarte aux fraises', 'Croissants x3', 'Pain de campagne'],
      total: 18.50,
      status: 'Livrée'
    },
    {
      id: 'CMD002',
      date: '2025-01-10',
      items: ['Menu dégustation', 'Vin rouge'],
      total: 72.00,
      status: 'Terminée'
    },
    {
      id: 'CMD003',
      date: '2025-01-05',
      items: ['Macarons x12', 'Éclair au chocolat x2'],
      total: 33.00,
      status: 'Livrée'
    }
  ]

  const reservationHistory = [
    {
      id: 'RES001',
      date: '2025-01-20',
      time: '19:30',
      guests: 4,
      status: 'Confirmée'
    },
    {
      id: 'RES002',
      date: '2025-01-10',
      time: '12:30',
      guests: 2,
      status: 'Terminée'
    }
  ]

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
            Mon Profil
          </h1>
          <p className="text-lg text-gray-600">
            Gérez vos informations et consultez votre historique
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold font-serif text-brown">
                Informations personnelles
              </h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 text-brown hover:bg-cream rounded-full transition-colors"
                >
                  <Edit3 size={20} />
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                  >
                    <Save size={20} />
                  </button>
                  <button
                    onClick={handleCancel}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-brown mb-2">
                  <User size={18} className="inline mr-2" />
                  Nom
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-700">{user.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-brown mb-2">
                  <Mail size={18} className="inline mr-2" />
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-700">{user.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-brown mb-2">
                  <Phone size={18} className="inline mr-2" />
                  Téléphone
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) => setEditData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Ajouter votre numéro"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-700">{user.phone || 'Non renseigné'}</p>
                )}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-brown flex items-center">
                  <Gift size={20} className="mr-2" />
                  Points de fidélité
                </h3>
                <span className="text-2xl font-bold text-gold">{user.loyaltyPoints}</span>
              </div>
              <div className="bg-cream p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600 mb-2">
                  Vous êtes à {250 - user.loyaltyPoints} points du niveau suivant !
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gold h-2 rounded-full" 
                    style={{ width: `${(user.loyaltyPoints / 250) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <button
              onClick={logout}
              className="w-full mt-6 flex items-center justify-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-semibold transition-colors"
            >
              <LogOut size={20} className="mr-2" />
              Se déconnecter
            </button>
          </motion.div>

          {/* Order History and Reservations */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order History */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold font-serif text-brown mb-6 flex items-center">
                <Clock size={24} className="mr-3" />
                Historique des commandes
              </h2>
              <div className="space-y-4">
                {orderHistory.map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-brown">#{order.id}</h3>
                        <p className="text-sm text-gray-600">{new Date(order.date).toLocaleDateString('fr-FR')}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-brown">{order.total.toFixed(2)} FCFA</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          order.status === 'Livrée' ? 'bg-green-100 text-green-800' :
                          order.status === 'Terminée' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {order.items.join(' • ')}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Reservation History */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold font-serif text-brown mb-6 flex items-center">
                <MapPin size={24} className="mr-3" />
                Mes réservations
              </h2>
              <div className="space-y-4">
                {reservationHistory.map((reservation) => (
                  <div key={reservation.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-brown">#{reservation.id}</h3>
                        <p className="text-gray-600">
                          {new Date(reservation.date).toLocaleDateString('fr-FR')} à {reservation.time}
                        </p>
                        <p className="text-sm text-gray-600">
                          {reservation.guests} personne{reservation.guests > 1 ? 's' : ''}
                        </p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        reservation.status === 'Confirmée' ? 'bg-green-100 text-green-800' :
                        reservation.status === 'Terminée' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {reservation.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold font-serif text-brown mb-6">
                Actions rapides
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="flex items-center p-4 bg-cream hover:bg-light-brown hover:text-white rounded-lg transition-all">
                  <Star size={20} className="mr-3" />
                  <span>Laisser un avis</span>
                </button>
                <button className="flex items-center p-4 bg-cream hover:bg-light-brown hover:text-white rounded-lg transition-all">
                  <Gift size={20} className="mr-3" />
                  <span>Mes offres exclusives</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile