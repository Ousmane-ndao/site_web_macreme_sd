
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
    message?: string;
    className?: string;
}

const WhatsAppButton = ({
                            message = "Bonjour, je souhaiterais avoir des informations sur vos produits SDBRIOCH",
                            className = ""
                        }: WhatsAppButtonProps) => {
    const phoneNumber = "221773932069"; // Numéro WhatsApp SDBRIOCH

    const handleWhatsAppClick = () => {
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <button
            onClick={handleWhatsAppClick}
            className={`fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50 animate-bounce ${className}`}
            title="Contactez-nous sur WhatsApp"
        >
            <MessageCircle className="h-6 w-6" />
            <span className="sr-only">WhatsApp</span>
        </button>
    );
};

export default WhatsAppButton;