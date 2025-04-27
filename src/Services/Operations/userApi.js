import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { employeeEndpoints } from "../apis";

export const getAssignTaskList = async(pageNo)=>{
    const toastId = toast.loading("Fetching employee list..");
    let data;
    try {
        const response = await apiConnector("GET",employeeEndpoints.GET_TASK,null,null,{pageNo});
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