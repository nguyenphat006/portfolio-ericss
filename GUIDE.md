# Hướng Dẫn Portfolio React 3D - Cấu Trúc và Thêm Routes

## 1. Phân Tích Cấu Trúc Dự Án

### Công Nghệ Sử Dụng
Dự án này sử dụng các công nghệ hiện đại:

**Frontend Framework:**
- **React 19.2.0** - Thư viện JavaScript để xây dựng giao diện người dùng
- **TypeScript** - Ngôn ngữ lập trình mở rộng từ JavaScript với kiểu dữ liệu tĩnh
- **Vite** - Build tool nhanh cho development và production

**Styling:**
- **TailwindCSS** - Framework CSS utility-first
- **PostCSS** - Tool xử lý CSS
- **Framer Motion** - Thư viện animation cho React

**3D Graphics:**
- **Three.js** - Thư viện 3D JavaScript
- **@react-three/fiber** - React renderer cho Three.js
- **@react-three/drei** - Các helper components cho React Three Fiber

**Routing:**
- **React Router DOM** - Thư viện routing cho React

**Other Libraries:**
- **EmailJS** - Gửi email từ frontend
- **Sonner** - Thư viện toast notifications
- **React Tilt** - Hiệu ứng tilt 3D

### Cấu Trúc Thư Mục Chi Tiết

```
src/
├── app.tsx                 # Component chính của ứng dụng
├── main.tsx               # Entry point, render React app
├── index.css              # CSS global
├── styles.ts              # Styled-components/CSS-in-JS
├── env.d.ts               # Type definitions cho environment
│
├── assets/                # Tài nguyên tĩnh
│   ├── index.ts          # Export tất cả assets
│   ├── company/          # Logo công ty
│   ├── logo/             # Logo của trang
│   ├── projects/         # Hình ảnh projects
│   ├── socials/          # Icon mạng xã hội
│   ├── tech/             # Icon công nghệ
│   └── testimonials/     # Ảnh testimonials
│
├── components/            # Các React components
│   ├── index.ts          # Export tất cả components
│   ├── about.tsx         # Section About
│   ├── banner.tsx        # Banner thông báo
│   ├── contact.tsx       # Section Contact
│   ├── experience.tsx    # Section Experience
│   ├── feedbacks.tsx     # Section Testimonials/Feedbacks
│   ├── footer.tsx        # Footer
│   ├── hero.tsx          # Section Hero (trang chủ)
│   ├── loader.tsx        # Loading component
│   ├── navbar.tsx        # Navigation bar
│   ├── tech.tsx          # Section Technology
│   ├── works.tsx         # Section Projects/Works
│   └── canvas/           # 3D Canvas components
│       ├── index.ts      # Export canvas components
│       ├── ball.tsx      # 3D Ball animation
│       ├── computers.tsx # 3D Computer model
│       ├── earth.tsx     # 3D Earth model
│       └── stars.tsx     # 3D Stars background
│
├── constants/             # Dữ liệu tĩnh
│   └── index.ts          # Chứa tất cả data (nav links, projects, etc.)
│
├── hoc/                   # Higher Order Components
│   ├── index.ts          # Export HOCs
│   └── section-wrapper.tsx # Wrapper cho sections
│
├── pages/                 # Các trang (hiện tại trống)
│
├── types/                 # TypeScript type definitions
│
└── utils/                 # Utility functions
    ├── lib.ts            # Helper functions
    └── motion.ts         # Animation configurations
```

## 2. Hiện Trạng Ứng Dụng

### Trang Landing Page Hiện Tại
Ứng dụng hiện tại là một **Single Page Application (SPA)** với cấu trúc:

```tsx
// app.tsx - Cấu trúc hiện tại
<BrowserRouter>
  <Banner />
  <Navbar />
  <Hero />          // Section đầu tiên
  <About />         // Section About
  <Experience />    // Section kinh nghiệm
  <Tech />          // Section công nghệ
  <Works />         // Section dự án
  <Feedbacks />     // Section testimonials
  <Contact />       // Section liên hệ
  <Footer />
</BrowserRouter>
```

**Đặc điểm:**
- Tất cả nội dung hiển thị trên một trang duy nhất
- Cuộn dọc để xem các section khác nhau
- Navigation sử dụng scroll đến section tương ứng
- Chưa có routing riêng biệt cho từng trang

