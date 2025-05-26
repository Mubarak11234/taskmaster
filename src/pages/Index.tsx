
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import SearchBar from "@/components/SearchBar";
import ServiceCategories from "@/components/ServiceCategories";
import PopularServices from "@/components/PopularServices";
import RecommendedServices from "@/components/RecommendedServices";
import BottomNavigation from "@/components/BottomNavigation";
import Header from "@/components/Header";

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Desktop and Mobile Container */}
      <div className="max-w-7xl mx-auto bg-white min-h-screen relative lg:flex lg:flex-col">
        {/* Header */}
        <Header />
        <SearchBar />

        {/* Main Content */}
        <div className="pb-24 lg:pb-8 flex-1">
          <div className="lg:grid lg:grid-cols-12 lg:gap-6 lg:px-6">
            {/* Left Column - Categories */}
            <div className="lg:col-span-3">
              <ServiceCategories />
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-9">
              <PopularServices />
              <RecommendedServices />
            </div>
          </div>
        </div>

        {/* Bottom Navigation - Hidden on Desktop */}
        <div className="lg:hidden">
          <BottomNavigation />
        </div>
      </div>
    </div>
  );
};

export default Index;
