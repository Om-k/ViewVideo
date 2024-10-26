import apiClient from "./apiClient";
import placeholder from "../assets/placeholder.webp"

class AuthService {

    login = async (userData) => {
        try {
            const response = await apiClient.post("/users/login", userData);
            sessionStorage.setItem("loggedIn","true");
            window.location.href = window.location.origin
            return response.status == 200
        } catch (error) {
            console.error("error", error);
            return false
        }
    }

    signUp = async (userData) => {
        try {
            const response = await apiClient.post("/users/register", userData);
            console.log("User Created",response)
            return response.status == 200
        } catch (err) {
            console.log(err)
            return false
        }
    }

    logout = async () => {
        try {
            sessionStorage.setItem("loggedIn","false");
            const response = await apiClient.post("/users/logout");
            window.location.reload()
            return response.status == 200
        } catch (error) {
            console.error("error", error);
            return false
        }
    }

    checkLoggedIn = () => {
        const loggedIn = sessionStorage.getItem("loggedIn")
        //console.log("loggedIn ",loggedIn)
        if(loggedIn===null){
            return false
        }

        return loggedIn=="true"
    }

    getUserData = async () =>{
        // console.log(this.checkLoggedIn())
        if(this.checkLoggedIn()){
            const user = await apiClient.get("/users/current-user");
            // console.log("User in",user)
            return user
        }
        return null
    }
}

export default new AuthService();