## 3. Hướng Dẫn Thêm Routes Riêng

### Bước 1: Tạo Cấu Trúc Pages

Tạo các file page trong thư mục `src/pages/`:

```typescript
// src/pages/HomePage.tsx
import React from 'react';
import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Tech,
  Works,
  StarsCanvas,
} from '../components';

const HomePage = () => {
  return (
    <div className="relative z-0 bg-primary">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Hero />
      </div>
      <About />
      <Experience />
      <Tech />
      <Works />
      <Feedbacks />
      
      <div className="relative z-0">
        <Contact />
        <StarsCanvas />
      </div>
    </div>
  );
};

export default HomePage;
```

```typescript
// src/pages/AboutPage.tsx
import React from 'react';
import { About } from '../components';
import { SectionWrapper } from '../hoc';

const AboutPage = () => {
  return (
    <div className="relative z-0 bg-primary min-h-screen pt-20">
      <About />
    </div>
  );
};

export default SectionWrapper(AboutPage, "about-page");
```

```typescript
// src/pages/ProjectsPage.tsx
import React from 'react';
import { Works } from '../components';

const ProjectsPage = () => {
  return (
    <div className="relative z-0 bg-primary min-h-screen pt-20">
      <Works />
    </div>
  );
};

export default ProjectsPage;
```

```typescript
// src/pages/ContactPage.tsx
import React from 'react';
import { Contact, StarsCanvas } from '../components';

const ContactPage = () => {
  return (
    <div className="relative z-0 bg-primary min-h-screen pt-20">
      <Contact />
      <StarsCanvas />
    </div>
  );
};

export default ContactPage;
```

```typescript
// src/pages/index.ts - Export tất cả pages
export { default as HomePage } from './HomePage';
export { default as AboutPage } from './AboutPage';
export { default as ProjectsPage } from './ProjectsPage';
export { default as ContactPage } from './ContactPage';
```

### Bước 2: Cập Nhật App.tsx với Routes

```tsx
// src/app.tsx - Phiên bản có routing
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components";
import Banner from "./components/banner";
import Footer from "./components/footer";
import { HomePage, AboutPage, ProjectsPage, ContactPage } from "./pages";

const App = () => {
  const [hide, setHide] = useState(true);

  return (
    <BrowserRouter>
      <Banner hide={hide} setHide={setHide} />
      <div className="relative z-0 bg-primary">
        <Navbar hide={hide} />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
```

### Bước 3: Cập Nhật Navigation Links

Cập nhật file constants để support routing:

```typescript
// src/constants/index.ts - Cập nhật NAV_LINKS
export const NAV_LINKS = [
  {
    id: "about",
    title: "About",
    link: "/about",  // Thêm link routing
  },
  {
    id: "work", 
    title: "Work",
    link: "/projects",  // Thêm link routing
  },
  {
    id: "contact",
    title: "Contact", 
    link: "/contact",  // Thêm link routing
  },
];
```

### Bước 4: Cập Nhật Navbar Component

