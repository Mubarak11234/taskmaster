
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { User, Phone, Mail, MapPin, Settings, CreditCard, HelpCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { user, loading } = useAuth();
  const { toast } = useToast();

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

  const handleEditProfile = () => {
    toast({
      title: "Edit Profile",
      description: "Profile editing functionality will be available soon",
    });
  };

  const handleAccountSettings = () => {
    toast({
      title: "Account Settings",
      description: "Account settings page will be available soon",
    });
  };

  const handlePaymentMethods = () => {
    toast({
      title: "Payment Methods",
      description: "Payment methods management will be available soon",
    });
  };

  const handleHelpSupport = () => {
    toast({
      title: "Help & Support",
      description: "Help center will be available soon",
    });
  };

  const menuItems = [
    { icon: Settings, label: "Account Settings", onClick: handleAccountSettings },
    { icon: CreditCard, label: "Payment Methods", onClick: handlePaymentMethods },
    { icon: HelpCircle, label: "Help & Support", onClick: handleHelpSupport },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <div className="max-w-7xl mx-auto bg-white min-h-screen relative lg:flex lg:flex-col">
        <Header />
        
        <div className="pb-24 lg:pb-8 flex-1 px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile</h1>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-semibold">
                {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0)?.toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {user.user_metadata?.full_name || 'User'}
                </h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="w-5 h-5" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone className="w-5 h-5" />
                <span>{user.user_metadata?.phone || 'Add phone number'}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="w-5 h-5" />
                <span>Add your location</span>
              </div>
            </div>
            
            <button 
              onClick={handleEditProfile}
              className="w-full mt-4 bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Edit Profile
            </button>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
              >
                <item.icon className="w-5 h-5 text-gray-500" />
                <span className="flex-1 text-left text-gray-800">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:hidden">
          <BottomNavigation />
        </div>
      </div>
    </div>
  );
};

export default Profile;
