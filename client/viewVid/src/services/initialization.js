import getData from "../hooks/getData";

export default function () {
    //sessionStorage.setItem("loggedIn",false);

    const [userProfile, loading, error] = getData("/users/current-user")

        // console.log(userProfile)
       

    if (!(userProfile?.length == 0)) {
        // console.log("No error",userProfile,userProfile?.length == 0 )
        sessionStorage.setItem("loggedIn", true);
    }
    
    return loading
}