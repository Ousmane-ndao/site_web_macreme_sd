import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, User, Phone, MapPin, CreditCard, ArrowLeft } from 'lucide-react'

// Définition des interfaces
interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    category?: string;
}

interface FormData {
    customer_name: string;
    customer_phone: string;
    adresse: string;
    instructions: string;
    methodePaiement: string;
}

interface WhatsAppOrderProps {
    cartItems: CartItem[];
    onOrderSent: () => void;
    onBack: () => void;
}

interface OrderData {
    customer_name: string;
    customer_phone: string;
    items: Array<{
        id: string;
        name: string;
        price: number;
        qty: number;
        category?: string;
    }>;
    total: number;
    adresse: string;
    instructions: string;
    payment_method: string;
}

interface BackendResponse {
    ok: boolean;
    id?: string;
    error?: string;
    url?: string;
}

const WhatsAppOrder: React.FC<WhatsAppOrderProps> = ({
                                                         cartItems,
                                                         onOrderSent,
                                                         onBack
                                                     }) => {
    const [formData, setFormData] = useState<FormData>({
        customer_name: '',
        customer_phone: '',
        adresse: '',
        instructions: '',
        methodePaiement: 'wave'
    })

    // ⚠️ AJOUT: État pour empêcher la double soumission
    const [isSubmitting, setIsSubmitting] = useState(false)

    const calculateTotal = (): number => {
        return cartItems.reduce((total: number, item: CartItem) => total + (item.price * item.quantity), 0)
    }

    // Fonction pour sauvegarder la commande dans votre backend
    const saveOrderToBackend = async (): Promise<string | null> => {
        try {
            // Préparer les données au format de votre backend
            const orderData: OrderData = {
                customer_name: formData.customer_name,
                customer_phone: formData.customer_phone,
                items: cartItems.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    qty: item.quantity,
                    category: item.category
                })),
                total: calculateTotal(),
                adresse: formData.adresse,
                instructions: formData.instructions,
                payment_method: formData.methodePaiement
            }

            console.log('📦 Envoi de la commande au backend:', orderData)

            const response = await fetch('http://localhost:4000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData)
            })

            // ⚠️ AJOUT: Vérification du statut HTTP
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`)
            }

            const result: BackendResponse = await response.json()

            if (result.ok && result.id) {
                console.log('✅ Commande sauvegardée avec ID:', result.id)
                return result.id
            } else {
                throw new Error(result.error || 'Erreur lors de la sauvegarde')
            }
        } catch (error) {
            console.error('❌ Erreur sauvegarde commande:', error)
            // En cas d'erreur, on continue quand même avec WhatsApp
            return null
        }
    }

    // Fonction pour générer le lien WhatsApp via votre backend
    const generateWhatsAppLink = async (orderId: string): Promise<string> => {
        try {
            const response = await fetch(`http://localhost:4000/api/whatsapp-link/${orderId}`)

            // ⚠️ AJOUT: Vérification du statut HTTP
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`)
            }

            const result: BackendResponse = await response.json()

            if (result.ok && result.url) {
                return result.url
            } else {
                throw new Error(result.error || 'Erreur génération lien WhatsApp')
            }
        } catch (error) {
            console.error('❌ Erreur génération lien WhatsApp:', error)
            // Fallback: générer le message manuellement
            return generateWhatsAppMessageManually()
        }
    }

    // Fallback si le backend ne répond pas
    const generateWhatsAppMessageManually = (): string => {
        const { customer_name, customer_phone, adresse, instructions, methodePaiement } = formData

        let message = `🍞 NOUVELLE COMMANDE - Ma Crème 🍰\n\n`
        message += `👤 *Client:* ${customer_name}\n`
        message += `📞 *Téléphone:* ${customer_phone}\n`
        message += `📍 *Adresse:* ${adresse}\n\n`

        message += `📋 *DÉTAILS DE LA COMMANDE:*\n`
        cartItems.forEach(item => {
            message += `• ${item.name} x${item.quantity} - ${(item.price * item.quantity).toFixed(2)} FCFA\n`
        })

        message += `\n💰 *TOTAL: ${calculateTotal().toFixed(2)} FCFA*\n`
        message += `💳 *Paiement: ${getPaymentMethodText(methodePaiement)}*\n`

        if (instructions) {
            message += `\n📝 *Instructions:* ${instructions}\n`
        }

        message += `\n⏰ *Heure de commande:* ${new Date().toLocaleString('fr-FR')}`

        const whatsappNumber = '221763034401'
        return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    }

    const getPaymentMethodText = (method: string): string => {
        const methods: { [key: string]: string } = {
            'wave': 'Wave',
            'orange_money': 'Orange Money',
            'especes': 'Espèces à la livraison'
        }
        return methods[method] || method
    }

    // ⚠️ CORRECTION: Fonction handleSubmit avec protection double soumission
    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault()

        // ⚠️ EMPÊCHER LA DOUBLE SOUMISSION
        if (isSubmitting) {
            console.log('⏳ Soumission déjà en cours...')
            return
        }

        if (!formData.customer_name || !formData.customer_phone || !formData.adresse || !formData.methodePaiement) {
            alert('Veuillez remplir tous les champs obligatoires')
            return
        }

        // ⚠️ DÉBUT DE LA SOUMISSION
        setIsSubmitting(true)
        console.log('🚀 Début de la soumission...')

        try {
            // 1. Sauvegarder la commande dans le backend
            const orderId = await saveOrderToBackend()

            // 2. Générer le lien WhatsApp
            let whatsappUrl: string
            if (orderId) {
                whatsappUrl = await generateWhatsAppLink(orderId)
            } else {
                // Fallback si la sauvegarde échoue
                whatsappUrl = generateWhatsAppMessageManually()
            }

            // 3. Ouvrir WhatsApp
            window.open(whatsappUrl, '_blank')

            // 4. Sauvegarder localement aussi
            saveOrderToLocal(orderId)

            // 5. Notifier le parent
            onOrderSent()

            console.log('✅ Commande traitée avec succès')

        } catch (error) {
            console.error('❌ Erreur lors de la commande:', error)
            alert('Erreur lors de la création de la commande. Veuillez réessayer.')
        } finally {
            // ⚠️ IMPORTANT: Réactiver le formulaire
            setIsSubmitting(false)
            console.log('🔄 Formulaire réactivé')
        }
    }

    const saveOrderToLocal = (orderId: string | null): void => {
        const order = {
            id: orderId,
            reference: orderId ? `CMD${orderId}` : `TEMP${Date.now()}`,
            client: formData,
            products: cartItems,
            total: calculateTotal(),
            date: new Date().toISOString()
        }

        const orders = JSON.parse(localStorage.getItem('ma_creme_orders') || '[]')
        orders.push(order)
        localStorage.setItem('ma_creme_orders', JSON.stringify(orders))
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen bg-cream py-16"
        >
            <div className="container-max">
                <div className="max-w-2xl mx-auto">
                    {/* Bouton retour */}
                    <button
                        onClick={onBack}
                        className="flex items-center text-brown hover:text-warm-brown mb-6 transition-colors"
                    >
                        <ArrowLeft size={20} className="mr-2" />
                        Retour à la commande
                    </button>

                    {/* En-tête */}
                    <div className="text-center mb-8">
                        <div className="text-green-600 mx-auto mb-4 text-5xl">📱</div>
                        <h1 className="text-4xl font-bold font-serif text-brown mb-2">
                            Commander via WhatsApp
                        </h1>
                        <p className="text-lg text-gray-600">
                            Remplissez le formulaire et envoyez directement sur WhatsApp
                        </p>
                    </div>

                    {/* Résumé de la commande */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-2xl shadow-lg p-6 mb-6"
                    >
                        <h3 className="text-xl font-bold font-serif text-brown mb-4">
                            Votre Commande
                        </h3>
                        {cartItems.map((item: CartItem) => (
                            <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                                <div>
                                    <span className="font-medium text-brown">{item.name}</span>
                                    <span className="text-sm text-gray-600 ml-2">x{item.quantity}</span>
                                </div>
                                <span className="font-semibold">{(item.price * item.quantity).toFixed(2)} FCFA</span>
                            </div>
                        ))}
                        <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-200">
                            <span className="text-lg font-bold text-brown">Total</span>
                            <span className="text-lg font-bold text-brown">{calculateTotal().toFixed(2)} FCFA</span>
                        </div>
                    </motion.div>

                    {/* Formulaire */}
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        onSubmit={handleSubmit}
                        className="bg-white rounded-2xl shadow-lg p-6 space-y-6"
                    >
                        {/* Nom */}
                        <div>
                            <label className="flex items-center text-sm font-medium text-brown mb-2">
                                <User size={16} className="mr-2" />
                                Nom complet *
                            </label>
                            <input
                                type="text"
                                name="customer_name"
                                value={formData.customer_name}
                                onChange={handleInputChange}
                                required
                                disabled={isSubmitting} // ⚠️ Désactiver pendant la soumission
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown focus:border-transparent disabled:opacity-50"
                                placeholder="Votre nom complet"
                            />
                        </div>

                        {/* Téléphone */}
                        <div>
                            <label className="flex items-center text-sm font-medium text-brown mb-2">
                                <Phone size={16} className="mr-2" />
                                Téléphone *
                            </label>
                            <input
                                type="tel"
                                name="customer_phone"
                                value={formData.customer_phone}
                                onChange={handleInputChange}
                                required
                                disabled={isSubmitting} // ⚠️ Désactiver pendant la soumission
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown focus:border-transparent disabled:opacity-50"
                                placeholder="Votre numéro de téléphone"
                            />
                        </div>

                        {/* Adresse */}
                        <div>
                            <label className="flex items-center text-sm font-medium text-brown mb-2">
                                <MapPin size={16} className="mr-2" />
                                Adresse de livraison *
                            </label>
                            <textarea
                                name="adresse"
                                value={formData.adresse}
                                onChange={handleInputChange}
                                required
                                rows={3}
                                disabled={isSubmitting} // ⚠️ Désactiver pendant la soumission
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown focus:border-transparent resize-none disabled:opacity-50"
                                placeholder="Votre adresse complète"
                            />
                        </div>

                        {/* Méthode de paiement */}
                        <div>
                            <label className="flex items-center text-sm font-medium text-brown mb-2">
                                <CreditCard size={16} className="mr-2" />
                                Méthode de paiement *
                            </label>
                            <select
                                name="methodePaiement"
                                value={formData.methodePaiement}
                                onChange={handleInputChange}
                                required
                                disabled={isSubmitting} // ⚠️ Désactiver pendant la soumission
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown focus:border-transparent disabled:opacity-50"
                            >
                                <option value="wave">Wave</option>
                                <option value="orange_money">Orange Money</option>
                                <option value="especes">Espèces à la livraison</option>
                            </select>
                        </div>

                        {/* Instructions */}
                        <div>
                            <label className="flex items-center text-sm font-medium text-brown mb-2">
                                <MessageCircle size={16} className="mr-2" />
                                Instructions spéciales
                            </label>
                            <textarea
                                name="instructions"
                                value={formData.instructions}
                                onChange={handleInputChange}
                                rows={3}
                                disabled={isSubmitting} // ⚠️ Désactiver pendant la soumission
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown focus:border-transparent resize-none disabled:opacity-50"
                                placeholder="Allergies, heure de livraison préférée, code porte..."
                            />
                        </div>

                        {/* Bouton d'envoi */}
                        <button
                            type="submit"
                            disabled={isSubmitting} // ⚠️ Désactiver pendant la soumission
                            className="w-full py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-xl font-semibold transition-all transform hover:scale-105 disabled:scale-100 flex items-center justify-center gap-3 text-lg disabled:cursor-not-allowed"
                        >
                            <span className="text-2xl">📱</span>
                            {isSubmitting ? 'Envoi en cours...' : 'Envoyer la commande sur WhatsApp'}
                        </button>

                        {/* Information */}
                        <div className="text-center text-sm text-gray-600 mt-4">
                            <p>La commande sera sauvegardée et envoyée au : <strong>+221 76 303 44 01</strong></p>
                        </div>
                    </motion.form>
                </div>
            </div>
        </motion.div>
    )
}

export default WhatsAppOrder