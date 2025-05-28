import { useServiceProviders } from '@/hooks/useServices';
import { Star } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const PopularServices = () => {
  const { data: providers, isLoading, error } = useServiceProviders();
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Navigate to provider's service list page
  const handleProviderClick = (providerId) => {
    navigate(`/provider/${providerId}`);
  };

  if (isLoading) {
    return (
      <div className="px-4 py-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Popular Services</h2>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4"
          >
            <Skeleton className="w-16 h-16 rounded-xl" />
            <Skeleton className="h-5 w-32 mt-2" />
            <Skeleton className="h-4 w-24 mt-1" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="px-4 py-6 text-red-500">Failed to load providers</div>;
  }

  const topProviders = providers?.slice(0, 3) || [];

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Popular Services</h2>
      <div className="space-y-4 lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-4 lg:space-y-0">
        {topProviders.map((provider) => (
          <div
            key={provider.id}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition"
            onClick={() => handleProviderClick(provider.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleProviderClick(provider.id);
            }}
          >
            <div className="flex items-start gap-4">
              <div className="relative w-16 h-16 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shrink-0 overflow-hidden">
  <span className="text-white text-2xl font-bold leading-none select-none">
    {(provider?.business_name?.trim()?.[0] || 'P').toUpperCase()}
  </span>

  {provider?.is_verified && (
    <div className="absolute -top-1 -right-1 bg-green-500 w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white">
      <span className="text-white text-xs font-semibold">✓</span>
    </div>
  )}
</div>

              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{provider.business_name}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">{provider.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{provider.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularServices;
