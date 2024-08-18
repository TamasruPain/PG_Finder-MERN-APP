import React, { useState } from 'react';
import axios from 'axios';

const EnqueryForm = ({ propertyID, propHolder_ID, title }) => {
    
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerNumber, setCustomerNumber] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [customerQuery, setCustomerQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:4000/api/query", {
            customerName,
            customerEmail,
            customerNumber,
            customerAddress,
            customerQuery,
            propertyID,
            propHolder_ID
        })
            .then(result => {
                console.log(result);
                alert('Your Enquiry is Submitted !!');
                setCustomerName('');
                setCustomerEmail('');
                setCustomerNumber('');
                setCustomerAddress('');
                setCustomerQuery('');
            })
            .catch(err => {
                console.log(err);
                alert('Something went wrong, try again !!');
            });
    };

    return (
        <div className="col-md-5 p-4">
            <div className='border rounded p-4 my-4'>
                <h4>Submit a Query - {title}</h4>
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                       
                        <input
                            type="password"
                            className="form-control"
                            id="inputPropName"
                            value={propertyID}
                            readOnly
                            required />
                    </div>
                    <div className="col-md-6">
                        <input
                            type="password"
                            className="form-control"
                            id="inputPropName"
                            value={propHolder_ID}
                            readOnly
                            required />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="inputName" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputName"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-md-7">
                        <label htmlFor="inputEmail" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="inputEmail"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-md-5">
                        <label htmlFor="inputNumber" className="form-label">Phone Number</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputNumber"
                            value={customerNumber}
                            onChange={(e) => setCustomerNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="inputAddress" className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputAddress"
                            value={customerAddress}
                            onChange={(e) => setCustomerAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Query</label>
                        <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            value={customerQuery}
                            onChange={(e) => setCustomerQuery(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-outline-primary col-12">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EnqueryForm;
