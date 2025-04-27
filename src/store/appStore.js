import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./authReducer"

const appStore = configureStore({
    reducer:{
        auth:authReducer
    }
})

export default appStore;