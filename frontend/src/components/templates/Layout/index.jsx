import React, { useState, useEffect, useCallback } from "react";
import Content from "../Content";
import SideBar from "../Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "@redux/hooks";

const Layout = ({ children, author }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = useAppSelector((state) => state.auth.user);
  const auth = useAppSelector((state) => state.auth.auth);

  const updateWidth = useCallback(() => {
    const width = window.innerWidth;
    const widthLimit = 576;
    const isCurrentlyMobile = width <= widthLimit;

    if (isCurrentlyMobile !== isMobile) {
      setIsOpen(!isCurrentlyMobile);
      setIsMobile(isCurrentlyMobile);
    }
  }, [isMobile]);

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, [updateWidth]);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  if (!author && (!user || pathname === "/")) return <>{children}</>;

  return (
    <div className="">
      <div className="App">
        <SideBar toggle={toggle} isOpen={isOpen} />
        <Content toggle={toggle} isOpen={isOpen}>
          {children}
        </Content>
      </div>
    </div>
  );
};

export default Layout;
