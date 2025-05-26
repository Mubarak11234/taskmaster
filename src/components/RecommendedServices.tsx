
import { Star } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const RecommendedServices = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const recommendations = [
    {
      id: 1,
      providerName: "Emma Davis",
      service: "Garden Maintenance",
      rating: 4.6,
      price: "$40/hr",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=200&fit=crop",
      aiReason: "Based on your previous bookings"
    },
    {
      id: 2,
      providerName: "Tech Solutions",
      service: "Computer Repair",
      rating: 4.8,
      price: "$60/hr",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=300&h=200&fit=crop",
      aiReason: "Popular in your area"
    },
    {
      id: 3,
      providerName: "Pet Care Plus",
      service: "Pet Sitting",
      rating: 4.9,
      price: "$25/hr",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=200&fit=crop",
      aiReason: "Trending this week"
    }
  ];

  const handleViewDetails = (serviceId: number, serviceName: string) => {
    setSelectedService(serviceId);
    console.log(`Viewing details for: ${serviceName}`);
    toast({
      title: "Service Details",
      description: `Viewing details for ${serviceName}`,
    });
  };

  const handleBookService = (serviceId: number, serviceName: string) => {
    console.log(`Booking service: ${serviceName}`);
    toast({
      title: "Booking Started",
      description: `Starting booking for ${serviceName}`,
    });
    navigate('/bookings');
  };

  return (
    <div className="px-4 py-6">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Recommended for You</h2>
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-medium">
          AI
        </div>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-2">
        {recommendations.map((service) => (
          <div
            key={service.id}
            className={`bg-white rounded-2xl p-3 shadow-sm border border-gray-100 min-w-[280px] hover:shadow-md transition-shadow cursor-pointer ${
              selectedService === service.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => handleViewDetails(service.id, service.service)}
          >
            <div className="relative mb-3">
              <img
                src={service.image}
                alt={service.service}
                className="w-full h-32 object-cover rounded-xl"
              />
              <div className="absolute top-2 right-2 bg-black/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                {service.aiReason}
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-800 truncate">{service.providerName}</h3>
              <p className="text-gray-600 text-sm truncate">{service.service}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{service.rating}</span>
                </div>
                <span className="text-primary font-semibold">{service.price}</span>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewDetails(service.id, service.service);
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  View Details
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookService(service.id, service.service);
                  }}
                  className="flex-1 bg-primary text-white py-2 rounded-xl font-medium hover:bg-primary/90 transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedServices;
