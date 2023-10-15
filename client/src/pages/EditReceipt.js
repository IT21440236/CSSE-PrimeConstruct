import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ToastContext from "../context/ToastContext";
import Spinner from "../components/Spinner";

export const EditReceipt = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { toast } = useContext(ToastContext);
  const [receiptDetails, setReceiptDetails] = useState({
    orderno: "",
    productname: "",
    productQuantity: "",
    deliveryDate: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReceiptDetails({ ...receiptDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(`http://localhost:8000/api/receipt`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ id, ...receiptDetails }),
    });
    const result = await res.json();
    if (!result.error) {
      console.log(result);
      toast.success(`Updated [${receiptDetails.orderno}] Successfully`);

      setReceiptDetails({
        orderno: "",
        productname: "",
        productQuantity: "",
        deliveryDate: "",
      });
      navigate("/allreceipts");
    } else {
      toast.error(result.error);
      console.log(result);
    }
  };

  useEffect(() => {
    setLoading(true);
    async function fetchReceipt() {
      try {
        const res = await fetch(`http://localhost:8000/api/receipt/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")} `,
          },
        });
        const result = await res.json();
        console.log(result);
        if (!result.error) {
          setReceiptDetails({
            orderno: result.orderno,
            productname: result.productname,
            productQuantity: result.productQuantity,
            deliveryDate: result.deliveryDate,
          });
        } else {
          toast.error(result.error);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        toast.error("Failed to fetch receipt. Please try again later.");
        setLoading(false);
      }
    }
    fetchReceipt();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner splash="Loading Receipt..." />
      ) : (
        <>
          <h2>Edit Receipt</h2>
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
            <input
              type="submit"
              value="Save Changes"
              className="btn btn-info my-2"
            />
          </form>
        </>
      )}
    </>
  );
};
