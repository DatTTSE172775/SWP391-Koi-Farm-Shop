import React from "react";
import { Link } from "react-router-dom";
import "./CustomerAccount.scss";

const CustomerAccount = () => {
  return (
    <div className="customer-account">
      <h2>My Account</h2>
      <ul className="account-options">
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
        <li>
          <Link to="/order-history">Check Order History</Link>
        </li>
        <li>
          <Link to="/consignment-requests">Check Consignment Request</Link>
        </li>
      </ul>
    </div>
  );
};

export default CustomerAccount;
