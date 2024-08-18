import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faArrowRightFromBracket, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer } from 'react-toastify';
import { handleSuccess, handleError } from '../../utils';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const [loggedInUser, setLoggedInUser] = useState('');
    const [userDetails, setUserDetails] = useState({
        userName: '',
        userEmail: '',
        userPhone: '',
        userDOB: '',
        userAddress: ''
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem('propHolder_ID');
        fetchUserData(userId);
    }, []);

    const fetchUserData = async (userId) => {
        try {
            const response = await fetch(`http://localhost:4000/api/user/profile/${userId}`);
            const result = await response.json();
            if (result.success) {
                setUserDetails(result.user);
                setLoggedInUser(result.user.userName);
            } else {
                handleError(result.message);
            }
        } catch (error) {
            handleError('Failed to fetch user data');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('propHolder_ID');
        handleSuccess('You have been logged out!!');
        handleSuccess(' .. Redirecting to home page!!');
        setTimeout(() => {
            navigate('/');
        }, 2000);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            const userId = localStorage.getItem('propHolder_ID');
            const response = await fetch(`http://localhost:4000/api/user/profile/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userDetails),
            });
            const result = await response.json();
            if (result.success) {
                handleSuccess('Profile updated successfully');
                setIsEditing(false);
                fetchUserData(userId); // Refresh user details
            } else {
                handleError(result.message);
            }
        } catch (error) {
            handleError('Failed to update profile');
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    return (
        <div>
            <div align='center'>
                <h5>Your Profile</h5>

                <div>
                    <div className='  border '>
                        <div className='my-4'>
                            <FontAwesomeIcon icon={faUser} style={{ color: "#B197FC", fontSize: '80px' }} />
                        </div>
                        <div className='row p-4 g-4 m-4 col-6 mx-5'>
                            <div className='col-md-6 '>
                                <h6><b>Name: </b></h6>
                                {isEditing ? (
                                    <input
                                        type='text'
                                        name='userName'
                                        value={userDetails.userName}
                                        onChange={handleInputChange}
                                        className='form-control'
                                    />
                                ) : (
                                    userDetails.userName
                                )}
                            </div>
                            <div className='col-md-6'>
                                <h6><b>Date of Birth: </b></h6>
                                {isEditing ? (
                                    <input
                                        type='date'
                                        name='userDOB'
                                        value={userDetails.userDOB}
                                        onChange={handleInputChange}
                                        className='form-control'
                                    />
                                ) : (
                                    userDetails.userDOB
                                )}
                            </div>

                            <div className='col-md-6'>
                                <h6><b>Email Address: </b></h6>
                                {isEditing ? (
                                    <input
                                        type='email'
                                        name='userEmail'
                                        value={userDetails.userEmail}
                                        onChange={handleInputChange}
                                        className='form-control'
                                    />
                                ) : (
                                    userDetails.userEmail
                                )}
                            </div>
                            <div className='col-md-6'>
                                <h6><b>Phone Number: </b></h6>
                                {isEditing ? (
                                    <input
                                        type='text'
                                        name='userPhone'
                                        value={userDetails.userPhone}
                                        onChange={handleInputChange}
                                        className='form-control'
                                    />
                                ) : (
                                    userDetails.userPhone
                                )}
                            </div>

                            <div className='col-md-12'>
                                <h6><b>Address: </b></h6>
                                {isEditing ? (
                                    <input
                                        type='text'
                                        name='userAddress'
                                        value={userDetails.userAddress}
                                        onChange={handleInputChange}
                                        className='form-control'
                                    />
                                ) : (
                                    userDetails.userAddress
                                )}
                            </div>
                        </div>

                    </div>

                    <div className='g-4' align='center'>
                        {isEditing ? (
                            <>
                                <button
                                    className='btn btn-outline-success my-2 mx-2'
                                    onClick={handleUpdate}
                                >
                                    Save
                                </button>
                                <button
                                    className='btn btn-outline-danger my-2 mx-2'
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button
                                className='btn btn-outline-success my-2 mx-2'
                                onClick={() => setIsEditing(true)}
                            >
                                <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#B197FC" }} />
                                Update
                            </button>
                        )}
                        {!isEditing && (
                            <button
                                className='btn btn-outline-warning my-2 mx-2'
                                onClick={handleLogout}
                            >
                                Sign out&nbsp;
                                <FontAwesomeIcon icon={faArrowRightFromBracket} style={{ color: "#FFD43B" }} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Profile;
