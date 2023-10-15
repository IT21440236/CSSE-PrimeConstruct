import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ToastContext from "../context/ToastContext";

export const AddReceipt = () => {
  const { toast } = useContext(ToastContext);

  const [receiptDetails, setReceiptDetails] = useState({
    orderno: "",
    productname: "",
    productQuantity: "",
    deliveryDate: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReceiptDetails({ ...receiptDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(`http://localhost:8000/api/receipt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(receiptDetails),
    });
    const result = await res.json();
    if (!result.error) {
      toast.success(`Receipt [${receiptDetails.orderno}] Added Successfully`);

      setReceiptDetails({
        orderno: "",
        productname: "",
        productQuantity: "",
        deliveryDate: "",
      });
    } else {
      toast.error(result.error);
    }
  };

  const handleClear = () => {
    setReceiptDetails({
      orderno: "",
      productname: "",
      productQuantity: "",
      deliveryDate: "",
    });
  };

  return (
    <>
      <h2 className="text-center bg-darkgreen text-white p-2">Add Receipt</h2>
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <form onSubmit={handleSubmit}>
            {/* Order Number */}
            <div className="form-group">
              <label htmlFor="ordernoInput" className="form-label mt-4">
                Order Number
              </label>
              <input
                type="text"
                className="form-control"
                id="ordernoInput"
                name="orderno"
                value={receiptDetails.orderno}
                onChange={handleInputChange}
                placeholder="Order Number"
                required
              />
            </div>
            {/* Product Name */}
            <div className="form-group">
              <label htmlFor="productnameInput" className="form-label mt-4">
                Product Name
              </label>
              <input
                type="text"
                className="form-control"
                id="productnameInput"
                name="productname"
                value={receiptDetails.productname}
                onChange={handleInputChange}
                placeholder="Product Name"
                required
              />
            </div>
            {/* Product Quantity */}
            <div className="form-group">
              <label htmlFor="productQuantityInput" className="form-label mt-4">
                Product Quantity
              </label>
              <input
                type="number"
                className="form-control"
                id="productQuantityInput"
                name="productQuantity"
                value={receiptDetails.productQuantity}
                onChange={handleInputChange}
                placeholder="Product Quantity"
                required
              />
            </div>
            {/* Delivery Date */}
            <div className="form-group">
              <label htmlFor="deliveryDateInput" className="form-label mt-4">
                Delivery Date
              </label>
              <input
                type="date"
                className="form-control"
                id="deliveryDateInput"
                name="deliveryDate"
                value={receiptDetails.deliveryDate}
                onChange={handleInputChange}
                required
              />
            </div>
            {/* Add more form fields for other attributes */}
            <div className="text-center">
              <input
                type="submit"
                value="Add Receipt"
                className="btn btn-info my-2"
              />
              <button
                type="button"
                onClick={handleClear}
                className="btn btn-danger my-2 ml-2"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
