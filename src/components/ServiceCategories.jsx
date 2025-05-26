
import { useServiceCategories } from '../hooks/useServices';
import { Skeleton } from './ui/skeleton';
import { useState } from 'react';

const ServiceCategories = () => {
  const { data: categories, isLoading, error } = useServiceCategories();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (categoryId, categoryName) => {
    setSelectedCategory(categoryId);
    console.log(`Selected category: ${categoryName}`);
    // Add category filtering logic here
  };

  if (isLoading) {
    return (
      <div className="px-4 py-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Services</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col items-center min-w-[80px]">
              <Skeleton className="w-16 h-16 rounded-2xl mb-2" />
              <Skeleton className="h-4 w-12" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Services</h2>
        <p className="text-red-500">Failed to load categories</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Services</h2>
      <div className="flex gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-6 lg:overflow-x-visible">
        {categories?.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id, category.name)}
            className={`flex flex-col items-center min-w-[80px] lg:min-w-0 cursor-pointer hover:scale-105 transition-transform ${
              selectedCategory === category.id ? 'opacity-80' : ''
            }`}
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mb-2 shadow-sm transition-colors ${
              selectedCategory === category.id 
                ? 'bg-primary text-white' 
                : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800'
            }`}>
              {category.icon}
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServiceCategories;
