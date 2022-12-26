import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';

const Test = () => {
    const name = useRef('');
    const surname = useRef('');
    const email = useRef('');
    const phone = useRef('');
    const address = useRef('');
    const password = useRef('');

    const [items, setItems] = useState([]);
    useEffect(() => {
        const data = async() => {
            const data = await axios.get("http://localhost/dogs_store/server/api.php?table=dogs");
            setItems(data.data[0]);
        }
        data();

        console.log(items);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.delete("http://localhost/dogs_store/server/api.php?table=users&id=7");
        if(res) {
            console.log(res.data)
        }
    }
    

  return (
    <div style={{margin: "200px"}}>
        <form onSubmit={handleSubmit}>
            <input type="text" ref={name}/>
            <input type="text" ref={surname}/>
            <input type="text" ref={email}/>
            <input type="text" ref={phone}/>
            <input type="text" ref={address}/>
            <input type="text" ref={password}/>
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default Test