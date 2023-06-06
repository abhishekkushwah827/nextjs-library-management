import axios from "axios";

const newRequest = axios.create({
  baseURL: "http://localhost:3004/",     //DEVLOPMENT ENV (Working)
  // baseURL: "https://json-server-lms.vercel.app/",     //PROD ENV (POST/PUT methods not working)
});

export default newRequest;
