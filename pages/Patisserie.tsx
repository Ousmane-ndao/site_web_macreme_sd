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
  weight?: string
}

const Patisserie: React.FC = () => {
  const { addToCart } = useCart()
  const [selectedCategory, setSelectedCategory] = useState('all')

  const products: Product[] = [
    // COURONNES
    {
      id: 'c1',
      name: 'Couronne Fleur d\'Oranger',
      description: 'Couronne briochée subtilement parfumée à la fleur d\'oranger, texture moelleuse',
      price: 1800,
      image: '/images/Couronne_fleur_oranger-1.png',
      category: 'couronnes',
      rating: 4.8,
      inStock: true,
      weight: '350g'
    },

    {
      id: 'c3',
      name: 'Couronne Pépites de Chocolat',
      description: 'Couronne gourmande aux généreuses pépites de chocolat noir, cœur fondant',
      price: 2000,
      image: '/images/Couronne_pepites_choco_detouree.png',
      category: 'couronnes',
      rating: 4.7,
      inStock: true,
      weight: '380g'
    },
    {
      id: 'c4',
      name: 'Couronne Sucre Perlé',
      description: 'Couronne briochée saupoudrée de sucre perlé, croustillant et douceur',
      price: 1700,
      image: '/images/Couronne_sucre_perle.png',
      category: 'couronnes',
      rating: 4.6,
      inStock: true,
      weight: '360g'
    },

    // BRIOCHES SPÉCIALES
    {
      id: 'b1',
      name: 'Brioche Festival',
      description: 'Brioche festive aux formes originales, parfaite pour les célébrations',
      price: 2500,
      image: '/images/brioche festival.png',
      category: 'brioches',
      rating: 4.8,
      inStock: true,
      weight: '450g'
    },
    {
      id: 'b2',
      name: 'Brioche Cœur',
      description: 'Brioche en forme de cœur, tendre et généreuse, idéale pour les occasions spéciales',
      price: 1900,
      image: '/images/Brioche_Coeur.png',
      category: 'brioches',
      rating: 4.9,
      inStock: true,
      weight: '320g'
    },

    // CRÉATIONS MINIATURES
    {
      id: 'm1',
      name: 'Brioche Façon Crêpe Mini',
      description: 'Mini brioche revisitée façon crêpe, texture unique et délicate',
      price: 600,
      image: '/images/Brioche_facon_crepe_mini.png',
      category: 'miniatures',
      rating: 4.5,
      inStock: true
    },
    {
      id: 'm2',
      name: 'Brioche Perdue Mini',
      description: 'Revisitation gourmande du pain perdu en format mini, caramelisé à perfection',
      price: 700,
      image: '/images/brioche_perdue_mini.png',
      category: 'miniatures',
      rating: 4.7,
      inStock: true
    },

    {
      id: 'm4',
      name: 'Burger Mini',
      description: 'Mini burger brioché, création originale salée-sucrée',
      price: 800,
      image: '/images/burger_mini.png',
      category: 'miniatures',
      rating: 4.4,
      inStock: true
    },

    // SPÉCIALITÉS SAISONNIÈRES

  ]

  const categories = [
    { id: 'all', name: 'Tout', count: products.length },
    { id: 'couronnes', name: 'Couronnes', count: products.filter(p => p.category === 'couronnes').length },
    { id: 'brioches', name: 'Brioches', count: products.filter(p => p.category === 'brioches').length },
    { id: 'miniatures', name: 'Miniatures', count: products.filter(p => p.category === 'miniatures').length },
    { id: 'saisonniers', name: 'Saisonniers', count: products.filter(p => p.category === 'saisonniers').length }
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
                backgroundImage: 'url(/images/Couronne_fruits_config_detouree.png)'
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
                Découvrez nos créations briochées uniques, couronnes artisanales
                et spécialités miniatures préparées avec passion
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
                Nos Créations
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
                            e.currentTarget.src = `https://via.placeholder.com/400x300/E9C46A/000000?text=${encodeURIComponent(product.name)}`
                          }}
                      />
                      {!product.inStock && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
                        Temporairement indisponible
                      </span>
                          </div>
                      )}
                      {product.weight && (
                          <div className="absolute top-4 left-4 bg-brown text-white px-3 py-1 rounded-full text-sm font-semibold">
                            {product.weight}
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
                  L'Art de la Boulangerie-Pâtisserie
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  Notre savoir-faire s'exprime à travers nos couronnes briochées,
                  nos créations miniatures et nos spécialités saisonnières.
                  Chaque produit est le résultat d'un travail artisanal méticuleux
                  et d'une sélection rigoureuse des meilleurs ingrédients.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                  <div className="text-center">
                    <div className="bg-gold/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">👑</span>
                    </div>
                    <h3 className="font-bold text-brown mb-2">Couronnes Artisanales</h3>
                    <p className="text-gray-600 text-sm">Façonnées à la main avec passion</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gold/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🔍</span>
                    </div>
                    <h3 className="font-bold text-brown mb-2">Miniatures Gourmandes</h3>
                    <p className="text-gray-600 text-sm">Découvertes en format mini</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gold/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🎄</span>
                    </div>
                    <h3 className="font-bold text-brown mb-2">Créations Saisonnières</h3>
                    <p className="text-gray-600 text-sm">Spécialités pour chaque fête</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Saisonnalité Section */}
        <section className="section-padding bg-cream">
          <div className="container-max">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
            >
              <h2 className="text-3xl font-bold font-serif text-brown mb-8">
                Nos Spécialités
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <div className="text-3xl mb-4">👑</div>
                  <h3 className="font-bold text-brown mb-2">Couronnes</h3>
                  <p className="text-gray-600 text-sm">
                    Brioches artisanales façonnées en couronne, disponibles en plusieurs parfums
                  </p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <div className="text-3xl mb-4">💖</div>
                  <h3 className="font-bold text-brown mb-2">Brioches Spéciales</h3>
                  <p className="text-gray-600 text-sm">
                    Formes originales pour occasions particulières
                  </p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <div className="text-3xl mb-4">🔍</div>
                  <h3 className="font-bold text-brown mb-2">Format Mini</h3>
                  <p className="text-gray-600 text-sm">
                    Dégustations individuelles et créations innovantes
                  </p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <div className="text-3xl mb-4">🎁</div>
                  <h3 className="font-bold text-brown mb-2">Événements</h3>
                  <p className="text-gray-600 text-sm">
                    Créations spéciales pour fêtes et célébrations
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
  )
}

export default Patisserie