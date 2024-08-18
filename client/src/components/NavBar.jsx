import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import searchimg from './images/Search.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard, faArrowRightFromBracket, } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer } from 'react-toastify';
import { handleSuccess } from '../utils';
import ButtonModel from '../components/ButtonModel.jsx'

const NavBar = () => {

  const navigate = useNavigate();

  const [loggedInUser, setLoggedInUser] = useState('');
  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  }, [])

  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('propHolder_ID');
    setTimeout(() => {
      navigate('/')
    }, 2000);
    handleSuccess('You have been logged out!!');
    handleSuccess(' .. Redirecting to home page!!');
  };

  const [loggedInAdmin, setLoggedInAdmin] = useState('');
  const [Email, setEmail] = useState('');
  useEffect(() => {
    setLoggedInAdmin(localStorage.getItem('loggedInAdmin'))
    setEmail(localStorage.getItem('Email'))
  }, [])

  const adminHandleLogout = (e) => {
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
      <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <div>
              <img src={searchimg} style={{ width: '25px', height: '25px' }} />
              PG Finder
            </div>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">

            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/properties">Properties</Link>
              </li>
            </ul>

            <ul className='navbar-nav ms-auto'>
              {loggedInUser ? (
                <>
                  <li className="nav-item">
                    <Link className='btn btn-outline-success mx-2 my-1' to='/userDashboard'>
                      <FontAwesomeIcon
                        icon={faAddressCard}
                        style={{ color: "#B197FC", fontSize: '20px' }}
                      />&nbsp;{loggedInUser}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button className='btn btn-outline-warning mx-2 my-1' onClick={handleLogout}>
                      Sign Out&nbsp;
                      <FontAwesomeIcon icon={faArrowRightFromBracket} style={{ color: "#FFD43B", }} />
                    </button>
                  </li>
                </>
              ) : loggedInAdmin ? (
                <li>
                  <div align='right'>
                    <Link to='/adminDashboard'>{Email}</Link>
                    <button className='btn btn-outline-light mx-2' onClick={adminHandleLogout}>
                      logout
                    </button>
                  </div>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <ButtonModel />
                  </li>

                </>
              )}

            </ul>

          </div>
        </div>
      </nav >
      <ToastContainer />
    </div >
  )
}

export default NavBar
