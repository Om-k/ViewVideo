import { createSlice } from "@reduxjs/toolkit";
import placeholder from "../../assets/placeholder.webp"
import apiClient from "../../services/apiClient";

const initialState = {
    userData: {
        userLoggedIn: false,
        userProfieImg: placeholder
    }
}

export const userDataSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        setUserData: async (state) => {
            const user = await apiClient.get('users/current-user'); 
            // console.log("user",user.data.data.avatar)
            const newUserData = {
                userLoggedIn: true,
                userProfieImg: user.data.data.avatar
            }

            localStorage.setItem('loggedIn',true)

            state.userData = newUserData
        },
        removeUserData: (state) => {
            localStorage.setItem('loggedIn',false)
            state.userData = initialState
        }
    }
})

 export const {setUserData,removeUserData} = userDataSlice.actions

 export default userDataSlice.reducer