import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const AdminPrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    const { token,user } = useSelector((store) => store.auth);

    useEffect(() => {
        const getRole = user?.accountType;
        if (!token || getRole != 'Admin') {
            console.log("Unauthorized! Redirecting...");
            navigate("/");
        }
    }, [token,user]);

    return token ? children : null;
};

export default AdminPrivateRoute;
