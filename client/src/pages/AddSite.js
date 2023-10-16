// import React, { useState, useEffect } from 'react'
// import { NavLink } from 'react-router-dom'
// import Form from 'react-bootstrap/Form'
// import Card from 'react-bootstrap/Card';

// export const AddSite = () => {
//     return (
//         <div className="container">
//             <div className='d-flex'>
//                 <h2>Create Site Details</h2>
//             </div>
//             <Card className='shadow card'>
//                 <Form className='mt-4'>
//                     <div className="row">

//                         <Form.Group className="mb-3 " controlId="formBasicEmail">
//                             <Form.Label>Site ID</Form.Label>
//                             <Form.Control type="text" value="" onChange="" name="driverName" />
//                         </Form.Group>

//                         <Form.Group className="mb-3 " controlId="formBasicEmail">
//                             <Form.Label>Site Name</Form.Label>
//                             <Form.Control type="text" value="" onChange="" name="driverName" />
//                         </Form.Group>

//                         <Form.Group className="mb-3 " controlId="formBasicEmail">
//                             <Form.Label>Site Address</Form.Label>
//                             <Form.Control type="text" value="" onChange="" name="driverName" />
//                         </Form.Group>

//                         <Form.Group className="mb-3 " controlId="formBasicEmail">
//                             <Form.Label>Site Contact Number</Form.Label>
//                             <Form.Control type="text" value="" onChange="" name="driverName" />
//                         </Form.Group>


//                         <Form.Group className="mb-3 " controlId="formBasicEmail">
//                             <Form.Label>Budget</Form.Label>
//                             <Form.Control type="text" value="" onChange="" name="driverName" />
//                         </Form.Group>

//                         <Form.Group className="mb-3">
//                             <Form.Label><b>Site Manager</b></Form.Label>
//                             <select value="" onChange="" name="supplier" className="form-select">
//                                 <option>Select </option>

//                             </select>
//                         </Form.Group>

//                     </div>

//                     <button type="submit" onClick="" class="btn-style">Submit</button>
//                 </Form>
//             </Card>
//         </div>
//     )
// }


import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ToastContext from "../context/ToastContext";

export const AddSite = () => {
  const { toast } = useContext(ToastContext);

  const [siteDetails, setSiteDetails] = useState({
    sitename: "",
    siteAddress: "",
    contactno: "",
    budget: "",
    siteManager: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSiteDetails({ ...siteDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(`http://localhost:8000/api/site`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(siteDetails),
    });
    const result = await res.json();
    if (!result.error) {
      toast.success(`Site [${siteDetails.sitename}] Added Successfully`);

      setSiteDetails({
        sitename: "",
        siteAddress: "",
        contactno: "",
        budget: "",
        siteManager: "",
      });
    } else {
      toast.error(result.error);
    }
  };

  const handleClear = () => {
    setSiteDetails({
      sitename: "",
      siteAddress: "",
      contactno: "",
      budget: "",
      siteManager: "",
    });
  };

  return (
    <>
      <h2 className="text-center bg-darkgreen text-white p-2">Add Site</h2>
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <form onSubmit={handleSubmit}>
            {/* Site Name */}
            <div className="form-group">
              <label htmlFor="sitenameInput" className="form-label mt-4">
                Site Name
              </label>
              <input
                type="text"
                className="form-control"
                id="sitenameInput"
                name="sitename"
                value={siteDetails.sitename}
                onChange={handleInputChange}
                placeholder="Site Name"
                required
              />
            </div>
            {/* Site Address */}
            <div className="form-group">
              <label htmlFor="siteAddressInput" className="form-label mt-4">
                Site Address
              </label>
              <input
                type="text"
                className="form-control"
                id="siteAddressInput"
                name="siteAddress"
                value={siteDetails.siteAddress}
                onChange={handleInputChange}
                placeholder="Site Address"
                required
              />
            </div>
            {/* Contact Number */}
            <div className="form-group">
              <label htmlFor="contactnoInput" className="form-label mt-4">
                Contact Number
              </label>
              <input
                type="text"
                className="form-control"
                id="contactnoInput"
                name="contactno"
                value={siteDetails.contactno}
                onChange={handleInputChange}
                placeholder="Contact Number"
                required
              />
            </div>
            {/* Budget */}
            <div className="form-group">
              <label htmlFor="budgetInput" className="form-label mt-4">
                Budget
              </label>
              <input
                type="number"
                className="form-control"
                id="budgetInput"
                name="budget"
                value={siteDetails.budget}
                onChange={handleInputChange}
                placeholder="Budget"
                required
              />
            </div>
            {/* Site Manager */}
            <div className="form-group">
              <label htmlFor="siteManagerInput" className="form-label mt-4">
                Site Manager
              </label>
              <input
                type="text"
                className="form-control"
                id="siteManagerInput"
                name="siteManager"
                value={siteDetails.siteManager}
                onChange={handleInputChange}
                placeholder="Site Manager"
                required
              />
            </div>
            <div className="text-center">
              <input
                type="submit"
                value="Add Site"
                className="btn btn-info my-2"
              />
              <button
                type="button"
                onClick={handleClear}
                className="btn btn-danger my-2 ml-2"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

