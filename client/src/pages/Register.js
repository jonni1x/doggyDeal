import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPw, setVerifyPw] = useState('');
    const [pwError, setPwError] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(password !== verifyPw) return setPwError(true)

        const data = { 
            name,
            surname,
            email,
            phone,
            address,
            password,
        }

        const response = await axios.post("http://localhost/dogs_store/server/register.php", data);
        
        navigate('/login');
    }
  return (
    <Container sx={{margin: "200px 0"}}>
        <h2 style={{width: "100px", margin: "0 auto", fontFamily: "'Oswald', sans-serif"}}>Register</h2>
        <form
        onSubmit={handleSubmit} 
        style={{display:"flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around", height: "55vh"}}>
            <FormControl>
                <InputLabel htmlFor="name">Name</InputLabel>
                <Input 
                    id="name"
                    sx={{width: "300px"}}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="surname">Surname</InputLabel>
                <Input 
                    id="surname"
                    sx={{width: "300px"}}
                    value={surname}
                    onChange={e => setSurname(e.target.value)}
                    required
                />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="email">Email address</InputLabel>
                <Input 
                    id="email"
                    sx={{width: "300px"}}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="number">Number:</InputLabel>
                <Input 
                    id="number"
                    type="number"
                    sx={{width: "300px"}}
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="number">Address:</InputLabel>
                <Input 
                    id="address"
                    type="text"
                    sx={{width: "300px"}}
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="password">Password:</InputLabel>
                <Input 
                    id="password"
                    type="password"
                    sx={{width: "300px"}}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="verify-password">Verify Password:</InputLabel>
                <Input 
                    id="verify-password"
                    type="password"
                    sx={{width: "300px"}}
                    value={verifyPw}
                    onChange={e => setVerifyPw(e.target.value)}
                />
                {pwError && <FormHelperText id="my-helper-text" sx={{color: "red"}}>Please Enter The Same Password</FormHelperText>}
            </FormControl>
            <Button 
                type="submit"
                variant="contained"
                sx={{margin: "20px 20px", padding: "10px 30px" }}
                > 
                Register 
                </Button>
        </form>
    </Container>
    
  )
}

export default Register