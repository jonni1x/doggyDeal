import { Container } from '@mui/system'
import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Button, Input} from '@mui/material'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';

const CreateBreed = ({role}) => {
    const [ breedName, setBreedName ] = useState('');
    const navigate = useNavigate();

    const createBreed = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", breedName);

        const response = await axios.post("http://localhost/dogs_store/server/api.php?table=breed",formData);
        
        navigate('/dashboard/breeds');
    }

    if(role !== null && role !== 'admin') {
        return (
            <div className='d-flex justify-content-center w-100'>
                <Player autoplay loop src="https://assets2.lottiefiles.com/packages/lf20_hykq5eib.json"
                style={{ height: '400px', width: '500px'}}></Player>
            </div>)
    }

    return (
        <Container sx={{margin: "150px auto",  display: "flex", 
        alignItems: "center", flexDirection: "column", justifyContent: "center"}}>
            <form 
                onSubmit={createBreed}
                sx={{ display: "flex", 
                alignItems: "center", }}>
                <FormControl>
                    <InputLabel htmlFor="name">Breed Name:</InputLabel>
                    <Input 
                        id="name"
                        type="text"
                        value={breedName}
                        onChange={e => setBreedName(e.target.value)}
                        sx={{width: "300px"}}
                    />
                </FormControl>
                <FormControl>
                    <Button 
                        sx={{margin: "100px 0 0 -240px", width: "200px"}} 
                        variant="contained" 
                        color="primary"
                        type='submit'
                    >
                        Create
                    </Button>
                </FormControl>
                </form>
        </Container>
    )
}

export default CreateBreed