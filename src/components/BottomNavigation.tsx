
import { Home, Book, CreditCard, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      id: 1,
      name: "Home",
      icon: Home,
      path: "/",
      active: location.pathname === "/"
    },
    {
      id: 2,
      name: "Bookings",
      icon: Book,
      path: "/bookings",
      active: location.pathname === "/bookings"
    },
    {
      id: 3,
      name: "Payments",
      icon: CreditCard,
      path: "/payments",
      active: location.pathname === "/payments"
    },
    {
      id: 4,
      name: "Profile",
      icon: User,
      path: "/profile",
      active: location.pathname === "/profile"
    }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 max-w-md mx-auto">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={`flex flex-col items-center py-2 px-3 rounded-xl transition-colors ${
                item.active
                  ? "text-primary bg-primary/10"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <IconComponent className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{item.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
