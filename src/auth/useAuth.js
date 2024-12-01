import { useEffect, useState } from 'react';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // ตรวจสอบว่ามีข้อมูลการเข้าสู่ระบบใน localStorage หรือไม่
        const loggedInUser = localStorage.getItem('loggedInUser');
        console.log("loggedInUser:", loggedInUser)
        if (loggedInUser) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    return isAuthenticated;
};

export default useAuth;
