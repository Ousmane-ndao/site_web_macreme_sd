import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import {
    Package,
    DollarSign,
    Clock,
    CheckCircle,
    XCircle,
    RefreshCw,
    Search,
    Filter
} from 'lucide-react';
import { Navigate } from 'react-router-dom';

interface Order {
    id: string;
    customer_name: string;
    customer_phone: string;
    items: Array<{
        id: string;
        name: string;
        price: number;
        quantity: number;
        category: string;
    }>;
    total: number;
    status: string;
    created_at: string;
    updated_at: string;
}

const Admin: React.FC = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const isAdmin = user && (user.email === 'ousmanendao1124@gmail.com' || user.role === 'admin');

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('auth_token');
            const response = await fetch('http://localhost:4000/api/admin/orders', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();

                // Filtrage pour ne garder que les vraies commandes valides
                const realOrders = (data.orders || []).filter((order: Order) => {
                    const isValidName = order.customer_name && order.customer_name.trim().length > 1 && !/test/i.test(order.customer_name);
                    const isValidPhone = order.customer_phone && order.customer_phone.trim().length >= 8;
                    const hasItems = Array.isArray(order.items) && order.items.length > 0;
                    const hasValidTotal = order.total > 0;
                    return isValidName && isValidPhone && hasItems && hasValidTotal;
                });

                console.log("📦 Commandes valides:", realOrders);
                setOrders(realOrders);
            } else {
                console.warn("❌ Erreur réponse serveur (admin/orders):", response.status);
            }
        } catch (error) {
            console.error('❌ Erreur lors du fetch des commandes:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderId: string, newStatus: string) => {
        try {
            const token = localStorage.getItem('auth_token');
            const response = await fetch(`http://localhost:4000/api/admin/orders/${orderId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                fetchOrders();
            } else {
                console.warn("❌ Erreur lors de la mise à jour du statut:", response.status);
            }
        } catch (error) {
            console.error('❌ Erreur update statut:', error);
        }
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer_phone.includes(searchTerm) ||
            order.id.toString().includes(searchTerm);

        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const stats = {
        total_orders: orders.length,
        pending_orders: orders.filter(o => o.status === 'pending').length,
        completed_orders: orders.filter(o => o.status === 'completed').length,
        cancelled_orders: orders.filter(o => o.status === 'cancelled').length,
        total_revenue: orders.reduce((sum, order) => sum + (Number(order.total) || 0), 0)
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800 border-green-200';
            case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
            case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'completed': return 'Terminée';
            case 'cancelled': return 'Annulée';
            case 'pending': return 'En attente';
            default: return status;
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-cream flex items-center justify-center">
                <div className="text-center">
                    <RefreshCw className="animate-spin h-12 w-12 text-brown mx-auto" />
                    <p className="mt-4 text-gray-600">Chargement des commandes...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream py-8">
            <div className="container-max">
                {/* En-tête */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <h1 className="text-4xl font-bold font-serif text-brown mb-2">
                        Tableau de Bord Administrateur
                    </h1>
                    <p className="text-lg text-gray-600">
                        Gestion complète des commandes clients
                    </p>
                </motion.div>

                {/* Statistiques */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Commandes</p>
                                <p className="text-2xl font-bold text-brown">{stats.total_orders}</p>
                            </div>
                            <Package className="text-blue-600" size={24} />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">En Attente</p>
                                <p className="text-2xl font-bold text-orange-600">{stats.pending_orders}</p>
                            </div>
                            <Clock className="text-orange-600" size={24} />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Terminées</p>
                                <p className="text-2xl font-bold text-green-600">{stats.completed_orders}</p>
                            </div>
                            <CheckCircle className="text-green-600" size={24} />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Revenu Total</p>
                                <p className="text-2xl font-bold text-green-600">
                                    {(Number(stats.total_revenue) || 0).toFixed(2)} FCFA
                                </p>
                            </div>
                            <DollarSign className="text-green-600" size={24} />
                        </div>
                    </div>
                </div>

                {/* Filtres */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200">
                    <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                        <div className="flex flex-col md:flex-row gap-4 flex-1">
                            <div className="relative flex-1 md:max-w-md">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Rechercher par nom, téléphone ou ID..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown focus:border-transparent"
                                />
                            </div>

                            <div className="flex items-center space-x-2">
                                <Filter size={18} className="text-gray-600" />
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brown focus:border-transparent"
                                >
                                    <option value="all">Tous les statuts</option>
                                    <option value="pending">En attente</option>
                                    <option value="completed">Terminées</option>
                                    <option value="cancelled">Annulées</option>
                                </select>
                            </div>
                        </div>

                        <button
                            onClick={fetchOrders}
                            className="flex items-center space-x-2 px-4 py-2 bg-brown text-white rounded-lg hover:bg-warm-brown transition-colors"
                        >
                            <RefreshCw size={16} />
                            <span>Actualiser</span>
                        </button>
                    </div>
                </div>

                {/* Liste des commandes */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                    <h2 className="text-2xl font-bold font-serif text-brown mb-6">
                        Commandes ({filteredOrders.length})
                    </h2>

                    {filteredOrders.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <Package size={48} className="mx-auto mb-4 text-gray-400" />
                            <p>Aucune commande trouvée</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {filteredOrders.map((order) => (
                                <div key={order.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4 gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-4 mb-2">
                                                <h3 className="font-semibold text-lg text-brown">
                                                    Commande #{order.id}
                                                </h3>
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                                                    {getStatusText(order.status)}
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                                                <div>
                                                    <strong>Client:</strong> {order.customer_name}
                                                </div>
                                                <div>
                                                    <strong>Téléphone:</strong> {order.customer_phone}
                                                </div>
                                                <div>
                                                    <strong>Créée le:</strong> {formatDate(order.created_at)}
                                                </div>
                                                <div>
                                                    <strong>Total:</strong> {(Number(order.total) || 0).toFixed(2)} FCFA
                                                </div>
                                            </div>
                                        </div>

                                        {order.status === 'pending' && (
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => updateOrderStatus(order.id, 'completed')}
                                                    className="flex items-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                                                >
                                                    <CheckCircle size={16} />
                                                    <span>Terminer</span>
                                                </button>
                                                <button
                                                    onClick={() => updateOrderStatus(order.id, 'cancelled')}
                                                    className="flex items-center space-x-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                                                >
                                                    <XCircle size={16} />
                                                    <span>Annuler</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="border-t pt-4">
                                        <h4 className="font-semibold text-brown mb-3">Articles commandés:</h4>
                                        <div className="space-y-2">
                                            {order.items.map((item, index) => (
                                                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                                                    <div>
                                                        <p className="font-medium">{item.name}</p>
                                                        <p className="text-sm text-gray-600 capitalize">{item.category}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-semibold">{(item.price * item.quantity).toFixed(2)} FCFA</p>
                                                        <p className="text-sm text-gray-600">{item.quantity} x {item.price.toFixed(2)} FCFA</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Admin;
