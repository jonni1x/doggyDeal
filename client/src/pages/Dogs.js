import React from 'react'
import { Link } from 'react-router-dom'

const Dogs = () => {

    //sort=price-0-100&breed-pitbull&year-2
    //price=input1.value-input2.value;
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
                    <form>
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item d-flex">
                                <label htmlFor='lowest-price'>Lowest price</label>
                                <input 
                                type='number' 
                                style={{width: "60px", marginLeft: "10px"}} 
                                name='lowest-price'
                                value="0"/>
                                <label htmlFor='highest-price' style={{marginLeft: "10px"}}>Highest Price</label>
                                <input
                                type='number' 
                                style={{width: "60px", marginLeft: "10px"}} 
                                name='highest-price'
                                value="1000"/>
                            </li>
                            <li className="nav-item dropdown mt-4">
                                <label htmlFor='breed' className='me-3'>Breed:</label>
                                <select name="breed" id="breed">
                                    <option value="pitbull">Pitbull</option>
                                    <option value="kangal">Kangal</option>
                                    <option value="doberman">Doberman</option>
                                </select>
                            </li>
                            <li className="nav-item dropdown mt-4">
                                <label htmlFor='year' className='me-3'>Year:</label>
                                <select className='px-2 py-2 text-success' name="year" id="year">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </li>
                            <button className="btn btn-primary my-5 text-white ms-4 py-2 px-5"
                            type="button"
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
            <div className="card my-5" style={{width: '20rem', height:'32rem'}}>
                <img src={require('../assets/images/no-image.jpg')} alt='no-image' className='w-100'/>
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <Link href="#" className="btn btn-primary">Book</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dogs