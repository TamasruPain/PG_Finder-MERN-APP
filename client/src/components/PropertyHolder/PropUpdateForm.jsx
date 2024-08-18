import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import wallpaper from "../images/wallpaperflare.com_wallpaper6.jpg"

const PropUpdateFrom = () => {

  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [gmapLink, setGmapLink] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [price, setPrice] = useState('');
  const [pgType, setPgType] = useState('');
  const [propImage, setPropImage] = useState('');
  const [availability, setAvailability] = useState('');
  const [propHolder, setPropHolder] = useState('');
  const [propHolderPhoneNum, setPropHolderPhoneNum] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:4000/api/properties/${id}`)
      .then(result => {
        setTitle(result.data.title || '');
        setDetails(result.data.details || '');
        setAddress(result.data.address || '');
        setGmapLink(result.data.gmapLink || '');
        setState(result.data.state || '');
        setCity(result.data.city || '');
        setPrice(result.data.price || '');
        setPgType(result.data.pgType || '');
        setPropImage(result.data.propImage || '');
        setAvailability(result.data.availability || '');
        setPropHolder(result.data.propHolder || '');
        setPropHolderPhoneNum(result.data.propHolderPhoneNum || '');
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertToBase64(file);
      setPropImage(base64);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const Update = (e) => {
    e.preventDefault();
    axios.patch(`http://localhost:4000/api/properties/${id}`, {
      title, details, address, gmapLink, state, city, price, pgType, propImage, availability, propHolder, propHolderPhoneNum
    })
      .then(result => {
        console.log(result);
        navigate(-1); // Go back to previous page
      })
      .catch(err => console.log(err));
  };

  const divStyle = {
    backgroundImage: `url(${wallpaper})`,
    height: 'auto',
    width: 'auto',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div style={divStyle}>
      <div className='d-flex justify-content-center align-items-center vh-100' style={{ height: '600px' }} >
        <div className='form-container p-2' style={{ height: 'auto', width: '600px', backgroundColor: 'rgba(0, 0, 0, 0.4)', color: 'white' }}>
          <div align='right'>
            <Link to='/userpropertylist' className='btn btn-outline-light'><FontAwesomeIcon icon={faAnglesLeft} /></Link>
          </div>
          <h2 className='container d-flex justify-content-center align-items-center'>Update Books</h2>

          <form className="row g-3 m-2 p-2 my-2" onSubmit={Update}>

            <div className="col-md-5">
              <label className="form-label" htmlFor="typeText">Title</label>
              <input type="text" placeholder='' id="typeText" className="form-control"
                value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div className="col-md-7">
              <label className="form-label" htmlFor="typeLocation">Address</label>
              <input type="text" id="typeLocation" placeholder='' className="form-control"
                value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>

            <div className="col-md-6">
              <label className="form-label" htmlFor="typeName">Poperty Holder Name:</label>
              <input type="text" placeholder='' id="typeName" className="form-control"
                value={propHolder} onChange={(e) => setPropHolder(e.target.value)} />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="typeMapLocation">Gmap Link</label>
              <input type="text" id="typeMapLocation" placeholder='' className="form-control"
                value={gmapLink} onChange={(e) => setGmapLink(e.target.value)} />
            </div>

            <div className="col-md-3">
              <label className="form-label" htmlFor="typeCity">City</label>
              <input type="text" id="typeCity" placeholder='' className="form-control"
                value={city} onChange={(e) => setCity(e.target.value)} />
            </div>

            <div className='col-md-3'>
              <label htmlFor="typePgType" className="form-label">State</label>
              <select
                className="form-select"
                value={state}
                onChange={(e) => setState(e.target.value)}>
                <option value="Not Specified">Select State</option>
                <option value="Bangaluru">Bangaluru</option>
                <option value="Chennai">Chennai</option>
                <option value="West Bengal">West Bengal</option>
              </select>
            </div>

            <div className='col-md-3'>
              <label htmlFor="typePgType" className="form-label">Price Range</label>
              <select
                className="form-select"
                value={price}
                onChange={(e) => setPrice(e.target.value)}>
                <option value=" Not Specified">Select Price</option>
                <option value="5000 - 7000">Rs. 5,000 - 7,000</option>
                <option value="6000 - 8000">Rs. 6,000 - 8,000</option>
                <option value="7000 - 10000">Rs. 7,000 - 10,000</option>
              </select>
            </div>

            <div className='col-md-3'>
              <label htmlFor="typePgType" className="form-label">PG Type</label>
              <select
                className="form-select"
                value={pgType}
                onChange={(e) => setPgType(e.target.value)}>
                <option value="Not Specified">Select Types</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Male & Female">Male & Female</option>
              </select>
            </div>

            <div className='col-md-4'>
              <label htmlFor="typeAvailability" className="form-label">Availability</label>
              <select
                className="form-select"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}>
                <option value="Waiting for Update...">Choose the Option</option>
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>

            <div className="col-md-8">
              <label htmlFor="formFile" className="form-label">Change Image</label>
              <input className="form-control form-control" id="formFile" type="file"
                onChange={handleImageChange} />
            </div>
            <div className="col-md-8">
              <label htmlFor="typeDetails" className="form-label">Details</label>
              <textarea type="text" placeholder='' className="form-control" id="typeDetails"
                value={details} onChange={(e) => setDetails(e.target.value)} />
            </div>

            <div className="col-md-4">
              <label className="form-label" htmlFor="typeContact">Contact Number</label>
              <input type="text" id="typeContact" placeholder='' className="form-control"
                value={propHolderPhoneNum} onChange={(e) => setPropHolderPhoneNum(e.target.value)} />
            </div>
            <div className='p-2' align='center'>
              <button type="submit" className="btn btn-outline-light w-50 my-3"> Make Update </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default PropUpdateFrom
