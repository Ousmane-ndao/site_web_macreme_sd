import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Star, Filter } from 'lucide-react'
import { useCart } from '../contexts/CartContext'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  rating: number
  inStock: boolean
}

const Patisserie: React.FC = () => {
  const { addToCart } = useCart()
  const [selectedCategory, setSelectedCategory] = useState('all')

  const products: Product[] = [
    {
      id: 'p1',
      name: 'Tarte aux Fraises',
      description: 'Pâte sablée, crème pâtissière vanille et fraises fraîches de saison',
      price: 2000,
      image: 'https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'tartes',
      rating: 4.9,
      inStock: true
    },
    {
      id: 'p2',
      name: 'Éclair au Chocolat',
      description: 'Pâte à choux, crème pâtissière au chocolat noir et glaçage brillant',
      price: 1500,
      image: 'https://images.pexels.com/photos/2144112/pexels-photo-2144112.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'eclairs',
      rating: 4.8,
      inStock: true
    },

    {
      id: 'p4',
      name: 'Saint-Honoré',
      description: 'Pâte brisée, crème Chiboust vanille, choux caramélisés et chantilly',
      price: 3000,
      image: 'https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'gateaux',
      rating: 4.7,
      inStock: true
    },


  ]

  const categories = [
    { id: 'all', name: 'Tout', count: products.length },
    { id: 'tartes', name: 'Tartes', count: products.filter(p => p.category === 'tartes').length },
    { id: 'gateaux', name: 'Gâteaux', count: products.filter(p => p.category === 'gateaux').length },
    { id: 'eclairs', name: 'Éclairs', count: products.filter(p => p.category === 'eclairs').length },
    { id: 'macarons', name: 'Macarons', count: products.filter(p => p.category === 'macarons').length },
    { id: 'viennoiseries', name: 'Viennoiseries', count: products.filter(p => p.category === 'viennoiseries').length },
    { id: 'classiques', name: 'Classiques', count: products.filter(p => p.category === 'classiques').length }
  ]

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory)

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      category: 'patisserie',
      image: product.image
    })
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-brown flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=1600)'
          }}
        ></div>
        <div className="relative z-10 container-max text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold font-serif mb-4">
              Pâtisserie
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Découvrez nos créations sucrées artisanales,
              réalisées chaque jour avec passion et savoir-faire
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="section-padding bg-white border-b">
        <div className="container-max">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold font-serif text-brown flex items-center">
              <Filter className="mr-3" size={28} />
              Catégories
            </h2>
            <p className="text-gray-600">
              {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-brown text-white shadow-lg'
                    : 'bg-cream text-brown hover:bg-light-brown hover:text-white'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
                        Temporairement indisponible
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                    <Star size={16} className="text-gold fill-current mr-1" />
                    <span className="font-semibold text-sm">{product.rating}</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold font-serif text-brown mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-brown">
                      {product.price.toFixed(2)} FCFA
                    </span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                      className={`flex items-center px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                        product.inStock
                          ? 'bg-gold hover:bg-yellow-600 text-white transform hover:scale-105'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <Plus size={18} className="mr-1" />
                      Ajouter
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">
                Aucun produit trouvé dans cette catégorie.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold font-serif text-brown mb-6">
                L'Art de la Pâtisserie
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Chaque création est le fruit d'un savoir-faire artisanal transmis de génération en génération.
                Nous sélectionnons rigoureusement nos ingrédients : beurre AOP, chocolats d'exception,
                fruits de saison et épices rares pour vous offrir des pâtisseries d'exception.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="text-center">
                  <div className="bg-gold/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <h3 className="font-bold text-brown mb-2">Qualité Premium</h3>
                  <p className="text-gray-600 text-sm">Ingrédients sélectionnés avec soin</p>
                </div>
                <div className="text-center">
                  <div className="bg-gold/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">👨‍🍳</span>
                  </div>
                  <h3 className="font-bold text-brown mb-2">Savoir-faire</h3>
                  <p className="text-gray-600 text-sm">Techniques traditionnelles maîtrisées</p>
                </div>
                <div className="text-center">
                  <div className="bg-gold/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⏰</span>
                  </div>
                  <h3 className="font-bold text-brown mb-2">Fraîcheur</h3>
                  <p className="text-gray-600 text-sm">Préparées quotidiennement</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Patisserie