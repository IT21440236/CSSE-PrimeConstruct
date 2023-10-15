import React, { useContext, useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { Modal } from "react-bootstrap";
import ToastContext from "../context/ToastContext";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export const AllSites = () => {
  const { toast } = useContext(ToastContext);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({});
  const [sites, setSites] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:8000/api/allsites`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        if (!result.error) {
          setSites(result.sites);
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

  const deleteSite = async (id) => {
    if (window.confirm("Are you sure you want to delete this site?")) {
      try {
        const res = await fetch(`http://localhost:8000/api/deletesite/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        if (!result.error) {
          setSites(result.sites);
          toast.success("Site Deleted Successfully");
          setShowModal(false);
        } else {
          toast.error(result.error);
        }
      } catch (err) {
        console.log(err);
        toast.error("Failed to delete site. Please try again later.");
      }
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const newSearchSite = sites.filter(
      (site) =>
        site.sitename.toLowerCase().includes(searchInput.toLowerCase()) ||
        site.siteAddress.toLowerCase().includes(searchInput.toLowerCase()) ||
        site.siteManager.toLowerCase().includes(searchInput.toLowerCase())
    );
    setSites(newSearchSite);
  };

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
    if (event.target.value === "") {
      setSites([]);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sites</title>
      </Helmet>
      <div>
        <h1>Sites</h1>
        <div className="d-flex justify-content-between">
          <a href="/allsites" className="btn btn-danger my-2">
            Reload Site List
          </a>
          <div>
            <Link className="btn btn-info mb-2" to={"/addsite"} role="button">
              Add Site
            </Link>
          </div>
        </div>
        <hr className="my-4" />
        {loading ? (
          <Spinner splash="Loading Sites..." />
        ) : (
          <>
            <form className="d-flex" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                name="searchInput"
                id="searchInput"
                className="form-control my-2"
                placeholder="Search Site"
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
              <a href="/allsites">
                <button type="button" className="btn btn-secondary mx-2 my-2">
                  Reset
                </button>
              </a>
            </form>

            {sites ? (
              sites.length === 0 ? (
                <h3>No Sites Found</h3>
              ) : (
                <>
                  <p>
                    Total Sites: <strong>{sites.length}</strong>{" "}
                  </p>
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Site Name</th>
                        <th scope="col">Site Address</th>
                        <th scope="col">Contact Number</th>
                        <th scope="col">Budget</th>
                        <th scope="col">Site Manager</th>
                      </tr>
                    </thead>

                    <tbody>
                      {sites.map((site) => (
                        <tr
                          key={site._id}
                          onClick={() => {
                            setModalData({});
                            setModalData(site);
                            setShowModal(true);
                          }}
                        >
                          <td>{site.sitename}</td>
                          <td>{site.siteAddress}</td>
                          <td>{site.contactno}</td>
                          <td>{site.budget}</td>
                          <td>{site.siteManager}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )
            ) : (
              <h3>No Sites Found</h3>
            )}
          </>
        )}
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Site Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            <strong>Site Name</strong>: {modalData.sitename}
          </p>
          <p>
            <strong>Site Address</strong>: {modalData.siteAddress}
          </p>
          <p>
            <strong>Contact Number</strong>: {modalData.contactno}
          </p>
          <p>
            <strong>Budget</strong>: {modalData.budget}
          </p>
          <p>
            <strong>Site Manager</strong>: {modalData.siteManager}
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Link className="btn btn-info" to={`/editsite/${modalData._id}`}>
            Edit
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => modalData && deleteSite(modalData._id)}
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
