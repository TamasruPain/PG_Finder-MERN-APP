import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const HomePropertis = () => {

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/properties')
      .then(result => setProperties(result.data.slice(0, 3))) // Limit to first 3 properties
      .catch(err => console.log(err))
  }, [])

  return (
    <div className='container my-5'>
      <div className="row my-4">
        {
          properties.map((property) => (
            <div className="col-sm-4 mb-4" key={property._id}>
              <div className="card" style={{ width: '380px' }}>
                <div className='m-3' align='right'>
                  <label className='text-muted'>
                    <span className='badge rounded-pill text-bg-dark'>
                      {property.availability}
                    </span>
                  </label>
                </div>
                <img src={property.propImage} className="card-img-top rounded" alt="..." style={{height:'200px'}} />
                <div className="card-body">
                  <div className='my-3 col-md-10'>
                    <h4 className="card-title">{property.title}</h4>
                  </div>
                  <div className='my-4'>
                    <p className="card-text my-3"><b>Property Holder: </b> {property.propHolder}</p>
                    <p className="card-text my-3"><b>Location: </b>
                      <span className='badge rounded-pill text-bg-light'>{property.city}</span>
                      <span className='badge rounded-pill text-bg-light'>{property.state}</span>
                    </p>
                    <p className="card-text my-3">
                      <span className='badge rounded-pill text-bg-info mx-2'>
                        {property.pgType}
                      </span>
                      <span className='badge rounded-pill text-bg-primary mx-2'>
                      Rs.{property.price}
                    </span>
                    </p>            
                  </div>
                </div>
                <div className='p-3' align='right'>
                  <Link to={`/viewdetails/${property._id}`} className='btn btn-outline-dark col-12'>Go to details </Link>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <div className='p-4' align='center'>
        <Link className='btn btn-outline-dark' to='/properties'>
          More Properties &nbsp;
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} style={{ color: "#B197FC" }} />
        </Link>
      </div>
    </div>
  );
}

export default HomePropertis;
