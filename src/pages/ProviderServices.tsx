import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

const ProviderServices = () => {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(null); // service id loading state

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('provider_id', providerId);

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to load services',
          variant: 'destructive',
        });
      } else {
        setServices(data);
      }
      setLoading(false);
    };

    fetchServices();
  }, [providerId, toast]);

  const handleBookNow = async (service) => {
    if (!user) {
      toast({ title: 'Error', description: 'You must be logged in to book.' });
      return;
    }

    setBookingLoading(service.id);

    const today = new Date();
    const scheduled_date = today.toISOString().slice(0, 10);
    const scheduled_time = '14:00'; // Default time, can be made dynamic later

    const { error: insertError } = await supabase.from('bookings').insert([
      {
        user_id: user.id,
        provider_id: providerId,
        service_id: service.id,
        scheduled_date,
        scheduled_time,
        total_price: service.price,
        status: 'pending',
      },
    ]);

    setBookingLoading(null);

    if (insertError) {
      toast({ title: 'Booking Failed', description: insertError.message, variant: 'destructive' });
    } else {
      toast({
        title: 'Booking Created',
        description: `You booked ${service.title}`,
      });
      navigate('/bookings');
    }
  };

  if (loading) return <div className="p-4">Loading services...</div>;

  if (!services.length) return <div className="p-4">No services found for this provider.</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Services Offered</h1>
      <ul className="space-y-6">
        {services.map((service) => (
          <li
            key={service.id}
            className="border rounded p-4 shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-center"
          >
            <div>
              <h2 className="font-semibold text-lg">{service.title}</h2>
              <p className="mt-1 text-gray-700">{service.description}</p>
              <p className="mt-2 font-medium">${service.price.toFixed(2)}</p>
              <p className="mt-1 text-sm text-gray-500">Duration: {service.duration_minutes} minutes</p>
            </div>
            <Button
              className="mt-4 sm:mt-0 sm:ml-6 w-full sm:w-auto"
              onClick={() => handleBookNow(service)}
              disabled={bookingLoading === service.id}
            >
              {bookingLoading === service.id ? 'Booking...' : 'Book Now'}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProviderServices;
