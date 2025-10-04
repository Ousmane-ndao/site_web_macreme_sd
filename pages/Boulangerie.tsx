
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Clock, Wheat } from 'lucide-react'
import { useCart } from '../contexts/CartContext'

interface BakeryProduct {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  availability: string
  weight?: string
}

const Boulangerie: React.FC = () => {
  const { addToCart } = useCart()
  const [selectedCategory, setSelectedCategory] = useState('all')

  const products: BakeryProduct[] = [
    // PAINS
    {
      id: 'b2',
      name: 'Pain de Campagne',
      description: 'Pain rustique au levain naturel, à la mie dense et savoureuse',
      price: 1200,
      image: '/images/moule à gateau.jpg', // Image temporaire
      category: 'pains',
      availability: 'Disponible à partir de 8h',
      weight: '400g'
    },

    // VIENNOISERIES
    {
      id: 'b3',
      name: 'Croissant au Beurre',
      description: 'Viennoiserie feuilletée au pur beurre, dorée et croustillante',
      price: 1000,
      image: '/images/Beignet sucre1.jpg', // Image de beignet pour croissant
      category: 'viennoiseries',
      availability: 'Disponible dès 7h',
    },
    {
      id: 'b4',
      name: 'Brioche Tressée',
      description: 'Brioche moelleuse et parfumée, tressée à la main',
      price: 1500,
      image: '/images/beignet sucre2.jpg', // Image de beignet pour brioche
      category: 'viennoiseries',
      availability: 'Disponible le weekend',
      weight: '300g'
    },

    // SPÉCIALITÉS - BEIGNETS
    {
      id: 's1',
      name: 'Beignet Sucré Traditionnel',
      description: 'Beignet doré et moelleux, saupoudré de sucre',
      price: 500,
      image: '/images/Beignet sucre1.jpg',
      category: 'specialites',
      availability: 'Disponible toute la journée'
    },
    {
      id: 's2',
      name: 'Beignet Sucré Spécial',
      description: 'Beignet artisanal avec une texture légère et aérienne',
      price: 600,
      image: '/images/beignet sucre2.jpg',
      category: 'specialites',
      availability: 'Disponible toute la journée'
    },
    {
      id: 's3',
      name: 'Beignet Gourmand',
      description: 'Beignet généreux, parfait pour le petit-déjeuner',
      price: 700,
      image: '/images/beinet sucre3.jpg', // Note: il y a une faute de frappe "beinet"
      category: 'specialites',
      availability: 'Disponible dès 6h'
    },

    // GÂTEAUX ET PÂTISSERIES
    {
      id: 's4',
      name: 'Le Grand Duc au Chocolat',
      description: 'Gâteau chocolaté premium, riche et intense',
      price: 4500,
      image: '/images/Le Grand Duc au Chocolat.png',
      category: 'specialites',
      availability: 'Sur commande 24h à l\'avance',
      weight: '600g'
    },
    {
      id: 's5',
      name: 'Vacherin aux Amandes',
      description: 'Dessert croustillant aux amandes, délicat et parfumé',
      price: 3800,
      image: '/images/Le Vacherin aux Amandes.png',
      category: 'specialites',
      availability: 'Sur commande 24h à l\'avance',
      weight: '500g'
    },
    {
      id: 's6',
      name: 'Assortiment Chocolat',
      description: 'Sélection de pâtisseries et confiseries au chocolat',
      price: 3200,
      image: '/images/Chocolat.png',
      category: 'specialites',
      availability: 'Disponible toute la journée'
    },

    // MOULES ET ACCESSOIRES
    {
      id: 's7',
      name: 'Moule à Gâteau Artisanal',
      description: 'Moule de qualité professionnelle pour pâtisseries maison',
      price: 6500,
      image: '/images/moule à gateau.jpg',
      category: 'specialites',
      availability: 'En stock permanent'
    }
  ]

  const categories = [
    { id: 'all', name: 'Tout', count: products.length },
    { id: 'pains', name: 'Pains', count: products.filter(p => p.category === 'pains').length },
    { id: 'viennoiseries', name: 'Viennoiseries', count: products.filter(p => p.category === 'viennoiseries').length },
    { id: 'specialites', name: 'Spécialités', count: products.filter(p => p.category === 'specialites').length }
  ]

  const filteredProducts = selectedCategory === 'all'
      ? products
      : products.filter(product => product.category === selectedCategory)

  const handleAddToCart = (product: BakeryProduct) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      category: 'boulangerie',
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
                backgroundImage: 'url(/images/Le tapalapa, le pain traditionnel du Sénég...)' // Utilise votre image de tapalapa
              }}
          ></div>
          <div className="relative z-10 container-max text-center text-white">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold font-serif mb-4">
                Boulangerie
              </h1>
              <p className="text-xl max-w-3xl mx-auto">
                Nos pains, viennoiseries et spécialités artisanales,
                préparés chaque jour avec passion et savoir-faire
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="section-padding bg-white border-b">
          <div className="container-max">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold font-serif text-brown flex items-center">
                <Wheat className="mr-3" size={28} />
                Nos Produits
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
                      className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover group"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => {
                            // Fallback si l'image ne charge pas
                            e.currentTarget.src = `https://via.placeholder.com/400x300/E9C46A/000000?text=${encodeURIComponent(product.name)}`
                          }}
                      />
                      {product.weight && (
                          <div className="absolute top-4 left-4 bg-brown text-white px-3 py-1 rounded-full text-sm font-semibold">
                            {product.weight}
                          </div>
                      )}
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold font-serif text-brown mb-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                        {product.description}
                      </p>

                      <div className="flex items-center text-gray-500 text-sm mb-4">
                        <Clock size={16} className="mr-2" />
                        {product.availability}
                      </div>

                      <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-brown">
                      {product.price.toFixed(2)} FCFA
                    </span>
                        <button
                            onClick={() => handleAddToCart(product)}
                            className="flex items-center px-4 py-2 bg-gold hover:bg-yellow-600 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
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
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">Aucun produit trouvé dans cette catégorie</p>
                </div>
            )}
          </div>
        </section>

        {/* Craft Section */}
        <section className="section-padding bg-white">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl font-bold font-serif text-brown mb-6">
                  L'Art du Boulanger
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Depuis l'aube, nos boulangers pétrissent, façonnent et cuisent avec passion.
                  Chaque pain est unique, résultat d'un savoir-faire ancestral et d'ingrédients
                  soigneusement sélectionnés.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-gold/10 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                      <span className="text-gold font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-brown mb-1">Pétrissage Artisanal</h3>
                      <p className="text-gray-600 text-sm">Développement lent et respectueux des pâtes</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-gold/10 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                      <span className="text-gold font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-brown mb-1">Fermentation Contrôlée</h3>
                      <p className="text-gray-600 text-sm">Temps de pousse optimaux pour les arômes</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-gold/10 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                      <span className="text-gold font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-brown mb-1">Cuisson à l'Ancienne</h3>
                      <p className="text-gray-600 text-sm">Four à sole pour une cuisson parfaite</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative"
              >
                <img
                    src="/images/Beignet sucre1.jpg"
                    alt="Nos spécialités"
                    className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
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
                className="text-center"
            >
              <h2 className="text-3xl font-bold font-serif text-brown mb-8">
                Horaires de Production
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <Clock size={32} className="text-gold mx-auto mb-4" />
                  <h3 className="font-bold text-brown mb-2">Pains</h3>
                  <p className="text-gray-600 text-sm">
                    Disponibles dès 7h<br />
                    Nouvelles fournées à 11h et 16h
                  </p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <Clock size={32} className="text-gold mx-auto mb-4" />
                  <h3 className="font-bold text-brown mb-2">Viennoiseries</h3>
                  <p className="text-gray-600 text-sm">
                    Première fournée à 7h<br />
                    Beignets chauds jusqu'à 10h
                  </p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <Clock size={32} className="text-gold mx-auto mb-4" />
                  <h3 className="font-bold text-brown mb-2">Spécialités</h3>
                  <p className="text-gray-600 text-sm">
                    Sur commande 24h à l'avance<br />
                    Disponibles selon saison
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
  )
}

export default Boulangerie