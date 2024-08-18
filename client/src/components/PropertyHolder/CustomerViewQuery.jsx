import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faTrashCan, faEye } from '@fortawesome/free-solid-svg-icons';
import wallpaper from "../images/wallpaperflare.com_wallpaper2.jpg";

const CustomerViewQuery = () => {

  const { id } = useParams();
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerNumber, setCustomerNumber] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerQuery, setCustomerQuery] = useState('');
  const [propertyID, setPropertyID] = useState('');
  const [propertyTitle, setPropertyTitle] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:4000/api/query/' + id)
      .then(result => {
        const queryData = result.data;
        setCustomerName(queryData.customerName || '');
        setCustomerEmail(queryData.customerEmail || '');
        setCustomerNumber(queryData.customerNumber || '');
        setCustomerAddress(queryData.customerAddress || '');
        setCustomerQuery(queryData.customerQuery || '');
        setPropertyID(queryData.propertyID || '');

        // Fetch property details
        return axios.get(`http://localhost:4000/api/properties/${queryData.propertyID}`);
      })
      .then(result => {
        setPropertyTitle(result.data.title || 'Property not found');
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this Query?");
    if (isConfirmed) {
      try {
        const response = await axios.delete(`http://localhost:4000/api/query/${id}`);
        console.log(response);
        navigate('/customerqueries');
      } catch (error) {
        console.error(error);
        alert('Failed to delete the query. Please try again.');
      }
    }
  }

  const divStyle = {
    backgroundImage: `url(${wallpaper})`,
    height: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={divStyle}>
      <div className='d-flex justify-content-center align-items-center vh-100' style={{ height: '600px' }}>
        <div className='form-container p-2' style={{ width: '600px', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white' }}>
          <div align='right'>
            <Link to='/customerqueries' className='btn btn-outline-light'><FontAwesomeIcon icon={faAnglesLeft} /></Link>
          </div>
          <h2 className='text-center'>
            Query Details Of the Customer
          </h2>
          <div className='p-3'>
            <div className='row mb-3'>
              <div className='col-6'>
                <div className="my-2">
                  <h5>Customer Name:</h5>
                  <p>{customerName}</p>
                </div>
                <div className="my-2">
                  <h5>Email:</h5>
                  <p>{customerEmail}</p>
                </div>
                <div className="my-2">
                  <h5>Phone No:</h5>
                  <p>{customerNumber}</p>
                </div>
              </div>
              <div className='col-6'>
                <div className="my-2">
                  <h5>Address:</h5>
                  <p>{customerAddress}</p>
                </div>
                <div className='my-2'>
                  <h5>Property Name</h5>
                  <Link to={`/viewProperty/${propertyID}`}>
                    <p>{propertyTitle}</p>
                  </Link>
                </div>
                <div className="my-2">
                  <h5>Query:</h5>
                  <p>{customerQuery}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button onClick={() => handleDelete(id)} className="btn btn-outline-light mx-4 my-2">
              <FontAwesomeIcon icon={faTrashCan} style={{ color: "#B197FC" }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerViewQuery;
