import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ToastContext from "../context/ToastContext";

export const AddInvoice = () => {
  const { toast } = useContext(ToastContext);

  const [invoiceDetails, setInvoiceDetails] = useState({
    orderno: "",
    bank: "",
    branch: "",
    accountno: "",
    amount: "",
    depositdate: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInvoiceDetails({ ...invoiceDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(`http://localhost:8000/api/invoice`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(invoiceDetails),
    });
    const result = await res.json();
    if (!result.error) {
      toast.success(`Invoice [${invoiceDetails.orderno}] Added Successfully`);

      setInvoiceDetails({
        orderno: "",
        bank: "",
        branch: "",
        accountno: "",
        amount: "",
        depositdate: "",
      });
    } else {
      toast.error(result.error);
    }
  };

  const handleClear = () => {
    setInvoiceDetails({
      orderno: "",
      bank: "",
      branch: "",
      accountno: "",
      amount: "",
      depositdate: "",
    });
  };

  return (
    <>
      <h2 className="text-center bg-darkgreen text-white p-2">Add Invoice</h2>
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
            <div className="text-center">
              <input
                type="submit"
                value="Add Invoice"
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
