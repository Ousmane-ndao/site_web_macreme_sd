import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Users, Phone, Mail, MessageCircle, ArrowLeft } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

const Reservation: React.FC = () => {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 2,
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    message: '',
    allergies: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showWhatsAppOption, setShowWhatsAppOption] = useState(false)

  const timeSlots = [
    '12:00', '12:15', '12:30', '12:45',
    '13:00', '13:15', '13:30', '13:45',
    '14:00', '14:15', '14:30',
    '19:00', '19:15', '19:30', '19:45',
    '20:00', '20:15', '20:30', '20:45',
    '21:00', '21:15', '21:30', '21:45',
    '22:00', '22:15'
  ]

  // Fonction pour générer le message WhatsApp
  const generateWhatsAppMessage = () => {
    const { name, phone, email, date, time, guests, message, allergies } = formData

    let whatsappMessage = `🍽️ NOUVELLE RÉSERVATION - Ma Crème 🍰\n\n`
    whatsappMessage += `👤 *Client:* ${name}\n`
    whatsappMessage += `📞 *Téléphone:* ${phone}\n`
    whatsappMessage += `📧 *Email:* ${email}\n`
    whatsappMessage += `📅 *Date:* ${date}\n`
    whatsappMessage += `⏰ *Heure:* ${time}\n`
    whatsappMessage += `👥 *Nombre de personnes:* ${guests}\n\n`

    if (message) {
      whatsappMessage += `💬 *Demandes spéciales:*\n${message}\n\n`
    }

    if (allergies) {
      whatsappMessage += `⚠️ *Allergies:*\n${allergies}\n\n`
    }

    whatsappMessage += `Merci de confirmer cette réservation ! 🎉`

    return whatsappMessage
  }

  const handleWhatsAppReservation = () => {
    if (!formData.date || !formData.time || !formData.name || !formData.phone) {
      alert('Veuillez remplir tous les champs obligatoires avant de réserver')
      return
    }

    const message = generateWhatsAppMessage()
    const whatsappNumber = '221763034401'
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

    window.open(whatsappUrl, '_blank')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      alert('Veuillez vous connecter pour faire une réservation')
      return
    }

    setIsSubmitting(true)

    // Simulate reservation processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    alert('Réservation confirmée ! Vous recevrez un email de confirmation.')
    setIsSubmitting(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Si l'option WhatsApp est sélectionnée
  if (showWhatsAppOption) {
    return (
        <div className="min-h-screen bg-cream py-16">
          <div className="container-max">
            <div className="max-w-2xl mx-auto">
              {/* Bouton retour */}
              <button
                  onClick={() => setShowWhatsAppOption(false)}
                  className="flex items-center text-brown hover:text-warm-brown mb-6 transition-colors"
              >
                <ArrowLeft size={20} className="mr-2" />
                Retour au formulaire
              </button>

              {/* En-tête WhatsApp */}
              <div className="text-center mb-8">
                <div className="text-green-600 mx-auto mb-4 text-5xl">📱</div>
                <h1 className="text-4xl font-bold font-serif text-brown mb-2">
                  Réserver via WhatsApp
                </h1>
                <p className="text-lg text-gray-600">
                  Envoyez directement votre réservation sur WhatsApp
                </p>
              </div>

              {/* Aperçu de la réservation */}
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-lg p-6 mb-6"
              >
                <h3 className="text-xl font-bold font-serif text-brown mb-4">
                  Aperçu de votre réservation
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nom:</span>
                    <span className="font-semibold">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Téléphone:</span>
                    <span className="font-semibold">{formData.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-semibold">{formData.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Heure:</span>
                    <span className="font-semibold">{formData.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Personnes:</span>
                    <span className="font-semibold">{formData.guests}</span>
                  </div>
                  {formData.message && (
                      <div className="border-t pt-3">
                        <span className="text-gray-600 block mb-1">Demandes spéciales:</span>
                        <span className="font-semibold">{formData.message}</span>
                      </div>
                  )}
                  {formData.allergies && (
                      <div className="border-t pt-3">
                        <span className="text-gray-600 block mb-1">Allergies:</span>
                        <span className="font-semibold">{formData.allergies}</span>
                      </div>
                  )}
                </div>
              </motion.div>

              {/* Bouton d'envoi WhatsApp */}
              <div className="text-center">
                <button
                    onClick={handleWhatsAppReservation}
                    className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-3 text-lg"
                >
                  <span className="text-2xl">📱</span>
                  Envoyer la réservation sur WhatsApp
                </button>

                <div className="text-center text-sm text-gray-600 mt-4">
                  <p>La réservation sera envoyée au : <strong>+221 76 303 44 01</strong></p>
                  <p className="text-xs mt-1">Nous vous confirmerons rapidement votre réservation</p>
                </div>
              </div>
            </div>
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
              className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-brown mb-6">
              Réservation
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Réservez votre table et savourez une expérience culinaire d'exception
              dans notre restaurant chaleureux et raffiné
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Reservation Form */}
            <div className="lg:col-span-2">
              <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-white rounded-2xl shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold font-serif text-brown mb-6">
                  Détails de la réservation
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Date & Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-brown mb-2">
                        <Calendar size={18} className="inline mr-2" />
                        Date *
                      </label>
                      <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown focus:border-transparent"
                          required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-brown mb-2">
                        <Clock size={18} className="inline mr-2" />
                        Heure *
                      </label>
                      <select
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown focus:border-transparent"
                          required
                      >
                        <option value="">Choisir un créneau</option>
                        {timeSlots.map((time) => (
                            <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Number of guests */}
                  <div>
                    <label className="block text-sm font-semibold text-brown mb-2">
                      <Users size={18} className="inline mr-2" />
                      Nombre de personnes *
                    </label>
                    <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown focus:border-transparent"
                        required
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <option key={num} value={num}>
                            {num} personne{num > 1 ? 's' : ''}
                          </option>
                      ))}
                    </select>
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-brown mb-2">
                        Nom complet *
                      </label>
                      <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown focus:border-transparent"
                          required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-brown mb-2">
                        <Phone size={18} className="inline mr-2" />
                        Téléphone *
                      </label>
                      <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown focus:border-transparent"
                          required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-brown mb-2">
                      <Mail size={18} className="inline mr-2" />
                      Email *
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown focus:border-transparent"
                        required
                    />
                  </div>

                  {/* Special requests */}
                  <div>
                    <label className="block text-sm font-semibold text-brown mb-2">
                      <MessageCircle size={18} className="inline mr-2" />
                      Demandes spéciales
                    </label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Occasion spéciale, préférences de table..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown focus:border-transparent resize-none"
                        rows={3}
                    />
                  </div>

                  {/* Allergies */}
                  <div>
                    <label className="block text-sm font-semibold text-brown mb-2">
                      Allergies et intolérances
                    </label>
                    <textarea
                        name="allergies"
                        value={formData.allergies}
                        onChange={handleInputChange}
                        placeholder="Veuillez nous informer de vos allergies alimentaires..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown focus:border-transparent resize-none"
                        rows={2}
                    />
                  </div>

                  {/* Options de réservation */}
                  <div className="space-y-4">
                    <div className="text-center text-sm text-gray-600 mb-4">
                      Choisissez votre méthode de réservation
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Option WhatsApp */}
                      <button
                          type="button"
                          onClick={() => setShowWhatsAppOption(true)}
                          className="py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-3"
                      >
                        <span className="text-2xl">📱</span>
                        Réserver via WhatsApp
                      </button>

                      {/* Option classique (seulement si connecté) */}
                      {user ? (
                          <button
                              type="submit"
                              disabled={isSubmitting}
                              className={`py-4 rounded-xl font-semibold transition-all ${
                                  isSubmitting
                                      ? 'bg-gray-400 text-white cursor-not-allowed'
                                      : 'bg-brown hover:bg-warm-brown text-white transform hover:scale-105'
                              }`}
                          >
                            {isSubmitting ? 'Réservation...' : 'Réservation classique'}
                          </button>
                      ) : (
                          <Link
                              to="/connexion"
                              className="block py-4 bg-brown hover:bg-warm-brown text-white rounded-xl font-semibold text-center transition-all transform hover:scale-105"
                          >
                            Se connecter
                          </Link>
                      )}
                    </div>
                  </div>
                </form>
              </motion.div>
            </div>

            {/* Restaurant Info */}
            <div className="space-y-6">
              <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-xl font-bold font-serif text-brown mb-4">
                  Informations pratiques
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-brown mb-1">Horaires</h4>
                    <div className="text-gray-600 text-sm space-y-1">
                      <div>Déjeuner: 08h - 14h30</div>
                      <div>Dîner: 19h - 23h30</div>
                      <div>Toujour ouvert</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-brown mb-1">Capacité</h4>
                    <p className="text-gray-600 text-sm">45 couverts</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-brown mb-1">Contact</h4>
                    <div className="text-gray-600 text-sm space-y-1">
                      <div>+221 76 303 44 01 (WhatsApp)</div>
                      <div>77 393 20 69 (Appel)</div>
                      <div>ousmanendao1124@gmail.com</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-xl font-bold font-serif text-brown mb-4">
                  Notre engagement
                </h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>• Confirmation immédiate par WhatsApp</p>
                  <p>• Rappel 24h avant votre réservation</p>
                  <p>• Annulation possible jusqu'à 2h avant</p>
                  <p>• Adaptation aux régimes spéciaux</p>
                </div>
              </motion.div>

              <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-gradient-brown rounded-2xl shadow-lg p-6 text-white text-center"
              >
                <h3 className="text-xl font-bold font-serif mb-4">
                  Événements privés
                </h3>
                <p className="text-sm mb-4">
                  Nous organisons vos événements privés, anniversaires et réceptions d'entreprise.
                </p>
                <button
                    onClick={() => {
                      const message = "Bonjour ! Je souhaite organiser un événement privé. Pouvez-vous me renseigner ?"
                      const whatsappUrl = `https://wa.me/221763034401?text=${encodeURIComponent(message)}`
                      window.open(whatsappUrl, '_blank')
                    }}
                    className="inline-block bg-white text-brown px-4 py-2 rounded-lg font-semibold hover:bg-cream transition-colors"
                >
                  Contact WhatsApp
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Reservation