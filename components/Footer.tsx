import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Phone, MapPin, Clock } from 'lucide-react'

const Footer: React.FC = () => {
  return (
      <footer className="bg-dark-brown text-white">
        <div className="container-max py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo & Description */}
            <div className="space-y-4">
              <div className="flex items-center">
                <img
                    src="/WhatsApp Image 2025-09-25 à 23.26.23_e5b52586.jpg"
                    alt="SDCREME Logo"
                    className="h-10 w-auto filter brightness-0 invert"
                />
              </div>
              <p className="text-gray-300 leading-relaxed">
                Artisan passionné, nous créons chaque jour des merveilles gourmandes
                alliant tradition et innovation dans nos trois univers.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gold hover:text-yellow-400 transition-colors">
                  <Facebook size={24} />
                </a>
                <a href="#" className="text-gold hover:text-yellow-400 transition-colors">
                  <Instagram size={24} />
                </a>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-gold">Nos Services</h4>
              <nav className="space-y-2">
                <Link to="/patisserie" className="block text-gray-300 hover:text-white transition-colors">
                  Pâtisserie
                </Link>
                <Link to="/boulangerie" className="block text-gray-300 hover:text-white transition-colors">
                  Boulangerie
                </Link>
                <Link to="/restaurant" className="block text-gray-300 hover:text-white transition-colors">
                  Restaurant
                </Link>
                <Link to="/commander" className="block text-gray-300 hover:text-white transition-colors">
                  Commande en ligne
                </Link>
                <Link to="/reservation" className="block text-gray-300 hover:text-white transition-colors">
                  Réservation
                </Link>
              </nav>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-gold">Contact</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin size={18} className="text-gold flex-shrink-0" />
                  <span className="text-gray-300">Diamniadio<br />Sénédindia</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone size={18} className="text-gold" />
                  <span className="text-gray-300">77 393 20 69</span>
                </div>
              </div>
            </div>

            {/* Horaires */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-gold">Horaires</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <Clock size={18} className="text-gold" />
                  <div className="text-gray-300">
                    <div>Lun - Sam: 7h - 20h</div>
                    <div>Dimanche: 8h - 18h</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-brown py-6">
          <div className="container-max">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
              <p>&copy; 2025 SDCREME. Tous droits réservés.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link to="#" className="hover:text-white transition-colors">
                  Mentions légales
                </Link>
                <Link to="#" className="hover:text-white transition-colors">
                  Politique de confidentialité
                </Link>
                <Link to="#" className="hover:text-white transition-colors">
                  CGV
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer