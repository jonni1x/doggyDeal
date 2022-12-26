import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const Dogs = () => {
    const [lowestPrice, setLowestPrice] = useState(0); 
    const [highestPrice, setHighestPrice] = useState(1000); 
    const [breed, setBreed] = useState(null); 
    const [year, setYear] = useState(null); 
    const [dogs, setDogs] = useState([]); 
    const [filter, setFilter] = useState(false);


    useEffect(() => {
        axios.get(`http://localhost/dogs_store/server/api.php?table=dogs&price=${lowestPrice}-${highestPrice}&breed=${breed}&year=${year}`)
            .then(res => setDogs(res.data[0]))
            .catch(e => e.message);
    }, [filter])
    
    const handleFilter = (e) => {
        e.preventDefault();
        setFilter(!filter);
    }

  return (
    <div className='rooms' style={{marginTop: "100px"}}>
        <nav class="navbar">
            <button
            className="navbar-toggler btn bg-primary text-white ms-4 py-2 px-5"
            type="button" 
            data-bs-toggle="offcanvas" 
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar">
                Filter
            </button>
            <div className="container-fluid">
                <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
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
                                    if(e.target.value < 0) {
                                        return e.target.value = 0;
                                    }
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
                                    <option value="kangal">Kangal</option>
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
                    <form className="d-flex mt-3" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
                </div>
            </div>
        </nav>

        <div className='container my-5 d-flex justify-content-between flex-wrap'>
            {dogs.length > 0 && dogs.map(dog => {
                return (<div className="card my-5" style={{width: '20rem', height:'32rem'}} key={dog.id}>
                    <img src={require(`../assets/images/${dog.image}`)} alt='no-image' className='w-100'/>
                    <div className="card-body">
                        <p className="card-text">{dog.description}</p>
                        <Link to={`/dogs/${dog.id}`} className="btn btn-primary">Buy</Link>
                    </div>
                </div>)
                })}
            
        </div>
    </div>
  )
}

export default Dogs