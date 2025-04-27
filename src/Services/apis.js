const BASE_URL = import.meta.env.VITE_BASE_URL

export const settingsEndpoints = {
    SIGNUP_API : BASE_URL+"/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
}

export const adminEndpoints = {
    ALL_USERS_API : BASE_URL+"/admin/getAllUser",
    TOOGLE_STATUS_API : BASE_URL+"/admin/updateUserStatus"
}

export const postEndpoints = {
    LIKE_POST: BASE_URL+"/post/postLikeByUser",
    ADD_POST : BASE_URL+"/post/addPost",
    CREATED_POST : BASE_URL+"/post/createdPost",
    DELETE_POST : BASE_URL+"/post/deletePost",
    ALL_THE_POST : BASE_URL+"/post/getAllThePost",
}

export const commentEndpoints = {
    GET_COMMENT: BASE_URL+"/post/getPostComments",
    POST_THE_COMMENT: BASE_URL+"/post/postTheComments",
}

export const employeeEndpoints = {
    GET_TASK : BASE_URL+"/post/getAssignedPostList"
}

