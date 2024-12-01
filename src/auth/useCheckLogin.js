import * as React from "react";
import { useNavigate } from "react-router-dom";

import useAuth from './useAuth';

const useCheckLogin = () => {
    const navigate = useNavigate();
    const isAuthenticated = useAuth();
    console.log("isAuthenticated:", isAuthenticated)
    React.useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);
};

export default useCheckLogin;
