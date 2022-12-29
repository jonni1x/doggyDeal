import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({allPages, changePage}) => {
  return (
    <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                {
                    allPages.map((item, i) => {
                        return <li className="page-item">
                            <Link 
                            key={i} 
                            className="page-link"
                            onClick={e => changePage(e.target.textContent)}
                            >{item}</Link>
                        </li>
                    })
                }
            </ul>
        </nav>
  )
}

export default Pagination