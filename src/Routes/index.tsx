import React from 'react';
import { useAuth } from '../hooks/auth';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes'; // Renomeei para AppRoutes aqui

const Routes: React.FC = () => {
    const { logged } = useAuth();

    return logged ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
