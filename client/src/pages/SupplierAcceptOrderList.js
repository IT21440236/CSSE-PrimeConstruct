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


export const SupplierAcceptOrderList = () => {
  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const [getsuporderdata, setsuporderdata] = useState([]);

  const [search, setSearch] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [modalData, setModalData] = useState({});
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
            <h2>Draft Order List</h2>
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
                        //   setModalData({});
                        //   setModalData(element)
                        //   setShowModal(true);
                        }}>
                          <th scope="row">{element.draftID}</th>
                          <th scope="row">{element.orderid}</th>
                          <td>{element.deliveryDate}</td>
                          <td>{element.requiredDate}</td>
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

      
    </>
  )
}
