import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X, ShoppingCart, User, Phone, MapPin } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'


const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [backendStatus, setBackendStatus] = useState<string>('🔍 Vérification...')
  const location = useLocation()
  const { cartItems } = useCart()
  const { user } = useAuth()

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Pâtisserie', href: '/patisserie' },
    { name: 'Boulangerie', href: '/boulangerie' },
    { name: 'Restaurant', href: '/restaurant' },
  ]

  // Test de connexion au backend
  useEffect(() => {
    const testBackend = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/health`)
        const data = await response.json()

        if (data.ok) {
          setBackendStatus('✅ Backend OK')
        } else {
          setBackendStatus('❌ Backend erreur')
        }
      } catch (error) {
        setBackendStatus('❌ Backend offline')
      }
    }

    testBackend()
    const interval = setInterval(testBackend, 30000) // Test toutes les 30 secondes

    return () => clearInterval(interval)
  }, [])

  const isActive = (path: string) => location.pathname === path

  return (
      <header className="bg-white shadow-lg sticky top-0 z-50">
        {/* Contact Info Bar */}
        <div className="bg-brown text-white py-2">
          <div className="container-max flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Phone size={14} className="mr-1" />
                <span>77 393 20 69</span>
              </div>
              <div className="flex items-center">
                <MapPin size={14} className="mr-1" />
                <span>Diamniadio Sénédindia en face Stade Abdoulaye wade</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <span>Ouvert du Lun au Dim • 7h - 23h</span>
              {/* Statut Backend */}
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  backendStatus.includes('✅')
                      ? 'bg-green-500 text-white'
                      : backendStatus.includes('❌')
                          ? 'bg-red-500 text-white'
                          : 'bg-yellow-500 text-white'
              }`}>
                {backendStatus}
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <nav className="container-max">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center"
              >
                <img
                    src="/WhatsApp Image 2025-09-25 à 23.26.23_e5b52586.jpg"
                    alt="SDCREME Logo"
                    className="h-12 w-auto"
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                  <Link
                      key={item.name}
                      to={item.href}
                      className={`font-medium transition-colors duration-300 ${
                          isActive(item.href)
                              ? 'text-brown border-b-2 border-gold'
                              : 'text-gray-700 hover:text-brown'
                      }`}
                  >
                    {item.name}
                  </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Statut Backend (mobile) */}
              <div className="lg:hidden">
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    backendStatus.includes('✅')
                        ? 'bg-green-500 text-white'
                        : backendStatus.includes('❌')
                            ? 'bg-red-500 text-white'
                            : 'bg-yellow-500 text-white'
                }`}>
                  {backendStatus.includes('Backend') ? backendStatus.split(' ')[0] : backendStatus}
                </div>
              </div>

              {/* Cart */}
              <Link
                  to="/commander"
                  className="relative p-2 text-brown hover:bg-cream rounded-full transition-colors"
              >
                <ShoppingCart size={24} />
                {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gold text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
                )}
              </Link>

              {/* User */}
              <Link
                  to={user ? "/profil" : "/connexion"}
                  className="p-2 text-brown hover:bg-cream rounded-full transition-colors"
              >
                <User size={24} />
              </Link>

              {/* Mobile menu button */}
              <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="lg:hidden p-2 text-brown"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
              <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="lg:hidden bg-cream border-t"
              >
                <div className="py-4 space-y-4">
                  {navigation.map((item) => (
                      <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`block px-4 py-2 font-medium transition-colors ${
                              isActive(item.href) ? 'text-brown bg-white' : 'text-gray-700'
                          }`}
                      >
                        {item.name}
                      </Link>
                  ))}
                  <Link
                      to="/reservation"
                      onClick={() => setIsMenuOpen(false)}
                      className="block mx-4 btn-primary text-center"
                  >
                    Réserver une table
                  </Link>
                </div>
              </motion.div>
          )}
        </nav>
      </header>
  )
}

export default Header