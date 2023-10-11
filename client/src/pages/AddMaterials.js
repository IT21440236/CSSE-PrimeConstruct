import React, { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card';
import ToastContext from "../context/ToastContext";


export const AddMaterials = () => {

    const { toast } = useContext(ToastContext);

    const [inpval, setINP] = useState({
        productName:"" ,
        productPrice:"",
        productDescription:""
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

        const { productName ,productPrice, productDescription } = inpval;

        if (!productName || !productPrice || !productDescription) {
            toast.error("Please enter all required fields")
            return false
        }

        const res = await fetch("/api/addProductSup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                productName ,productPrice, productDescription
            })
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");
            alert("error");

        } else {
            toast.success('Product added successfuly')
            //setShow(true);
            console.log("data added");

        }
    }

    return (
        <div className="container">
            <div className='d-flex'>
                <h2>Create New Materials</h2>
            </div>
            <Card className='shadow card'>
                <Form className='mt-4'>
                    <div className="row">

                    <Form.Group className="mb-3" controlId="formBasicProductName">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="productName"
                                value={inpval.productName}
                                onChange={setdata}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicProductPrice">
                            <Form.Label>Product Price</Form.Label>
                            <Form.Control
                                type="text"
                                name="productPrice"
                                value={inpval.productPrice}
                                onChange={setdata}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicProductDescription">
                            <Form.Label>Product Description</Form.Label>
                            <Form.Control
                                type="text"
                                name="productDescription"
                                value={inpval.productDescription}
                                onChange={setdata}
                            />
                        </Form.Group>

                    </div>

                    <button type="submit" onClick={addinpdata} className="btn-style">Submit</button>
                </Form>
            </Card>
        </div>
    )
}
