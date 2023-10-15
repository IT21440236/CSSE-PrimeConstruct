import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ToastContext from "../context/ToastContext";
import Spinner from "../components/Spinner";

export const EditSite = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { toast } = useContext(ToastContext);
  const [siteDetails, setSiteDetails] = useState({
    sitename: "",
    siteAddress: "",
    contactno: "",
    budget: "",
    siteManager: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSiteDetails({ ...siteDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(`http://localhost:8000/api/site`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ id, ...siteDetails }),
    });
    const result = await res.json();
    if (!result.error) {
      console.log(result);
      toast.success(`Updated [${siteDetails.sitename}] Successfully`);

      setSiteDetails({
        sitename: "",
        siteAddress: "",
        contactno: "",
        budget: "",
        siteManager: "",
      });
      navigate("/allsites");
    } else {
      toast.error(result.error);
      console.log(result);
    }
  };

  useEffect(() => {
    setLoading(true);
    async function fetchSite() {
      try {
        const res = await fetch(`http://localhost:8000/api/site/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")} `,
          },
        });
        const result = await res.json();
        console.log(result);
        if (!result.error) {
          setSiteDetails({
            sitename: result.sitename,
            siteAddress: result.siteAddress,
            contactno: result.contactno,
            budget: result.budget,
            siteManager: result.siteManager,
          });
        } else {
          toast.error(result.error);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        toast.error("Failed to fetch site. Please try again later.");
        setLoading(false);
      }
    }
    fetchSite();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner splash="Loading Site..." />
      ) : (
        <>
          <h2>Edit Site</h2>
          <form onSubmit={handleSubmit}>
            {/* Site Name */}
            <div className="form-group">
              <label htmlFor="sitenameInput" className="form-label mt-4">
                Site Name
              </label>
              <input
                type="text"
                className="form-control"
                id="sitenameInput"
                name="sitename"
                value={siteDetails.sitename}
                onChange={handleInputChange}
                placeholder="Site Name"
                required
              />
            </div>
            {/* Site Address */}
            <div className="form-group">
              <label htmlFor="siteAddressInput" className="form-label mt-4">
                Site Address
              </label>
              <input
                type="text"
                className="form-control"
                id="siteAddressInput"
                name="siteAddress"
                value={siteDetails.siteAddress}
                onChange={handleInputChange}
                placeholder="Site Address"
                required
              />
            </div>
            {/* Contact Number */}
            <div className="form-group">
              <label htmlFor="contactnoInput" className="form-label mt-4">
                Contact Number
              </label>
              <input
                type="text"
                className="form-control"
                id="contactnoInput"
                name="contactno"
                value={siteDetails.contactno}
                onChange={handleInputChange}
                placeholder="Contact Number"
                required
              />
            </div>
            {/* Budget */}
            <div className="form-group">
              <label htmlFor="budgetInput" className="form-label mt-4">
                Budget
              </label>
              <input
                type="text"
                className="form-control"
                id="budgetInput"
                name="budget"
                value={siteDetails.budget}
                onChange={handleInputChange}
                placeholder="Budget"
                required
              />
            </div>
            {/* Site Manager */}
            <div className="form-group">
              <label htmlFor="siteManagerInput" className="form-label mt-4">
                Site Manager
              </label>
              <input
                type="text"
                className="form-control"
                id="siteManagerInput"
                name="siteManager"
                value={siteDetails.siteManager}
                onChange={handleInputChange}
                placeholder="Site Manager"
                required
              />
            </div>
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
