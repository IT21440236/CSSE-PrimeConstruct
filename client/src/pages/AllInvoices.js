import React, { useContext, useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import ToastContext from "../context/ToastContext";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export const AllInvoices = () => {
  const { toast } = useContext(ToastContext);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({});
  const [invoices, setInvoices] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:8000/api/allinvoices`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        if (!result.error) {
          setInvoices(result.invoices);
          setLoading(false);
        } else {
          console.log(result);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const deleteInvoice = async (id) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      try {
        const res = await fetch(
          `http://localhost:8000/api/deleteinvoice/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const result = await res.json();
        if (!result.error) {
          setInvoices(result.invoices);
          toast.success("Invoice Deleted Successfully");
          setShowModal(false);
        } else {
          toast.error(result.error);
        }
      } catch (err) {
        console.log(err);
        toast.error("Failed to delete invoice. Please try again later.");
      }
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const newSearchInvoices = invoices.filter(
      (invoice) =>
        invoice.orderno.toLowerCase().includes(searchInput.toLowerCase()) ||
        invoice.bank.toLowerCase().includes(searchInput.toLowerCase()) ||
        invoice.branch.toLowerCase().includes(searchInput.toLowerCase()) ||
        invoice.accountno.toLowerCase().includes(searchInput.toLowerCase()) ||
        invoice.amount.toString().includes(searchInput) ||
        invoice.depositdate.includes(searchInput)
    );
    setInvoices(newSearchInvoices);
  };

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
    if (event.target.value === "") {
      setInvoices([]);
    }
  };

  return (
    <>
      <Helmet>
        <title>Invoices</title>
      </Helmet>
      <div>
        <h1>Invoices</h1>
        <div className="d-flex justify-content-between">
          <a href="/allinvoices" className="btn btn-danger my-2">
            Reload Invoice List
          </a>
          <div>
            <Link
              className="btn btn-info mb-2"
              to={"/addinvoice"}
              role="button"
            >
              Add Invoice
            </Link>
          </div>
        </div>
        <hr className="my-4" />
        {loading ? (
          <Spinner splash="Loading Invoices..." />
        ) : (
          <>
            <form className="d-flex" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                name="searchInput"
                id="searchInput"
                className="form-control my-2"
                placeholder="Search Invoice"
                value={searchInput}
                onChange={(e) => {
                  handleInputChange(e);
                  setSearchInput(e.target.value);
                  handleSearchSubmit(e);
                }}
              />
              <button type="submit" className="btn btn-info mx-2 my-2">
                Search
              </button>
              <a href="/allinvoices">
                <button type="button" className="btn btn-secondary mx-2 my-2">
                  Reset
                </button>
              </a>
            </form>

            {invoices ? (
              invoices.length === 0 ? (
                <h3>No Invoices Found</h3>
              ) : (
                <>
                  <p>
                    Total Invoices: <strong>{invoices.length}</strong>{" "}
                  </p>
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Order Number</th>
                        <th scope="col">Bank</th>
                        <th scope="col">Branch</th>
                        <th scope="col">Account Number</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Deposit Date</th>
                      </tr>
                    </thead>

                    <tbody>
                      {invoices.map((invoice) => (
                        <tr
                          key={invoice._id}
                          onClick={() => {
                            setModalData({});
                            setModalData(invoice);
                            setShowModal(true);
                          }}
                        >
                          <td>{invoice.orderno}</td>
                          <td>{invoice.bank}</td>
                          <td>{invoice.branch}</td>
                          <td>{invoice.accountno}</td>
                          <td>{invoice.amount}</td>
                          <td>{invoice.depositdate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )
            ) : (
              <h3>No Invoices Found</h3>
            )}
          </>
        )}
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Invoice Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            <strong>Order Number</strong>: {modalData.orderno}
          </p>
          <p>
            <strong>Bank</strong>: {modalData.bank}
          </p>
          <p>
            <strong>Branch</strong>: {modalData.branch}
          </p>
          <p>
            <strong>Account Number</strong>: {modalData.accountno}
          </p>
          <p>
            <strong>Amount</strong>: {modalData.amount}
          </p>
          <p>
            <strong>Deposit Date</strong>: {modalData.depositdate}
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Link className="btn btn-info" to={`/editinvoice/${modalData._id}`}>
            Edit
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => modalData && deleteInvoice(modalData._id)}
          >
            Delete
          </button>

          <button
            className="btn btn-warning"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
