
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

export const useServiceCategories = () => {
  return useQuery({
    queryKey: ['service-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('service_categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });
};

export const useServiceProviders = () => {
  return useQuery({
    queryKey: ['service-providers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('service_providers')
        .select('*, services(*)') // Include related services
        .eq('is_verified', true)
        .order('rating', { ascending: false });

      if (error) throw error;
      return data;
    },
  });
};

export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select(`
          *,
          provider:service_providers(*),
          category:service_categories(*)
        `)
        .eq('is_active', true);
      
      if (error) throw error;
      return data;
    },
  });
};
