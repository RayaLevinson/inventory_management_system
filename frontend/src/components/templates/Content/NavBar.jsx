import React from "react";
import { Navbar, Button, Nav } from "react-bootstrap";
import { FaAlignLeft } from "react-icons/fa";
// import UserIcon from "assets/user.png";

class NavBar extends React.Component {
  render() {
    return (
      <Navbar
        bg="light"
        className="navbar shadow-sm p-3 mb-1 bg-white rounded"
        expand
      >
        <Button
          variant="toggle-btn "
          style={{ color: "#663399", borderColor: "#663399" }}
          onClick={this.props.toggle}
        >
          <FaAlignLeft />
        </Button>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* <Nav className="ml-auto" navbar>
            <Nav.Link href="#">page</Nav.Link>
            <Nav.Link href="#">page</Nav.Link>
            <Nav.Link href="#">page</Nav.Link>
            <Nav.Link href="#">page</Nav.Link>
          </Nav> */}
        </Navbar.Collapse>

        {/* <img src={UserIcon} alt="UserIcon" width={40} /> */}
      </Navbar>
    );
  }
}

export default NavBar;
