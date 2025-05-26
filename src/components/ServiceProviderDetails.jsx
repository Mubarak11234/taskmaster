
import { useState } from 'react';
import { X, Phone, Mail, MapPin, Star, Shield } from 'lucide-react';
import { Button } from './ui/button';

const ServiceProviderDetails = ({ provider, onClose }) => {
  if (!provider) return null;

  const handleCall = () => {
    if (provider.phone) {
      window.open(`tel:${provider.phone}`);
    }
  };

  const handleEmail = () => {
    if (provider.email) {
      window.open(`mailto:${provider.email}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Provider Details</h2>
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="w-8 h-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center relative">
                <span className="text-white text-xl font-bold">
                  {provider.business_name?.charAt(0) || 'P'}
                </span>
                {provider.is_verified && (
                  <div className="absolute -top-1 -right-1 bg-green-500 w-5 h-5 rounded-full flex items-center justify-center">
                    <Shield className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">{provider.business_name}</h3>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{provider.rating || '4.5'}</span>
                  <span className="text-gray-500 text-sm">({provider.total_reviews || '0'} reviews)</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3">
              <h4 className="font-medium text-gray-800 dark:text-white">Contact Information</h4>
              
              {provider.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700 dark:text-gray-300">{provider.phone}</span>
                  <Button
                    onClick={handleCall}
                    size="sm"
                    className="ml-auto"
                  >
                    Call
                  </Button>
                </div>
              )}
              
              {provider.email && (
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700 dark:text-gray-300">{provider.email}</span>
                  <Button
                    onClick={handleEmail}
                    size="sm"
                    className="ml-auto"
                  >
                    Email
                  </Button>
                </div>
              )}
            </div>

            {provider.description && (
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white mb-2">About</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{provider.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderDetails;
