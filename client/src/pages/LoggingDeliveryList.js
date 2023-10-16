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

// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
import jsPDF from 'jspdf';
import 'jspdf-autotable';


export const LoggingDeliveryList = () => {
    const { user } = useContext(AuthContext);
    const { toast } = useContext(ToastContext);

    const [getdeliverydata, setDeliverydata] = useState([]);
    // const [getproductdata, setProductdata] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({});
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    // const [totalOfTotalPrices, setTotalOfTotalPrices] = useState(0);

    const addorder = () => {
        navigate("/addlogging")
    }


    const getdata = async (e) => {

        const res = await fetch(`/api/getManagerdeliverydata?search=${search}`, {
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
            setDeliverydata(data)
            console.log("get data");
        }
    }

    // const getProduct = async (e) => {

    //     const res = await fetch(`/api/getProduct`, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",

    //             Authorization: `Bearer ${localStorage.getItem("token")}`,
    //         }
    //     });

    //     const data = await res.json();
    //     console.log(data);

    //     if (res.status === 422 || !data) {
    //         console.log("error ");

    //     } else {
    //         setProductdata(data)
    //         console.log("get data");
    //     }
    // }

    // Calculate total price for each order
    //   const calculateTotalPrice = (order) => {
    //     const product = getproductdata.find((product) => product.productName === order.productName);
    //     if (product) {
    //       return order.productQty * product.productPrice;
    //     }
    //     return 0;
    //   };

    //   const calculateTotalOfTotalPrices = () => {
    //     let total = 0;
    //     for (const order of getorderdata) {
    //       const totalPrice = calculateTotalPrice(order);
    //       total += totalPrice;
    //     }
    //     return total;
    //   };

    //   const handlePrintAll = () => {
    //     const unit = "pt";
    //     const size = "A4";
    //     const orientation = "portrait";
    //     const marginLeft = 40;
    //     const doc = new jsPDF(orientation, unit, size);
    //     doc.setFontSize(16);
    //     doc.setFont("helvetica", "bold");
    //     doc.text("PRIME CONSTRUCTION \nPlaced Order \n\n", marginLeft, 40);
    //     const headers = [["OrderId", "DraftID", "Site Name", "Supplier", "Product Name", "Product Qty", "Total Price", "Placed Date", "Required Date"]];

    //     const data = getorderdata.map((ele) => [
    //       ele.orderid,
    //       ele.draftID,
    //       ele.siteName,
    //       ele.supplier,
    //       ele.productName,
    //       ele.productQty,
    //       calculateTotalPrice(ele),
    //       new Date(ele.placedDate).toLocaleDateString(),
    //       new Date(ele.requiredDate).toLocaleDateString()
    //     ])

    //     const totalOfTotal = calculateTotalOfTotalPrices();

    //     let content = {
    //       startY: 70,
    //       head: headers,
    //       body: data
    //     };

    //     doc.autoTable(content)
    //     doc.text(`Total of Total Prices: ${totalOfTotal}`, marginLeft, doc.autoTable.previous.finalY + 10);
    //     doc.save("order.pdf")
    //   }



    const deleteorder = async (id) => {
        if (window.confirm("Are you sure want to delete this order details ? ")) {
            const res2 = await fetch(`/api/deletedeliverymng/${id}`, {
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
                toast.success(`One Delivery is deleted`)
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
                        <h2>Logging Delivery List</h2>
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
                                <button className="btn btn-warning mx-2" onClick=""><b>Search</b></button>
                            </Form>
                        </div>
                        <div className="add_btn ">
                            <Button variant="primary" className="btn-info" onClick={addorder} ><b>+ Add LoggingDelivery</b></Button>
                        </div>
                    </div>

                    <Card className='shadow'>
                        <table class="table">
                            <thead>
                                <tr className='tHead'>
                                    <th scope="col"><b>Delivery Id</b></th>
                                    <th scope="col"><b>Order Id</b></th>
                                    <th scope="col"><b>Draft Id</b></th>
                                    <th scope="col"><b>Site Name</b></th>
                                    <th scope="col"><b>Supplier</b></th>
                                    <th scope="col"><b>Delivery Date</b></th>
                                    <th scope="col"><b>Product</b></th>
                                    <th scope="col"><b>Quantity</b></th>
                                    <th scope="col"><b>comment</b></th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    getdeliverydata.map((element, id) => {
                                        return (
                                            <>
                                                <tr onClick={() => {
                                                    setModalData({});
                                                    setModalData(element)
                                                    setShowModal(true);
                                                }}>
                                                    <th scope="row">{element.deliveryID}</th>
                                                    <th scope="row">{element.draftID}</th>
                                                    <td>{element.orderid}</td>
                                                    <td>{element.siteName}</td>
                                                    <td>{element.supplier}</td>
                                                    <td>{moment(modalData.deliveryDate).format('MMMM Do YYYY')}</td>
                                                    <td>{element.productName}</td>
                                                    <td>{element.productQty}</td>
                                                    <td>{element.comment}</td>
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
                    <Modal.Title>{modalData.deliveryID}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <h3>{modalData.orderid}</h3>
                    <p><strong>Delivery Date :</strong> {moment(modalData.deliveryDate).format('MMMM Do YYYY')}</p>
                    <p><strong>Supplier :</strong>{modalData.supplier}</p>
                    <p><strong>Product Name :</strong>{modalData.productName} </p>
                    <p><strong>Product Quantity :</strong>{modalData.productQty}</p>
                    <p><strong>comment :</strong>{modalData.comment} </p>
                </Modal.Body>

                <Modal.Footer>
                    <NavLink to={`updatelogging/${modalData._id}`} className="btn btn-warning">Update</NavLink>
                    <button className="btn btn-danger" onClick={() => deleteorder(modalData._id)}>Delete</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}