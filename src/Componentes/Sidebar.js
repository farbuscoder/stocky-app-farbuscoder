import React from "react";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";

const Sidebar = (props) => {
  const { show, setShow, handleLogout } = props;

  const handleHide = () => {
    setShow(!show);
  };

  return (
    <>
      <div className={show ? "side-bar show" : "side-bar "} id="side-bar">
        <div
          style={{ cursor: "pointer" }}
          className="side-bar-btn2"
          onClick={handleHide}
        >
          <i className="fas fa-ellipsis-v"></i>
        </div>
        <ul>
          <li>
            <Link onClick={handleHide} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link onClick={handleHide} to="/rodamientos">
              Rodamientos
            </Link>
          </li>
          <li>
            <Link onClick={handleHide} to="/aceites">
              Aceites
            </Link>
          </li>
          <li>
            <Link onClick={handleHide} to="/aerosol">
              Aerosoles
            </Link>
          </li>
          <li>
            <Link onClick={handleHide} to="/interruptores">
              Interruptores
            </Link>
          </li>
          <li>
            <Link onClick={handleHide} to="/carbones">
              Carbones
            </Link>
          </li>
          <li>
            <Link onClick={handleHide} to="/esteticaautomotor">
              Estetica-Automotor
            </Link>
          </li>
          <li>
            <Link onClick={handleHide} to="/pegamentos">
              Pegamentos
            </Link>
          </li>
          <li>
            <Link onClick={handleHide} to="/plumita">
              Plumita
            </Link>
          </li>
          <li>
            <Link onClick={handleHide} to="/capacitores">
              Capacitores
            </Link>
          </li>
          <li>
            <Link to="/">
              <button
                className="logout-btn"
                onClick={() => {
                  handleHide();
                  handleLogout();
                }}
              >
                <BiLogOut /> Logout
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
