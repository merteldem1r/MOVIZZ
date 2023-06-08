import React, { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";
import Footer from "./UI/Footer/Footer.jsx";
import Header from "./UI/Header/Header.jsx";
import KeyboardDoubleArrowUpOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowUpOutlined';

const Layout = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) setShowButton(true)
      else setShowButton(false);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      <Header />
      <Outlet />
      <button
        onClick={scrollToTop}
        className={showButton ? "toTopBtn active" : "toTopBtn"}>
        <KeyboardDoubleArrowUpOutlinedIcon sx={{ fontSize: '30px' }} />
      </button>
      <Footer />
    </>
  );
};

export default Layout;