import React, { useState, useContext } from 'react';
import {
  Menu,
  Mail,
  X,
  Home,
  Building,
  LayoutDashboard,
  LogIn,
  LogOut,
} from 'lucide-react';
import { AppContext } from '../context/AppContext';
import { getAuth, signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, role } = useContext(AppContext); 
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    await signOut(getAuth());
    navigate('/login');
  };

  // Use role here instead of user?.role
  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/apartments', label: 'Apartments', icon: Building },
    {
      to: role === 'admin' ? '/admin-dashboard' : '/user-dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    { to: '/contact', label: 'Contact Us', icon: Mail },
  ];

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-gray-800 to-emerald-900 shadow-lg border-b">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="flex items-center space-x-2 font-bold text-slate-300 text-2xl transition-colors duration-200"
          >
            <div className="flex justify-center items-center rounded-lg w-8 h-8">
              <Building className="w-5 h-5" />
            </div>
            <span>StayNest</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-slate-300 hover:text-white transition-all duration-200"
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-slate-300 hover:text-white transition-all duration-200 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-slate-300 hover:text-white transition-all duration-200 cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white transition-all duration-200"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-full opacity-100' : 'max-h-0 opacity-0'
            } overflow-hidden`}
        >
          <div className="space-y-1">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={toggleMenu}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-[14px] text-slate-300 hover:text-white transition-all duration-200"
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="flex items-center space-x-3 mb-5 px-4 py-3 rounded-lg w-full font-medium text-[14px] text-slate-300 hover:text-white transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            ) : (
              <Link
                to="/login"
                onClick={toggleMenu}
                className="flex items-center space-x-3 mb-5 px-4 py-3 rounded-lg font-medium text-[14px] text-slate-300 hover:text-white transition-all duration-200"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
