import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card';
import Select from 'react-select';
import { useNavigate } from "react-router-dom"
import axios from "axios"
import ToastContext from "../context/ToastContext";

export const PlacedRejectOrder = () => {

    const { toast } = useContext(ToastContext);

    // const [error, setError] = useState(false)

    const [inpval, setINP] = useState({
        draftID: "",
        orderid: "",
        siteName: "",
        supplier: "",
        placedDate: "",
        requiredDate: "",
        productName: "",
        productQty: "",
        orderstatus: "",
        supstatus: "",
        deliveryDate:"",
        supcomment: ""
    })

    // const [status, setStatus] = useState("Active");
    //const [image, setImage] = useState("");
    // const [show, setShow] = useState(false);
    // const history = useNavigate();

    // status optios
    // const options = [
    //     { value: 'Active', label: 'Active' },
    //     { value: 'InActive', label: 'InActive' },
    // ];

    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }

    // const setStatusValue = (e) => {
    //     setStatus(e.value)
    //     console.log(e.value)
    // }

    // const setProfile = (e) => {
    //     setImage(e.target.files[0])
    // }


    const { id } = useParams("");
    console.log(id);

    const getdata = async () => {

        const res = await fetch(`/api/getOneOrder/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",

                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            //toast.error(data.error)
            console.log("error ");

        } else {
            //toast.success(`${data.registerNo} is edited successfuly`)
            setINP(data)
            console.log("get data");

        }
    }

    const addinpdata = async (e) => {
        e.preventDefault();

        const { draftID,orderid, siteName, supplier, placedDate, requiredDate, productName, productQty, orderstatus, supstatus,deliveryDate, supcomment } = inpval;

        // console.log(draftID);

        if (!draftID || !orderid || !siteName || !supplier || !placedDate || !requiredDate || !productName || !productQty || !orderstatus || !supstatus || !deliveryDate || !supcomment) {
            toast.error("Please enter all required fields")
            return false
        }

        const res = await fetch("/api/addSupApproveOrder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                draftID,orderid, siteName, supplier, placedDate, requiredDate, productName, productQty, orderstatus, supstatus,deliveryDate, supcomment
            })
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");
            alert("error");

        } else {
            toast.success('Order added successfuly')
            //setShow(true);
            console.log("data added");

        }
    }

    useEffect(() => {
        getdata();
    }, []);


    return (
        <div className="container">
            <div className='d-flex'>
                <h2>Placed or Reject Order</h2>
            </div>
            <Card className='shadow card'>
                <Form className='mt-4'>
                    <div className="row">
                    <Form.Group className="mb-3" controlId="formBasicSiteName">
                            <Form.Label>Draft ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="draftID"
                                value={inpval.draftID}
                                onChange={setdata}
                                // readOnly
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicSiteName">
                            <Form.Label>Order ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="orderid"
                                value={inpval.orderid}
                                onChange={setdata}
                                // readOnly
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicSiteName">
                            <Form.Label>Site Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="siteName"
                                value={inpval.siteName}
                                onChange={setdata}
                                // readOnly
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicSupplierName">
                            <Form.Label>Supplier Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="supplier"
                                value={inpval.supplier}
                                onChange={setdata}
                                // readOnly
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPlacedDate">
                            <Form.Label>Placed Date</Form.Label>
                            <Form.Control
                                type="text"
                                name="placedDate"
                                value={inpval.placedDate}
                                onChange={setdata}
                                // readOnly
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicRequiredDate">
                            <Form.Label>Required Date</Form.Label>
                            <Form.Control
                                type="text"
                                name="requiredDate"
                                value={inpval.requiredDate}
                                onChange={setdata}
                                // readOnly
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicProductName">
                            <Form.Label><b>Product Name</b></Form.Label>
                            <Form.Control
                                type="text"
                                name="productName"
                                value={inpval.productName}
                                onChange={setdata}
                                // readOnly
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicProductQty">
                            <Form.Label>Product Quantity</Form.Label>
                            <Form.Control
                                type="text"
                                name="productQty"
                                value={inpval.productQty}
                                onChange={setdata}
                                // readOnly
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicOrderStatus">
                            <Form.Label>Order Status</Form.Label>
                            <Form.Control
                                type="text"
                                name="orderstatus"
                                value={inpval.orderstatus}
                                onChange={setdata}
                                // readOnly
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicOrderStatus">
                            <Form.Label>Supplier Status</Form.Label>
                            <select
                                name="supstatus"
                                value={inpval.supstatus}
                                onChange={setdata}
                                className="form-select"
                            >
                                <option value="">Select Order Status</option>
                                <option value="Reject">Reject</option>
                                <option value="Pending">Pending</option>
                                <option value="Accept">Accept</option>
                            </select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicOrderStatus">
                            <Form.Label>Delivery Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="deliveryDate"
                                value={inpval.deliveryDate}
                                onChange={setdata}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicOrderStatus">
                            <Form.Label>Supplier comment</Form.Label>
                            <Form.Control
                                type="text"
                                name="supcomment"
                                value={inpval.supcomment}
                                onChange={setdata}
                            />
                        </Form.Group>
                    </div>

                    <button type="submit" onClick={addinpdata} class="btn-style">Submit</button>
                </Form>
            </Card>
        </div>
    )
}
