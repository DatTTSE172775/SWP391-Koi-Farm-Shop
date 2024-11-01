// import React, { useState } from "react";
import koiBanner from "../../assets/images/KoiFishOverview.jpg";
import Navigation from "../../components/navigation/Navigation";
import "./About.scss";
import teamMember1 from "../../assets/images/team-member2.jpg";
import teamMember2 from "../../assets/images/team-member2.jpg";
import teamMember3 from "../../assets/images/team-member3.jpg";
import teamMember4 from "../../assets/images/team-member4.jpg";
import avatar1 from "../../assets/images/feedback1.jpg";
import avatar2 from "../../assets/images/feedback2.jpg";
import qualityIcon from "../../assets/icons/quality.jpg";
import customerSatisfactionIcon from "../../assets/icons/customer-satisfaction.png";
import sustainabilityIcon from "../../assets/icons/sustainability.png";
import ethicsIcon from "../../assets/icons/ethics.png";

const SectionTitle = ({ children }) => (
  <h2 className="section-title">{children}</h2>
);

const AboutSection = ({ title, children, className }) => (
  <section className={`about-section ${className}`}>
    <SectionTitle>{title}</SectionTitle>
    {children}
  </section>
);

const ValueItem = ({ title, description, icon }) => (
  <div className="value-item">
    <img src={icon} alt={`${title} icon`} className="value-icon" />
    <div className="value-text">
      <strong>{title}:</strong> {description}
    </div>
  </div>
);

const TeamMember = ({ name, role, imageUrl }) => (
  <div className="team-member">
    <img src={imageUrl} alt={name} className="team-image" />
    <h3>{name}</h3>
    <p>{role}</p>
  </div>
);

const Testimonial = ({ quote, author, avatar }) => (
  <div className="testimonial-item">
    <img src={avatar} alt={`${author}'s avatar`} className="testimonial-avatar" />
    <div className="testimonial-content">
      <h3>{author}</h3>
      <p className="testimonial-quote">"{quote}"</p>
      <h4 className="testimonial-author">- {author}</h4>
    </div>
  </div>
);

