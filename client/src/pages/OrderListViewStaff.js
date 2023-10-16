// import { useState, useEffect, useContext } from 'react'
// import { useNavigate, NavLink } from 'react-router-dom'
// //import Alert from 'react-bootstrap/Alert';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import Badge from 'react-bootstrap/Badge';
// import Card from 'react-bootstrap/Card';
// import Modal from 'react-bootstrap/Modal';

// export const OrderListViewStaff = () => {
//     const [showModal,setShowModal] = useState(false);
//     const navigate = useNavigate();

//     const approvebystaff = () => {
//       navigate("/approveorderstaff")
//     }
//   return (
//     <>
//       {/* {
//         show ? <Alert variant="danger" onClose={() => setShow(false)} dismissible>
//           Vehicle Details Deleted Succesfully
//         </Alert> : ""
//       } */}
//       <div className='mt-5'>
//         <div className="container">
//         <div className='d-flex'>
//                 <h2>Order List View By Staff</h2>
//             </div>
//           {/* <div className='add_btn mt-2 mb-2'>
//                 <NavLink to="/registerVehicle" className='btn btn-primary'>Add data</NavLink>
//                 <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={searchHandle}/>
//             </div> */}

//           <div className="search_add mt-4 mb-4 d-flex justify-content-between">
//             <div className="search col-lg-4">
//               <Form className="d-flex">
//                 <Form.Control
//                   type="search"
//                   placeholder="Search"
//                   className="me-2"
//                   aria-label="Search"
//                   //onChange={searchHandle}
//                   onChange=""
//                 />
//                 <Button variant="success" className='search_btn btn-info'>Search</Button>
//               </Form>
//             </div>
            
//           </div>

//           <div className="filter_div mt-5 d-flex justify-content-between flex-wrap">
//             <div className="filter_gender">
//               <div className="filter">
//                 <h3>Filter By Fuel Type</h3>
//                 <div className="gender d-flex justify-content-between">
//                   <Form.Check
//                     type={"radio"}
//                     label={`All`}
//                     name="fuel"
//                     value={"All"}
//                     defaultChecked
//                     onChange=""
//                   />
//                   <Form.Check
//                     type={"radio"}
//                     label={`Diesal`}
//                     name="fuel"
//                     value={"Diesal"}
//                     onChange=""
//                   />
//                   <Form.Check
//                     type={"radio"}
//                     label={`Petrol`}
//                     name="fuel"
//                     value={"Petrol"}
//                     onChange=""
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="filter_status">
//               <div className="status1">
//                 <h3>Filter By Status</h3>
//                 <div className="status_radio d-flex justify-content-between">
//                   <Form.Check
//                     type={"radio"}
//                     label={`All`}
//                     name="status"
//                     value={"All"}
//                     defaultChecked
//                     onChange=""
//                   />
//                   <Form.Check
//                     type={"radio"}
//                     label={`Active`}
//                     name="status"
//                     value={"Active"}
//                     onChange=""
//                   />
//                   <Form.Check
//                     type={"radio"}
//                     label={`InActive`}
//                     name="status"
//                     value={"InActive"}
//                     onChange=""
//                   />
//                 </div>
//               </div>
//             </div>


//           </div>

//           <Card className='shadow'>
//             <table class="table">
//               <thead>
//                 <tr className='tHead'>
//                   <th scope="col"><b>Order Id</b></th>
//                   <th scope="col"><b>Site Name</b></th>
//                   <th scope="col"><b>Supplier Name</b></th>
//                   <th scope="col"><b>Product</b></th>
//                   <th scope="col"><b>Total Price</b></th>
//                   <th scope="col"><b>Status</b></th>
//                 </tr>
//               </thead>
//               <tbody>
//               <Button variant="primary" className="btn-info" onClick={approvebystaff} ><b>Approve Order By Staff</b></Button>
//               </tbody>
//             </table>
//           </Card>
//         </div>
//       </div>

//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title></Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           {/* <center><img src={`vehicleuploads/${modalData.vehicleImg}`} className="image" /></center>
//           <h3>{modalData.registerNo}</h3>
//               <p><strong>Vehicle Type :</strong> {modalData.vehicleType}</p>
//               <p><strong>Brand :</strong> {modalData.brand}</p>
//               <p><strong>Model :</strong> {modalData.model}</p>
//               <p><strong>Fuel Type :</strong> {modalData.fuelType}</p>
//               <p><strong>Vehicle Color :</strong> {modalData.vehicleColor}</p>
//               <p><strong>Insurance Expired Date :</strong>{new Date(modalData.InsuranceExpiredDate).toLocaleDateString()}</p>
//               <p><strong>Licence Expired Date :</strong>{new Date(modalData.LicenceExpiredDate).toLocaleDateString()}</p>
//               <p><strong>Vehicle Status :</strong>{modalData.vehicleStatus}</p> */}
//         </Modal.Body>

//         <Modal.Footer>
//         <NavLink to="" className="btn btn-warning">Update</NavLink>
//         <button className="btn btn-danger" onClick="">Delete</button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   )
// }

