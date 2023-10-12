import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card';
import Select from 'react-select';
import { useNavigate } from "react-router-dom"
import axios from "axios"
import ToastContext from "../context/ToastContext";

export const UpdateMaterials = () => {

    const { toast } = useContext(ToastContext);

    // const [error, setError] = useState(false)

    const [inpval, setINP] = useState({
        supplierName: "",
        productName: "",
        productPrice: "",
        productDescription: ""
    })

    // const [status, setStatus] = useState("Active");
    //const [image, setImage] = useState("");
    // const [show, setShow] = useState(false);
    const history = useNavigate();

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

        const res = await fetch(`/api/getOneSupProduct/${id}`, {
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

    const updateproduct = async (e) => {
        e.preventDefault();

        const { supplierName, productName, productPrice, productDescription  } = inpval;

        if (!supplierName || !productName || !productPrice || !productDescription) {
            toast.error("Please enter all required fields")
            // setError(true)
            return false
        }

        // const res2 = await fetch(`/updatevehicle/${id}`, {
        //     method: "PATCH",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         registerNo, brand, model, vehicleType,  vehicleColor, manufactureYear, fuelType,status,  chassisNo, LicenceExpiredDate, InsuranceExpiredDate
        //     })
        // });

        const productdata = new FormData()

        productdata.append("supplierName", supplierName)
        productdata.append("productName", productName )
        productdata.append("productPrice", productPrice)
        productdata.append("productDescription", productDescription)

        //const data2 = await res2.json();
        // console.log(data2);

        const config = {
            headers: {
                "Content-Type": "application/json",

                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        }

        const res = await axios.patch(`/api/updateproductsup/${id}`, productdata, config);

        if (res.status === 422) {
            toast.error(res.error)
        } else {
            toast.success(`Product is edited successfuly`)
            history("/suppliersideproductlist")
        }
    }

    useEffect(() => {
        getdata();
    }, []);



    return (
        <div className="container">
            <div className='d-flex'>
                <h2>Update Materials Details</h2>
            </div>
            <Card className='shadow card'>
                <Form className='mt-4'>
                    <div className="row">

                    <Form.Group className="mb-3" controlId="formBasicProductName">
                            <Form.Label>Supplier Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="supplierName"
                                value={inpval.supplierName}
                                onChange={setdata}
                            />
                        </Form.Group>

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

                    <button type="submit" onClick={updateproduct} className="btn-style">Submit</button>
                </Form>
            </Card>
        </div>
    )
}
