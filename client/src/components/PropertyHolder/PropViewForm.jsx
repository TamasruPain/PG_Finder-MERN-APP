import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import wallpaper from "../images/wallpaperflare.com_wallpaper2.jpg";


const PropViewForm = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [gmapLink, setGmapLink] = useState('');
    const [address, setAddress] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [price, setPrice] = useState('');
    const [pgType, setPgType] = useState('');
    const [availability, setAvailability] = useState('');
    const [propImage, setPropImage] = useState('');
    const [propHolder, setPropHolder] = useState('');
    const [propHolderPhoneNum, setPropHolderPhoneNum] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:4000/api/properties/' + id)
            .then(result => {
                console.log(result);
                setTitle(result.data.title || '');
                setDetails(result.data.details || '');
                setAddress(result.data.address || '');
                setGmapLink(result.data.gmapLink || '');
                setState(result.data.state || '');
                setCity(result.data.city || '');
                setPrice(result.data.price || '');
                setPgType(result.data.pgType || '');
                setAvailability(result.data.availability || '');
                setPropImage(result.data.propImage || '');
                setPropHolder(result.data.propHolder || '');
                setPropHolderPhoneNum(result.data.propHolderPhoneNum || '');
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this property?");
        if (isConfirmed) {
            try {
                const response = await axios.delete(`http://localhost:4000/api/properties/${id}`);
                console.log(response);
                navigate('/userpropertylist');
            } catch (error) {
                console.error(error);
                alert('Failed to delete the property. Please try again.');
            }
        }
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
                <div className='d-flex justify-content-center align-items-center vh-100' style={{ height: '600px' }}>
                    <div className='form-container p-2' style={{ height: 'auto', width: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white' }}>
                        <div align='right'>
                            <Link to='/userpropertylist' className='btn btn-outline-light'><FontAwesomeIcon icon={faAnglesLeft} /></Link>
                        </div>
                        <h2 className='container d-flex justify-content-center align-items-center'>{title}</h2>

                        <form className="row g-3 m-2 p-2 my-2">
                            <div className='row'>
                                <div className='col-md-4'>
                                    <div className='col-10'>
                                        <img src={propImage} className="card-img-top rounded" alt="Property" />
                                    </div>
                                </div>
                                <div className='col-md-8 mb-3 p-3 row'>
                                    <div className='col-6'>
                                        <div className="">
                                            <h5>Property Holder & Phone Number:</h5>
                                            <p>{propHolder} & {propHolderPhoneNum}</p>
                                        </div>
                                        <div className="">
                                            <h5>Availability:</h5>
                                            <p>{availability}</p>
                                        </div>
                                        <div>
                                            <h5>PG Type:</h5>
                                            <p>{pgType}</p>
                                        </div>
                                        <div className="">
                                            <h5>Price:</h5>
                                            <p>Rs. {price}</p>
                                        </div>
                                    </div>
                                    <div className='col-6'>
                                        <div className="">
                                            <h5>Address:</h5>
                                            <p>{address}</p>
                                        </div>
                                        <div className="">
                                            <h5>Map:</h5>
                                            <p><a href={gmapLink} target="_blank" rel="noopener noreferrer">{gmapLink}</a></p>
                                        </div>
                                        <div className="">
                                            <h5>State & City:</h5>
                                            <p>{state} & {city}</p>
                                        </div>
                                    </div>
                                    <div className="">
                                        <h5>Details:</h5>
                                        <p>{details}</p>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className="my-4" align='center'>
                            <Link to={`/updateProperty/${id}`} className="btn btn-outline-light mx-4 my-2">
                                <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#B197FC" }} />
                            </Link>
                            <button onClick={() => handleDelete(id)} className="btn btn-outline-light mx-4 my-2">
                                <FontAwesomeIcon icon={faTrashCan} style={{ color: "#B197FC" }} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PropViewForm;
