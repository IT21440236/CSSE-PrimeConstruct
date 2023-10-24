import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ToastContext from "../context/ToastContext";

export const ApproveOrderStaff = () => {
  const { toast } = useContext(ToastContext);

  const [inpval, setINP] = useState({
    siteName: "",
    supplier: "",
    placedDate: "",
    requiredDate: "",
    productName: "",
    productQty: "",
    orderstatus: "",
  });

  const history = useNavigate();

  const setdata = (e) => {
    const { name, value } = e.target;
    setINP((prevVal) => ({
      ...prevVal,
      [name]: value,
    }));
  };

  const { id } = useParams("");

  const getdata = async () => {
    const res = await fetch(`/api/getOneOrder/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
      console.log("error");
    } else {
      setINP(data);
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
      return false;
    }

    const orderdata = new FormData();
    orderdata.append("siteName", siteName);
    orderdata.append("supplier", supplier);
    orderdata.append("placedDate", placedDate);
    orderdata.append("requiredDate", requiredDate);
    orderdata.append("productName", productName);
    orderdata.append("productQty", productQty);
    orderdata.append("orderstatus", orderstatus);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const res = await axios.patch(`/api/updateordermng/${id}`, orderdata, config);

    if (res.status === 422) {
      toast.error(res.error);
    } else {
      toast.success(`Order is edited successfully`);
      history("/orderlist");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
      <div className="d-flex">
        <h2 className="text-center bg-darkgreen text-white p-2">Approve Order</h2>
      </div>
      <form className="mt-4">
        <div className="row">
          <div className="form-group">
            <label htmlFor="siteName" className="form-label mt-4">
              Site Name
            </label>
            <input
              type="text"
              className="form-control"
              name="siteName"
              value={inpval.siteName}
              onChange={setdata}
              readOnly
            />
          </div>

          <div className="form-group">
            <label htmlFor="supplier" className="form-label mt-4">
              Supplier Name
            </label>
            <input
              type="text"
              className="form-control"
              name="supplier"
              value={inpval.supplier}
              onChange={setdata}
              readOnly
            />
          </div>

          <div className="form-group">
            <label htmlFor="placedDate" className="form-label mt-4">
              Placed Date
            </label>
            <input
              type="text"
              className="form-control"
              name="placedDate"
              value={inpval.placedDate}
              onChange={setdata}
              readOnly
            />
          </div>

          <div className="form-group">
            <label htmlFor="requiredDate" className="form-label mt-4">
              Required Date
            </label>
            <input
              type="text"
              className="form-control"
              name="requiredDate"
              value={inpval.requiredDate}
              onChange={setdata}
              readOnly
            />
          </div>

          <div className="form-group">
            <label>
              <b>Product Name</b>
            </label>
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
          </div>

          <div className="form-group">
            <label htmlFor="productQty" className="form-label mt-4">
              Product Quantity
            </label>
            <input
              type="text"
              className="form-control"
              name="productQty"
              value={inpval.productQty}
              onChange={setdata}
              readOnly
            />
          </div>

          <div className="form-group">
            <label htmlFor="orderstatus" className="form-label mt-4">
              Order Status
            </label>
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
          </div>
        </div>

        <button type="submit" onClick={updateorder} className="btn-style">
          Submit
        </button>
      </form>
    </>
  );
};

