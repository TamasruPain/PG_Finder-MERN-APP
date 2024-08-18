import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import wallpaper from "../images/wallpaperflare.com_wallpaper32.jpg"
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../../utils';

const divStyle = {
  backgroundImage: `url(${wallpaper})`,
  height: 'auto',
  width: 'auto',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const AdminLogin = () => {

  const [loginInfo, setLoginInfo] = useState({
    adminEmail: '',
    adminPassword: ''
  })
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyAdminLoginInfo = { ...loginInfo };
    copyAdminLoginInfo[name] = value;
    setLoginInfo(copyAdminLoginInfo);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const { adminEmail, adminPassword } = loginInfo;
    if (!adminEmail || !adminPassword) {
      return handleError('All the fileds are required !!')
    }
    try {
      const url = 'http://localhost:4000/api/auth/adminLogin';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      });
      const result = await response.json();
      const { success, message, jwtToken, adminName, adminEmail, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInAdmin', adminName);
        localStorage.setItem('Email', adminEmail)

        setTimeout(() => {
          navigate('/adminDashboard')
        }, 1000)
      }
      else if (error) {
        const details = error?.details[0].message;
        handleError(details);

      } else if (!success) {
        handleError(message)
      }
      console.log(result);
    } catch (err) {
      handleError(err);
    }
  }

  return (

    <div>
      <div style={divStyle}>
        <div>
          <div className='d-flex justify-content-center align-items-center vh-100'>

            <div className='form-container p-2' style={{ height: '560px', width: '400px', backgroundColor: 'rgba(0, 0, 0, 0.4)', color: 'gold' }}>

              <div align='right'>
                <Link to='/' className='btn btn-outline-warning'><FontAwesomeIcon icon={faAnglesLeft} /></Link>
              </div>

              <div className='my-4' align='center'>
                <h2>Admin Login</h2>
              </div>

              <div className='my-5'>
                <form className="row g-4 p-2" onSubmit={handleLogin}>

                  <div className="col-md-12">
                    <label className="form-label" htmlFor="typeEmail"> Email Id :</label>
                    <input type="email" placeholder='123***@gmail.com' id="typeEmail" className="form-control"
                      name='adminEmail' onChange={handleChange} value={loginInfo.adminEmail} />
                  </div>

                  <div className="col-md-12">
                    <label className="form-label" htmlFor="typePassword">Password :</label>
                    <input type="password" id="typePassword" placeholder='ABC123***' className="form-control"
                      name='adminPassword' onChange={handleChange} value={loginInfo.adminPassword} />
                  </div>

                  <div className='my-2' align='center'>
                    <button type="submit" className="btn btn-outline-warning w-50 my-4"> Login </button>
                  </div>

                  <div align='center'>
                    <p> click here to <Link to='/adminSignup'> Signup!! </Link> </p>
                  </div>

                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>

  )
}
export default AdminLogin
