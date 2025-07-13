import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, role } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (role === 'admin') {
      navigate('/admin-dashboard');
    } else if (role === 'user') {
      navigate('/user-dashboard');
    } else {
      navigate('/');
    }
  }, [user, role, navigate]);

  return (
    <div className="p-6 text-gray-600 text-center">
      <p> Redirecting you to your dashboard...</p>
    </div>
  );
};

export default Dashboard;
