import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import wallpaper from "../images/wallpaperflare.com_wallpaper45.jpg"
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../../utils';

const divStyle = {
  backgroundImage: `url(${wallpaper})`,
  height: 'auto',
  width: 'auto',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};


const UserLogin = () => {

  const [loginInfo, setLoginInfo] = useState({
    userEmail: '',
    userPassword: ''
  })
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const { userEmail, userPassword } = loginInfo;
    if (!userEmail || !userPassword) {
      return handleError('All the fileds are required !!')
    }
    try {
      const url = 'http://localhost:4000/api/auth/login';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      });
      const result = await response.json();
      const { success, message, jwtToken, userName, propHolder_ID, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', userName);
        localStorage.setItem('propHolder_ID', propHolder_ID)

        setTimeout(() => {
          navigate('/userDashboard')
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
                <h2>Property Holder Login</h2>
                <p>Login into your account and have a Good Day !!</p>
              </div>

              <div className='my-5'>
                <form className="row g-4 p-2" onSubmit={handleLogin}>

                  <div className="col-md-12">
                    <label className="form-label" htmlFor="typeEmail"> Email Id :</label>
                    <input type="email" placeholder='123***@gmail.com' id="typeEmail" className="form-control"
                      name='userEmail' onChange={handleChange} value={loginInfo.userEmail} />
                  </div>

                  <div className="col-md-12">
                    <label className="form-label" htmlFor="typePassword">Password :</label>
                    <input type="password" id="typePassword" placeholder='ABC123***' className="form-control"
                      name='userPassword' onChange={handleChange} value={loginInfo.userPassword} />
                  </div>

                  <div className='my-2' align='center'>
                    <button type="submit" className="btn btn-outline-warning w-50 my-4"> Login </button>
                  </div>

                  <div align='center'>
                    <p>Don't have a property holder account? click here to <Link to='/userSignup'> Signup!! </Link> </p>
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

export default UserLogin
