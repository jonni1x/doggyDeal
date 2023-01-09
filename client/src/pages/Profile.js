import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { useQuery } from 'react-query';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Player } from '@lottiefiles/react-lottie-player';
import fetchOne from '../fetchers/fetchOne';
import { useNavigate } from "react-router-dom";

const Profile = ({ role }) => {
    const [showEditField, setShowEditField] = useState(false);
    const [ data, setData ] = useState([]);
    const [name, setName] = useState('');
    const [surname ,setSurname] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [ updated, setUpdated ] = useState(false);
    const [ id, setId ] = useState(null);
    const navigate = useNavigate();
     

    useEffect(() => {

        if(jwt_decode(sessionStorage.getItem("token"))) {
            const user_data = jwt_decode(sessionStorage.getItem("token"));
            setId(user_data.user_id);
        } else {
            console.log('true')
            navigate('/login');
        }

        console.log(id)
        

        const data = async() => {
            const res = await fetchOne(`http://localhost/dogs_store/server/api.php?table=users&id=${id}`);
            setName(res.name);
            setSurname(res.surname);
            setPhone(res.phone);
            setAddress(res.address);
            setData(res);
            console.log(res)
        }

        data()
    }, [id, updated])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            name,
            surname, 
            phone, 
            address,
            password: "12334"
        }


        const response = await axios.patch(`http://localhost/dogs_store/server/api.php?table=users&id=${id}`, data);
        console.log(response)
        setUpdated(true);
    }

    return (
        <div className='profile container mt-5' style={{margin: "50px 0"}} >
            <h2 className='mt-5'>Profile</h2>

            <h4 className='mx-auto' style={{width: "200px"}}>{data.name + " " + data.surname}</h4>
            <button className='btn btn-primary d-block' onClick={() => setShowEditField(!showEditField)}>
                Edit Profile
            </button>

            {showEditField && 
            <form onSubmit={handleSubmit}>
                <div class="row mt-4">
                    <div class="col">
                        <label htmlFor='name'>Name: </label>
                        <input type="text" 
                        id='name' name='name' 
                        class="form-control" 
                        value={name} 
                        onChange={e => setName(e.target.value)}/>
                    </div>
                    <div class="col">
                    <label htmlFor='surname'>Surname: </label>
                        <input 
                        type="text" 
                        name='surname' 
                        class="form-control" 
                        id='surname'
                        value={surname}
                        onChange={e => setSurname(e.target.value)} />
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="col">
                        <label htmlFor="address" class="form-label">Address: </label>
                        <input 
                        type="text" 
                        name='address' 
                        class="form-control" 
                        id="address" 
                        value={address} 
                        onChange={e => setAddress(e.target.value)}/>
                    </div>
                    <div class="col">
                        <label htmlFor="phone" class="form-label">Phone: </label>
                        <input 
                        type="number" 
                        name='phone' 
                        class="form-control" 
                        id="phone" 
                        value={phone}
                        onChange={e => setPhone(e.target.value)} />
                    </div>
                </div>
                <label htmlFor="password" class="form-label">Password: </label>
                <div className="col position-relative">
                    <input
                    type="password" 
                    name='password' 
                    class="form-control" 
                    id="password" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div class="row mt-4">
                <button className='btn btn-primary d-block' type="submit">
                    Submit
                </button>
                </div>
            </form>}
        </div>
    )
}

export default Profile