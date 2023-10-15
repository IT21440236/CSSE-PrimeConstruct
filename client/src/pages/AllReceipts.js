import React, { useContext, useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import ToastContext from "../context/ToastContext";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export const AllReceipts = () => {
  const { toast } = useContext(ToastContext);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({});
  const [receipts, setReceipts] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:8000/api/allreceipts`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        if (!result.error) {
          setReceipts(result.receipts);
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

  const deleteReceipt = async (id) => {
    if (window.confirm("Are you sure you want to delete this receipt?")) {
      try {
        const res = await fetch(
          `http://localhost:8000/api/deletereceipt/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const result = await res.json();
        if (!result.error) {
          setReceipts(result.receipts);
          toast.success("Receipt Deleted Successfully");
          setShowModal(false);
        } else {
          toast.error(result.error);
        }
      } catch (err) {
        console.log(err);
        toast.error("Failed to delete receipt. Please try again later.");
      }
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const newSearchReceipts = receipts.filter(
      (receipt) =>
        receipt.orderno.toLowerCase().includes(searchInput.toLowerCase()) ||
        receipt.productname.toLowerCase().includes(searchInput.toLowerCase()) ||
        receipt.productQuantity.toString().includes(searchInput) ||
        receipt.deliveryDate.includes(searchInput)
    );
    setReceipts(newSearchReceipts);
  };

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
    if (event.target.value === "") {
      setReceipts([]);
    }
  };

  return (
    <>
      <Helmet>
        <title>Receipts</title>
      </Helmet>
      <div>
        <h1>Receipts</h1>
        <div className="d-flex justify-content-between">
          <a href="/allreceipts" className="btn btn-danger my-2">
            Reload Receipt List
          </a>
          <div>
            <Link
              className="btn btn-info mb-2"
              to={"/addreceipt"}
              role="button"
            >
              Add Receipt
            </Link>
          </div>
        </div>
        <hr className="my-4" />
        {loading ? (
          <Spinner splash="Loading Receipts..." />
        ) : (
          <>
            <form className="d-flex" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                name="searchInput"
                id="searchInput"
                className="form-control my-2"
                placeholder="Search Receipt"
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
              <a href="/allreceipts">
                <button type="button" className="btn btn-secondary mx-2 my-2">
                  Reset
                </button>
              </a>
            </form>

            {receipts ? (
              receipts.length === 0 ? (
                <h3>No Receipts Found</h3>
              ) : (
                <>
                  <p>
                    Total Receipts: <strong>{receipts.length}</strong>{" "}
                  </p>
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Order Number</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Product Quantity</th>
                        <th scope="col">Delivery Date</th>
                      </tr>
                    </thead>

                    <tbody>
                      {receipts.map((receipt) => (
                        <tr
                          key={receipt._id}
                          onClick={() => {
                            setModalData({});
                            setModalData(receipt);
                            setShowModal(true);
                          }}
                        >
                          <td>{receipt.orderno}</td>
                          <td>{receipt.productname}</td>
                          <td>{receipt.productQuantity}</td>
                          <td>{receipt.deliveryDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )
            ) : (
              <h3>No Receipts Found</h3>
            )}
          </>
        )}
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Receipt Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            <strong>Order Number</strong>: {modalData.orderno}
          </p>
          <p>
            <strong>Product Name</strong>: {modalData.productname}
          </p>
          <p>
            <strong>Product Quantity</strong>: {modalData.productQuantity}
          </p>
          <p>
            <strong>Delivery Date</strong>: {modalData.deliveryDate}
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Link className="btn btn-info" to={`/editreceipt/${modalData._id}`}>
            Edit
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => modalData && deleteReceipt(modalData._id)}
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
