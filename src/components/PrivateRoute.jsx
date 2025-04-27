import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    const { token,user } = useSelector((store) => store.auth);
    
    useEffect(() => {
        const getRole = user?.accountType;
        if (!token || getRole != 'User' || user.status=='Block') {
            console.log("Unauthorized! Redirecting...");
            navigate("/");
        }
    }, [token,user]);

    

    return token ? children : null;
};

export default PrivateRoute;