import { useState, useEffect, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
//import Alert from 'react-bootstrap/Alert';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
import jsPDF from "jspdf";
import "jspdf-autotable";

export const OrderListViewStaff = () => {
  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const [getorderdata, setOrderdata] = useState([]);
  const [getproductdata, setProductdata] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // const [totalOfTotalPrices, setTotalOfTotalPrices] = useState(0);

  const addorder = () => {
    navigate("/addproduct");
  };

  const getdata = async (e) => {
    const res = await fetch(`/api/getManagerOrderdata?search=${search}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setOrderdata(data);
      console.log("get data");
    }
  };

  const getProduct = async (e) => {
    const res = await fetch(`/api/getProduct`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
    } else {
      setProductdata(data);
      console.log("get data");
    }
  };

  // Calculate total price for each order
  const calculateTotalPrice = (order) => {
    const product = getproductdata.find(
      (product) => product.productName === order.productName
    );
    if (product) {
      return order.productQty * product.productPrice;
    }
    return 0;
  };

  const calculateTotalOfTotalPrices = () => {
    let total = 0;
    for (const order of getorderdata) {
      const totalPrice = calculateTotalPrice(order);
      total += totalPrice;
    }
    return total;
  };

  const handlePrintAll = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(
      "Southern Agro Serve (Pvt) Ltd \nVehicle Running Records \n\n",
      marginLeft,
      40
    );
    const headers = [
      [
        "Site Name",
        "Supplier",
        "Product Name",
        "Product Qty",
        "Total Price",
        "Placed Date",
        "Required Date",
      ],
    ];

    const data = getorderdata.map((ele) => [
      ele.siteName,
      ele.supplier,
      ele.productName,
      ele.productQty,
      calculateTotalPrice(ele),
      new Date(ele.placedDate).toLocaleDateString(),
      new Date(ele.requiredDate).toLocaleDateString(),
    ]);

    const totalOfTotal = calculateTotalOfTotalPrices();

    let content = {
      startY: 70,
      head: headers,
      body: data,
    };

    doc.autoTable(content);
    doc.text(
      `Total of Total Prices: ${totalOfTotal}`,
      marginLeft,
      doc.autoTable.previous.finalY + 10
    );
    doc.save("order.pdf");
  };

  const deleteorder = async (id) => {
    if (window.confirm("Are you sure want to delete this order details ? ")) {
      const res2 = await fetch(`/api/deleteordermng/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const deletedata = await res2.json();
      console.log(deletedata);

      if (res2.status === 422 || !deletedata) {
        toast.error(deletedata.error);
        console.log("error");
      } else {
        toast.success(`One Order is deleted`);
        //setShow(true);
        console.log("user deleted");
        getdata();
      }
    }
  };

  useEffect(() => {
    !user && navigate("/login", { replace: true });
    getdata();
    getProduct();
  }, [search]);

  return (
    <>
      {/* {
        show ? <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          Vehicle Details Deleted Succesfully
        </Alert> : ""
      } */}
      <div className="mt-5">
        <div className="container">
          <div className="d-flex">
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
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className="btn btn-warning mx-2"
                  onClick={() => handlePrintAll()}
                >
                  <b>Generate Report</b>
                </button>
              </Form>
            </div>
            <div className="add_btn ">
              <Button variant="primary" className="btn-info" onClick={addorder}>
                <b>+ Add Order</b>
              </Button>
            </div>
          </div>

          <Card className="shadow">
            <table class="table">
              <thead>
                <tr className="tHead">
                  <th scope="col">
                    <b>Order Id</b>
                  </th>
                  <th scope="col">
                    <b>Site Name</b>
                  </th>
                  <th scope="col">
                    <b>Supplier Name</b>
                  </th>
                  <th scope="col">
                    <b>Product</b>
                  </th>
                  <th scope="col">
                    <b>Total Price</b>
                  </th>
                  <th scope="col">
                    <b>Status</b>
                  </th>
                </tr>
              </thead>
              <tbody>
                {getorderdata.map((element, id) => {
                  const totalPrice = calculateTotalPrice(element);
                  return (
                    <>
                      <tr
                        onClick={() => {
                          setModalData({});
                          setModalData(element);
                          setShowModal(true);
                        }}
                      >
                        <th scope="row">{id + 1}</th>
                        <td>{element.siteName}</td>
                        <td>{element.supplier}</td>
                        <td>{element.productName}</td>
                        <td>{totalPrice}</td>
                        <td>{element.orderstatus}</td>
                        <td className="d-flex align-items-center">
                          {/* <NavLink to={`viewVehicle/${element._id}`}><button className='btn btn-success gap'>read</button></NavLink>
                            <NavLink to={`editVehicle/${element._id}`}><button className='btn btn-primary gap'>update</button></NavLink>
                            <button className='btn btn-danger' onClick={() => deletevehicle(element._id)}>Delete</button> */}
                        </td>
                      </tr>
                    </>
                  );
                })}
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
          <p>
            <strong>Placed Date :</strong> {modalData.placedDate}
          </p>
          <p>
            <strong>Required Date :</strong> {modalData.requiredDate}
          </p>
          <p>
            <strong>Supplier :</strong>
            {modalData.supplier}
          </p>
          <p>
            <strong>Product Name :</strong>
            {modalData.productName}{" "}
          </p>
          <p>
            <strong>Total Price :</strong>
            {calculateTotalPrice(modalData)}
          </p>
          <p>
            <strong>Draft Status :</strong>
            {modalData.productName}{" "}
          </p>
        </Modal.Body>

        <Modal.Footer>
          <NavLink
            to={`approveorderstaff/${modalData._id}`}
            className="btn btn-warning"
          >
            Approve Order
          </NavLink>
          <button
            className="btn btn-danger"
            onClick={() => deleteorder(modalData._id)}
          >
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

