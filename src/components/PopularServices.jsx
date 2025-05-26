
import { useServiceProviders } from '../hooks/useServices';
import { Star } from "lucide-react";
import { Skeleton } from './ui/skeleton';
import { Button } from './ui/button';
import { useToast } from '../hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ServiceProviderDetails from './ServiceProviderDetails';

const PopularServices = () => {
  const { data: providers, isLoading, error } = useServiceProviders();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedProvider, setSelectedProvider] = useState(null);

  const handleBookNow = (providerId, providerName) => {
    console.log(`Booking service from: ${providerName}`);
    toast({
      title: "Booking Initiated",
      description: `Starting booking process with ${providerName}`,
    });
    navigate('/bookings');
  };

  const handleViewProvider = (provider) => {
    setSelectedProvider(provider);
  };

  if (isLoading) {
    return (
      <div className="px-4 py-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Popular Services</h2>
        <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-start gap-4">
                <Skeleton className="w-16 h-16 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Popular Services</h2>
        <p className="text-red-500">Failed to load services</p>
      </div>
    );
  }

  const topProviders = providers?.slice(0, 3) || [];

  return (
    <>
      <div className="px-4 py-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Popular Services</h2>
        <div className="space-y-4 lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-4 lg:space-y-0">
          {topProviders.map((provider) => (
            <div
              key={provider.id}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleViewProvider(provider)}
            >
              <div className="flex items-start gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white text-xl font-bold">
                      {provider.business_name.charAt(0)}
                    </span>
                  </div>
                  {provider.is_verified && (
                    <div className="absolute -top-1 -right-1 bg-green-500 w-5 h-5 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">{provider.business_name}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{provider.description}</p>
                    </div>
                    {provider.is_verified && (
                      <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap ml-2">
                        Verified Pro
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{provider.rating}</span>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">({provider.total_reviews} reviews)</span>
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookNow(provider.id, provider.business_name);
                    }}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedProvider && (
        <ServiceProviderDetails 
          provider={selectedProvider} 
          onClose={() => setSelectedProvider(null)} 
        />
      )}
    </>
  );
};

export default PopularServices;
