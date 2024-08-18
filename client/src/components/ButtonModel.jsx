import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightToBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons'

const ButtonModel = () => {
    return (
        <div>

            <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                        <button className="btn btn-dark dropdown-toggle mx-2 my-1" data-bs-toggle="dropdown" aria-expanded="false">
                            Property Holder Section
                        </button>
                        <ul className="dropdown-menu dropdown-menu-dark">
                            <li>
                                <div className='row m-2'>
                                    <button className="btn btn-dark" disabled>Sign in to your Property Holder account</button>
                                    <Link className='btn btn-outline-light' to='/userLogin'>
                                        Sign In&nbsp;
                                        <FontAwesomeIcon icon={faArrowRightToBracket} style={{ color: "#FFD43B", }} />
                                    </Link>
                                </div>
                            </li>
                            <li>
                                <div className='row m-2'>
                                    <button className="btn btn-dark" disabled> Sign up as a Property Holder</button>
                                    <Link className='btn btn-outline-light' to='/userSignup'>
                                        Sign Up&nbsp;
                                        <FontAwesomeIcon icon={faUserPlus} style={{ color: "#FFD43B", }} />
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>

        </div>
    );
}

export default ButtonModel;