const About = () => {
  const values = [
    {
      title: "Cam kết về chất lượng",
      description:
        "Chúng tôi lựa chọn cẩn thận từng con cá Koi để đảm bảo khách hàng nhận được những con cá tốt nhất.",
      icon: qualityIcon,
    },
    {
      title: "Sự hài lòng của khách hàng",
      description:
        "Đội ngũ của chúng tôi luôn tận tâm cung cấp dịch vụ khách hàng xuất sắc và đảm bảo trải nghiệm của bạn thật suôn sẻ.",
      icon: customerSatisfactionIcon,
    },
    {
      title: "Tính bền vững",
      description:
        "Chúng tôi tập trung vào các phương pháp thân thiện với môi trường và bền vững trong việc nuôi dưỡng và quản lý ao.",
      icon: sustainabilityIcon,
    },
    {
      title: "Thực hành nuôi dưỡng có đạo đức",
      description:
        "Cá Koi của chúng tôi được nuôi dưỡng cẩn thận, đảm bảo các phương pháp có đạo đức từ đầu đến cuối.",
      icon: ethicsIcon,
    },
  ];
  
  const testimonials = [
    {
      quote: "Koi Farm Shop cung cấp cá Koi và phụ kiện tốt nhất trên thị trường. Ao của tôi chưa bao giờ trông đẹp hơn thế!",
      author: "Khách hàng 1",
      avatar: avatar1,
    },
    {
      quote: "Dịch vụ chăm sóc khách hàng của họ thật tuyệt vời! Họ đã giúp tôi thiết lập hồ cá và đưa ra những lời khuyên vô cùng hữu ích.",
      author: "Khách hàng 2",
      avatar: avatar2,
    },
  ];
  
  return (
    <div>
      <Navigation />

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay">
          <h1 className="hero-title">Welcome to Koi Farm Shop</h1>
          <p className="hero-subtitle">Your trusted partner in quality Koi fish and pond solutions.</p>
        </div>
      </div>

      <div className="about-container">
        <h1 className="main-title">Về chúng tôi</h1>

        <AboutSection title="Welcome to Koi Farm Shop" className="about-intro">
          <p>
            Chào mừng đến với Koi Farm Shop, điểm đến lý tưởng cho những ai yêu thích cá Koi. 
            Chúng tôi tự hào mang đến cho bạn những dòng cá Koi chất lượng nhất, với trọng tâm là chất lượng,
            bền vững và sự hài lòng của khách hàng. Trang trại của chúng tôi đã nuôi dưỡng và chăm sóc cá Koi hơn một thập kỷ,
            cam kết mang lại cho khách hàng trải nghiệm tốt nhất.
          </p>
          <img
            src={koiBanner}
            alt="Koi Farm Overview"
            className="about-image"
          />
        </AboutSection>

        <AboutSection title="Sứ Mệnh Của Chúng Tôi" className="about-mission">
          <p>
            Tại Koi Farm Shop, chúng tôi cam kết cung cấp những chú cá Koi chất lượng cao nhất và các giải pháp chăm sóc toàn diện. 
            Với hơn một thập kỷ kinh nghiệm, chúng tôi đảm bảo mỗi chú cá Koi được nuôi dưỡng theo các phương pháp có đạo đức, giúp chúng phát triển khỏe mạnh và rực rỡ.
            Sứ mệnh của chúng tôi không chỉ là mang đến cho khách hàng những chú cá đẹp, mà còn là tạo nên một cộng đồng yêu thích cá Koi, 
            nơi bạn có thể nhận được sự hỗ trợ toàn diện từ đội ngũ chuyên gia. Chúng tôi luôn sẵn sàng đồng hành cùng bạn trong hành trình tạo dựng và duy trì hồ cá hoàn hảo, 
            không chỉ đẹp mà còn bền vững.
          </p>
        </AboutSection>

        <AboutSection title="Những Giá Trị Chúng Tôi Theo Đuổi" className="about-values">
          <ul>
            {values.map((value, index) => (
              <ValueItem
                key={index}
                title={value.title}
                description={value.description}
                icon={value.icon}
              />
            ))}
          </ul>
        </AboutSection>

        <AboutSection title="Đội Ngũ Chúng Tôi" className="about-team">
  <p>
    Đội ngũ của chúng tôi bao gồm những người đam mê cá Koi giàu kinh nghiệm, các chuyên gia về ao hồ và các chuyên viên chăm sóc khách hàng. 
    Chúng tôi cùng nhau làm việc để đảm bảo rằng trải nghiệm của bạn tại Koi Farm Shop là không gì sánh bằng. 
    Từ tư vấn thiết kế hồ đến đánh giá sức khỏe cá, chúng tôi đều sẵn sàng hỗ trợ bạn!
  </p>
  <div className="team-images">
    <TeamMember name="Trần Quang Thuận" role="Koi Specialist" imageUrl={teamMember1} />
    <TeamMember name="Trần Thành Đạt" role="Pond Expert" imageUrl={teamMember2} />
    <TeamMember name="Hoàng Hữu Nam" role="CS Manager" imageUrl={teamMember3} />
  </div>
  <div className="team-row">
    <TeamMember name="Lê Nguyễn Đăng Khoa" role="Sustainability Mgr" imageUrl={teamMember4} />
    <TeamMember name="Tằng Ngọc Trang Anh" role="Aquatic Specialist" imageUrl={teamMember2} />
  </div>
</AboutSection>


        {/* Testimonials Section */}
        <AboutSection title="Lời Chứng Thực Từ Khách Hàng" className="about-testimonials">
          
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} />
          ))}
        </AboutSection>

        <AboutSection title="Phát Triển Bền Vững" className="about-sustainability">
          <p>
            Chúng tôi tin rằng việc quản lý ao nuôi có trách nhiệm là yếu tố then chốt trong việc bảo vệ môi trường. 
            Koi Farm Shop áp dụng các hệ thống thân thiện với môi trường và các phương pháp bền vững để giảm thiểu tác động đến thiên nhiên, 
            đảm bảo rằng trang trại và những chú cá của chúng tôi có thể phát triển mạnh mẽ qua nhiều thế hệ.
          </p>
        </AboutSection>

        <AboutSection title="Lý Do Nên Chọn Chúng Tôi" className="about-closing">
          <p>
            Koi Farm Shop không chỉ là nơi mua cá Koi, mà còn là một cộng đồng. 
            Chúng tôi tự hào là đối tác đáng tin cậy, giúp bạn tạo ra và duy trì một hồ cá tuyệt đẹp, khỏe mạnh. 
            Dù bạn là người mới bắt đầu hay là chuyên gia có kinh nghiệm về cá Koi, chúng tôi luôn sẵn sàng hỗ trợ bạn trên mọi chặng đường.
          </p>
          <p className="closing-message">Chúng tôi mong được phục vụ bạn!</p>
        </AboutSection>

        {/* Call to Action */}
        <section className="call-to-action">
          <h2>Bạn đã sẵn sàng khám phá bộ sưu tập cá Koi của chúng tôi chưa?</h2>
          <button className="cta-button">Khám phá ngay</button>
        </section>
      </div>
    </div>
  );
};

export default About;
