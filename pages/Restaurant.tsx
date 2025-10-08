import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Clock, Users, Star, Utensils } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  allergens?: string[]
  spicy?: boolean
  vegetarian?: boolean
  image: string
}

const Restaurant: React.FC = () => {
  const { addToCart } = useCart()
  const [selectedCategory, setSelectedCategory] = useState('plats_principaux')

  const menuItems: MenuItem[] = [
    // PLATS PRINCIPAUX SÉNÉGALAIS
    {
      id: 'r1',
      name: 'Thiébou Djeune',
      description: 'Riz au poisson, légumes, et sauce tomate - Plat national du Sénégal',
      price: 6500,
      category: 'plats_principaux',
      image: '/images/riz au poisson.jpg'
    },
    {
      id: 'r2',
      name: 'Thiébou Yapp',
      description: 'Riz à la viande de bœuf et légumes, cuisiné à la sénégalaise',
      price: 6000,
      category: 'plats_principaux',
      image: '/images/riz à la viande.jpg'
    },
    {
      id: 'r3',
      name: 'Thiou',
      description: 'Riz rouge avec poisson et légumes, sauce tomate épicée',
      price: 5200,
      category: 'plats_principaux',
      spicy: true,
      image: '/images/Thiou.jpg'
    },

    {
      id: 'r5',
      name: 'Supukanj',
      description: 'Soupe traditionnelle sénégalaise aux légumes et viande',
      price: 2800,
      category: 'plats_principaux',
      image: '/images/Supukanj.jpg'
    },


    // ACCOMPAGNEMENTS
    {
      id: 'a1',
      name: 'Tapalapa',
      description: 'Pain traditionnel sénégalais, croustillant et savoureux',
      price: 800,
      category: 'accompagnements',
      vegetarian: true,
      image: '/images/tapalapa.jpg'
    },
    {
      id: 'a2',
      name: 'Riz Blanc Parfumé',
      description: 'Riz blanc cuit à la vapeur, léger et parfumé',
      price: 1200,
      category: 'accompagnements',
      vegetarian: true,
      image: '/images/riz à la viande.jpg' // Utilisez une image de riz si disponible
    },

    // ENTRÉES
    {
      id: 'e1',
      name: 'Accras de Morue',
      description: 'Beignets de poisson traditionnels - 6 pièces',
      price: 2200,
      category: 'entrees',
      image: '/images/riz au poisson.jpg' // À remplacer par image d'accras si disponible
    },


  ]

  const categories = [
    { id: 'plats_principaux', name: 'Plats Principaux', count: menuItems.filter(item => item.category === 'plats_principaux').length },
    { id: 'entrees', name: 'Entrées', count: menuItems.filter(item => item.category === 'entrees').length },
    { id: 'accompagnements', name: 'Accompagnements', count: menuItems.filter(item => item.category === 'accompagnements').length },
    { id: 'desserts', name: 'Desserts', count: menuItems.filter(item => item.category === 'desserts').length }
  ]

  const filteredItems = menuItems.filter(item => item.category === selectedCategory)

  const handleAddToCart = (item: MenuItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      category: 'restaurant',
      image: item.image
    })
  }

  const formules = [
    {
      name: 'Formule Déjeuner',
      description: 'Entrée + Plat ou Plat + Dessert',
      price: 8000,
      time: '12h - 14h30'
    },
    {
      name: 'Menu Découverte',
      description: 'Entrée + Plat + Dessert + Boisson',
      price: 12000,
      time: 'Service continu'
    },
    {
      name: 'Menu Teranga',
      description: 'Découverte complète de la cuisine sénégalaise',
      price: 15000,
      time: 'Sur réservation uniquement'
    }
  ]

  return (
      <div className="min-h-screen bg-cream">
        {/* Hero Section */}
        <section className="relative h-96 bg-gradient-brown flex items-center">
          <div
              className="absolute inset-0 bg-cover bg-center opacity-30"
              style={{
                backgroundImage: 'url(/images/riz au poisson.jpg)' // Utilise une de vos images comme fond
              }}
          ></div>
          <div className="relative z-10 container-max text-center text-white">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold font-serif mb-4">
                Restaurant Sénégalais
              </h1>
              <p className="text-xl max-w-3xl mx-auto mb-8">
                Découvrez l'authentique cuisine sénégalaise, un voyage gustatif
                au cœur de la Teranga et des saveurs d'Afrique de l'Ouest
              </p>
              <Link to="/reservation" className="btn-secondary">
                Réserver votre table
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Formules Section */}
        <section className="section-padding bg-white">
          <div className="container-max">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold font-serif text-brown mb-6">
                Nos Formules Teranga
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Des menus complets pour une expérience culinaire sénégalaise authentique
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {formules.map((formule, index) => (
                  <motion.div
                      key={formule.name}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-cream p-8 rounded-2xl shadow-lg text-center card-hover"
                  >
                    <h3 className="text-2xl font-bold font-serif text-brown mb-4">
                      {formule.name}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {formule.description}
                    </p>
                    <div className="flex items-center justify-center text-gray-500 text-sm mb-6">
                      <Clock size={16} className="mr-2" />
                      {formule.time}
                    </div>
                    <div className="text-3xl font-bold text-brown mb-6">
                      {formule.price.toFixed(2)} FCFA
                    </div>
                    <Link to="/reservation" className="btn-primary">
                      Choisir cette formule
                    </Link>
                  </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Menu Section */}
        <section className="section-padding bg-cream">
          <div className="container-max">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold font-serif text-brown mb-6">
                Notre Carte Sénégalaise
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {menuItems.length} spécialités préparées avec des ingrédients frais et des recettes traditionnelles
              </p>
            </motion.div>

            {/* Category Tabs */}
            <div className="flex justify-center mb-12">
              <div className="flex flex-wrap bg-white rounded-2xl p-2 shadow-lg gap-2">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap ${
                            selectedCategory === category.id
                                ? 'bg-brown text-white shadow-lg'
                                : 'text-brown hover:bg-cream'
                        }`}
                    >
                      {category.name} ({category.count})
                    </button>
                ))}
              </div>
            </div>

            {/* Menu Items */}
            <motion.div
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                key={selectedCategory}
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
            >
              {filteredItems.map((item) => (
                  <motion.div
                      key={item.id}
                      variants={{
                        hidden: { opacity: 0, x: -30 },
                        visible: { opacity: 1, x: 0 }
                      }}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover group"
                  >
                    <div className="flex">
                      <div className="w-32 h-32 flex-shrink-0 relative">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                          {item.vegetarian && (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Végétarien
                        </span>
                          )}
                          {item.spicy && (
                              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                          Épicé
                        </span>
                          )}
                        </div>
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-bold font-serif text-brown">
                            {item.name}
                          </h3>
                        </div>

                        <p className="text-gray-600 text-sm leading-relaxed mb-3">
                          {item.description}
                        </p>

                        {item.allergens && (
                            <p className="text-xs text-gray-500 mb-4">
                              Allergènes: {item.allergens.join(', ')}
                            </p>
                        )}

                        <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-brown">
                        {item.price.toFixed(2)} FCFA
                      </span>
                          <button
                              onClick={() => handleAddToCart(item)}
                              className="flex items-center px-4 py-2 bg-gold hover:bg-yellow-600 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                          >
                            <Plus size={18} className="mr-1" />
                            Ajouter
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Ambiance Section */}
        <section className="section-padding bg-white">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl font-bold font-serif text-brown mb-6">
                  L'Esprit Teranga
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Bien plus qu'un restaurant, un lieu de partage et de convivialité.
                  La Teranga, valeur fondamentale du Sénégal, signifie l'hospitalité
                  et le sens de l'accueil. Nous vous invitons à vivre cette expérience
                  culinaire authentique dans une ambiance chaleureuse.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Users size={20} className="text-gold mr-3" />
                    <span className="text-gray-700">Capacité: 50 couverts</span>
                  </div>
                  <div className="flex items-center">
                    <Star size={20} className="text-gold mr-3" />
                    <span className="text-gray-700">Cuisine traditionnelle authentique</span>
                  </div>
                  <div className="flex items-center">
                    <Utensils size={20} className="text-gold mr-3" />
                    <span className="text-gray-700">Plats faits maison</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="grid grid-cols-2 gap-4"
              >
                <img
                    src="/images/riz au poisson.jpg"
                    alt="Thiébou Djeune"
                    className="w-full h-48 object-cover rounded-2xl shadow-lg"
                />
                <img
                    src="/images/riz à la viande.jpg"
                    alt="Thiébou Yapp"
                    className="w-full h-48 object-cover rounded-2xl shadow-lg mt-8"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Horaires Section */}
        <section className="section-padding bg-cream">
          <div className="container-max">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-bold font-serif text-brown mb-8">
                Horaires de Service
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <h3 className="text-xl font-bold text-brown mb-4">Déjeuner</h3>
                  <div className="space-y-2 text-gray-600">
                    <div>Lundi - Mardi - Mercredi - Jeudi: 07h00 - 12h00</div>
                    <div>Vendredi -Samedi - Dimanche: 07h00 - 12h00</div>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <h3 className="text-xl font-bold text-brown mb-4">Dîner</h3>
                  <div className="space-y-2 text-gray-600">
                    <div>Lundi - Mardi - Mercredi - Jeudi: 18h30 - 23h00</div>
                    <div>Vendredi - Samedi - Dimanche: 18h00 - 00h00</div>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mt-6">
                Service continu toute la semaine - Réservation recommandée
              </p>
            </motion.div>
          </div>
        </section>
      </div>
  )
}

export default Restaurant