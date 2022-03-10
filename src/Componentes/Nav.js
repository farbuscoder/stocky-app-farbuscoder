import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { GiStack } from "react-icons/gi";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <Navbar bg="light" variant="light" sticky="top">
      <Container>
        <Navbar.Brand>
          STOCKY <GiStack />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Nav;
