import axios, { all } from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import Pagination from '../components/Pagination';
import DogCard from '../components/DogCard';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import EuroIcon from '@mui/icons-material/Euro';
import { Container } from '@mui/system';

const CreateDog = ( {id} ) => {
    const [breed, setBreed] = useState(''); 
    const [age, setAge] = useState(''); 
    const [image, setImage] = useState(''); 
    const [price, setPrice] = useState(''); 
    const [description, setDescription] = useState(''); 
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", image);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("age", age);
        formData.append("breed_id", breed);
        formData.append("user_id", id);

        if(id === null) return navigate('/login');
        const response = await axios.post("http://localhost/dogs_store/server/api.php?table=dogs", formData);
        if(response.data.created) {
            navigate('/dogs')
        }
        console.log(response)
    }
    return (
        <Container sx={{margin: "200px 0"}}>
            <h2 style={{width: "200px", margin: "0 auto", fontFamily: "'Oswald', sans-serif"}}>Offer A Dog</h2>
            <form 
            onSubmit={handleSubmit}
            style={{display:"flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around", height: "55vh"}}>
                <FormControl>
                    <Input 
                        id="image"
                        sx={{width: "300px"}}
                        type="file"
                        onChange={e => setImage(e.target.files[0])}
                        required
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="description">Description</InputLabel>
                    <Input 
                        id="description"
                        sx={{width: "300px"}}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="price">Price</InputLabel>
                    <Input 
                        id="price"
                        sx={{width: "300px"}}
                        type="number"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        required
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="age">Age:</InputLabel>
                    <Input 
                        id="age"
                        type="number"
                        sx={{width: "300px"}}
                        value={age}
                        onChange={e => setAge(e.target.value)}
                        required
                    />
                </FormControl>
                <FormControl sx={{width: "300px", mx: "auto"}} >
                    <InputLabel id="breed" >Breed</InputLabel>
                    <Select
                        labelId="breed"
                        value={breed}
                        label="Age"
                        onChange={e => setBreed(e.target.value)}
                    >
                    <MenuItem value="1">Kangal</MenuItem>
                    <MenuItem value="2">Doberman</MenuItem>
                    <MenuItem value="3">Labrador</MenuItem>
                    <MenuItem value="4">Pitbull</MenuItem>
                    </Select>
                </FormControl>
                <Button 
                    type="submit"
                    variant="contained"
                    sx={{margin: "20px 20px", padding: "10px 30px" }}
                    > 
                    Offer 
                    </Button>
            </form>
        </Container>
    )
}

export default CreateDog