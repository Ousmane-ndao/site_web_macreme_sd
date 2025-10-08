import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Phone, LogOut, Edit3, Save, X } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

const Profile: React.FC = () => {
  const { user, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [loading, setLoading] = useState(false)

  // Initialiser les données d'édition
  useEffect(() => {
    if (user) {
      setEditData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      })
    }
  }, [user])

  if (!user) {
    return <Navigate to="/connexion" replace />
  }

  const handleSave = async () => {
    try {
      setLoading(true)
      // Simuler la mise à jour du profil
      await new Promise(resolve => setTimeout(resolve, 1000))
      // await api.updateProfile(editData);

      alert('Profil mis à jour avec succès!')
      setIsEditing(false)
    } catch (error) {
      console.error('Erreur mise à jour profil:', error)
      alert('Erreur lors de la mise à jour du profil')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setEditData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || ''
    })
    setIsEditing(false)
  }

  return (
      <div className="min-h-screen bg-cream py-8">
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
              Gérez vos informations personnelles
            </p>
          </motion.div>

          <div className="flex justify-center">
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold font-serif text-brown">
                  Informations personnelles
                </h2>
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="p-2 text-brown hover:bg-cream rounded-full transition-colors"
                        title="Modifier le profil"
                    >
                      <Edit3 size={18} />
                    </button>
                ) : (
                    <div className="flex space-x-2">
                      <button
                          onClick={handleSave}
                          disabled={loading}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors disabled:opacity-50"
                          title="Sauvegarder"
                      >
                        <Save size={18} />
                      </button>
                      <button
                          onClick={handleCancel}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                          title="Annuler"
                      >
                        <X size={18} />
                      </button>
                    </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-brown mb-2 flex items-center">
                    <User size={16} className="mr-2" />
                    Nom complet
                  </label>
                  {isEditing ? (
                      <input
                          type="text"
                          value={editData.name}
                          onChange={(e) =>
                              setEditData((prev) => ({ ...prev, name: e.target.value }))
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown focus:border-transparent"
                          placeholder="Votre nom complet"
                      />
                  ) : (
                      <p className="text-gray-700">{user.name || 'Non renseigné'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-brown mb-2 flex items-center">
                    <Mail size={16} className="mr-2" />
                    Email
                  </label>
                  {isEditing ? (
                      <input
                          type="email"
                          value={editData.email}
                          onChange={(e) =>
                              setEditData((prev) => ({ ...prev, email: e.target.value }))
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown focus:border-transparent"
                          placeholder="votre@email.com"
                      />
                  ) : (
                      <p className="text-gray-700">{user.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-brown mb-2 flex items-center">
                    <Phone size={16} className="mr-2" />
                    Téléphone
                  </label>
                  {isEditing ? (
                      <input
                          type="tel"
                          value={editData.phone}
                          onChange={(e) =>
                              setEditData((prev) => ({ ...prev, phone: e.target.value }))
                          }
                          placeholder="76 303 44 01"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown focus:border-transparent"
                      />
                  ) : (
                      <p className="text-gray-700">{user.phone || 'Non renseigné'}</p>
                  )}
                </div>
              </div>

              <button
                  onClick={logout}
                  className="w-full mt-6 flex items-center justify-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-semibold transition-colors border border-red-200"
              >
                <LogOut size={18} className="mr-2" />
                Se déconnecter
              </button>
            </motion.div>
          </div>
        </div>
      </div>
  )
}

export default Profile
