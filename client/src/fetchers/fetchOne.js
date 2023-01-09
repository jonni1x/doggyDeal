import axios from 'axios'


const fetchOne = async (url) => {
    const response = await axios.get(url);
    if(response.status == 404) {
       return response.message; 
    }
    
    if(response.data[0].length === 0 ) return null;

    return response.data[0][0];
}

export default fetchOne