import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Patisserie from './pages/Patisserie'
import Boulangerie from './pages/Boulangerie'
import Restaurant from './pages/Restaurant'
import Order from './pages/Order'
import Reservation from './pages/Reservation'
import Login from './pages/Login'
import Profile from './pages/Profile'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-cream">
          <Header />
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/patisserie" element={<Patisserie />} />
              <Route path="/boulangerie" element={<Boulangerie />} />
              <Route path="/restaurant" element={<Restaurant />} />
              <Route path="/commander" element={<Order />} />
              <Route path="/reservation" element={<Reservation />} />
              <Route path="/connexion" element={<Login />} />
              <Route path="/profil" element={<Profile />} />
            </Routes>
          </motion.main>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
