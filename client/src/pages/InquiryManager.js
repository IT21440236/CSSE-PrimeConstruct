import React, { useState, useEffect, useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
//import Alert from 'react-bootstrap/Alert';
import ToastContext from "../context/ToastContext";
import Card from 'react-bootstrap/Card';

export const InquiryManager = () => {
    const { toast } = useContext(ToastContext);

    const [inpval, setINP] = useState({
        supplierName: "",
        supplierEmail: "",
        Description: ""
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

        const { supplierName, supplierEmail, Description } = inpval;

        const res = await fetch("/api/inquirymng", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                supplierName, supplierEmail, Description
            })
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            toast.error("please enter all the required fields!");
            console.log("error ");
            //alert("error");

        } else {
            //setShow(true);
            //alert("data added");
            toast.success(`Send Inquiry Email to ${supplierName}`)
            console.log("data added");
        }
    }

    return (
        <>
            {/* {
                show ? <Alert variant="primary" onClose={() => setShow(false)} dismissible>
                    Your Email Send & Repair Assign Succesfully
                </Alert> : ""
            } */}
            <div className="container mt-2">
                <div className='d-flex justify-content-center'>
                    <h2>Inquiry</h2>
                </div>
                <Card className='shadow card'>
                    <div className="d-flex justify-content-center">
                        <Form className='mt-2 col-lg-6'>
                            <Form.Group className="mb-3">
                                <Form.Label>Supplier Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={inpval.supplierName}
                                    onChange={setdata}
                                    name="supplierName"
                                    placeholder="Enter supplier name"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Supplier Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={inpval.supplierEmail}
                                    onChange={setdata}
                                    name="supplierEmail"
                                    placeholder="Enter supplier email"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={inpval.Description}
                                    onChange={setdata}
                                    name="Description"
                                    placeholder="Enter description"
                                />
                            </Form.Group>
                            <Button variant="primary" className="btn-success" type="submit" onClick={addinpdata}>
                                Assign
                            </Button>
                        </Form>
                    </div>
                </Card>
            </div>
        </>
    )
}
