import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import axios from 'axios';


const Login = ({changeLogIn}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = { 
            email,
            password
        }

        const response = await axios.post("http://localhost/dogs_store/server/login.php", data);

        if(response.data.login == 'failed') {
            return setError(response.data.message);
        }

        sessionStorage.setItem("token", response.data.token);
        changeLogIn(true);
        navigate('/');
    }

    return (
        <Container sx={{margin: "200px 0"}}>
            <h2 style={{width: "100px", margin: "0 auto", fontFamily: "'Oswald', sans-serif"}}>Log In</h2>
            <form
            onSubmit={handleSubmit}
            style={{display:"flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around", height: "25vh"}}>
                <FormControl>
                    <InputLabel htmlFor="email">Email address</InputLabel>
                    <Input 
                        id="email"
                        sx={{width: "300px"}}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <FormHelperText id="my-helper-text" sx={{color:"red"}}>{error}</FormHelperText>
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
                    <FormHelperText id="my-helper-text" sx={{color:"red"}}>{error}</FormHelperText>
                </FormControl>
                <Button 
                    type="submit"
                    variant="contained"
                    sx={{margin: "20px 20px", padding: "10px 30px" }}
                    > 
                    Log In 
                    </Button>
            </form>
        </Container>
    )
}

export default Login