import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import wallpaper from "../images/wallpaperflare.com_wallpaper32.jpg"
import { handleError, handleSuccess } from '../../utils';

const divStyle = {
    backgroundImage: `url(${wallpaper})`,
    height: 'auto',
    width: 'auto',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
};
const AdminSignup = () => {

    const [signupInfo, setSignupInfo] = useState({
        adminName: '',
        adminEmail: '',
        adminPassword: '',
        adminDOB: ''
    })
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyAdminSignupInfo = { ...signupInfo };
        copyAdminSignupInfo[name] = value;
        setSignupInfo(copyAdminSignupInfo);
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const { adminName, adminDOB, adminEmail, adminPassword } = signupInfo;
        if (!adminName || !adminDOB || !adminEmail || !adminPassword) {
            return handleError('All the fileds are required !!')
        }
        try {
            const url = 'http://localhost:4000/api/auth/adminSignup';
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
                    navigate('/adminLogin')
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
                    <div className='d-flex justify-content-center align-items-center vh-100' style={{ height: '600px' }} >

                        <div className='form-container p-2' style={{ height: 'auto', width: '400px', backgroundColor: 'rgba(0, 0, 0, 0.4)', color: 'gold' }}>

                            <div align='right'>
                                <Link to='/' className='btn btn-outline-warning'><FontAwesomeIcon icon={faAnglesLeft} /></Link>
                            </div>

                            <div align='center'>
                                <h2>Create a Admin</h2>
                            </div>

                            <form className="row g-3 p-2 my-3" onSubmit={handleSignup}>

                                <div className="col-md-7">
                                    <label className="form-label" htmlFor="typeText">Name of the Admin:</label>
                                    <input type="text" placeholder='John Poul' id="typeText" className="form-control" name="adminName"
                                        onChange={handleChange}
                                        value={signupInfo.adminName} />
                                </div>

                                <div className="col-md-5">
                                    <label className="form-label" htmlFor="typeDate"> Date OF Birth:</label>
                                    <input type="date" id="typeDate" placeholder='30-12-2000' className="form-control" name="adminDOB"
                                        onChange={handleChange}
                                        value={signupInfo.adminDOB} />
                                </div>

                                <div className="col-md-12">
                                    <label className="form-label" htmlFor="typeEmail"> Active Email:</label>
                                    <input type="email" placeholder='john@gmail.com' id="typeEmail" className="form-control" name='adminEmail'
                                        onChange={handleChange}
                                        value={signupInfo.adminEmail} />
                                </div>

                                <div className="col-md-12">
                                    <label className="form-label" htmlFor="typePassword">Create a password:</label>
                                    <input type="password" id="typePassword" placeholder='123abc*****' className="form-control" name='adminPassword'
                                        onChange={handleChange}
                                        value={signupInfo.adminPassword} />
                                </div>

                                <div className='p-2' align='center'>
                                    <button type="submit" className="btn btn-outline-warning w-50 my-3">Create </button>
                                </div>
                            </form>
                            <div align='center'>
                                <p>Already have an account? click here to <Link to='/adminLogin'> Login!! </Link> </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>

    )
}

export default AdminSignup
