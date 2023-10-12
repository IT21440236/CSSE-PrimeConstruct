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

export const SupplierSideProductList = () => {
  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);


  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const navigate = useNavigate();
  const [getproductdata, setProductdata] = useState([]);

  const addmaterial = () => {
    navigate("/addmaterial")
  }

  // const updatematerial = () => {
  //   navigate("/updatematerial")
  // }

  const getdata = async (e) => {

    const res = await fetch(`/api/getProduct?search=${search}`, {
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

  const deleteproduct = async (id) => {
    if (window.confirm("Are you sure want to delete this order details ? ")) {
      const res2 = await fetch(`/api/deleteproductsup/${id}`, {
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
        toast.success(`One Product is deleted`)
        //setShow(true);
        console.log("user deleted");
        getdata();
      }
    }
  }

  useEffect(() => {
    !user && navigate("/login", { replace: true });
    getdata();
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
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant="success" className='search_btn btn-info'>Search</Button>
              </Form>
            </div>
            <div className="add_btn ">
              <Button variant="primary" className="btn-info" onClick={addmaterial} ><b>+ New Material</b></Button>
            </div>
          </div>

          <Card className='shadow'>
            <table class="table">
              <thead>
                <tr className='tHead'>
                  <th scope="col"><b>Product ID</b></th>
                  <th scope="col"><b>Supplier Name</b></th>
                  <th scope="col"><b>Product Name</b></th>
                  <th scope="col"><b>Product Price</b></th>
                  <th scope="col"><b>Product Description</b></th>
                </tr>
              </thead>
              <tbody>
                {
                  getproductdata.map((element, id) => {
                    return (
                      <>
                        <tr onClick={() => {
                          setModalData({});
                          setModalData(element)
                          setShowModal(true);
                        }}>
                          <th scope="row">{element.supproductid}</th>
                          <td>{element.supplierName}</td>
                          <td>{element.productName}</td>
                          <td>{element.productPrice}</td>
                          <td>{element.productDescription}</td>
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
          <Modal.Title>{modalData.supproductid}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h3>{modalData.supproductid}</h3>
          <p><strong>Product Name :</strong> {modalData.productName}</p>
          <p><strong>Required Date :</strong> {modalData.productPrice}</p>
          <p><strong>Supplier :</strong>{modalData.productDescription}</p>
        </Modal.Body>

        <Modal.Footer>
          <NavLink to={`updatematerial/${modalData._id}`} className="btn btn-warning">Update</NavLink>
          <button className="btn btn-danger" onClick={() => deleteproduct(modalData._id)}>Delete</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
