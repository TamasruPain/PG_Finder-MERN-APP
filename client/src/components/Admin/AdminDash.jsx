import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar';
import Footer from '../Footer';
import { Link, useNavigate } from 'react-router-dom';
import { handleSuccess } from '../../utils';
import { ToastContainer } from 'react-toastify';

const breadcrumbItems = [
  { title: <Link to='/adminDashboard' style={{ textDecoration: 'none' }}>Home</Link> }
];

const AdminDash = () => {

  const navigate = useNavigate();
  const [loggedInAdmin, setLoggedInAdmin] = useState('');
  const [Email, setEmail] = useState('');
  useEffect(() => {
    setLoggedInAdmin(localStorage.getItem('loggedInAdmin'))
    setEmail(localStorage.getItem('Email'))
  }, [])

  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInAdmin');
    localStorage.removeItem('Email')
    handleSuccess('You are logged out !!');
    setTimeout(() => {
      navigate('/');
    }, 1000)
  }

  return (
    <div>
      < NavBar />
      <nav className='mx-4 my-4' style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">Home</li>
          <li className="breadcrumb-item active" aria-current="page"></li>
        </ol>
      </nav>

      <div>
        <div>
          <div align='right'>
            {Email}
            <button className='btn btn-outline-dark mx-2' onClick={handleLogout}>
              logout
            </button>
          </div>
          <div>
            <h1 align='center'>Welcome {loggedInAdmin}</h1>
          </div>
        </div>


        <div align='center' style={{ height: '368px' }}>
          <div className="row my-5 col-8" >
            <div className="col-md-4">
              <Link to="/listofproperties" style={{ textDecoration: 'none' }}>
                <div className="card">
                  <div className="card-body">
                    <div className='d-flex justify-content-between'>
                      <h4 className='card-title'>Properties</h4>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-4">
              <Link to="/listofusers" style={{ textDecoration: 'none' }}>
                <div className="card">
                  <div className="card-body">
                    <div className='d-flex justify-content-between'>
                      <h4 className='card-title'>Property Holders</h4>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-4">
              <Link to="/adminprofile" style={{ textDecoration: 'none' }}>
                <div className="card">
                  <div className="card-body">
                    <div className='d-flex justify-content-between'>
                      <h4 className='card-title'>Profile</h4>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

          </div>
        </div>


      </div>
      < Footer />
      <ToastContainer />
    </div>
  )
}

export default AdminDash
