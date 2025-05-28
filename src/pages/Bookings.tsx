import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { Calendar, Clock, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Bookings = () => {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();

  const [bookings, setBookings] = useState<any[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;

      setLoadingBookings(true);

      try {
        const { data, error } = await supabase
          .from('bookings')
          .select(`
            id,
            scheduled_date,
            scheduled_time,
            status,
            total_price,
            services (
              title
            ),
            service_providers (
              business_name
            )
          `)
          .eq('user_id', user.id);

        if (error) throw error;

        setBookings(data || []);
      } catch (err) {
        console.error('Error loading bookings:', err);
        toast({
          title: 'Error',
          description: 'Failed to load bookings. Please try again later.',
        });
      } finally {
        setLoadingBookings(false);
      }
    };

    fetchBookings();
  }, [user, toast]);

  if (authLoading || loadingBookings) {
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

  const handleReschedule = (bookingId: string, service: string) => {
    console.log(`Rescheduling booking ${bookingId}: ${service}`);
    toast({
      title: "Reschedule Booking",
      description: `Rescheduling ${service}. Please select a new date and time.`,
    });
  };

  const handleContact = (bookingId: string, provider: string) => {
    console.log(`Contacting provider for booking ${bookingId}: ${provider}`);
    toast({
      title: "Contact Provider",
      description: `Connecting you with ${provider}`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <div className="max-w-7xl mx-auto bg-white min-h-screen relative lg:flex lg:flex-col">
        <Header />

        <div className="pb-24 lg:pb-8 flex-1 px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">My Bookings</h1>

          <div className="space-y-4">
            {bookings.length === 0 && (
              <p className="text-gray-600">You have no bookings yet.</p>
            )}

            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-800">
                    {booking.services?.title || 'Unknown Service'}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {booking.status || 'pending'}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="w-4 h-4" />
                    <span className="text-sm">
                      {booking.service_providers?.business_name || 'Unknown Provider'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{booking.scheduled_date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{booking.scheduled_time}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-primary">
                    ${booking.total_price.toFixed(2)}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleReschedule(booking.id, booking.services?.title || '')}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Reschedule
                    </button>
                    <button
                      onClick={() => handleContact(booking.id, booking.service_providers?.business_name || '')}
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
