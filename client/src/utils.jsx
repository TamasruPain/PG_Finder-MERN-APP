import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const handleSuccess = (msg) => {
    toast.success(msg, {
        position: 'top-right'
    })
}

export const handleError = (msg) => {
    toast.error(msg, {
        position: 'top-right'
    })
}

export function RefreshHandler({ setIsAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsAuthenticated(true);
            if (location.pathname === '/userSignup' || location.pathname === '/userLogin') {
                navigate('/userDashboard', { replace: false });
            }
        }
    }, [location, navigate, setIsAuthenticated])
}

export function AdminRefreshHandler({ setIsAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsAuthenticated(true);
            if (location.pathname === '/adminSignup' || location.pathname === '/adminLogin') {
                navigate('/adminDashboard', { replace: false });
            }
        }
    }, [location, navigate, setIsAuthenticated])
}