import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChefHat, Wheat, UtensilsCrossed, Star, ArrowRight, Users, Award, Clock } from 'lucide-react'

const Home: React.FC = () => {
  const services = [
    {
      icon: ChefHat,
      title: 'Pâtisserie',
      description: 'Nos créations sucrées artisanales, des classiques revisités aux créations originales.',
      link: '/patisserie',
      image: 'https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: Wheat,
      title: 'Boulangerie',
      description: 'Pains traditionnels et spécialités boulangères façonnés avec passion chaque matin.',
      link: '/boulangerie',
      image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: UtensilsCrossed,
      title: 'Restaurant',
      description: 'Une cuisine gourmande mettant en valeur les produits frais et de saison.',
      link: '/restaurant',
      image: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ]

  const features = [
    {
      icon: Users,
      title: 'Expérience Client',
      description: 'Un service personnalisé et chaleureux pour chaque visite'
    },
    {
      icon: Award,
      title: 'Qualité Artisanale',
      description: 'Des produits faits main avec les meilleurs ingrédients'
    },
    {
      icon: Clock,
      title: 'Fraîcheur Garantie',
      description: 'Productions quotidiennes pour une fraîcheur optimale'
    }
  ]

  return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-warm min-h-screen flex items-center">
          <div className="absolute inset-0 bg-black/20"></div>
          <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: 'url(https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1600)'
              }}
          ></div>
          <div className="relative z-10 container-max text-center text-white">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold font-serif mb-6">
                SDCREME
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
                L'art de la gourmandise réuni en un lieu unique :
                pâtisserie, boulangerie et restaurant d'exception
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/commander" className="btn-primary">
                  Commander en ligne
                </Link>
                <Link to="/reservation" className="btn-secondary">
                  Réserver une table
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section className="section-padding bg-white">
          <div className="container-max">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold font-serif text-brown mb-6">
                Nos Trois Univers
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Découvrez nos trois pôles d'excellence, chacun reflétant notre passion
                pour l'artisanat et la qualité
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                  <motion.div
                      key={service.title}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      className="group"
                  >
                    <Link to={service.link} className="block">
                      <div className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover">
                        <div className="relative h-64 overflow-hidden">
                          <img
                              src={service.image}
                              alt={service.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                          <div className="absolute bottom-4 left-4">
                            <service.icon size={40} className="text-white mb-2" />
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-2xl font-bold font-serif text-brown mb-3">
                            {service.title}
                          </h3>
                          <p className="text-gray-600 mb-4 leading-relaxed">
                            {service.description}
                          </p>
                          <div className="flex items-center text-brown font-semibold group-hover:text-gold transition-colors">
                            <span>Découvrir</span>
                            <ArrowRight size={20} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section-padding bg-cream">
          <div className="container-max">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold font-serif text-brown mb-6">
                Notre Engagement
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ce qui nous anime chaque jour dans notre métier d'artisan
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                  <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="text-center p-8 bg-white rounded-2xl shadow-lg card-hover"
                  >
                    <div className="bg-gold/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                      <feature.icon size={40} className="text-gold" />
                    </div>
                    <h3 className="text-2xl font-bold font-serif text-brown mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="section-padding bg-white">
          <div className="container-max">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold font-serif text-brown mb-6">
                Ils Nous Font Confiance
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: 'Mbagnick Ndiaye',
                  text: 'Les pâtisseries sont absolument divines ! Un vrai régal pour les yeux et les papilles.',
                  rating: 5
                },
                {
                  name: 'Sokhna Baldé',
                  text: 'Le meilleur pain de Paris, aucun doute ! Et l\'accueil est toujours chaleureux.',
                  rating: 5
                },
                {
                  name: 'Seydina Ousmane',
                  text: 'Le restaurant propose une cuisine raffinée dans un cadre très agréable.',
                  rating: 5
                }
              ].map((testimonial, index) => (
                  <motion.div
                      key={testimonial.name}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-cream p-6 rounded-2xl shadow-lg"
                  >
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} size={20} className="text-gold fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 italic mb-4">"{testimonial.text}"</p>
                    <p className="font-semibold text-brown">— {testimonial.name}</p>
                  </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-gradient-brown text-white">
          <div className="container-max text-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6">
                Prêt à Vivre l'Expérience SDCREME ?
              </h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto">
                Commandez en ligne ou réservez votre table pour découvrir nos créations
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/commander" className="btn-secondary">
                  Commander maintenant
                </Link>
                <Link to="/reservation" className="btn-outline border-white text-white hover:bg-white hover:text-brown">
                  Réserver une table
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
  )
}

export default Home