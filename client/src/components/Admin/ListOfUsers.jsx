import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar';
import Footer from '../Footer';
import FloatingUpButton from '../FloatingUpButton';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare, faEye, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


const ListOfUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  useEffect(() => {
    axios.get('http://localhost:4000/api/user/users')
      .then(result => {
        setUsers(result.data);
      })
      .catch(err => console.log(err));
  }, []);


  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");

    if (isConfirmed) {
      axios.delete('http://localhost:4000/api/user/users/' + id)
        .then(res => {
          console.log(res);
          setUsers(users.filter(user => user._id !== id));
        })
        .catch(error => console.log(error));
    }
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

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <NavBar />
      <nav className='mx-4 my-4' style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to='/adminDashboard'>Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Users</li>
        </ol>
      </nav>
      <div className='container'>
        <div className=" my-4" align='center'>
          <h4>All Registered Properties</h4>
        </div>
        <div className='row'>
          <div className="col-md-4 my-2">
            <input
              type="text"
              placeholder="Search by Name"
              name='search'
              className="form-control"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="col-md-2 my-2">
            <button className="btn btn-outline-warning" onClick={() => setSearchQuery('')}>Clear</button>
          </div>
        </div>

        <div className="row my-4">
          {
            filteredUsers.map((user) => (
              <div className="col-sm-4 mb-3" key={user._id}>
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">{user.userName}</h4>
                    <p className="card-text"><b>Email: </b> {user.userEmail}</p>
                    <p className="card-text"><b>Phone: </b> {user.userPhone}</p>
                    <p className="card-text"><b>Address: </b> {user.userAddress}</p>
                    <div className='p-1' align="right">
                      <button className='btn btn-outline-dark mx-2 my-2' onClick={() => handleDelete(user._id)}>
                        <FontAwesomeIcon icon={faTrashCan} style={{ color: "#B197FC" }} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))

          }
        </div>
      </div>

      <FloatingUpButton />
      <Footer />
    </>
  );
}

export default ListOfUsers
