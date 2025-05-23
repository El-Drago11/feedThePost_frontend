import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:localStorage?.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    loading : false,
    isSideBarOpen : false,
    token: localStorage?.getItem("token")?JSON.parse(localStorage.getItem("token")):null
}

const profileSlice = createSlice({
    name:'profile',
    initialState:initialState,
    reducers:{
        setUser(state,value){
            state.user = value.payload;
        },
        setLoading(state,value) {
            state.loading = value.payload
        },
        setSideBarOpen(state){
            state.isSideBarOpen = !(state.isSideBarOpen)
        },
        setToken(state,value){
            state.token = value.payload
        },
    }
})

export const {setUser,setLoading,setSideBarOpen,setToken} = profileSlice.actions
export default profileSlice.reducer