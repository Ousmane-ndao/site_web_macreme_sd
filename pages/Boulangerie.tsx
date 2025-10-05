import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Clock, Wheat } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface BakeryProduct {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    availability: string;
    weight?: string;
}

const Boulangerie: React.FC = () => {
    const { addToCart } = useCart();
    const [selectedCategory, setSelectedCategory] = useState('all');

    const products: BakeryProduct[] = [
        // BRIOCHES
        {
            id: 'b1',
            name: 'Brioche Traditionnelle',
            description: 'Brioche moelleuse et légère, dorée à perfection',
            price: 1800,
            image: '/images/packshot_brioche-traditionnelle.png',
            category: 'brioches',
            availability: 'Disponible dès 7h',
            weight: '400g'
        },
        {
            id: 'b2',
            name: 'Brioche Tressée',
            description: 'Brioche artisanalement tressée, texture aérienne',
            price: 2200,
            image: '/images/Les brioches.png',
            category: 'brioches',
            availability: 'Disponible le weekend',
            weight: '500g'
        },

        // VIENNOISERIES SPÉCIALES
        {
            id: 'v1',
            name: 'Pain à la Citrouille',
            description: 'Pain moelleux à la purée de citrouille, épices douces',
            price: 1600,
            image: '/images/Pain à la citrouille.png',
            category: 'viennoiseries',
            availability: 'Saison automne/hiver',
            weight: '350g'
        },
        {
            id: 'v2',
            name: 'Sapin Pépites de Chocolat',
            description: 'Viennoiserie en forme de sapin, généreusement garnie de pépites de chocolat',
            price: 1200,
            image: '/images/Sapin_pepites_de_chocolat.png',
            category: 'viennoiseries',
            availability: 'Saison de Noël'
        },
        {
            id: 'v3',
            name: 'Sapin Sucre Perlé',
            description: 'Sapin brioché saupoudré de sucre perlé, doux et croustillant',
            price: 1100,
            image: '/images/Sapin_sucre_perle.png',
            category: 'viennoiseries',
            availability: 'Saison de Noël'
        },

        // PÂTISSERIES
        {
            id: 'p1',
            name: 'Tarte Tatin Mini',
            description: 'Mini tarte tatin caramélisée, pommes fondantes',
            price: 800,
            image: '/images/tatin_mini.png',
            category: 'patisseries',
            availability: 'Disponible toute la journée'
        },
        {
            id: 'p2',
            name: 'Tropézienne Mini',
            description: 'Mini brioche garnie de crème pâtissière et chantilly',
            price: 900,
            image: '/images/tropezienne_mini.png',
            category: 'patisseries',
            availability: 'Disponible toute la journée'
        },
        {
            id: 'p3',
            name: 'Pop Cake Mini',
            description: 'Mini cake moelleux, parfait pour une pause gourmande',
            price: 700,
            image: '/images/pop_cake_mini.png',
            category: 'patisseries',
            availability: 'Disponible toute la journée'
        },

        // SPÉCIALITÉS
        {
            id: 's1',
            name: 'Ronde 6kg',
            description: 'Pain artisanal de 6kg, croûte croustillante et mie alvéolée',
            price: 8500,
            image: '/images/Ronde_6kg.png',
            category: 'specialites',
            availability: 'Sur commande 48h à l\'avance',
            weight: '6kg'
        },
    ];

    const categories = [
        { id: 'all', name: 'Tout', count: products.length },
        { id: 'brioches', name: 'Brioches', count: products.filter(p => p.category === 'brioches').length },
        { id: 'viennoiseries', name: 'Viennoiseries', count: products.filter(p => p.category === 'viennoiseries').length },
        { id: 'patisseries', name: 'Pâtisseries', count: products.filter(p => p.category === 'patisseries').length },
        { id: 'specialites', name: 'Spécialités', count: products.filter(p => p.category === 'specialites').length }
    ];

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(product => product.category === selectedCategory);

    const handleAddToCart = (product: BakeryProduct) => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            category: 'boulangerie',
            image: product.image
        });
    };

    return (
        <div className="min-h-screen bg-cream">
            {/* Hero Section */}
            <section className="relative h-96 bg-gradient-brown flex items-center">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-30"
                    style={{
                        backgroundImage: 'url(/images/packshot_brioche-traditionnelle.png)'
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
                            Découvrez nos brioches artisanales, viennoiseries créatives et pâtisseries gourmandes,
                            préparées avec des ingrédients d'exception
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
                            Nos Délices
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
                                            e.currentTarget.src = `https://via.placeholder.com/400x300/E9C46A/000000?text=${encodeURIComponent(product.name)}`;
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
                                L'Excellence en Boulangerie
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed mb-6">
                                Notre boulangerie allie tradition et innovation pour créer des produits uniques.
                                Chaque brioche, chaque viennoiserie est le fruit d'un savoir-faire minutieux et
                                d'une sélection rigoureuse des meilleurs ingrédients.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <div className="bg-gold/10 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                                        <span className="text-gold font-bold">1</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-brown mb-1">Brioches Artisanales</h3>
                                        <p className="text-gray-600 text-sm">Pétrissage lent et fermentation naturelle</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="bg-gold/10 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                                        <span className="text-gold font-bold">2</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-brown mb-1">Créations Saisonnières</h3>
                                        <p className="text-gray-600 text-sm">Recettes innovantes pour chaque saison</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="bg-gold/10 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                                        <span className="text-gold font-bold">3</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-brown mb-1">Format Mini</h3>
                                        <p className="text-gray-600 text-sm">Pâtisseries individuelles pour tous les plaisirs</p>
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
                                src="/images/Sapin_pepites_de_chocolat.png"
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
                            Nos Horaires de Fabrication
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            <div className="bg-white p-6 rounded-2xl shadow-lg">
                                <Clock size={32} className="text-gold mx-auto mb-4" />
                                <h3 className="font-bold text-brown mb-2">Brioches & Viennoiseries</h3>
                                <p className="text-gray-600 text-sm">
                                    Sorties du four à 7h<br />
                                    Commandes spéciales : 48h à l'avance
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-lg">
                                <Clock size={32} className="text-gold mx-auto mb-4" />
                                <h3 className="font-bold text-brown mb-2">Pâtisseries Miniatures</h3>
                                <p className="text-gray-600 text-sm">
                                    Disponibles toute la journée<br />
                                    Nouveaux lots à 10h et 15h
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-lg">
                                <Clock size={32} className="text-gold mx-auto mb-4" />
                                <h3 className="font-bold text-brown mb-2">Spécialités Saisonnières</h3>
                                <p className="text-gray-600 text-sm">
                                    Périodes limitées<br />
                                    Réservation recommandée
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Boulangerie;