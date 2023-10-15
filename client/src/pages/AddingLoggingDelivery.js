import React, { useState, useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card';
import ToastContext from "../context/ToastContext";


export const AddingLoggingDelivery = () => {

    const { toast } = useContext(ToastContext);

    const [inpval, setINP] = useState({
        draftID: "",
        orderid: "",
        siteName: "",
        supplier: "",
        deliveryDate: "",
        productName: "",
        productQty: "",
        comment: ""
    })

    //const [show, setShow] = useState(false);
    const [getsupdata, setApprovedata] = useState([]);

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

    const addinpdata = async (e) => {
        e.preventDefault();

        const { draftID,orderid, siteName, supplier, deliveryDate, productName, productQty, comment } = inpval;

        if (!draftID || !orderid || !siteName || !supplier || !deliveryDate || !productName || !productQty || !comment) {
            toast.error("Please enter all required fields")
            return false
        }

        const res = await fetch("/api/addManagerdelivery", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                draftID,orderid, siteName, supplier, deliveryDate, productName, productQty, comment
            })
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");
            alert("error");

        } else {
            toast.success('Manager order added successfuly')
            //setShow(true);
            console.log("data added");

        }
    }

    const getsuporderdata = async (e) => {

        const res = await fetch("/api/getSupOrderdata", {
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
            setApprovedata(data)
            console.log("get data");
        }
    }

    useEffect(() => {
        getsuporderdata()
    }, [])



    return (
        <div className="container">
            <div className='d-flex'>
                <h2>Add Logging Delivery</h2>
            </div>
            <Card className='shadow card'>
                <Form className='mt-4'>
                    <div className="row">

                        <Form.Group className="mb-3">
                            <Form.Label>Draft ID</Form.Label>
                            <select value={inpval.draftID} onChange={setdata} name="draftID" className="form-select">
                                <option>Select draft order</option>
                                {
                                    getsupdata.map((opts, i) => <option>{opts.draftID}</option>)
                                }
                            </select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Order ID</Form.Label>
                            <select value={inpval.orderid} onChange={setdata} name="orderid" className="form-select">
                                <option>Select order id</option>
                                {
                                    getsupdata.map((opts, i) => <option>{opts.orderid}</option>)
                                }
                            </select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicSiteName">
                            <Form.Label>Site Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="siteName"
                                value={inpval.siteName}
                                onChange={setdata}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicSupplierName">
                            <Form.Label>Supplier Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="supplier"
                                value={inpval.supplier}
                                onChange={setdata}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPlacedDate">
                            <Form.Label>Delivery Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="deliveryDate"
                                value={inpval.deliveryDate}
                                onChange={setdata}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicProductName">
                            <Form.Label><b>Product Name</b></Form.Label>
                            <select
                                name="productName"
                                value={inpval.productName}
                                onChange={setdata}
                                className="form-select"
                            >
                                <option>Select Product Name</option>
                                <option>Sand Cube</option>
                                <option>Wood</option>
                                <option>Cement</option>
                                <option>Steel</option>
                                {/* Add options for product names */}
                            </select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicProductQty">
                            <Form.Label>Product Quantity</Form.Label>
                            <Form.Control
                                type="text"
                                name="productQty"
                                value={inpval.productQty}
                                onChange={setdata}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicOrderStatus">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                                type="text"
                                name="comment"
                                value={inpval.comment}
                                onChange={setdata}
                            />
                        </Form.Group>


                    </div>

                    <button type="submit" onClick={addinpdata} class="btn-style">Add</button>
                </Form>
            </Card>
        </div>
    )
}
