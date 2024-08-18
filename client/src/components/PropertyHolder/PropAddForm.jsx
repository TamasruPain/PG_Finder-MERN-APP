import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Select from 'react-select';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import wallpaper from "../images/wallpaperflare.com_wallpaper25.jpg"
import { handleError, handleSuccess } from '../../utils';
import { ToastContainer } from 'react-toastify';

//function to convert the image to base64
function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const fileRender = new FileReader();
        fileRender.readAsDataURL(file);
        fileRender.onload = () => {
            resolve(fileRender.result)
        };
        fileRender.onerror = () => {
            reject(error)
        }
    })
}

const stateOptions = [
    { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
    { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh' },
    { value: 'Assam', label: 'Assam' },
    { value: 'Bihar', label: 'Bihar' },
    { value: 'Chhattisgarh', label: 'Chhattisgarh' },
    { value: 'Goa', label: 'Goa' },
    { value: 'Gujarat', label: 'Gujarat' },
    { value: 'Haryana', label: 'Haryana' },
    { value: 'Himachal Pradesh', label: 'Himachal Pradesh' },
    { value: 'Jharkhand', label: 'Jharkhand' },
    { value: 'Karnataka', label: 'Karnataka' },
    { value: 'Kerala', label: 'Kerala' },
    { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
    { value: 'Maharashtra', label: 'Maharashtra' },
    { value: 'Manipur', label: 'Manipur' },
    { value: 'Meghalaya', label: 'Meghalaya' },
    { value: 'Mizoram', label: 'Mizoram' },
    { value: 'Nagaland', label: 'Nagaland' },
    { value: 'Odisha', label: 'Odisha' },
    { value: 'Punjab', label: 'Punjab' },
    { value: 'Rajasthan', label: 'Rajasthan' },
    { value: 'Sikkim', label: 'Sikkim' },
    { value: 'Tamil Nadu', label: 'Tamil Nadu' },
    { value: 'Telangana', label: 'Telangana' },
    { value: 'Tripura', label: 'Tripura' },
    { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
    { value: 'Uttarakhand', label: 'Uttarakhand' },
    { value: 'West Bengal', label: 'West Bengal' },
];

const PropAddForm = () => {

    const [propHolder_ID, setPropHolder_ID] = useState('');
    useEffect(() => {
        setPropHolder_ID(localStorage.getItem('propHolder_ID'))
    }, [])

    const [title, setTitle] = useState();
    const [details, setDetails] = useState();
    const [gmapLink, setGmapLink] = useState();
    const [address, setAddress] = useState();
    const [state, setState] = useState();
    const [city, setCity] = useState();
    const [price, setPrice] = useState();
    const [pgType, setPgType] = useState();
    const [availability, setAvailability] = useState();
    const [propImage, setPropImage] = useState();
    const [propHolder, setPropHolder] = useState();
    const [propHolderPhoneNum, setPropHolderPhoneNum] = useState();
    const navigate = useNavigate();

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const base64 = await convertToBase64(file);
            setPropImage(base64);
        }
    };

    const handleStateChange = (selectedOption) => {
        setState(selectedOption.value);
    };

    const Submit = (e) => {
        e.preventDefault();

        if (!title || !details || !gmapLink || !address || !state || !city || !price || !pgType || !availability || !propImage || !propHolder || !propHolderPhoneNum) {
            return handleError('All fields are required !!');
        }

        axios.post("http://localhost:4000/api/properties", {
            title, details, address, gmapLink, state, city, price, propImage, pgType, availability, propHolder, propHolderPhoneNum, propHolder_ID
        })
            .then(result => {
                handleSuccess("Property Added !!");
                console.log(result);
                navigate('/userpropertylist');
            })
            .catch(err => console.log(err))
    }

    const divStyle = {
        backgroundImage: `url(${wallpaper})`,
        height: 'auto',
        width: 'auto',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        <div style={divStyle}>
            <div>
                <div className='d-flex justify-content-center align-items-center vh-100' style={{ height: '600px' }} >
                    <div className='form-container g-4' style={{ height: 'auto', width: '600px', backgroundColor: 'rgba(0, 0, 0, 0.4)', color: 'gold' }}>
                        <div align='right'>
                            <Link to='/userpropertylist' className='btn btn-outline-warning'><FontAwesomeIcon icon={faAnglesLeft} /></Link>
                        </div>
                        <h2 className='container d-flex justify-content-center align-items-center'>Create a Property</h2>

                        <form className="row g-3 m-2 p-2 my-2" onSubmit={Submit}>
                            <div className="col-md-3">
                                <label htmlFor="inputPropName" className="form-label">Holder_id:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputPropName"
                                    value={propHolder_ID}
                                    readOnly
                                    required
                                    onChange={(e) => setPropHolder_ID(e.target.value)} />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label" htmlFor="typeText">Title</label>
                                <input type="text" placeholder='' id="typeText" className="form-control"
                                    onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div className='col-md-3'>
                                <label htmlFor="typeDetails" className="form-label">Availability</label>
                                <div className="dropdown">
                                    <button className="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {availability || "Select Option"}
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" onClick={() => setAvailability("Available")}>Available</a></li>
                                        <li><a className="dropdown-item" onClick={() => setAvailability("Unavailable")}>Unavailable</a></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label" htmlFor="typeName">Poperty Holder Name:</label>
                                <input type="text" placeholder='' id="typeName" className="form-control"
                                    onChange={(e) => setPropHolder(e.target.value)} />
                            </div>

                            <div className="col-md-3">
                                <label className="form-label" htmlFor="typeContact">Contact Number</label>
                                <input type="text" id="typeContact" placeholder='' className="form-control"
                                    onChange={(e) => setPropHolderPhoneNum(e.target.value)} />
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="typeDetails" className="form-label">PG Type:</label>
                                <div className="dropdown">
                                    <button className="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {pgType || "Select PG type"}
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" onClick={() => setPgType("Boys")}>Boys</a></li>
                                        <li><a className="dropdown-item" onClick={() => setPgType("Girls")}>Girls</a></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-md-7">
                                <label className="form-label" htmlFor="typeLocation">Address</label>
                                <input type="text" id="typeLocation" placeholder='' className="form-control"
                                    onChange={(e) => setAddress(e.target.value)} />
                            </div>

                            <div className="col-md-5">
                                <label className="form-label" htmlFor="typeMapLocation">Gmap Link:</label>
                                <input type="text" id="typeMapLocation" placeholder='' className="form-control"
                                    onChange={(e) => setGmapLink(e.target.value)} />
                            </div>

                            <div className="col-md-5">
                                <label className="form-label" htmlFor="typeState">State:</label>
                                <Select
                                    id="typeState"
                                    options={stateOptions}
                                    onChange={handleStateChange}
                                    placeholder="Select or search"
                                />
                            </div>

                            <div className="col-md-4">
                                <label className="form-label" htmlFor="typeCity">City:</label>
                                <input type="text" placeholder='' id="typeCity" className="form-control"
                                    onChange={(e) => setCity(e.target.value)} />
                            </div>
                            <div className='col-md-3'>
                                <label htmlFor="typeDetails" className="form-label">Price Range</label>
                                <div className="dropdown">
                                    <button className="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {price || "Select Price"}
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" onClick={() => setPrice("5000 - 7000")}>Rs. 5000 - 7000</a></li>
                                        <li><a className="dropdown-item" onClick={() => setPrice("6000 - 8000")}>Rs. 6000 - 8000</a></li>
                                        <li><a className="dropdown-item" onClick={() => setPrice("7000 - 10,000")}>Rs. 7000 - 10,000</a></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="formFile" className="form-label">Add image</label>
                                <input type="file" label='image' name='myFile' className="form-control form-control" id="formFile"
                                    accept='.jpeg, .png, .jpg'
                                    onChange={handleImageChange} />
                            </div>

                            <div className='col-md-6'>
                                <label htmlFor="typeDetails" className="form-label">Details:</label>
                                <input type="text" id="typeDetails" placeholder='' className="form-control"
                                    onChange={(e) => setDetails(e.target.value)} />
                            </div>

                            <div className="col-mb-12" align='center'>
                                <button className="btn btn-outline-warning my-4" type="submit">Submit Property</button>
                            </div>
                        </form>
                        <ToastContainer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PropAddForm;
