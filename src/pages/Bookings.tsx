
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Calendar, Clock, User, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Bookings = () => {
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

  const handleReschedule = (bookingId: number, service: string) => {
    console.log(`Rescheduling booking ${bookingId}: ${service}`);
    toast({
      title: "Reschedule Booking",
      description: `Rescheduling ${service}. Please select a new date and time.`,
    });
  };

  const handleContact = (bookingId: number, provider: string) => {
    console.log(`Contacting provider for booking ${bookingId}: ${provider}`);
    toast({
      title: "Contact Provider",
      description: `Connecting you with ${provider}`,
    });
  };

  const mockBookings = [
    {
      id: 1,
      service: "House Cleaning",
      provider: "SparkleClean",
      date: "2024-05-25",
      time: "10:00 AM",
      status: "confirmed",
      price: "$80"
    },
    {
      id: 2,
      service: "AC Repair",
      provider: "CoolAir Experts",
      date: "2024-05-27",
      time: "2:00 PM",
      status: "pending",
      price: "$120"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <div className="max-w-7xl mx-auto bg-white min-h-screen relative lg:flex lg:flex-col">
        <Header />
        
        <div className="pb-24 lg:pb-8 flex-1 px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">My Bookings</h1>
          
          <div className="space-y-4">
            {mockBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-800">{booking.service}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    booking.status === 'confirmed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="w-4 h-4" />
                    <span className="text-sm">{booking.provider}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{booking.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{booking.time}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-primary">{booking.price}</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleReschedule(booking.id, booking.service)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Reschedule
                    </button>
                    <button 
                      onClick={() => handleContact(booking.id, booking.provider)}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Contact
                    </button>
                  </div>
                </div>
              </div>
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

export default Bookings;
