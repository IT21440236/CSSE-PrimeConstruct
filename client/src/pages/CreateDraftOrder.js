import React, { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card';
import ToastContext from "../context/ToastContext";

export const CreateDraftOrder = () => {

    const { toast } = useContext(ToastContext);

    const [inpval, setINP] = useState({
        placedDate: "",
        requiredDate: "",
        supplier: "",
        draftStatus: ""
    })

    //const [show, setShow] = useState(false);

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

        const { placedDate, requiredDate, supplier, draftStatus } = inpval;

        if (!placedDate || !requiredDate || !supplier || !draftStatus) {
            toast.error("Please enter all required fields")
            return false
        }

        const res = await fetch("/api/addDraftOrder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
               placedDate, requiredDate, supplier, draftStatus
            })
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");
            alert("error");

        } else {
            toast.success('Draft order added successfuly')
            //setShow(true);
            console.log("data added");

        }
    }

    return (
        <div className="container">
            <div className='d-flex'>
                <h2>Create Draft Order</h2>
            </div>
            <Card className='shadow card'>
                <Form className='mt-4'>
                    <div className="row">
                        <Form.Group className="mb-3 " controlId="formBasicEmail">
                            <Form.Label>Placed Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={inpval.placedDate}
                                onChange={setdata}
                                name="placedDate"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Require Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={inpval.requiredDate}
                                onChange={setdata}
                                name="requiredDate"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label><b>Status</b></Form.Label>
                            <Form.Control
                                type="text"
                                value={inpval.draftStatus}
                                onChange={setdata}
                                name="draftStatus"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label><b>Supplier</b></Form.Label>
                            {/* <select
                                value={inpval.supplier}
                                onChange={setdata}
                                name="supplier"
                                className="form-select"
                            > */}
                            {/* <option>Select Supplier</option>
                                <option>Yasitha Supplier</option>
                                <option>Sunil Supplier</option> */}
                            {/* Add your supplier options here */}
                            {/* </select>  */}

                            <Form.Control
                                type="text"
                                value={inpval.supplier}
                                onChange={setdata}
                                name="supplier"
                            />
                        </Form.Group>
                    </div>

                    <button type="submit" onClick={addinpdata} className="btn-style">
                        Add
                    </button>

                    {/* <Form.Group className="mb-3 " controlId="formBasicEmail">
                            <Form.Label>Placed Date</Form.Label>
                            <Form.Control type="date" value="" onChange="" name="driverName" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Require Date</Form.Label>
                            <Form.Control type="date" value="" onChange="" name="noOfMiles" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label><b>Supplier</b></Form.Label>
                            <select value="" onChange="" name="supplier" className="form-select">
                                <option>Select Supplier</option>
                                
                            </select>
                        </Form.Group>

                        
                    </div>

                    <button type="submit" onClick="" class="btn-style">Add</button> */}
                </Form>
            </Card>
        </div>
    )
}
