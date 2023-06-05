import newRequest from "@/utils/apiCall";

export const signInCredentials =async(email: string, password: string)=>{
   
    const response = await newRequest.get(
      `users?email=${email}&password=${password}`
    );
    console.log("Login response>>", response?.data);
    if (response.data[0]?.isBlocked) {
      alert("You are blocked by admin..");
    } else if (response?.data?.length == 0) {
      alert("Invalid Credentials..");
    } else {
    //   localStorage.setItem("currentUser", JSON.stringify(response?.data[0]));
     return response?.data[0];
    }
}