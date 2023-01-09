import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Button, Icon, Typography } from '@mui/material';
import { Box } from '@mui/material';
import EuroIcon from '@mui/icons-material/Euro';
import fetchOne from '../fetchers/fetchOne';

const DogDetails = () => {
    const { id } = useParams();
    const [ owner, setOwner ] = useState(false);

    const { isLoading, data, error } = useQuery(['post-data'], () =>
      fetchOne(`http://localhost/dogs_store/server/api.php?table=dogs&id=${id}`)
    );

    const userId = data?.user_id

    const { data: userData, isLoading: userLoading, error: userError } = useQuery(
      'user-data',
      () => fetchOne(`http://localhost/dogs_store/server/api.php?table=users&id=${userId}`),
      {
        // The query will not execute until the userId exists
        enabled: !!userId,
      }
    );

    if (isLoading) return <>Loading ...</>;
    if (error && userError) return <>Something Went Wrong</>;

    if(userLoading) return <>User Data Loading...</>


  return (
    <Container sx={{margin: "40px 100px", display: "flex", alignItems: "center", flexDirection: "column"}}>
        <img 
        src={require(`../assets/uploads/${data.image}`)} 
        style={{width: "100%", height: "500px", objectFit: "cover"}}
        />
        <Box sx={{display: 'flex', justifyContent: "space-between", width: "500px", margin: "40px 0"}}>
           <Typography variant='h5' style={{fontFamily: "'Oswald', sans-serif"}}>Age: {data.age}</Typography>
           <Typography variant='h5' style={{fontFamily: "'Oswald', sans-serif"}}>Price: {data.price} <EuroIcon /> </Typography>
        </Box>
        <Box sx={{display: 'flex', flexDirection: "column", width: "500px", margin: "40px 0"}}>
          <Typography variant="h5" style={{margin: "20px 0", fontFamily: "'Oswald', sans-serif", textAlign: "center",  width: "100%"}}>Description</Typography>
          <Typography variant='p' style={{textAlign: "center", width: "100%"}}>
              {data.description}
          </Typography>
        </Box>
        <Box style={{margin: "20px 0"}}>
          <Typography variant='h4' style={{fontFamily: "'Oswald', sans-serif"}}>User Information</Typography>
        </Box>
        <Box sx={{display: 'flex', justifyContent: "space-between", width: "500px", margin: "40px 0"}}>
          <Typography variant='h5' sx={{fontFamily: "'Oswald', sans-serif"}}>Name: {userData.name}</Typography>
          <Typography variant='h5' sx={{fontFamily: "'Oswald', sans-serif"}}>Surname: {userData.surname}</Typography>
        </Box>
        <Box sx={{display: 'flex', justifyContent: "space-between", width: "500px", margin: "40px 0"}}>
          <Typography variant='h5' sx={{fontFamily: "'Oswald', sans-serif"}}>Phone: {userData.phone}</Typography>
          <Typography variant='h5' sx={{fontFamily: "'Oswald', sans-serif"}}>Address: {userData.address}</Typography>
        </Box>
        {owner && 
        <Box sx={{display: 'flex', justifyContent: "space-between", width: "500px", margin: "40px 0"}}>
          <Button variant='contained' color='error'>Delete</Button>
          <Button variant='contained' color='primary'>Edit</Button>
        </Box>
        }
    </Container>
  )
}

export default DogDetails