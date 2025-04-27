import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { adminEndpoints} from "../apis";


export const getUserList = async()=>{
    const toastId = toast.loading("Fetching user list..");
    let data;
    try {
        const response = await apiConnector("GET",adminEndpoints.ALL_USERS_API);
        if(response){
            data = response;
        }
    } catch (error) {
        toast.error('Unable to get employee list...')
        console.error("API Error:", error.response ? error.response.data : error.message);
    }
    toast.dismiss(toastId);
    return data;
}

export const updateUserStatus = async(userId)=>{
    const toastId = toast.loading("Fetching user list..");
    let data;
    try {
        const response = await apiConnector("patch",adminEndpoints.TOOGLE_STATUS_API,{userId});
        if(response){
            data = response;
        }
    } catch (error) {
        toast.error('Unable to get employee list...')
        console.error("API Error:", error.response ? error.response.data : error.message);
    }
    toast.dismiss(toastId);
    return data;
}
