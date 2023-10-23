import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Store } from "../Store";
import { Badge } from "react-bootstrap";

const Header = () => {
  const { user } = useContext(AuthContext);
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <header
      className="d-flex justify-content-between align-items-center py-3 px-4"
      style={{ background: "linear-gradient(to right, #00308F , #007FFF)" }}
    >
      {user && user.role === "Customer" ? (
        <Link
          to="/products"
          className="navbar-brand"
          style={{ textDecoration: "none" }}
        >
          <h1 className="m-2 text-white" style={{ paddingLeft: "25px" }}>
            Prime Construct
          </h1>
        </Link>
      ) : (
        <Link
          to="/"
          className="navbar-brand"
          style={{ textDecoration: "none" }}
        >
          <h1 className="m-2 text-white " style={{ paddingLeft: "25px" }}>
            Prime Construct
          </h1>
        </Link>
      )}

      {user &&
        (user.role === "Customer Manager" || user.role === "Customer") && (
          <Link
            to="/cart"
            className="nav-link"
            style={{ marginRight: "20px", color: "white" }}
          >
            Cart
            {cart.cartItems.length > 0 && (
              <Badge pill bg="danger">
                {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
              </Badge>
            )}
          </Link>
        )}
      {user && (
        <div className="d-flex align-items-center">
          <span className="text-white" style={{ paddingRight: "25px" }}>
            {user.name}
          </span>
          {/* BHANUKA */}
          {user.role === "Site Manager" && (
            <img
              src={
                "https://media.licdn.com/dms/image/D5603AQEERFT0Zy0nWA/profile-displayphoto-shrink_400_400/0/1687323514148?e=1703116800&v=beta&t=2AezZ4VN2YeNuvQGKvRCkWeXYlWotCzfj1CNySiSgE4"
              }
              alt={user.name}
              className="rounded-circle mr-2"
              width="40"
              height="40"
            />
          )}
          {/* YASITHA */}
          {user.role === "Supplier" && (
            <img
              src={
                "https://media.licdn.com/dms/image/D5603AQH94BhBdIKz0g/profile-displayphoto-shrink_400_400/0/1693917318725?e=1703116800&v=beta&t=J1Oldjrjy1V6qjebpjKkzKAYpowPNH0BGUwy95FqRv0"
              }
              alt={user.name}
              className="rounded-circle mr-2"
              width="40"
              height="40"
            />
          )}
          {/* YERAN | WASANA */}
          {user.role === "Staff" && (
            <img
              src={
                "https://img.freepik.com/premium-vector/staff-minimal-vector-line-icon-3d-button-isolated-black-background-premium-vector_570929-2706.jpg"
              }
              alt={user.name}
              className="rounded-circle mr-2"
              width="40"
              height="40"
            />
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
