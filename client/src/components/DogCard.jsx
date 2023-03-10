import React from 'react'
import { Link } from 'react-router-dom';

const DogCard = ({data}) => {
  
  return (
    <div className="card my-5 mx-3" style={{width: '20rem', height:'32rem'}}>
        <img src={require(`../assets/uploads/${data.image}`)} alt='no-image' className='w-100'/>
        <div className="card-body">
            <p className="card-text">{data.description}</p>
            <Link to={`/dog/${data.id}`} className="btn btn-primary">View</Link>
        </div>
    </div>
  )
}

export default DogCard