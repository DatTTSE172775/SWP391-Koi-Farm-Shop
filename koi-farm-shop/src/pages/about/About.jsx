import React, { useState } from "react";
import koiBanner from "../../assets/images/KoiFishOverview.jpg";
import "./About.scss";

const SectionTitle = ({ children }) => (
  <h2 className="section-title">{children}</h2>
);

const AboutSection = ({ title, children, className }) => (
  <section className={`about-section ${className}`}>
    <SectionTitle>{title}</SectionTitle>
    {children}
  </section>
);

const ValueItem = ({ title, description }) => (
  <li>
    <strong>{title}:</strong> {description}
  </li>
);

const TeamMember = ({ name, role, imageUrl }) => (
  <div className="team-member">
    <img src={imageUrl} alt={name} className="team-image" />
    <h3>{name}</h3>
    <p>{role}</p>
  </div>
);

const About = () => {
  const [showFullTeam, setShowFullTeam] = useState(false);

  const values = [
    {
      title: "Commitment to Quality",
      description:
        "We hand-select every Koi fish to ensure our customers receive only the best.",
    },
    {
      title: "Customer Satisfaction",
      description:
        "Our team is dedicated to providing exceptional customer service and ensuring your experience is seamless.",
    },
    {
      title: "Sustainability",
      description:
        "We focus on eco-friendly and sustainable practices in breeding and pond management.",
    },
    {
      title: "Ethical Breeding Practices",
      description:
        "Our Koi fish are raised with care, ensuring ethical practices from start to finish.",
    },
  ];

  const teamMembers = [
    {
      name: "Trần Quang Thuận",
      role: "Koi Specialist",
      imageUrl: "team-member1.jpg",
    },
    {
      name: "Trần Quang Thuận",
      role: "Pond Expert",
      imageUrl: "team-member2.jpg",
    },
    {
      name: "Trần Quang Thuận",
      role: "Customer Service Manager",
      imageUrl: "team-member3.jpg",
    },
    {
      name: "Trần Quang Thuận",
      role: "Sustainability Coordinator",
      imageUrl: "team-member4.jpg",
    },
  ];

  return (
    <div className="about-container">
      <h1 className="main-title">About Koi Farm Shop</h1>

      <AboutSection title="Welcome to Koi Farm Shop" className="about-intro">
        <p>
          Welcome to Koi Farm Shop, your one-stop destination for all things
          Koi. We take pride in offering the finest selection of Koi fish, with
          a focus on quality, sustainability, and customer satisfaction. Our
          farm has been raising and caring for Koi fish for over a decade, and
          we are committed to providing our customers with the best possible
          experience.
        </p>
        <img src={koiBanner} alt="Koi Farm Overview" className="about-image" />
      </AboutSection>

      <AboutSection title="Our Mission" className="about-mission">
        <p>
          At Koi Farm Shop, our mission is to offer high-quality Koi fish while
          promoting ethical breeding practices. We strive to ensure that every
          Koi fish raised on our farm is given the best care possible, resulting
          in healthy, vibrant fish that are a joy to own.
        </p>
      </AboutSection>

      <AboutSection title="Our Values" className="about-values">
        <ul>
          {values.map((value, index) => (
            <ValueItem
              key={index}
              title={value.title}
              description={value.description}
            />
          ))}
        </ul>
      </AboutSection>

      <AboutSection title="Meet Our Team" className="about-team">
        <p>
          Our team is made up of experienced koi fish enthusiasts, pond
          specialists, and customer service professionals. We work together to
          ensure that your Koi Farm Shop experience is unmatched. From pond
          consultations to health assessments, we've got you covered!
        </p>
        <div className="team-images">
          {teamMembers
            .slice(0, showFullTeam ? teamMembers.length : 2)
            .map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
        </div>
        {!showFullTeam && (
          <button
            className="show-more-btn"
            onClick={() => setShowFullTeam(true)}
          >
            Show More Team Members
          </button>
        )}
      </AboutSection>

      <AboutSection title="Sustainability" className="about-sustainability">
        <p>
          We believe that responsible pond management is crucial to protecting
          our environment. Koi Farm Shop implements eco-friendly systems and
          sustainable practices to minimize our impact on the environment,
          ensuring that our farm and our fish can thrive for generations to
          come.
        </p>
      </AboutSection>

      <AboutSection title="Why Choose Us?" className="about-closing">
        <p>
          Koi Farm Shop isn't just a place to buy koi; it's a community. We take
          pride in being a trusted partner in helping you create and maintain a
          stunning, healthy pond. Whether you're new to koi fish or a seasoned
          expert, we're here to assist you every step of the way.
        </p>
        <p className="closing-message">We look forward to serving you!</p>
      </AboutSection>
    </div>
  );
};

export default About;
