import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar';
import Footer from '../Footer';
import FloatingUpButton from '../FloatingUpButton';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare, faEye, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const ListOfProperties = () => {

  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  useEffect(() => {
    axios.get('http://localhost:4000/api/properties')
      .then(result => {
        setProperties(result.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this Property?");

    if (isConfirmed) {
      axios.delete('http://localhost:4000/api/properties/' + id)
        .then(res => {
          console.log(res);
          // Update the property list after deletion
          setProperties(properties.filter(property => property._id !== id));
        })
        .catch(error => console.log(error));
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <NavBar />

      <nav className='my-4 mx-4' style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to='/adminDashboard'>Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page"> Registered Properties</li>
          </ol>
        </nav>
      <div className='container'>
        <div className=" my-4" align='center'>
          <h4>All Registered Properties</h4>
        </div>
        <div className='row'>
          <div className="col-md-4 my-2">
            <input
              type="text"
              placeholder="Search by Name"
              name='search'
              className="form-control"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="col-md-2 my-2">
            <button className="btn btn-outline-warning" onClick={() => setSearchQuery('')}>Clear</button>
          </div>
          <div className="col-md-6 my-2" align='right'>
            <Link to='/addProperty' className='btn btn-outline-primary'>
              <FontAwesomeIcon icon={faCirclePlus} style={{ color: "#B197FC" }} />&nbsp; Add a Property
            </Link>
          </div>
        </div>

        <div className="row my-4">
          {
            filteredProperties.map((property) => (
              <div className="col-sm-4 mb-3" key={property._id}>
                <div className="card">
                  <div className="card-body">
                    <div align='right'>
                      <span className='text-muted' align='right'>{property.availability}</span>
                    </div>
                    <div className='my-3 col-md-10'>
                      <h4 className="card-title">{property.title}</h4>
                    </div>
                    <div className='my-4'>
                      <p className="card-text my-3"><b>Property Holder: </b> {property.propHolder}</p>
                      <p className="card-text my-3"><b>Location: </b> {property.city}, {property.state}</p>
                      <p className="card-text my-3"><b>PG Type: </b>{property.pgType}</p>
                    </div>
                    <h6>Price: Rs.{property.price}</h6>
                    <div className='p-1' align="right">
                      <button className='btn btn-outline-dark mx-2 my-2' onClick={() => handleDelete(property._id)}>
                        <FontAwesomeIcon icon={faTrashCan} style={{ color: "#B197FC" }} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      <FloatingUpButton />
      <Footer />
    </>
  );
}

export default ListOfProperties;
