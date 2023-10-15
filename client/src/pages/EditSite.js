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
      navigate("/index");
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
            {/* Implement the necessary form elements similar to the EditEmployee component */}
          </form>
        </>
      )}
    </>
  );
};
