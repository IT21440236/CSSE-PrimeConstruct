import { useState, useEffect, useContext } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
//import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';

export const SupplierProductList = () => {

    const [showModal,setShowModal] = useState(false);

  return (
    <>
      {/* {
        show ? <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          Vehicle Details Deleted Succesfully
        </Alert> : ""
      } */}
      <div className='mt-5'>
        <div className="container">
        <div className='d-flex'>
                <h2>Supplier Product List</h2>
            </div>
          {/* <div className='add_btn mt-2 mb-2'>
                <NavLink to="/registerVehicle" className='btn btn-primary'>Add data</NavLink>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={searchHandle}/>
            </div> */}

          <div className="search_add mt-4 mb-4 d-flex justify-content-between">
            <div className="search col-lg-4">
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  //onChange={searchHandle}
                  onChange=""
                />
                <Button variant="success" className='search_btn btn-info'>Search</Button>
              </Form>
            </div>
            
          </div>

          <div className="filter_div mt-5 d-flex justify-content-between flex-wrap">
            <div className="filter_gender">
              <div className="filter">
                <h3>Filter By Fuel Type</h3>
                <div className="gender d-flex justify-content-between">
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="fuel"
                    value={"All"}
                    defaultChecked
                    onChange=""
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Diesal`}
                    name="fuel"
                    value={"Diesal"}
                    onChange=""
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Petrol`}
                    name="fuel"
                    value={"Petrol"}
                    onChange=""
                  />
                </div>
              </div>
            </div>

            <div className="filter_status">
              <div className="status1">
                <h3>Filter By Status</h3>
                <div className="status_radio d-flex justify-content-between">
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="status"
                    value={"All"}
                    defaultChecked
                    onChange=""
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Active`}
                    name="status"
                    value={"Active"}
                    onChange=""
                  />
                  <Form.Check
                    type={"radio"}
                    label={`InActive`}
                    name="status"
                    value={"InActive"}
                    onChange=""
                  />
                </div>
              </div>
            </div>



          </div>

          <Card className='shadow'>
            <table class="table">
              <thead>
                <tr className='tHead'>
                  <th scope="col"><b>Comapany Name</b></th>
                  <th scope="col"><b>Product Name</b></th>
                  <th scope="col"><b>Product Price</b></th>
                  <th scope="col"><b>Product Description</b></th>
                </tr>
              </thead>
              <tbody>


              </tbody>
            </table>
          </Card>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* <center><img src={`vehicleuploads/${modalData.vehicleImg}`} className="image" /></center>
          <h3>{modalData.registerNo}</h3>
              <p><strong>Vehicle Type :</strong> {modalData.vehicleType}</p>
              <p><strong>Brand :</strong> {modalData.brand}</p>
              <p><strong>Model :</strong> {modalData.model}</p>
              <p><strong>Fuel Type :</strong> {modalData.fuelType}</p>
              <p><strong>Vehicle Color :</strong> {modalData.vehicleColor}</p>
              <p><strong>Insurance Expired Date :</strong>{new Date(modalData.InsuranceExpiredDate).toLocaleDateString()}</p>
              <p><strong>Licence Expired Date :</strong>{new Date(modalData.LicenceExpiredDate).toLocaleDateString()}</p>
              <p><strong>Vehicle Status :</strong>{modalData.vehicleStatus}</p> */}
        </Modal.Body>

        <Modal.Footer>
        <NavLink to="" className="btn btn-warning">Update</NavLink>
        <button className="btn btn-danger" onClick="">Delete</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
