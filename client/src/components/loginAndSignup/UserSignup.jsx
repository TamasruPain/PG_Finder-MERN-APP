import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import wallpaper from "../images/wallpaperflare.com_wallpaper45.jpg"
import { handleError, handleSuccess } from '../../utils';

const divStyle = {
  backgroundImage: `url(${wallpaper})`,
  height: 'auto',
  width: 'auto',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const userSignup = () => {

  const [signupInfo, setSignupInfo] = useState({
    userName: '',
    userEmail: '',
    userPassword: '',
    userAddress: '',
    userDOB: '',
    userPhone: ''
  })
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  }

  const handleSignup = async (e) => {
    e.preventDefault();
    const { userName, userPhone, userDOB, userAddress, userEmail, userPassword } = signupInfo;
    if (!userName || !userPhone || !userDOB || !userAddress || !userEmail || !userPassword) {
      return handleError('All the fileds are required !!')
    }
    try {
      const url = 'http://localhost:4000/api/auth/signup';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupInfo)
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/userLogin')
        }, 1000)
      }
      else if (error) {
        const details = error?.details[0].message;
        handleError(details);

      } else if (!success){
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
          <div className='d-flex justify-content-center align-items-center vh-100' style={{ height: '600px' }} >

            <div className='form-container p-2' style={{ height: 'auto', width: '500px', backgroundColor: 'rgba(0, 0, 0, 0.4)', color: 'gold' }}>

              <div align='right'>
                <Link to='/' className='btn btn-outline-warning'><FontAwesomeIcon icon={faAnglesLeft} /></Link>
              </div>

              <div align='center'>
                <h2>Create a Account</h2>
                <p>SignUp as a Property Holder and create your best properies !!</p>
              </div>

              <form className="row g-3 p-2 my-3" onSubmit={handleSignup}>

                <div className="col-md-7">
                  <label className="form-label" htmlFor="typeText">Name Of the Property Holder:</label>
                  <input type="text" placeholder='' id="typeText" className="form-control" name="userName"
                    onChange={handleChange}
                    value={signupInfo.userName} />
                </div>

                <div className="col-md-5">
                  <label className="form-label" htmlFor="typeDate"> Date OF Birth:</label>
                  <input type="date" id="typeDate" placeholder='' className="form-control" name="userDOB"
                    onChange={handleChange}
                    value={signupInfo.userDOB} />
                </div>

                <div className="col-md-6">
                  <label className="form-label" htmlFor="typeEmail"> Active Email:</label>
                  <input type="email" placeholder='' id="typeEmail" className="form-control" name='userEmail'
                    onChange={handleChange}
                    value={signupInfo.userEmail} />
                </div>

                <div className="col-md-6">
                  <label className="form-label" htmlFor="typeContact">Current Contact Number:</label>
                  <input type="contact" id="typeContact" placeholder='' className="form-control" name='userPhone'
                    onChange={handleChange}
                    value={signupInfo.userPhone} />
                </div>

                <div className="col-md-12">
                  <label className="form-label" htmlFor="typePassword">Create a password:</label>
                  <input type="password" id="typePassword" placeholder='' className="form-control" name='userPassword'
                    onChange={handleChange}
                    value={signupInfo.userPassword} />
                </div>

                <div className="col-md-12">
                  <label className="form-label" htmlFor="typeLocation">Current Address:</label>
                  <textarea type="text" id="typeLocation" placeholder='' className="form-control" name='userAddress'
                    onChange={handleChange}
                    value={signupInfo.userAddress} />
                </div>

                <div className='p-2' align='center'>
                  <button type="submit" className="btn btn-outline-warning w-50 my-3">Create </button>
                </div>
              </form>
              <div align='center'>
                <p>Already have an account? click here to <Link to='/userLogin'> Login!! </Link> </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>

  )
}

export default userSignup
