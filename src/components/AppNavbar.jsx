import React from "react";
import { Navbar, Container } from "react-bootstrap";

export default function AppNavbar() {
  return (
    <Navbar variant="dark" bg="dark">
      <Container>
        <Navbar.Brand href="#home">
          <img
            src="https://epicode.com/wp-content/uploads/2022/06/EPICODE-2.0-LOGO-15.png"
            width="130"
            height="30"
            className="d-inline-block align-top"
            alt="Epicode Logo"
          />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
