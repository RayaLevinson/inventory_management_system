import React from "react";
import classNames from "classnames";
import { Container } from "react-bootstrap";
import NavBar from "./NavBar";

const Content = ({ isOpen, toggle, children }) => {
  return (
    <Container
      fluid
      className={"vh-100  " + classNames("content", { "is-open": isOpen })}
      style={{ overflowY: "auto" }}
    >
      <NavBar toggle={toggle} />
      {children}
    </Container>
  );
};

export default Content;
