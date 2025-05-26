
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { User, LogOut, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
  };

  const handleAddService = () => {
    navigate('/add-service');
  };

  return (
    <div className="bg-white pt-4 lg:pt-8 pb-4 sticky top-0 z-10 shadow-sm">
      <div className="px-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">TaskMate</h1>
            <p className="text-gray-600 text-sm lg:text-base">Find trusted service providers</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={handleAddService}
              variant="outline"
              size="sm"
              className="hidden lg:flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Service
            </Button>
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="w-10 h-10 bg-gradient-to-r from-primary to-blue-600 rounded-full text-white hover:bg-primary/90">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white z-50">
                  <DropdownMenuItem onClick={handleAddService} className="cursor-pointer">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Service
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
