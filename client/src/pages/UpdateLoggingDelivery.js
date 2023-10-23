import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card';
import Select from 'react-select';
import { useNavigate } from "react-router-dom"
import axios from "axios"
import ToastContext from "../context/ToastContext";


export const UpdateLoggingDelivery = () => {

    const { toast } = useContext(ToastContext);

    // const [error, setError] = useState(false)

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

        const res = await fetch(`/api/getOnedelivery/${id}`, {
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

    const updateorder = async (e) => {
        e.preventDefault();

        const { draftID, orderid, siteName, supplier, deliveryDate, productName, productQty, comment } = inpval;

        if (!draftID || !orderid || !siteName || !supplier || !deliveryDate || !productName || !productQty || !comment) {
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

        const deliverydata = new FormData()

        deliverydata.append("draftID", draftID)
        deliverydata.append("orderid", orderid)
        deliverydata.append("siteName", siteName)
        deliverydata.append("supplier", supplier)
        deliverydata.append("deliveryDate", deliveryDate)
        deliverydata.append("productName", productName)
        deliverydata.append("productQty", productQty)
        deliverydata.append("comment", comment)

        //const data2 = await res2.json();
        // console.log(data2);

        const config = {
            headers: {
                "Content-Type": "application/json",

                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        }

        const res = await axios.patch(`/api/updatedeliverymng/${id}`, deliverydata, config);

        if (res.status === 422) {
            toast.error(res.error)
        } else {
            toast.success(`Delivery is edited successfuly`)
            history("/logginglist")
        }
    }

    useEffect(() => {
        getdata();
    }, []);


    return (
        <div className="container">
            <div className='d-flex'>
                <h2>Update Logging Delivery</h2>
            </div>
            <Card className='shadow card'>
                <Form className='mt-4'>
                    <div className="row">
                    <Form.Group className="mb-3" controlId="formBasicSiteName">
                            <Form.Label>Site Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="draftID"
                                value={inpval.draftID}
                                onChange={setdata}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicSiteName">
                            <Form.Label>Site Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="orderid"
                                value={inpval.orderid}
                                onChange={setdata}
                            />
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
                                type="text"
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

                    <button type="submit" onClick={updateorder} class="btn-style">Submit</button>
                </Form>
            </Card>
        </div>
    )
}
