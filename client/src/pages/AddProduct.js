import React, { useState, useContext,useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card';
import ToastContext from "../context/ToastContext";


export const AddProduct = () => {

    const { toast } = useContext(ToastContext);

    const [inpval, setINP] = useState({
        draftID: "",
        siteName: "",
        supplier: "",
        placedDate: "",
        requiredDate: "",
        productName: "",
        productQty: "",
        orderstatus: ""
    })

    //const [show, setShow] = useState(false);
    const [getdradata, setDraftdata] = useState([]);

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

        const { draftID, siteName, supplier, placedDate, requiredDate, productName, productQty, orderstatus } = inpval;

        if (!draftID || !siteName || !supplier || !placedDate || !requiredDate || !productName || !productQty || !orderstatus) {
            toast.error("Please enter all required fields")
            return false
        }

        const res = await fetch("/api/addManagerOrder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                draftID, siteName, supplier, placedDate, requiredDate, productName, productQty, orderstatus
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

    const getdraftdata = async (e) => {

        const res = await fetch("/api/getdraftdata", {
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
            setDraftdata(data)
            console.log("get data");
        }
    }

    useEffect(() => {
        getdraftdata()
    }, [])



    return (
        <div className="container">
            <div className='d-flex'>
                <h2>Add Product</h2>
            </div>
            <Card className='shadow card'>
                <Form className='mt-4'>
                    <div className="row">

                        <Form.Group className="mb-3">
                            <Form.Label>Draft Order</Form.Label>
                            <select value={inpval.draftID} onChange={setdata} name="draftID" className="form-select">
                                <option>Select draft order</option>
                                {
                                    getdradata.map((opts, i) => <option>{opts.draftid}</option>)
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
                            {/* <Form.Control
                                type="text"
                                name="supplier"
                                value={inpval.supplier}
                                onChange={setdata}
                            /> */}
                            <select value={inpval.supplier} onChange={setdata} name="supplier" className="form-select">
                                <option>Select draft order</option>
                                {
                                    getdradata.map((opts, i) => <option>{opts.supplier}</option>)
                                }
                            </select>

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPlacedDate">
                            <Form.Label>Placed Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="placedDate"
                                value={inpval.placedDate}
                                onChange={setdata}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicRequiredDate">
                            <Form.Label>Required Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="requiredDate"
                                value={inpval.requiredDate}
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
                                <option>Black Stone</option>
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
                            <Form.Label>Order Status</Form.Label>
                            <select
                                name="orderstatus"
                                value={inpval.orderstatus}
                                onChange={setdata}
                                className="form-select"
                            >
                                <option value="">Select Order Status</option>
                                <option value="Reject">Reject</option>
                                <option value="Pending">Pending</option>
                                <option value="Accept">Accept</option>
                            </select>
                        </Form.Group>


                    </div>

                    <button type="submit" onClick={addinpdata} class="btn-style">Add</button>
                </Form>
            </Card>
        </div>
    )
}
