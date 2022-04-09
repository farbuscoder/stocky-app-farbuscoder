import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { GiStack } from "react-icons/gi";

const Nav = () => {
  return (
    <Navbar bg="light" variant="light" sticky="top" className="navbar">
      <Container>
        <Navbar.Brand>
          STOCKY <GiStack />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Nav;
