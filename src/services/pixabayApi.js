import axios from "axios"
const API_KEY="52223590-b463bb34cc92ca5bf3505f54e"

export const searchImages=async(
    search,
    page=1,
    perPage=20
)=>{
    const url="https://pixabay.com/api/";    
    const response=await axios.get(url,{
         params:{
            key:API_KEY,
            q:search,
            page:page,
            per_page:perPage
        }
    });
     return response.data;

}