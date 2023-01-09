import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Button, Input, useStepContext } from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';

const Breed = ({role}) => {
    const [changed, setChanged] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [ breedName, setBreedName ] = useState('');
    const [ breedId, setBreedId ] = useState('');
    const navigate = useNavigate();

    const handleOpen = (id, name) => {
        setOpen(true);
        setBreedName(name);
        setBreedId(id);
    };
    const handleClose = () => setOpen(false);
    
    const handleEdit = async (e) => {
        e.preventDefault();

        const res = await axios.patch(`http://localhost/dogs_store/server/api.php?table=breed&id=${breedId}`, {
            name: breedName
        })

        setChanged(!changed);
        setOpen(false);
    }
    const deleteBreed = async (id) => {
        const res = await axios.delete(`http://localhost/dogs_store/server/api.php?table=breed&id=${id}`);
        setChanged(!changed);
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    const fetchBreeds = async () => {
        const res = await axios.get(`http://localhost/dogs_store/server/api.php?table=breed`)
        return res.data[0];
    }

    const { isLoading, data, error } = useQuery(["breeds", changed], fetchBreeds) 

    
    if(isLoading) return <>Loading...</>
    if(error) return <>{error}</>

    if(role !== null && role !== 'admin') {
        return (
            <div className='d-flex justify-content-center w-100'>
                <Player autoplay loop src="https://assets2.lottiefiles.com/packages/lf20_hykq5eib.json"
                style={{ height: '400px', width: '500px'}}></Player>
            </div>)
    }

    return (
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, maxWidth: "30vw", margin: "100px auto" }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell sx={{textAlign: "center", fontSize: "30px"}}>Breeds</TableCell>
            </TableRow>
            </TableHead>
            <TableBody sx={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                {
                    data.map(breed => {
                        return (
                        <TableRow
                            key={breed.id}
                            sx={{textAlign: "center",  display: "flex", 
                            justifyContent: "space-between", width: "500px", marginTop: "30px"}}
                        >
                            <h6>{breed.name}</h6>
                            <Button variant="contained" color="error" onClick={() => deleteBreed(breed.id)}>Delete</Button>
                            <Button variant="contained" color="success" onClick={() => handleOpen(breed.id, breed.name)}>Edit</Button>
                        </TableRow>
                        )
                    })
                }
            </TableBody>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <form onSubmit={handleEdit}>
                        <FormControl>
                            <InputLabel htmlFor="name">Breed Name:</InputLabel>
                            <Input 
                                id="name"
                                type="text"
                                value={breedName}
                                onChange={e => setBreedName(e.target.value)}
                                sx={{width: "300px"}}
                            />
                            <Button 
                            sx={{marginTop: "50px"}} 
                            variant="contained" 
                            color="primary"
                            type='submit'
                            >Edit</Button>
                        </FormControl>
                    </form>
                </Box>  
            </Modal>
            <Button 
            sx={{marginTop: "50px"}} 
            variant="contained" 
            color="primary"
            onClick={() => {navigate('/dashboard/create-breed')}}
            >
                Create
            </Button>
        </Table>
        </TableContainer>
    );
}

export default Breed