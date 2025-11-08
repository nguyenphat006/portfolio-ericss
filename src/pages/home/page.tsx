import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Tech,
  Works,
  StarsCanvas,
} from "../../components";

// HomePage component - Trang chủ với tất cả các sections
const HomePage = () => {
  return (
    <div className="relative z-0 bg-primary">
      {/* Hero section với background pattern */}
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Hero />
      </div>
      
      {/* Các sections chính */}
      <About />
      <Experience />
      <Tech />
      <Works />
      <Feedbacks />

      {/* Contact section với Stars background */}
      <div className="relative z-0">
        <Contact />
        <StarsCanvas />
      </div>
    </div>
  );
};

export default HomePage;
