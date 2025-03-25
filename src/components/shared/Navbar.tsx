
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChartBar, Activity, AlertTriangle, Users } from "lucide-react";

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { 
      name: "Mission Control", 
      path: "/", 
      icon: <ChartBar className="h-5 w-5" /> 
    },
    { 
      name: "App Pulse", 
      path: "/app-health", 
      icon: <Activity className="h-5 w-5" /> 
    },
    { 
      name: "Action Station", 
      path: "/anomaly-resolution", 
      icon: <AlertTriangle className="h-5 w-5" /> 
    },
    { 
      name: "Squad Stats", 
      path: "/team-scorecard", 
      icon: <Users className="h-5 w-5" /> 
    }
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg border-b border-finops-gray-200/50 dark:border-finops-gray-800/50 bg-white/80 dark:bg-finops-gray-900/80">
      <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <div className="mr-8">
          <h1 className="text-lg font-semibold tracking-tight">
            <span className="text-finops-blue">Fin</span>Ops Operations Center
          </h1>
        </div>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-2 transition-colors hover:text-finops-blue ${
                location.pathname === item.path
                  ? "text-finops-blue"
                  : "text-finops-gray-600 dark:text-finops-gray-300"
              }`}
            >
              {item.icon}
              <span className="hidden sm:inline-block">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
