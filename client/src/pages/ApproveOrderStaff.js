import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ToastContext from "../context/ToastContext";

export const ApproveOrderStaff = () => {
  const { toast } = useContext(ToastContext);

  // const [error, setError] = useState(false)

  const [inpval, setINP] = useState({
    siteName: "",
    supplier: "",
    placedDate: "",
    requiredDate: "",
    productName: "",
    productQty: "",
    orderstatus: "",
  });

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
        [name]: value,
      };
    });
  };

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
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      //toast.error(data.error)
      console.log("error ");
    } else {
      //toast.success(`${data.registerNo} is edited successfuly`)
      setINP(data);
      console.log("get data");
    }
  };

  const updateorder = async (e) => {
    e.preventDefault();

    const {
      siteName,
      supplier,
      placedDate,
      requiredDate,
      productName,
      productQty,
      orderstatus,
    } = inpval;

    if (
      !siteName ||
      !supplier ||
      !placedDate ||
      !requiredDate ||
      !productName ||
      !productQty ||
      !orderstatus
    ) {
      toast.error("Please enter all required fields");
      // setError(true)
      return false;
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

    const orderdata = new FormData();

    orderdata.append("siteName", siteName);
    orderdata.append("supplier", supplier);
    orderdata.append("placedDate", placedDate);
    orderdata.append("requiredDate ", requiredDate);
    orderdata.append("productName", productName);
    orderdata.append("productQty", productQty);
    orderdata.append("orderstatus", orderstatus);

    //const data2 = await res2.json();
    // console.log(data2);

    const config = {
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const res = await axios.patch(
      `/api/updateordermng/${id}`,
      orderdata,
      config
    );

    if (res.status === 422) {
      toast.error(res.error);
    } else {
      toast.success(`Order is edited successfuly`);
      history("/orderlist");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className="container">
      <div className="d-flex">
        <h2>Approve Order</h2>
      </div>
      <Card className="shadow card">
        <Form className="mt-4">
          <div className="row">
            <Form.Group className="mb-3" controlId="formBasicSiteName">
              <Form.Label>Site Name</Form.Label>
              <Form.Control
                type="text"
                name="siteName"
                value={inpval.siteName}
                onChange={setdata}
                readOnly
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicSupplierName">
              <Form.Label>Supplier Name</Form.Label>
              <Form.Control
                type="text"
                name="supplier"
                value={inpval.supplier}
                onChange={setdata}
                readOnly
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPlacedDate">
              <Form.Label>Placed Date</Form.Label>
              <Form.Control
                type="text"
                name="placedDate"
                value={inpval.placedDate}
                onChange={setdata}
                readOnly
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicRequiredDate">
              <Form.Label>Required Date</Form.Label>
              <Form.Control
                type="text"
                name="requiredDate"
                value={inpval.requiredDate}
                onChange={setdata}
                readOnly
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicProductName">
              <Form.Label>
                <b>Product Name</b>
              </Form.Label>
              <select
                name="productName"
                value={inpval.productName}
                onChange={setdata}
                className="form-select"
                readOnly
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
                readOnly
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

          <button type="submit" onClick={updateorder} class="btn-style">
            Submit
          </button>
        </Form>
      </Card>
    </div>
  );
};
