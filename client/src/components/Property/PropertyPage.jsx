import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Footer from '../Footer'
import NavBar from '../NavBar'
import FloatingUpButton from '../FloatingUpButton'
import { Breadcrumb } from 'antd'
import Select from 'react-select';

const hover = {
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  height: 'auto',
  width: 'auto',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}

const PropertyPage = () => {

  const [propHolder_ID, setPropHolder_ID] = useState('');
  useEffect(() => {
    setPropHolder_ID(localStorage.getItem('propHolder_ID'))
  }, [])

  const [properties, setProperties] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [stateFilter, setStateFilter] = useState(null);
  const [priceFilter, setPriceFilter] = useState('');
  const [pgTypeFilter, setPgTypeFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4000/api/properties')
      .then(result => setProperties(result.data))
      .catch(err => console.log(err))
  }, [])

  const handleTitleSearch = (e) => {
    setSearchTitle(e.target.value);
  };

  const handleCitySearch = (e) => {
    setSearchCity(e.target.value);
  };

  const handleStateChange = (selectedOption) => {
    setStateFilter(selectedOption ? selectedOption.value : '');
  };

  const handlePriceChange = (price) => {
    setPriceFilter(price);
  };

  const handlePgTypeChange = (pgType) => {
    setPgTypeFilter(pgType);
  };

  const clearFilters = () => {
    setStateFilter(null);
    setPriceFilter('');
    setPgTypeFilter('');
    setSearchTitle('');
    setSearchCity('');
  };

  const filterProp = properties.filter(properties => {
    const searchByTitle = properties.title.toLowerCase().includes(searchTitle.toLowerCase());
    const searchByCity = properties.city.toLowerCase().includes(searchCity.toLowerCase());
    const searchByState = stateFilter ? properties.state.toLowerCase() === stateFilter.toLowerCase() : true;
    const searchByPrice = priceFilter ? properties.price.toLowerCase() === priceFilter.toLowerCase() : true;
    const searchByPgType = pgTypeFilter ? properties.pgType.toLowerCase() === pgTypeFilter.toLowerCase() : true;
    return searchByTitle && searchByCity && searchByState && searchByPrice && searchByPgType;
  });

  const stateOptions = [
    { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
    { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh' },
    { value: 'Assam', label: 'Assam' },
    { value: 'Bihar', label: 'Bihar' },
    { value: 'Chhattisgarh', label: 'Chhattisgarh' },
    { value: 'Goa', label: 'Goa' },
    { value: 'Gujarat', label: 'Gujarat' },
    { value: 'Haryana', label: 'Haryana' },
    { value: 'Himachal Pradesh', label: 'Himachal Pradesh' },
    { value: 'Jharkhand', label: 'Jharkhand' },
    { value: 'Karnataka', label: 'Karnataka' },
    { value: 'Kerala', label: 'Kerala' },
    { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
    { value: 'Maharashtra', label: 'Maharashtra' },
    { value: 'Manipur', label: 'Manipur' },
    { value: 'Meghalaya', label: 'Meghalaya' },
    { value: 'Mizoram', label: 'Mizoram' },
    { value: 'Nagaland', label: 'Nagaland' },
    { value: 'Odisha', label: 'Odisha' },
    { value: 'Punjab', label: 'Punjab' },
    { value: 'Rajasthan', label: 'Rajasthan' },
    { value: 'Sikkim', label: 'Sikkim' },
    { value: 'Tamil Nadu', label: 'Tamil Nadu' },
    { value: 'Telangana', label: 'Telangana' },
    { value: 'Tripura', label: 'Tripura' },
    { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
    { value: 'Uttarakhand', label: 'Uttarakhand' },
    { value: 'West Bengal', label: 'West Bengal' }
  ];

  const breadcrumbItems = [
    { title: <Link to="/" style={{ textDecoration: 'none' }}>Home</Link> },
    { title: "Properties" }
  ];

  return (
    <>
      <NavBar />

      <Breadcrumb items={breadcrumbItems}
        style={{
          margin: '16px 0',
          padding: '0 24px',
        }}
      />

      <div className='p-3' align='center'>
        <h1>Properties for You</h1>
      </div>
      <div className='container'>
        <div align='center'>
          <div className=' p-2' style={{ width: 'auto' }}>
            <div className='container border rounded p-4' align='center' style={hover}>
              <h4>Search Filter</h4>

              <div className='row p-3'>
                <div className="col-md-2">
                  <input
                    type="text"
                    placeholder="Search by Name"
                    className="form-control my-1"
                    value={searchTitle}
                    onChange={handleTitleSearch}
                  />
                </div>
                <div className="col-md-2">
                  <input
                    type="text"
                    placeholder="Search by City"
                    className="form-control my-1"
                    value={searchCity}
                    onChange={handleCitySearch}
                  />
                </div>

                <div className="col-6 row">
                  <div className='col-4'>
                    <Select
                      value={stateOptions.find(option => option.value === stateFilter)}
                      onChange={handleStateChange}
                      options={stateOptions}
                      placeholder="Select or search"
                      className="my-1 "
                    />
                  </div>

                  <div className="dropdown col-8">
                    <button className="btn btn-outline-dark dropdown-toggle my-1 mx-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      {pgTypeFilter ? pgTypeFilter : 'Select PG Type'}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-dark">
                      <li><button className="dropdown-item" onClick={() => handlePgTypeChange('Male')} >Boys </button></li>
                      <li><button className="dropdown-item" onClick={() => handlePgTypeChange('Female')} >Girls </button></li>
                      <li><button className="dropdown-item" onClick={() => handlePgTypeChange('Male & Female')}>Male & Female</button></li>
                    </ul>

                    <button className="btn btn-outline-dark dropdown-toggle my-1 mx-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      {priceFilter ? priceFilter : 'Select a Price Range'}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-dark">
                      <li><button className="dropdown-item" onClick={() => handlePriceChange('5000 - 7000')} >Rs. 5000 - 7000 </button></li>
                      <li><button className="dropdown-item" onClick={() => handlePriceChange('6000 - 8000')}>Rs. 6000 - 8000</button></li>
                      <li><button className="dropdown-item" onClick={() => handlePriceChange('7000 - 10000')}>Rs. 7000 - 10,000</button></li>
                    </ul>
                  </div>
                </div>
                <div className='col-md-2'>
                  <button className="btn btn-outline-primary my-1 mx-1" onClick={clearFilters}>Clear Filters</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className="row my-4">
          {
            filterProp.map((property) => (
              <div className="col-sm-6 mb-4" key={property._id}>
                <div className="card">
                  <div className='p-2' align='right'>
                    <label className='text-muted'>
                      <span className='badge rounded-pill text-bg-dark'>
                        {property.availability}
                      </span>
                    </label>
                  </div>
                  <div className="card-body row">

                    <div className='col-md-6'>
                      <img src={property.propImage} className="card-img-top rounded" alt="..." style={{ height: '260px' }} />
                    </div>

                    <div className='col-md-6'>

                      <div className='my-3 col-md-12'>
                        <h4 className="card-title">{property.title}</h4>
                      </div>

                      <div className='my-4'>
                        <p className="card-text my-3"><b>Property Holder: </b>
                          {property.propHolder}
                        </p>
                        <p className="card-text my-3"><b>Location: </b>
                          <span className='badge rounded-pill text-bg-light'>
                            {property.city}
                          </span>
                          <span className='badge rounded-pill text-bg-light'>
                            {property.state}
                          </span>
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

                      <div className=''>
                        <Link to={`/viewdetails/${property._id}`} className='btn btn-outline-dark my-3 col-12'>Go to details </Link>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div >
      <FloatingUpButton />
      <Footer />
    </>
  )
}

export default PropertyPage;