```tsx
// src/components/navbar.tsx - Cập nhật để support routing
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { logo, menu, close, avatar_ericss, logo_ericss } from "../assets";
import { NAV_LINKS } from "../constants";
import { styles } from "../styles";
import { cn } from "../utils/lib";

type NavbarProps = {
  hide: boolean;
};

export const Navbar = ({ hide }: NavbarProps) => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const location = useLocation();

  // Cập nhật active dựa trên current route
  useEffect(() => {
    const currentPath = location.pathname;
    const activeNav = NAV_LINKS.find(nav => nav.link === currentPath);
    if (activeNav) {
      setActive(activeNav.title);
    } else if (currentPath === '/') {
      setActive('');
    }
  }, [location]);

  return (
    <nav className={cn(
      styles.paddingX,
      "w-full flex items-center py-5 fixed top-0 z-20 bg-primary transition-all duration-300",
      hide ? "translate-y-0" : "-translate-y-full"
    )}>
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img 
            src={logo_ericss} 
            alt="logo" 
            className="w-9 h-9 object-contain" 
          />
          <p className="text-white text-[18px] font-bold cursor-pointer flex">
            ERICSS &nbsp;
            <span className="sm:block hidden">| Portfolio</span>
          </p>
        </Link>

        {/* Desktop Navigation */}
        <ul className="list-none hidden sm:flex flex-row gap-10">
          {NAV_LINKS.map((nav) => (
            <li
              key={nav.id}
              className={cn(
                "text-secondary hover:text-white text-[18px] font-medium cursor-pointer transition-colors duration-200",
                active === nav.title ? "text-white" : "text-secondary"
              )}
            >
              {nav.link ? (
                <Link to={nav.link} onClick={() => setActive(nav.title)}>
                  {nav.title}
                </Link>
              ) : (
                <a href={`#${nav.id}`} onClick={() => setActive(nav.title)}>
                  {nav.title}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={() => setToggle(!toggle)}
          />

          <div className={cn(
            "p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl transition-all duration-300",
            toggle ? "opacity-100 visible" : "opacity-0 invisible"
          )}>
            <ul className="list-none flex justify-end items-start flex-1 flex-col gap-4">
              {NAV_LINKS.map((nav) => (
                <li
                  key={nav.id}
                  className={cn(
                    "font-poppins font-medium cursor-pointer text-[16px] transition-colors duration-200",
                    active === nav.title ? "text-white" : "text-secondary"
                  )}
                  onClick={() => {
                    setToggle(false);
                    setActive(nav.title);
                  }}
                >
                  {nav.link ? (
                    <Link to={nav.link}>
                      {nav.title}
                    </Link>
                  ) : (
                    <a href={`#${nav.id}`}>
                      {nav.title}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
```

## 4. Các Lựa Chọn Routing Khác

### Option 1: Hash Routing (Đơn giản nhất)
Nếu bạn muốn giữ nguyên cấu trúc single page nhưng có URL riêng:

```tsx
import { HashRouter } from "react-router-dom";

// Thay BrowserRouter bằng HashRouter
<HashRouter>
  {/* Các components */}
</HashRouter>
```

URL sẽ có dạng: `/#/about`, `/#/projects`

### Option 2: Nested Routes
Tạo layout chung cho tất cả pages:

```tsx
// src/layouts/MainLayout.tsx
import { Outlet } from 'react-router-dom';
import { Navbar, Footer, Banner } from '../components';

const MainLayout = () => {
  const [hide, setHide] = useState(true);
  
  return (
    <>
      <Banner hide={hide} setHide={setHide} />
      <Navbar hide={hide} />
      <main>
        <Outlet /> {/* Render child routes here */}
      </main>
      <Footer />
    </>
  );
};

// Cập nhật App.tsx
<Routes>
  <Route path="/" element={<MainLayout />}>
    <Route index element={<HomePage />} />
    <Route path="about" element={<AboutPage />} />
    <Route path="projects" element={<ProjectsPage />} />
    <Route path="contact" element={<ContactPage />} />
  </Route>
</Routes>
```

## 5. Lưu Ý Quan Trọng

### Performance
- **Code Splitting**: Sử dụng `React.lazy()` để load components khi cần:
```tsx
const AboutPage = lazy(() => import('./pages/AboutPage'));

// Wrap với Suspense
<Suspense fallback={<div>Loading...</div>}>
  <Routes>
    {/* routes */}
  </Routes>
</Suspense>
```

### SEO
- Cân nhắc sử dụng **Next.js** thay vì Vite nếu cần SEO tốt
- Thêm meta tags cho mỗi page

### State Management
- Nếu cần chia sẻ state giữa các pages, cân nhắc sử dụng Context API hoặc Redux

### Animation
- Thêm page transitions với Framer Motion:
```tsx
import { AnimatePresence, motion } from 'framer-motion';

<AnimatePresence mode="wait">
  <motion.div
    key={location.pathname}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    <Routes location={location}>
      {/* routes */}
    </Routes>
  </motion.div>
</AnimatePresence>
```

## 6. Các Bước Triển Khai

1. **Tạo các file pages** như hướng dẫn ở Bước 1
2. **Cập nhật App.tsx** để sử dụng Routes 
3. **Cập nhật constants** để thêm routing links
4. **Cập nhật Navbar** để support navigation
5. **Test các routes** bằng cách chạy `npm run dev`
6. **Thêm error boundary** cho production
7. **Optimzie performance** với code splitting

Với hướng dẫn này, bạn có thể chuyển từ single page thành multi-page application với routing riêng biệt cho từng section!