import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components";
import Banner from "./components/layout/banner";
import Footer from "./components/layout/footer";
import { HomePage } from "./pages";

// App component với routing
const App = () => {
  const [hide, setHide] = useState(true);

  return (
    <BrowserRouter>
      <Banner hide={hide} setHide={setHide} />
      <div className="relative z-0 bg-primary">
        {/* Navbar hiển thị trên tất cả các trang */}
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar hide={hide} />
        </div>

        {/* Routes cho các trang */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* TODO: Thêm các routes khác khi cần
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          */}
        </Routes>

        {/* Footer hiển thị trên tất cả các trang */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
