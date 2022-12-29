import axios, { all } from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import Pagination from '../components/Pagination';
import DogCard from '../components/DogCard';

const Dogs = () => {
    const [lowestPrice, setLowestPrice] = useState(0); 
    const [highestPrice, setHighestPrice] = useState(1000); 
    const [breed, setBreed] = useState(null); 
    const [year, setYear] = useState(null); 
    const [dogs, setDogs] = useState([]); 
    const [filter, setFilter] = useState(false);
    const [pages, setPages] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);


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

    const data = () => {
        axios.get(`http://localhost/dogs_store/server/api.php?table=dogs&price=${lowestPrice}-${highestPrice}&breed=${breed}&year=${year}&page=${pageNumber}`)
            .then(res => {
                setPages(res.data.total_pages);
                setDogs(res.data[0]);
            })
            .catch(e => e.message);
    }

    useEffect(() => {
        data();
    }, [filter, pageNumber])

    const handleFilter = (e) => {
        e.preventDefault();
        setFilter(!filter);
    }

  return (
    <div className='rooms' style={{marginTop: "100px"}}>
        <nav className="navbar">
            <button
            className="navbar-toggler btn bg-primary text-white ms-4 py-2 px-5"
            type="button" 
            data-bs-toggle="offcanvas" 
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar">
                Filter
            </button>
            <div className="container-fluid">
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div className="offcanvas-header">
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <form onSubmit={handleFilter}>
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item d-flex">
                                <label htmlFor='lowest-price'>Lowest price</label>
                                <input 
                                type='number' 
                                style={{width: "60px", marginLeft: "10px"}} 
                                name='lowest-price'
                                value={lowestPrice}
                                onChange={e => {
                                    if(e.target.value < 0) return e.target.value = 0;

                                    if(e.target.value > highestPrice - 1) return e.target.value = highestPrice - 1;
                                    setLowestPrice(e.target.value)
                                }}
                                />
                                <label htmlFor='highest-price' style={{marginLeft: "10px"}}>Highest Price</label>
                                <input
                                type='number' 
                                style={{width: "60px", marginLeft: "10px"}} 
                                name='highest-price'
                                value={highestPrice}
                                onChange={e => setHighestPrice(e.target.value)}
                                />
                            </li>
                            <li className="nav-item dropdown mt-4">
                                <label htmlFor='breed' className='me-3'>Breed:</label>
                                <select name="breed" id="breed" onChange={e => setBreed(e.target.value)}>
                                    <option value="pitbull">Pitbull</option>
                                    <option selected value="kangal">Kangal</option>
                                    <option value="doberman">Doberman</option>
                                </select>
                            </li>
                            <li className="nav-item dropdown mt-4">
                                <label htmlFor='year' className='me-3'>Year:</label>
                                <select className='px-2 py-2 text-success' name="year" id="year" onChange={(e) => setYear(e.target.value)}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </li>
                            <button className="btn btn-primary my-5 text-white ms-4 py-2 px-5"
                            type="submit"
                            data-bs-toggle="offcanvas" 
                            data-bs-target="#offcanvasNavbar">
                                Filter
                            </button>
                        </ul>
                    </form>
                </div>
                </div>
            </div>
        </nav>

        <div className='container my-5 d-flex justify-content-start mx-auto flex-wrap' style={{width: "80vw"}}>
            {
                dogs.length > 0 && dogs.map(dog => <DogCard data={dog}/>)
            }
            {
            !(dogs.length > 0) && 
            <div className='d-flex justify-content-center w-100'>
                <Player autoplay loop src="https://assets5.lottiefiles.com/packages/lf20_qszkkg7n.json"
                style={{ height: '400px', width: '500px'}}></Player>
            </div>
            }
        </div>

        {/* pagination  */}
        <Pagination allPages={allPages()} changePage={changePage}/>
    </div>
  )
}

export default Dogs