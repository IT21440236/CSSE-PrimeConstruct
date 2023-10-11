import React, { useState } from "react";
import axios from "axios";

function Report() {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8000/api/deliveryreport", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Prime Construct (Pvt) Ltd.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <div>
      <button
        className="btn btn-success"
        onClick={handleDownload}
        disabled={loading}
      >
        {loading ? "Generating report..." : "Download Report"}
      </button>
    </div>
  );
}

export default Report;
