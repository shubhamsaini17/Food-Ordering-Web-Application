// custom hook - to fetch restaurent data from api
import { useEffect, useState } from 'react'
import { MENU_API } from './constants'

const useRestaurantMenu = (resId) => {
    const [resInfo,setResInfo] =useState(null);

    useEffect(()=>{
        fetchMenu(); 
    },[]);


    const fetchMenu = async () => {
        const data = await fetch("https://proxy.cors.sh/"+MENU_API + resId, {
            headers: {
            'x-cors-api-key': 'temp_aac18872dd52d5be00dfb3e3cf60fddd'
            }
          });
        const json = await data.json();
        setResInfo(json.data);
        }
    return resInfo;
};


export default useRestaurantMenu
