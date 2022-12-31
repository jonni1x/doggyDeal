import React, { useEffect, useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const Home = () => {
    const [logedIn, setLogedIn] = useState(false);
    const [items, setItems] = useState(null);

    const fetchData = async () => {
        const res = await axios.get("http://localhost/dogs_store/server/api.php?table=dogs&limit=6");
        const data = await res.data[0];
        setItems(data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    let feedbackSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
      };
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
    <Box className='home' style={{maxWidth: "100%"}}>
        <div className='hero-page' style={{display: "flex",justifyContent: "flex-start"}}>
            <img src={require("../assets/images/dog-bg-image.jpg")} 
            style={{width: "100%", height:"100vh", objectFit: "cover", marginBottom: "200px", position: "relative"}}
            />   
            <img src={require("../assets/images/dog-bone.png")}
            style={{position: "absolute", marginTop: "100px", width: "700px"}}
            />
        </div>
              
        
            <div className='container' style={{height: '500px'}}>
                <Slider {...dogsSettings}>
                {
                items !== null &&  items.map(item => {
                    
                    return (
                    <div className="card w-75" key={item.id}>
                        <img src={require(`../assets/images/${item.image}`)}
                        className="card-img-top" style={{height: "300px", width: "100%", objectFit:"cover"}}  alt="..." />
                        <div className="card-body">
                            <p className="card-text">{item.description}</p>
                            <Link className='btn btn-primary' to={`dogs/${item.id}`}>Buy</Link>
                        </div>
                    </div>)
                }) 
                }
                </Slider>
            </div>

        {
            !logedIn && <div className='bg-warning align-items-center d-flex p-3' style={{margin: '12rem 0', height: '15vh'}}>
                <h3 className='mb-5'>Don't have an account?</h3>
                <button className='btn btn-success ms-5 mt-5 py-2'>
                    <Link to='/register' className='text-white text-decoration-none text-align-center'>
                        Create An Account
                    </Link>
                </button>
            </div>
        }

        <div className='container ' style={{margin: "20rem 4rem"}}>
            <h3 className='my-5'>Feedbacks</h3>
            <Slider {...feedbackSettings}>
                <div className="card">
                    <div className="card-header">
                        Feedback #1
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Special title treatment</h5>
                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    </div>
                </div>
                <div>
                    <h3>2</h3>
                </div>
                <div>
                    <h3>3</h3>
                </div>
                <div>
                    <h3>4</h3>
                </div>
                <div>
                    <h3>5</h3>
                </div>
                <div>
                    <h3>6</h3>
                </div>
            </Slider>
            <Link to='feedbacks' class="btn btn-primary mt-5 px-5 py-2">
                Feedbacks <Icon icon='material-symbols:arrow-right-alt' />
            </Link>
        </div>
        

    </Box>
  )
}

export default Home