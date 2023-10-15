import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import { Store } from "../Store";
import { Badge } from "react-bootstrap";

const Header = () => {
  const { user } = useContext(AuthContext);
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    <header
      className="d-flex justify-content-between align-items-center py-3 px-4"
      style={{ background: "linear-gradient(to right, #214956 , #498459)" }}
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
          <SearchBox />
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
                "https://media.licdn.com/dms/image/D5603AQEERFT0Zy0nWA/profile-displayphoto-shrink_400_400/0/1687323514148?e=1702512000&v=beta&t=U0C30TuHRNWO3ghlN1Wu1BRa4eIOW7scANjqyd0gYqM"
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
                "https://media.licdn.com/dms/image/D5603AQEERFT0Zy0nWA/profile-displayphoto-shrink_400_400/0/1687323514148?e=1702512000&v=beta&t=U0C30TuHRNWO3ghlN1Wu1BRa4eIOW7scANjqyd0gYqM"
              }
              alt={user.name}
              className="rounded-circle mr-2"
              width="40"
              height="40"
            />
          )}
          {/* YERAN */}
          {user.role === "Staff" && (
            <img
              src={
                "https://media.licdn.com/dms/image/D5603AQFJFaRLL56Jbg/profile-displayphoto-shrink_400_400/0/1697162247953?e=1703116800&v=beta&t=Pty5sXjC7U6wHcQR1MUYBsnvxW3ZSbAyEBigfli3Wr4"
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
