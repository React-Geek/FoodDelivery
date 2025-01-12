import { configureStore } from '@reduxjs/toolkit';
import signinReducer from "../Slices/signinSlice"

const Store = configureStore({
    reducer:{
        signIn: signinReducer
    }
})


export default Store