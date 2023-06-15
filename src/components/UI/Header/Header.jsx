import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from "react-router-dom";
import SearchBar from "../../SearchBar.jsx";
import { useSelector } from "react-redux";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Header = () => {
  const favorites = useSelector(store => store.favorites);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef();

  const closeNavMenu = () => setIsOpen(false);

  useEffect(() => {
    setIsOpen(false);

    window.addEventListener('click', closeNavMenu)

    return () => {
      window.removeEventListener('click', closeNavMenu);
    }
  }, [location])

  return (
    <header
      onClick={e => e.stopPropagation()}
      className="w-full flex items-center py-4 sticky top-0 bg-mainBlue shadow-header z-50"
    >
      <div className="container flex justify-between">
        <Link to="/" className="font-bold mr-4 text-4xl">
          MOVI<span className="text-[#93C5FD]">ZZ</span>
        </Link>

        <nav
          ref={navRef}
          className={isOpen ? 'nav-responsive active' : 'nav-responsive'}
        >
          <div className="link-box flex items-end gap-2">
            <NavLink
              to="movie"
              className={({ isActive }) =>
                isActive
                  ? "underline scale-[1.05]"
                  : "transition hover:scale-[1.05] hover:underline"
              }
            >
              Movies
            </NavLink>
            <NavLink
              to="tv"
              className={({ isActive }) =>
                isActive
                  ? "underline scale-[1.05]"
                  : "transition hover:scale-[1.05] hover:underline"
              }
            >
              Tv
            </NavLink>
          </div>

          <div className="link-box flex items-end gap-6">
            <NavLink
              to="favorites"
              className={({ isActive }) =>
                isActive
                  ? "underline scale-[1.05]"
                  : "transition hover:scale-[1.05] hover:underline"
              }
            >
              Favorites({favorites.length})
            </NavLink>
            <SearchBar />
          </div>
        </nav>
        <button onClick={() => setIsOpen(prev => !prev)} className="navbar-btn">
          {isOpen
            ? <CloseIcon classname="close-icon" sx={{ fontSize: 40 }} />
            : <MenuIcon sx={{ fontSize: 40 }} />
          }
        </button>
      </div>
    </header>
  );
};

export default Header;