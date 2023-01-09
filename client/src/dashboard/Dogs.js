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
import { Button } from '@mui/material';
import { Player } from '@lottiefiles/react-lottie-player';


const Dogs = ({role}) => {
    const [ changed, setChanged ] = useState(false);
    const deleteDog = async(id) => {
        const res = await axios.delete(`http://localhost/dogs_store/server/api.php?table=dogs&id=${id}`);
        setChanged(!changed);
    }

    const fetchDogs = async () => {
        const res = await axios.get(`http://localhost/dogs_store/server/api.php?table=dogs`)
        return res.data[0];
    }

    const { isLoading, data, error } = useQuery(["all-dogs", changed], fetchDogs) 
    if(isLoading) return <>Loading ...</>
    if(error) return <>{error}</>
    
    if(role !== null && role !== 'admin') {
        return (
        <div className='d-flex justify-content-center w-100'>
            <Player autoplay loop src="https://assets2.lottiefiles.com/packages/lf20_hykq5eib.json"
            style={{ height: '400px', width: '500px'}}></Player>
        </div>
        )
    }

    return (
        <TableContainer component={Paper} sx={{margin: "60px 0"}}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <TableHead>
            <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Buttons</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {
                data.map(dog => {
                    return (
                    <TableRow >
                        <TableCell>
                            <img style={{ width: "100px"}} src={require(`../assets/uploads/${dog.image}`)} />
                        </TableCell>
                        <TableCell>{dog.description}</TableCell>
                        <TableCell>{dog.price}</TableCell>
                        <TableCell>{dog.age}</TableCell>
                        <TableCell>
                            <Button color='error' variant='contained' onClick={() => deleteDog(dog.id)}>Delete</Button>
                        </TableCell>
                    </TableRow>)
                })
            }
        </TableBody>
        </Table>
    </TableContainer>
    )
}

export default Dogs