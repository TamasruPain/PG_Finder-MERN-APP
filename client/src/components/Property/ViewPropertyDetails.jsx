import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import NavBar from '../NavBar';
import Footer from '../Footer';
import FloatingUpButton from '../FloatingUpButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faMapLocationDot, faHandPointer } from '@fortawesome/free-solid-svg-icons';
import EnqueryForm from './EnqueryForm';

const hover = {
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"
};

const ViewPropertyDetails = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [gmapLink, setGmapLink] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [price, setPrice] = useState('');
  const [pgType, setPgType] = useState('');
  const [availability, setAvailability] = useState('');
  const [propImage, setPropImage] = useState('');
  const [propHolder, setPropHolder] = useState('');
  const [propHolderPhoneNum, setPropHolderPhoneNum] = useState('');
  const [propHolder_ID, setPropHolder_ID] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:4000/api/properties/${id}`)
      .then(result => {
        console.log(result);
        setTitle(result.data.title || '');
        setDetails(result.data.details || '');
        setAddress(result.data.address || '');
        setGmapLink(result.data.gmapLink || '');
        setState(result.data.state || '');
        setCity(result.data.city || '');
        setPrice(result.data.price || '');
        setPgType(result.data.pgType || '');
        setAvailability(result.data.availability || '');
        setPropImage(result.data.propImage || '');
        setPropHolder(result.data.propHolder || '');
        setPropHolderPhoneNum(result.data.propHolderPhoneNum || '');
        setPropHolder_ID(result.data.propHolder_ID || '');
      })
      .catch(err => console.log(err));
  }, [id]);

  return (
    <>
      <NavBar />
      <div className='p-4'>
        <div className='container border rounded' style={hover}>
          <div className='row p-4'>
            <div className="col-md-7">

              <div className='container'>

                <div className='row col-12'>
                  <div className='col-2'>
                    <Link to='/properties' className='btn btn-outline-dark'>
                      <FontAwesomeIcon icon={faAnglesLeft} />
                    </Link>
                  </div>
                  <div className='col-10' align='right'>
                    <span className='badge text-bg-dark' disabled>
                      {availability}
                    </span>
                  </div>
                </div>

                <div className='row col-md-12 my-4 g-3'>
                  <div className='col-md-6'>
                    <img src={propImage} className="rounded" alt="..." style={{ height: "230px", width: "280px" }} />
                  </div>

                  <div className='col-md-6'>
                    <div className=''>
                      <h4 className='my-3'>{title}</h4>
                    </div>
                    <hr></hr>
                    <div className='row col-12'>
                      <div className='col-6 my-2'>
                        <h6>Property Holder:</h6>
                        <span className="badge rounded-pill text-bg-light">{propHolder}</span>
                      </div>
                      <div className='col-6 my-2'>
                        <h6>Phone Number:</h6>
                        <span className="badge rounded-pill text-bg-light">{propHolderPhoneNum}</span>
                      </div>
                    </div>

                    <div className='row col-12'>
                      <div className='col-6 my-2'>
                        <h6>PG Type:</h6>
                        <span className="badge rounded-pill text-bg-info">{pgType}</span>

                      </div>
                      <div className='col-6 my-2'>
                        <h6>Price:</h6>
                        <span className="badge rounded-pill text-bg-primary">Rs. {price}</span>

                      </div>
                    </div>
                  </div>
                </div>
                <hr></hr>
                <div className='col-md-12 row my-4'>
                  <div className='col-md-6'>
                    <div className='p-3'>
                      <h6>
                        <a href={gmapLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                          <FontAwesomeIcon icon={faMapLocationDot} style={{ color: "#B197FC", }} />
                          &nbsp;
                          Gmap Location
                        </a>
                      </h6>
                      <span>
                        click to open&nbsp;
                        <FontAwesomeIcon icon={faHandPointer} style={{ color: "#B197FC", align: 'center' }} />
                      </span>
                    </div>
                    <div className='p-3'>
                      <h6>Address:</h6>
                      <p>{address}</p>
                    </div>
                    <div className='p-3'>
                      <h6>State & City:</h6>
                      <p>{state} & {city}</p>
                    </div>

                  </div>
                  <div className="col-md-6">
                    <h6>Details:</h6>
                    <p>{details}</p>
                  </div>
                </div>
                <hr></hr>
              </div>
            </div>
            <EnqueryForm propertyID={id} title={title} propHolder_ID={propHolder_ID} />
          </div>
        </div>
      </div>
      <FloatingUpButton />
      <Footer />
    </>
  );
}

export default ViewPropertyDetails;
