import { useState, useEffect, useContext } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
//import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';

export const ReceiptList = () => {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

    const addreceipt = () => {
      navigate("/addrecipt")
    }


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
            <h2>Receipt List</h2>
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
            <div className="add_btn ">
              <Button variant="primary" className="btn-info" onClick={addreceipt} ><b>+ Create Receipt</b></Button>
            </div>
          </div>

          

          <Card className='shadow'>
            <table class="table">
              <thead>
                <tr className='tHead'>
                  <th scope="col"><b>Order No</b></th>
                  <th scope="col"><b>Product Name</b></th>
                  <th scope="col"><b>Product Quantity</b></th>
                  <th scope="col"><b>Delivery Date</b></th>
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
