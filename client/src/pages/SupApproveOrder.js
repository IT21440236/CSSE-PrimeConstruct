import { useState, useEffect, useContext } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
//import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";
import moment from "moment"


export const SupApproveOrder = () => {
  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const [getsuporderdata, setsuporderdata] = useState([]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const navigate = useNavigate();


  const getdata = async (e) => {

    const res = await fetch(`/api/getSupOrderdata`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");

    } else {
      setsuporderdata(data)
      console.log("get data");
    }
  }

  const deleteorder = async (id) => {
    if (window.confirm("Are you sure want to delete this vehicle details ? ")) {
      const res2 = await fetch(`/api/deleteordersup/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });

      const deletedata = await res2.json();
      console.log(deletedata);

      if (res2.status === 422 || !deletedata) {
        toast.error(deletedata.error);
        console.log("error");
      } else {
        toast.success(`One Draft is deleted`)
        //setShow(true);
        console.log("user deleted");
        getdata();
      }
    }
  }

  useEffect(() => {
    !user && navigate("/login", { replace: true });
    getdata();
  }, [])

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
            <h2>Order List</h2>
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
              {/* <Button variant="primary" className="btn-info" onClick={adddraft} ><b>+ New Draft Order</b></Button> */}
            </div>
          </div>


          <Card className='shadow'>
            <table class="table">
              <thead>
                <tr className='tHead'>
                  <th scope="col"><b>Draft ID</b></th>
                  <th scope="col"><b>Order ID</b></th>
                  <th scope="col"><b>Delivery Date</b></th>
                  <th scope="col"><b>Required Date</b></th>
                  <th scope="col"><b>Product Name</b></th>
                  <th scope="col"><b>Product Qty</b></th>
                  <th scope="col"><b>Supplier Status</b></th>
                </tr>
              </thead>
              <tbody>
                {/* <th>Bhanuka</th> */}

                {
                  getsuporderdata.map((element, id) => {
                    return (
                      <>
                        <tr onClick={() => {
                          setModalData({});
                          setModalData(element)
                          setShowModal(true);
                        }}>
                          <th scope="row">{element.draftID}</th>
                          <th scope="row">{element.orderid}</th>
                          <td>{moment(element.deliveryDate).format('MMMM Do YYYY')}</td>
                          <td>{moment(element.requiredDate).format('MMMM Do YYYY')}</td>
                          <td>{element.productName}</td>
                          <td>{element.productQty}</td>
                          <td>{element.supstatus}</td>
                          <td className='d-flex align-items-center'>
                            {/* <NavLink to={`viewVehicle/${element._id}`}><button className='btn btn-success gap'>read</button></NavLink>
                            <NavLink to={`editVehicle/${element._id}`}><button className='btn btn-primary gap'>update</button></NavLink>
                            <button className='btn btn-danger' onClick={() => deletevehicle(element._id)}>Delete</button> */}
                          </td>
                        </tr>
                      </>
                    )
                  })
                }

              </tbody>
            </table>
          </Card>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData.orderid}</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <h3>{modalData.orderid}</h3>
          <p><strong>Placed Date :</strong> {moment(modalData.placedDate).format('MMMM Do YYYY')}</p>
          <p><strong>Delivery Date :</strong> {moment(modalData.deliveryDate).format('MMMM Do YYYY')}</p>
          <p><strong>Supplier :</strong>{modalData.supplier}</p>
          <p><strong>Supplier Status :</strong>{modalData.supstatus} </p>
        </Modal.Body>

        <Modal.Footer>
          {/* <NavLink to="" className="btn btn-warning">Update</NavLink> */}
          <button className="btn btn-danger" onClick={() => deleteorder(modalData._id)}>Delete</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
