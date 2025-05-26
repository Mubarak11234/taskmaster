
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import { CreditCard, Calendar, DollarSign, Plus } from 'lucide-react';

const Payments = () => {
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

  const paymentHistory = [
    {
      id: 1,
      service: "House Cleaning",
      provider: "SparkleClean",
      amount: "$80",
      date: "2024-05-20",
      status: "completed"
    },
    {
      id: 2,
      service: "Plumbing Repair",
      provider: "PlumbPro Services",
      amount: "$150",
      date: "2024-05-18",
      status: "completed"
    }
  ];

  const paymentMethods = [
    {
      id: 1,
      type: "Visa",
      last4: "4532",
      expiry: "12/26",
      isDefault: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <div className="max-w-7xl mx-auto bg-white min-h-screen relative lg:flex lg:flex-col">
        <Header />
        
        <div className="pb-24 lg:pb-8 flex-1 px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Payments</h1>
          
          {/* Payment Methods */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Payment Methods</h2>
              <button className="flex items-center gap-2 text-primary hover:text-primary/80">
                <Plus className="w-4 h-4" />
                <span className="text-sm">Add</span>
              </button>
            </div>
            
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <CreditCard className="w-5 h-5 text-gray-500" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{method.type} •••• {method.last4}</span>
                      {method.isDefault && (
                        <span className="text-xs bg-primary text-white px-2 py-1 rounded">Default</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">Expires {method.expiry}</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <span className="text-sm">Edit</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Payment History */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment History</h2>
            
            <div className="space-y-3">
              {paymentHistory.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{payment.service}</h3>
                    <p className="text-sm text-gray-600">{payment.provider}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{payment.date}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">{payment.amount}</p>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      {payment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:hidden">
          <BottomNavigation />
        </div>
      </div>
    </div>
  );
};

export default Payments;
