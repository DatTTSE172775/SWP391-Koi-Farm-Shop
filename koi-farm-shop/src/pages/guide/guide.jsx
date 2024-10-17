import React from "react";
import "./guide.scss";

import checkout from "../../assets/userGuide/cart.png";
import items from "../../assets/userGuide/koiList.png";
import register1 from "../../assets/userGuide/login.png";
import others from "../../assets/userGuide/others.png";
import register2 from "../../assets/userGuide/register.png";

const Guide = () => {
  return (
    <div className="guide-container">
      <h1 className="guide-title">-----------------------</h1>
      <div className="guide-intro">
        <h1 className="guide-title">Instructions for New Users</h1>
        <p>
          If you're new to our website, you've come to the right place! Our
          comprehensive guide is designed to help you navigate the exciting
          journey of building, maintaining, and enjoying a beautiful kois.
        </p>
      </div>

      <div className="guide-step">
        <h2>Step 1: Create a New Account</h2>
        <p>
          To get started, you'll need to create an account on our website. This
          allows you to access all the features and services we offer. Click on
          the "Sign Up" button, fill in the required information, and create
          your account.
        </p>
        <div className="guide-images">
          <img src={register1} alt="Login page" />
          <img src={register2} alt="Registration page" />
        </div>
      </div>

      <div className="guide-step">
        <h2>Step 2: Explore our products</h2>
        <p>
          Once you're logged in, you can explore our wide range of koi fish
          products. From koi food to pond accessories, we have everything you
          need to create a thriving koi pond. Browse our selection and find the
          products that best suit your needs.
        </p>
        <img src={items} alt="guide2" />
      </div>

      <div className="guide-step">
        <h2>Step 3: View detail</h2>
        <p>
          When you find a product you're interested in, click on the product to
          view its details. You can then add the product to your cart and
          proceed to checkout.
        </p>
        <img src={checkout} alt="guide3" />
      </div>

      <div className="guide-step">
        <h2>Step 4: Payment</h2>
        <p>
          After adding the products to your cart, you can proceed to checkout.
          Our secure checkout process ensures a smooth transaction. You can
          choose to pay by cash or bank transfer.
        </p>
        <img src={"https://via.placeholder.com/150"} alt="guide4" />
      </div>

      <div className="guide-features">
        <h2>Explore Our Other Features!</h2>
        <p>Our shop has many more features that you can explore, such as:</p>
        <ul>
          <li>Koi foods</li>
          <li>Koi pond accessories</li>
          <li>Pond filters</li>
          <li>Consignment</li>
          <li>...And many more!</li>
        </ul>
        <img src={others} alt="Other features" />
      </div>

      <div className="guide-contact">
        <h3>
          If you have any questions, please{" "}
          <a href="/contact">contact us here</a>
        </h3>
      </div>
    </div>
  );
};

export default Guide;
