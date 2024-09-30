import React from "react";
import Footer from "../../components/footer/Footer";
import Navigation from "../../components/navigation/Navigation";
import "./AboutPage.scss";

const About = () => {
  return (
    <div>
      <Navigation />
      <div className="about-container">
        <section className="about-intro">
          <h1>About Koi Farm Shop</h1>
          <p>
            Welcome to Koi Farm Shop, your one-stop destination for all things
            Koi. We take pride in offering the finest selection of Koi fish,
            with a focus on quality, sustainability, and customer satisfaction.
            Our farm has been raising and caring for Koi fish for over a decade,
            and we are committed to providing our customers with the best
            possible experience.
          </p>
          <img
            src="farm-overview.jpg"
            alt="Koi Farm Overview"
            className="about-image"
          />
        </section>

        <section className="about-mission">
          <h2>Our Mission</h2>
          <p>
            At Koi Farm Shop, our mission is to offer high-quality Koi fish
            while promoting ethical breeding practices. We strive to ensure that
            every Koi fish raised on our farm is given the best care possible,
            resulting in healthy, vibrant fish that are a joy to own.
          </p>
        </section>

        <section className="about-values">
          <h2>Our Values</h2>
          <ul>
            <li>Commitment to Quality</li>
            <li>Customer Satisfaction</li>
            <li>Sustainability</li>
            <li>Ethical Breeding Practices</li>
          </ul>
        </section>

        <section className="about-team">
          <h2>Meet Our Team</h2>
          {/* Optional TeamSection component to highlight key members */}
          {/* <TeamSection /> */}
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default About;
