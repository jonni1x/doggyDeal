import React, {useEffect, useRef} from 'react';
import axios from 'axios';

const Test = () => {
    const name = useRef('');
    const surname = useRef('');
    const email = useRef('');
    const phone = useRef('');
    const address = useRef('');
    const password = useRef('');

    
    useEffect(() => {
        const data = async() => {
            const data = await axios.post("http://localhost/dogs_store/server/api/test.php");
            console.log(data);
        }
        //data();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post("http://localhost/dogs_store/server/api/dogs.php", {
            name: name.current.value,
            surname: surname.current.value,
            email: email.current.value,
            phone: phone.current.value,
            address: address.current.value,
            password: password.current.value
        });
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