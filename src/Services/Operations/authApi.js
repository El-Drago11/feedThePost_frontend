import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { settingsEndpoints } from "../apis";
import { setLoading, setToken, setUser } from "../../store/authReducer";

export function signUp(firstName,lastName,email,password,confirmPassword,accountType,navigate){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        const toastId = toast.loading("Signing You up Please wait...")
        try {
            const response = await apiConnector("POST",settingsEndpoints.SIGNUP_API,{firstName,lastName,email,password,confirmPassword,accountType})
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("Congratulation!! on sucessfull Signup..")
            navigate('/')
        } catch (error) {
            console.error("API Error:", error.response ? error.response.data : error.message);
            toast.error("Unable to signUp..")
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false))
    }
}

export function login (email,password,navigate){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        const toastId = toast.loading("Loging You in..");
        try {
            const response = await apiConnector("POST",settingsEndpoints.LOGIN_API,{email,password})
            if(response){
                toast.success(`Welcome back ${email}`);
                dispatch(setUser(response.data.user))
                dispatch(setToken(response.data.user.token))
                localStorage.setItem("token",JSON.stringify(response.data.user.token))
                localStorage.setItem("user",JSON.stringify(response.data.user))
                if(response.data.user.accountType=='User'){
                    navigate('dashboard/my-profile')
                }else if(response.data.user.accountType=='Admin'){
                    navigate('admin/my-profile')
                }
            }
        } catch (error) {
            console.error("API Error:", error.response ? error.response.data : error.message);
        }
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
}

export function userLogout(dispatch,navigate){
    return () =>{
    dispatch(setToken(null));
    dispatch(setUser(null))
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
    }
}