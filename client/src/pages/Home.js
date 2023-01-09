import React, { useEffect, useRef, useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DogCard from '../components/DogCard';
import { useQuery } from 'react-query';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const Home = ({ id }) => {
    const fetchDogs = async () => {
        const response = await axios.get(
          "http://localhost/dogs_store/server/api.php?table=dogs&limit=10000"
        );
        return response.data[0];
    };

    const { data, isLoading, error } = useQuery('dogs', fetchDogs);
    
    if (isLoading) return "Loading...";

    if (error) return `An error has occurred: ${error.message}`;

    let dogsSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
      };

  return (
    <Box style={{maxWidth: "100%"}}>
        <div className='hero-page' style={{display: "flex",justifyContent: "flex-start"}}>
            <img src={require("../assets/images/dog-bg-image.jpg")} 
            style={{width: "100%", height:"100vh", objectFit: "cover", marginBottom: "200px", position: "relative"}}
            alt="Dog Image"
            />   
            <img src={require("../assets/images/dog-bone.png")}
            style={{position: "absolute", marginTop: "100px", height: "700px"}}
            alt="Dog Bone Image"
            />
        </div>
        {
        id === null && 
        <Container sx={{display: "flex", alignItems: "center", justifyContent: "space-around", marginBottom: "200px"}}>
            <Player
                    autoplay
                    loop
                    src="https://assets2.lottiefiles.com/packages/lf20_pkkire0h.json"
                    style={{ height: '400px', width: '90%' }}
                    >
            </Player>
            <Box sx={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                <Typography variant="h3" sx={{fontSize: "2rem", width: "60%", textAlign: "center", fontFamily: "'Oswald', sans-serif"}}>
                    Register And Get Access To Sell Your Dogs!
                </Typography>
                <Button variant="contained" color="success" size="large" sx={{marginTop: "2rem"}}>
                    <Link to='/register' style={{color: "white", textDecoration: "none"}}>Register</Link>
                </Button>
            </Box>
        </Container>
        }

        <Container sx={{height: '500px'}}>
            <Typography variant='h4' sx={{fontFamily: "'Oswald', sans-serif"}}>View Dogs: </Typography>
            <Slider {...dogsSettings}>
            {
                data.length > 0 && data.slice(0, 6).map(item => {
                    return <DogCard key={item.id} data={item}/>
                }) 
            }
            </Slider>
        </Container>

        <Container sx={{height:"400px", marginTop: "400px"}}>
            <div style={{display: "flex", justifyContent: "space-around"}}>
                <Typography variant="p" fontSize="1.6rem" sx={{width: "340px", display: 'flex', flexWrap: "wrap"}}>
                    <strong>DoggyDeal.com</strong> is a website which allows users to <strong>buy and sell dogs.</strong>
                </Typography> 
                <div 
                style={{border: "1px solid black", borderRadius: "10%", 
                display: "flex", flexDirection:"column", alignItems: "center", 
                justifyContent: "center", padding: "0 20px"}}>
                   <Typography sx={{fontSize: "1.5rem", textTransform: "uppercase"}}> Available Dogs:</Typography>
                    <CountUp end={data.length} >
                        {({ countUpRef, start }) => (
                            <VisibilitySensor onChange={start} delayedCall>
                                <span ref={countUpRef} style={{fontSize: "2rem", color: "red", fontFamily: "'Oswald', sans-serif"}}/>
                            </VisibilitySensor>
                        )}
                    </CountUp>
                </div>
            </div>
            
        </Container>
    </Box>
  )
}

export default Home