// //NOTES:

// //Difference between Link and <a> tag in react-router-dom is that Link tag does not refresh the page, it just changes the url in the browser and <a> tag refreshes the page.

import { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";
import { useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faUsers,
  faMoneyBillAlt,
  faCalendarAlt,
  faFileAlt,
  faSignInAlt,
  faSignOutAlt,
  faTruck,
  faUserTie,
  faFolder,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ title = "Prime Construct" }) => {
  const [currentPage, setCurrentPage] = useState("");
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const sidebarRef = useRef(null); // create a ref to the sidebar element

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleMouseEnter = () => {
    // set showSidebar to true when mouse enters the sidebar
    setShowSidebar(true);
  };

  const handleMouseLeave = () => {
    // set showSidebar to false when mouse leaves the sidebar
    setShowSidebar(false);
  };

  return (
    <>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {showSidebar ? <FaTimes /> : <FaBars />}
      </button>
      <div
        className={`sidenav${showSidebar ? " open" : ""}`}
        ref={sidebarRef} // set the ref to the sidebar element
        onMouseEnter={handleMouseEnter} // handle mouse enter event
        onMouseLeave={handleMouseLeave} // handle mouse leave event
      >
        <ul className="navbar-nav">
          <p className="nav-link">{dateTime.toLocaleString()}</p>

          {/* Site Manager - Yeran Kodithuwakku*/}
          {user && user.role === "Site Manager" ? (
            <>
              <li className="nav-item">
                <Link to="/" role="button" className="nav-link">
                  <FontAwesomeIcon
                    icon={faChartBar}
                    style={{ marginRight: "10px", color: "white" }}
                  />
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/index" role="button" className="nav-link">
                  <FontAwesomeIcon
                    icon={faUsers}
                    style={{ marginRight: "10px", color: "white" }}
                  />
                  Employee
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/addsalary" role="button" className="nav-link">
                  <FontAwesomeIcon
                    icon={faMoneyBillAlt}
                    style={{ marginRight: "10px", color: "white" }}
                  />
                  Salary
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/addattendance" role="button" className="nav-link">
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    style={{ marginRight: "10px", color: "white" }}
                  />
                  Attendance
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/createreport" role="button" className="nav-link">
                  <FontAwesomeIcon
                    icon={faFileAlt}
                    style={{ marginRight: "10px", color: "white" }}
                  />
                  Report
                </Link>
              </li>
              <li
                className="nav-item"
                onClick={() => {
                  setUser(null);
                  localStorage.clear();
                  toast.success("Logout Successful!");
                  navigate("/login", { replace: true });
                }}
              >
                <button className="btn btn-danger">
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    style={{ marginRight: "10px", color: "white" }}
                  />
                  Logout
                </button>
              </li>
            </>
          ) : // Supplier - Bhanuka Dayananda
          user && user.role === "Supplier" ? (
            <>
              <li className="nav-item">
                <Link to="/allsalesreps" role="button" className="nav-link">
                  <FontAwesomeIcon
                    icon={faUserTie}
                    style={{ marginRight: "10px", color: "white" }}
                  />
                  Sales Representatives
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/myschedules" role="button" className="nav-link">
                  <FontAwesomeIcon
                    icon={faTruck}
                    style={{ marginRight: "10px", color: "white" }}
                  />
                  Delivery Schedules
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/createdeliveryreport"
                  role="button"
                  className="nav-link"
                >
                  <FontAwesomeIcon
                    icon={faFileAlt}
                    style={{ marginRight: "10px", color: "white" }}
                  />
                  Report
                </Link>
              </li>
              <li
                className="nav-item"
                onClick={() => {
                  setUser(null);
                  localStorage.clear();
                  toast.success("Logout Successful!");
                  navigate("/login", { replace: true });
                }}
              >
                <button className="btn btn-danger">
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    style={{ marginRight: "10px", color: "white" }}
                  />
                  Logout
                </button>
              </li>
            </>
          ) : // Staff - Yasitha Dewmin
          user && user.role === "Staff" ? (
            <>
              <li className="nav-item">
                <Link to="/myprofits" role="button" className="nav-link">
                  <FontAwesomeIcon
                    icon={faChartBar}
                    style={{ marginRight: "10px", color: "white" }}
                  />
                  Profits
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/mycategories" role="button" className="nav-link">
                  <FontAwesomeIcon
                    icon={faFolder}
                    style={{ marginRight: "10px", color: "white" }}
                  />
                  Categories
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/mystocks" role="button" className="nav-link">
                  <FontAwesomeIcon
                    icon={faClipboardList}
                    style={{ marginRight: "10px", color: "white" }}
                  />
                  Inventory
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/stockreport" role="button" className="nav-link">
                  <FontAwesomeIcon
                    icon={faFileAlt}
                    style={{ marginRight: "10px", color: "white" }}
                  />
                  Report
                </Link>
              </li>
              <li
                className="nav-item"
                onClick={() => {
                  setUser(null);
                  localStorage.clear();
                  toast.success("Logout Successful!");
                  navigate("/login", { replace: true });
                }}
              >
                <button className="btn btn-danger">
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    style={{ marginRight: "10px", color: "white" }}
                  />
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link
                  to="/login"
                  className="nav-link"
                  style={{ textDecoration: "none" }}
                >
                  <FontAwesomeIcon
                    icon={faSignInAlt}
                    style={{ marginRight: "10px", color: "white" }}
                  />
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
