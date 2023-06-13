import React, { useState, useRef, useEffect } from "react";
import ThemeChanger from "../themeChanger/ThemeChanger";
import LanguageSelector from "../languageSelector/LanguageSelector";
import Link from "next/link";
import { useTranslation } from "@/useTranslation";
import useGetLinks from "@/hooks/mapObject";
import { useRouter } from "next/router";
import UserInfo from "../userInfo/UserInfo";
import { useSession } from "next-auth/react";

export let navHeight = 0;

const Navbar = () => {
  const { data: session } = useSession();
  const { t, i18n } = useTranslation();

  // Router
  const { pathname } = useRouter();

  // NavHeight
  const navRef = useRef();
  useEffect(() => {
    navHeight = navRef.current.offsetHeight;
  }, [navRef]);

  // Sidebar & Sidebar width
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef();
  const [sidebarWidth, setSidebarWidth] = useState(0);
  useEffect(() => {
    setSidebarWidth(sidebarRef.current.offsetWidth);
  }, [sidebarRef]);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
  }, [sidebarOpen]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const closeSidebar = () => {
    window.history.back();
    if (sidebarOpen) {
      setSidebarOpen(false);
    }
  };

  const openSidebar = () => {
    window.history.pushState({}, "");
    setSidebarOpen(true);
  };

  
  // NavLinks
  const navLinks = useGetLinks("components.navbar.navLinks");
  
  // Toggle
  const toggleRef = useRef(null);
  
  // User Info
  const [userInfoOpen, setUserInfoOpen] = useState(false);
  const userInfoOpenerRef = useRef(null);
  
  const openUserInfo = () => {
    window.history.pushState({}, "");
    setUserInfoOpen(true);
  };
  
  const closeUserInfo = () => {
    window.history.back();
    if (userInfoOpen) {
      setUserInfoOpen(false);
    }
  };
  useEffect(() => {
    let sidebarHandler = (e) => {
      if (
        typeof window !== "undefined" &&
        !sidebarRef.current.contains(e.target) &&
        sidebarOpen &&
        !toggleRef.current.contains(e.target) && !userInfoOpen
      ) {
        closeSidebar();
      }
    };

    let sidebarPopState = () => {
      if (sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    if (typeof window !== "undefined") {
      document.addEventListener("click", sidebarHandler);
      window.addEventListener("popstate", sidebarPopState);
      return () => {
        document.removeEventListener("click", sidebarHandler);
        window.removeEventListener("popstate", sidebarPopState);
      };
    }
  }, [sidebarOpen, closeSidebar, userInfoOpen]);
  return (
    <>
      <header className="navbar" ref={navRef}>
        <div className="container">
          <Link
            href={t("components.navbar.logo.link")}
            locale={i18n.language}
            className="nav_logo"
          >
            {t("components.navbar.logo.text")}
          </Link>

          <div
            className="nav_toggle"
            onClick={sidebarOpen ? closeSidebar : openSidebar}
            ref={toggleRef}
          >
            <label className={sidebarOpen ? "active" : ""}>
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path className="line__1" d="M0 40h62c13 0 6 28-4 18L35 35" />
                <path className="line__2" d="M0 50h70" />
                <path className="line__3" d="M0 60h62c13 0 6-28-4-18L35 65" />
              </svg>
            </label>
          </div>
        </div>

        <div
          className={`sidebar${sidebarOpen ? " active" : ""}`}
          style={{ "--navHeight": navHeight + "px" }}
          onClose={closeSidebar}
        >
          <div
            className="sidebar_bg"
            style={{ "--sidebarWidth": "-" + sidebarWidth + "px" }}
          ></div>
          <div className="sidebar_wrapper" ref={sidebarRef}>
            <div className="w-full flex flex-col">
              <div className="userInfo">
                <div className="userImg" onClick={openUserInfo} ref={userInfoOpenerRef}>
                  {session && session.user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={session.user.image}
                      alt="user image"
                      className="user_img"
                    />
                  ) : (
                    <div className="user_icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <p className="user_name">
                  {session && session.user.name && session.user.name}
                </p>
              </div>
              <ul className="nav_list">
                {navLinks &&
                  navLinks.map((item, index) => (
                    <li className="nav_item" key={index}>
                      <Link
                        href={item.link}
                        className={`nav_link ${
                          new RegExp(`^${item.link}(\/|$)`).test(pathname)
                            ? "active"
                            : ""
                        }`}
                        locale={i18n.language}
                      >
                        {item.text}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
            <div>
              <ThemeChanger />
              <LanguageSelector />
            </div>
          </div>
        </div>
      </header>
      <UserInfo userInfoOpen={userInfoOpen} setUserInfoOpen={setUserInfoOpen} openUserInfo={openUserInfo} closeUserInfo={closeUserInfo} userInfoOpenerRef={userInfoOpenerRef} />
    </>
  );
};

export default Navbar;
