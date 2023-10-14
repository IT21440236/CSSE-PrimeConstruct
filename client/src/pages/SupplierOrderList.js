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

export const SupplierOrderList = () => {

  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const [getorderdata, setOrderdata] = useState([]);
  const [getproductdata, setProductdata] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const placedorrejectorder = () => {
    navigate("/placedrejectorder")
  }

  const getdata = async (e) => {

    const res = await fetch(`/api/getManagerOrderdata?search=${search}`, {
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

      const acceptedOrders = data.filter((order) => order.orderstatus === "Accept");

      setOrderdata(acceptedOrders)
      console.log("get data");
    }
  }

  const getProduct = async (e) => {

    const res = await fetch(`/api/getProduct`, {
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
      setProductdata(data)
      console.log("get data");
    }
  }

  // Calculate total price for each order
  const calculateTotalPrice = (order) => {
    const product = getproductdata.find((product) => product.productName === order.productName);
    if (product) {
      return order.productQty * product.productPrice;
    }
    return 0;
  };

  useEffect(() => {
    !user && navigate("/login", { replace: true });
    getdata();
    getProduct();
  }, [search])

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
            <h2>Supplier Order List</h2>
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


          <Card className='shadow'>
            <table class="table">
              <thead>
                <tr className='tHead'>
                  <th scope="col"><b>Order Id</b></th>
                  <th scope="col"><b>Draft Id</b></th>
                  <th scope="col"><b>Site Name</b></th>
                  <th scope="col"><b>Supplier Name</b></th>
                  <th scope="col"><b>Product</b></th>
                  <th scope="col"><b>Total Price</b></th>
                  <th scope="col"><b>Site Manager/ Staff Status</b></th>
                </tr>
              </thead>
              <tbody>
                {/* <Button variant="primary" className="btn-info" onClick={placedorrejectorder} ><b>Placed or Reject Order</b></Button> */}

                {
                  getorderdata.map((element, id) => {
                    const totalPrice = calculateTotalPrice(element);
                    return (
                      <>
                        <tr onClick={() => {
                          setModalData({});
                          setModalData(element)
                          setShowModal(true);
                        }}>
                          <th scope="row">{element.orderid}</th>
                          <th scope="row">{element.draftID}</th>
                          <td>{element.siteName}</td>
                          <td>{element.supplier}</td>
                          <td>{element.productName}</td>
                          <td>{totalPrice}</td>
                          <td>{element.orderstatus}</td>
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
          <Modal.Title>{modalData.siteName}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h3>{modalData.siteName}</h3>
          <p><strong>Placed Date :</strong> {modalData.placedDate}</p>
          <p><strong>Required Date :</strong> {modalData.requiredDate}</p>
          <p><strong>Supplier :</strong>{modalData.supplier}</p>
          <p><strong>Product Name :</strong>{modalData.productName} </p>
          <p><strong>Total Price :</strong>{calculateTotalPrice(modalData)}</p>
          <p><strong>Draft Status :</strong>{modalData.productName} </p>
        </Modal.Body>

        <Modal.Footer>
          <NavLink to={`placedrejectorder/${modalData._id}`} className="btn btn-warning">Approve Order</NavLink>
          {/* <button className="btn btn-danger" onClick={() => deleteorder(modalData._id)}>Delete</button> */}
        </Modal.Footer>
      </Modal>
    </>
  )
}
