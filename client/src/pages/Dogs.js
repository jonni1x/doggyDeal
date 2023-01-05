import axios, { all } from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
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
import Box from '@mui/material/Box';
import EuroIcon from '@mui/icons-material/Euro';
import { Container } from '@mui/system';
import { useQuery } from 'react-query';

const drawerWidth = 400;


  
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  }));

const Dogs = () => {
    const [lowestPrice, setLowestPrice] = useState(0); 
    const [highestPrice, setHighestPrice] = useState(1000); 
    const [breed, setBreed] = useState(''); 
    const [age, setAge] = useState(''); 
    const [filter, setFilter] = useState(false);
    const [pages, setPages] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [open, setOpen] = useState(false);
    
    const theme = useTheme();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const allPages = () => {
        const pagesArr = [];
        for(let i = 1; i < pages + 1; i++) {
            pagesArr.push(i);
        }
        return pagesArr;
    }

    const changePage = (value) => {
        setPageNumber(value); 
    }

    const fetchDogs = async () => {
        const res = await axios.get(`http://localhost/dogs_store/server/api.php?table=dogs&price=${lowestPrice}-${highestPrice}&breed=${breed}&age=${age}&page=${pageNumber}`)
        setPages(res.data.total_pages);
        return res.data[0];
    }

    const { isLoading, data, error } = useQuery(["dogs-data", filter, pageNumber], fetchDogs) 

    
    if(isLoading) return <>Loading...</>
    if(error) return <>{error}</>

    const handleFilter = (e) => {
        e.preventDefault();
        setFilter(!filter);
    }

  return (
    <div className='rooms' style={{marginTop: "100px"}}>
        <form onSubmit={handleFilter}>
            <Drawer
            sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
            },
            }}
            variant="persistent"
            anchor="right"
            open={open}
            >
            <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            </DrawerHeader>
                <Divider sx={{marginBottom: "20px"}}/>
                <List sx={{padding: "0 20px"}}>
                    <span>Price:</span>
                    <ListItem disablePadding >
                        <InputLabel variant="outlined" sx={{margin: "0  20px 0 0"}}>From: </InputLabel> 
                        <Input 
                        sx={{width: "100px"}}
                        value={lowestPrice}
                        onChange={e => {
                            if(e.target.value < 0) return e.target.value = 0;

                            if(e.target.value > highestPrice - 1) return e.target.value = highestPrice - 1;
                            setLowestPrice(e.target.value)
                        }}
                        type="number"
                        />
                        <EuroIcon fontSize="string" />
                        <InputLabel variant="outlined" sx={{margin: "0 20px"}}>To:</InputLabel> 
                        <Input 
                        sx={{width: "100px"}}
                        value={highestPrice}
                        onChange={e => {
                            if(e.target.value < 0) return e.target.value = 0;

                            setHighestPrice(e.target.value)
                        }}
                        type="number"
                        />
                        <EuroIcon fontSize="string" />
                    </ListItem>
                    
                </List>
                <List>
                    <ListItem disablePadding sx={{width: "140px", margin: "30px 0 0 20px"}}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={age}
                                    label="Age"
                                    onChange={e => setAge(e.target.value)}
                                >
                                    <MenuItem value="1">One</MenuItem>
                                    <MenuItem value="2">Two</MenuItem>
                                    <MenuItem value="3">Three</MenuItem>
                                    <MenuItem value="4">Four</MenuItem>
                                    <MenuItem value="5">Five</MenuItem>
                                </Select>
                            </FormControl>
                    </ListItem>
                </List>
                <List>
                    <ListItem disablePadding sx={{width: "140px", margin: "30px 0 0 20px"}}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Breed</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={breed}
                                label="Age"
                                onChange={e => setBreed(e.target.value)}
                                >
                                <MenuItem value="Kangal">Kangal</MenuItem>
                                <MenuItem value="Doberman">Doberman</MenuItem>
                                <MenuItem value="Labrador">Labrador</MenuItem>
                                <MenuItem value="Pitbull">Pitbull</MenuItem>
                                </Select>
                            </FormControl>
                    </ListItem>
                </List>
                <Button 
                variant="contained" 
                aria-label="close drawer"
                edge="end"
                onClick={handleDrawerClose}
                type="submit"
                sx={{margin: "20px 20px", padding: "10px 30px" }}
                > 
                Filter 
                </Button>
            </Drawer>
        </form>
        <Button 
            variant="contained" 
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{marginLeft: "150px", padding: "10px 30px" }}
            > 
            Filter 
        </Button>
        <div className='container my-5 d-flex mx-auto flex-wrap' style={{width: "77vw"}}>
            {
                data !== null && data.map(dog => <DogCard key={dog.id} data={dog}/>)
            }
            {
            !(data.length > 0) && 
            <div className='d-flex justify-content-center w-100'>
                <Player autoplay loop src="https://assets5.lottiefiles.com/packages/lf20_qszkkg7n.json"
                style={{ height: '400px', width: '500px'}}></Player>
            </div>
            }
        </div>

        {/* pagination  */}
        {
            data.length > 0 &&
            <Container sx={{display: "flex", justifyContent: "center", margin: "60px 0"}}>
                <Pagination allPages={allPages()} page={pageNumber} changePage={changePage}/>
            </Container>
        }
    </div>
  )
}

export default Dogs