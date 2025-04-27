import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { commentEndpoints, postEndpoints } from "../apis";


export const createPostAPI = async(data)=>{
    const toastId = toast.loading('Creating post....');
    const {description,mediaFile,list} = data;

    const newList = list.map((curr)=>curr)

    console.log(newList)

    let response;
    try {
        const formData = new FormData();
        formData.append('postDescription', description);
        formData.append('hashTags', JSON.stringify(newList));
        formData.append('mediaFile', mediaFile[0]);
        const res = await apiConnector('POST',postEndpoints.ADD_POST,formData,{'Content-Type': 'multipart/form-data',});
        if(res){
            response = res;
        }
    } catch (error) {
        toast.error('Unable to add post...')
        console.error("API Error:", error.response ? error.response.data : error.message);
    }
    toast.dismiss(toastId);
    return response;
}

export const postLikeAPI = async(postId)=>{
    const toastId = toast.loading('Liking Post....');

    let response;
    try {
        const res = await apiConnector('PATCH',postEndpoints.LIKE_POST,{postId});
        if(res){
            response = res;
        }
    } catch (error) {
        toast.error('Unable to like post...')
        console.error("API Error:", error.response ? error.response.data : error.message);
    }
    toast.dismiss(toastId);
    return response;
}

export const deleteTaskAPI = async(taskId)=>{
    const toastId = toast.loading('deleting post....');
    let response;
    try {
        const res = await apiConnector('DELETE',postEndpoints.DELETE_POST,{taskId});
        if(res){
            response = res;
        }
    } catch (error) {
        toast.error('Unable to delete post...')
        console.error("API Error:", error.response ? error.response.data : error.message);
    }
    toast.dismiss(toastId);
    return response;
}

export const createdPostAPI = async(pageNo)=>{
    const toastId = toast.loading('Fetching post....');
    let response;
    try {
        const res = await apiConnector('GET',postEndpoints.CREATED_POST,null,null,{pageNo});
        if(res){
            response = res;
        }
    } catch (error) {
        toast.error('Unable to fetch post...')
        console.error("API Error:", error.response ? error.response.data : error.message);
    }
    toast.dismiss(toastId);
    return response;
}

export const getComments = async(postId)=>{
    const toastId = toast.loading('Fetching comments....');
    let response;
    try {
        const res = await apiConnector('POST',commentEndpoints.GET_COMMENT,{postId});
        if(res){
            response = res;
        }
    } catch (error) {
        toast.error('Unable to fetch comments...')
        console.error("API Error:", error.response ? error.response.data : error.message);
    }
    toast.dismiss(toastId);
    return response;
}

export const postTheComments = async(postId,userComment)=>{
    const toastId = toast.loading('Posting comment....');
    let response;
    try {
        const res = await apiConnector('POST',commentEndpoints.POST_THE_COMMENT,{postId,userComment});
        if(res){
            response = res;
        }
    } catch (error) {
        toast.error('Unable to post the comment...')
        console.error("API Error:", error.response ? error.response.data : error.message);
    }
    toast.dismiss(toastId);
    return response;
}


export const getAllThePost = async(pageNo)=>{
    const toastId = toast.loading("Fetching all feeds..");
    let data;
    try {
        const response = await apiConnector("GET",postEndpoints.ALL_THE_POST,null,null,{pageNo});
        if(response){
            data = response;
        }
    } catch (error) {
        toast.error('Unable to get feeds list...')
        console.error("API Error:", error.response ? error.response.data : error.message);
    }
    toast.dismiss(toastId);
    return data;
}