// import { useState } from "react";
// import Axios, { AxiosResponse, AxiosError } from "axios";

// const useFetch = () => {
//   const [data, setData] = useState<AxiosResponse | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<AxiosError | null | unknown>(null);

//   const doFetch = (url: string, options?: undefined) => {
//     setLoading(true);
//   const doFetch = (url: string, options?: undefined) => {
//     setLoading(true);

//     fecthData(url, options);
//   };
//     fecthData(url, options);
//   };

//   const fecthData = async (url: string, options?: undefined) => {
//     try {
//       const response = await Axios(url, options);
//       setData(response);
//     } catch (error: unknown) {
//       setError(error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const fecthData = async (url: string, options?: undefined) => {
//     try {
//       const response = await Axios(url, options);
//       setData(response);
//     } catch (error: unknown) {
//       setError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { data, loading, error, doFetch };
// };
//   return { data, loading, error, doFetch };
// };

// export default useFetch;

import Axios from "axios";

interface AuthResponse {
  authToken: string;
  phNums: string;
}
// Login function
export const loginAuth = async (
  phNums: string
): Promise<AuthResponse> => {
  try {
    const response = await Axios.post<AuthResponse>(
      `URL`,
      {
        phNums
      },
    );
    localStorage.setItem("token", response.data.authToken);

    return response.data;
  } catch (error) {
    throw new Error("Invalid credentials");
  }
 
};


const expiredToken = (): boolean => {
  const expiredToken = localStorage.getItem("token");
  return !expiredToken
}

export const isTokenExpired =()=>{
  if (expiredToken()){
    alert("Your session as expired, Please login again");
    localStorage.removeItem("token")
  }
}




export const axios=Axios.create({
  baseURL:"",
})
// export const getPrefences=async(endpoint:string)=>{
//   try{
//     const res=await axios.get(endpoint)
//     return res;
//   }
//   catch(e:unknown){
//     console.log("Error")
//   }
// }

export const postRegistrationDetails= async(endpoint:string, payload:object)=>{
  try{
    const res=await axios.post(endpoint, payload)
    return res;
  }
  catch(e:unknown){ 
    console.log("Error in Post Registration")
  }
}