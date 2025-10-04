import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login, register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (isLogin) {
        const success = await login(formData.email, formData.password)
        if (success) {
          navigate('/')
        } else {
          alert('Email ou mot de passe incorrect')
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          alert('Les mots de passe ne correspondent pas')
          return
        }
        const success = await register(formData.email, formData.password, formData.name)
        if (success) {
          navigate('/')
        } else {
          alert('Erreur lors de la création du compte')
        }
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center py-16">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image and branding */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="SDCREME creations"
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <div className="flex items-center mb-2">
                  <img 
                    src="/WhatsApp Image 2025-09-25 à 23.26.23_e5b52586.jpg" 
                    alt="SDCREME Logo" 
                    className="h-12 w-auto filter brightness-0 invert"
                  />
                </div>
                <p className="text-lg">L'art de la gourmandise</p>
              </div>
            </div>
          </motion.div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto w-full"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold font-serif text-brown mb-2">
                {isLogin ? 'Connexion' : 'Créer un compte'}
              </h1>
              <p className="text-gray-600">
                {isLogin 
                  ? 'Accédez à votre espace client' 
                  : 'Rejoignez la communauté SDCREME'
                }
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-semibold text-brown mb-2">
                    <User size={18} className="inline mr-2" />
                    Nom complet
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown focus:border-transparent transition-all"
                    required={!isLogin}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-brown mb-2">
                  <Mail size={18} className="inline mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-brown mb-2">
                  <Lock size={18} className="inline mr-2" />
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown focus:border-transparent transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-brown transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-semibold text-brown mb-2">
                    <Lock size={18} className="inline mr-2" />
                    Confirmer le mot de passe
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown focus:border-transparent transition-all"
                    required={!isLogin}
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 rounded-lg font-semibold text-lg transition-all ${
                  isSubmitting
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-brown hover:bg-warm-brown text-white transform hover:scale-105'
                }`}
              >
                {isSubmitting 
                  ? (isLogin ? 'Connexion...' : 'Création du compte...') 
                  : (isLogin ? 'Se connecter' : 'Créer le compte')
                }
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-brown hover:text-warm-brown font-medium transition-colors"
              >
                {isLogin 
                  ? "Pas encore de compte ? S'inscrire" 
                  : "Déjà un compte ? Se connecter"
                }
              </button>
            </div>

            {isLogin && (
              <div className="mt-4 text-center">
                <button className="text-gray-500 hover:text-brown text-sm transition-colors">
                  Mot de passe oublié ?
                </button>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="bg-cream p-4 rounded-lg">
                <h3 className="font-semibold text-brown mb-2 text-sm">
                  Avantages de votre compte :
                </h3>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Commandes plus rapides</li>
                  <li>• Historique de vos achats</li>
                  <li>• Points de fidélité</li>
                  <li>• Offres exclusives</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Login