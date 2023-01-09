import { Container } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import DogCard from '../components/DogCard'

const BookedRooms = ({id}) => {

  const fetchData = async () => {
    const res = await axios.get(`http://localhost/dogs_store/server/api.php?table=dogs&user_id=${id}`)
    return res.data[0];
  }

  const { isLoading, data, error } = useQuery(["dogs-data"], fetchData) 

  if(isLoading) return <>Loading...</>
  if(error) return <>{error}</>
  console.log(data);
  return (
    <Container sx={{margin: "150px 0", display: "flex", justifyContent: "space-around"}}>
        {
          data.map(dog => {
              return <DogCard key={dog.id} data={dog} delete={true} edit={true}/>
          })
        }
    </Container>  
  )
}

export default BookedRooms