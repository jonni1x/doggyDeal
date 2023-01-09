import axios from 'axios'
import React from 'react'

const fetchAll = async(url) => {
    const response = await axios.get(url);
    if(response.status == 404) {
        return response.message; 
     }

     if(response.data[0].length === 0 ) return null;
     
     return {
        data: response.data[0],
        totalPages: response.data.total_pages
    };
}

export default fetchAll