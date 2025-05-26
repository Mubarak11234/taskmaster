
import { Search, MapPin, Filter } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      toast({
        title: "Search initiated",
        description: `Searching for "${searchQuery}"`,
      });
      // Add actual search functionality here later
    } else {
      toast({
        title: "Enter search term",
        description: "Please enter a search term",
        variant: "destructive",
      });
    }
  };

  const handleFilter = () => {
    console.log("Opening filters");
    toast({
      title: "Filters",
      description: "Filter options will be available soon",
    });
    // Add filter functionality here
  };

  return (
    <div className="flex items-center gap-3 px-4 py-2 lg:px-6">
      <div className="flex-1 relative">
        <div className="flex items-center bg-gray-100 rounded-xl px-4 py-3 gap-3">
          <MapPin className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-500"
          />
          <button onClick={handleSearch} className="hover:bg-gray-200 p-1 rounded">
            <Search className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>
      <button 
        onClick={handleFilter}
        className="bg-primary text-white p-3 rounded-xl shadow-md hover:shadow-lg transition-shadow hover:bg-primary/90"
      >
        <Filter className="w-5 h-5" />
      </button>
    </div>
  );
};

export default SearchBar;
