import React, { useState } from "react";
import koiBanner from "../../assets/images/KoiFishOverview.jpg";
//import Footer from "../../components/footer/Footer";
import Navigation from "../../components/navigation/Navigation";
import "./About.scss";
import teamMember1 from "../../assets/images/team-member1.jpg";
import teamMember2 from "../../assets/images/team-member2.jpg";
import teamMember3 from "../../assets/images/team-member3.jpg";
import teamMember4 from "../../assets/images/team-member4.jpg";


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
      title: "Cam kết về chất lượng",
      description:
        "Chúng tôi lựa chọn cẩn thận từng con cá Koi để đảm bảo khách hàng nhận được những con cá tốt nhất.",
    },
    {
      title: "Sự hài lòng của khách hàng",
      description:
        "Đội ngũ của chúng tôi luôn tận tâm cung cấp dịch vụ khách hàng xuất sắc và đảm bảo trải nghiệm của bạn thật suôn sẻ.",
    },
    {
      title: "Tính bền vững",
      description:
        "Chúng tôi tập trung vào các phương pháp thân thiện với môi trường và bền vững trong việc nuôi dưỡng và quản lý ao.",
    },
    {
      title: "Thực hành nuôi dưỡng có đạo đức",
      description:
        "Cá Koi của chúng tôi được nuôi dưỡng cẩn thận, đảm bảo các phương pháp có đạo đức từ đầu đến cuối.",
    },
  ];

  const teamMembers = [
    {
        name: "Trần Quang Thuận",
        role: "Koi Specialist",
        imageUrl: teamMember1, 
    },
    {
        name: "Trần Thành Đạt",
        role: "Pond Expert",
        imageUrl: teamMember2, 
    },
    {
        name: "Hoàng Hữu Nam",
        role: "Customer Service Manager",
        imageUrl: teamMember3, 
    },
    {
        name: "Lê Nguyễn Đăng Khoa",
        role: "Sustainability Coordinator",
        imageUrl: teamMember4, 
    },
];

  return (
    <div>
      <Navigation />
      <div className="about-container">
        <h1 className="main-title">Về chúng tôi Farm Shop</h1>

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
          Tại Koi Farm Shop, sứ mệnh của chúng tôi là cung cấp những chú cá Koi chất lượng cao, đồng thời thúc đẩy các phương pháp nuôi dưỡng có đạo đức. Chúng tôi luôn nỗ lực đảm bảo rằng mỗi chú cá Koi tại trang trại đều được chăm sóc tốt nhất, mang lại những chú cá khỏe mạnh, rực rỡ và là niềm vui cho người sở hữu.
          </p>
        </AboutSection>

        <AboutSection title="Những Giá Trị Chúng Tôi Theo Đuổi" className="about-values">
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

        <AboutSection title="Đội Ngũ Chúng Tôi" className="about-team">
          <p>
          Đội ngũ của chúng tôi bao gồm những người đam mê cá Koi giàu kinh nghiệm, các chuyên gia về ao hồ và các chuyên viên chăm sóc khách hàng. Chúng tôi cùng nhau làm việc để đảm bảo rằng trải nghiệm của bạn tại Koi Farm Shop là không gì sánh bằng. Từ tư vấn thiết kế hồ đến đánh giá sức khỏe cá, chúng tôi đều sẵn sàng hỗ trợ bạn!
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
            onClick={() => setShowFullTeam(!showFullTeam)}
          >
            {showFullTeam ? "Show Less Team Members" : "Show More Team Members"}
          </button>
          )}
        </AboutSection>

        <AboutSection title="Phát Triển Bền Vững" className="about-sustainability">
          <p>
          Chúng tôi tin rằng việc quản lý ao nuôi có trách nhiệm là yếu tố then chốt trong việc bảo vệ môi trường. Koi Farm Shop áp dụng các hệ thống thân thiện với môi trường và các phương pháp bền vững để giảm thiểu tác động đến thiên nhiên, đảm bảo rằng trang trại và những chú cá của chúng tôi có thể phát triển mạnh mẽ qua nhiều thế hệ.
          </p>
        </AboutSection>

        <AboutSection title="Lý Do Nên Chọn Chúng Tôi" className="about-closing">
          <p>
          Koi Farm Shop không chỉ là nơi mua cá Koi, mà còn là một cộng đồng. Chúng tôi tự hào là đối tác đáng tin cậy, giúp bạn tạo ra và duy trì một hồ cá tuyệt đẹp, khỏe mạnh. Dù bạn là người mới bắt đầu hay là chuyên gia có kinh nghiệm về cá Koi, chúng tôi luôn sẵn sàng hỗ trợ bạn trên mọi chặng đường.
          </p>
          <p className="closing-message">Chúng tôi mong được phục vụ bạn!</p>
        </AboutSection>
      </div>
    </div>
  );
};

export default About;
