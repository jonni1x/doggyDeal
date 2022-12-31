import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';

const Test = () => {
    const name = useRef('');
    const surname = useRef('');
    const email = useRef('');
    const phone = useRef('');
    const address = useRef('');
    const password = useRef('');
    const [file, setFile] = useState(null);

    
    useEffect(() => {
        const data = async() => {
            const data = await axios.patch("http://localhost/dogs_store/server/api.php");
            console.log(data);
        }
        //data();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post("http://localhost/dogs_store/server/api.php?table=users", {
            image: [file.name, file.type]
        });
        if(res) {
            console.log(res.data)
        }
    }
    

  return (
    <div style={{margin: "200px"}}>
        <form onSubmit={handleSubmit}>
            {/* <input type="text" ref={name}/>
            <input type="text" ref={surname}/>
            <input type="text" ref={email}/>
            <input type="text" ref={phone}/>
            <input type="text" ref={address}/>
            <input type="text" ref={password}/> */}
            <input type="file" onChange={e => setFile(e.target.files[0])}/>
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default Test