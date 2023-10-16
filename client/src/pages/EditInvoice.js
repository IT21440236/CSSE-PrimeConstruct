import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ToastContext from "../context/ToastContext";
import Spinner from "../components/Spinner";

export const EditInvoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { toast } = useContext(ToastContext);
  const [invoiceDetails, setInvoiceDetails] = useState({
    orderno: "",
    bank: "",
    branch: "",
    accountno: "",
    amount: "",
    depositdate: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInvoiceDetails({ ...invoiceDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(`http://localhost:8000/api/invoice`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ id, ...invoiceDetails }),
    });
    const result = await res.json();
    if (!result.error) {
      console.log(result);
      toast.success(`Updated [${invoiceDetails.orderno}] Successfully`);

      setInvoiceDetails({
        orderno: "",
        bank: "",
        branch: "",
        accountno: "",
        amount: "",
        depositdate: "",
      });
      navigate("/allinvoices");
    } else {
      toast.error(result.error);
      console.log(result);
    }
  };

  useEffect(() => {
    setLoading(true);
    async function fetchInvoice() {
      try {
        const res = await fetch(`http://localhost:8000/api/invoice/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")} `,
          },
        });
        const result = await res.json();
        console.log(result);
        if (!result.error) {
          setInvoiceDetails({
            orderno: result.orderno,
            bank: result.bank,
            branch: result.branch,
            accountno: result.accountno,
            amount: result.amount,
            depositdate: result.depositdate,
          });
        } else {
          toast.error(result.error);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        toast.error("Failed to fetch invoice. Please try again later.");
        setLoading(false);
      }
    }
    fetchInvoice();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner splash="Loading Invoice..." />
      ) : (
        <>
          <h2>Edit Invoice</h2>
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
                value={invoiceDetails.orderno}
                onChange={handleInputChange}
                placeholder="Order Number"
                required
              />
            </div>
            {/* Bank */}
            <div className="form-group">
              <label htmlFor="bankInput" className="form-label mt-4">
                Bank
              </label>
              <input
                type="text"
                className="form-control"
                id="bankInput"
                name="bank"
                value={invoiceDetails.bank}
                onChange={handleInputChange}
                placeholder="Bank"
                required
              />
            </div>
            {/* Branch */}
            <div className="form-group">
              <label htmlFor="branchInput" className="form-label mt-4">
                Branch
              </label>
              <input
                type="text"
                className="form-control"
                id="branchInput"
                name="branch"
                value={invoiceDetails.branch}
                onChange={handleInputChange}
                placeholder="Branch"
                required
              />
            </div>
            {/* Account Number */}
            <div className="form-group">
              <label htmlFor="accountnoInput" className="form-label mt-4">
                Account Number
              </label>
              <input
                type="text"
                className="form-control"
                id="accountnoInput"
                name="accountno"
                value={invoiceDetails.accountno}
                onChange={handleInputChange}
                placeholder="Account Number"
                required
              />
            </div>
            {/* Amount */}
            <div className="form-group">
              <label htmlFor="amountInput" className="form-label mt-4">
                Amount
              </label>
              <input
                type="number"
                className="form-control"
                id="amountInput"
                name="amount"
                value={invoiceDetails.amount}
                onChange={handleInputChange}
                placeholder="Amount"
                required
              />
            </div>
            {/* Deposit Date */}
            <div className="form-group">
              <label htmlFor="depositdateInput" className="form-label mt-4">
                Deposit Date
              </label>
              <input
                type="date"
                className="form-control"
                id="depositdateInput"
                name="depositdate"
                value={invoiceDetails.depositdate}
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
