import React, { useEffect, useState } from "react";
import Axios from "axios";
import GoogleLogin from "react-google-login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Vistas/Home";
import Nav from "./Componentes/Nav";
import Rodamientos from "./Vistas/Rodamientos";
import Aceites from "./Vistas/Aceites";
import Aerosol from "./Vistas/Aerosol";
import Capacitores from "./Vistas/Capacitores";
import Interruptores from "./Vistas/Interruptores";
import Pegamentos from "./Vistas/Pegamentos";
import PlumitaCatalogo from "./Vistas/PlumitaCatalogo";
import Carbones from "./Vistas/Carbones";
import EstAutomotor from "./Vistas/EstAutomotor";
import Sidebar from "./Componentes/Sidebar";
import SideBarBtn from "./Componentes/SideBarBtn";
import Btns from "./Componentes/Btns";
import Delete from "./Vistas/Delete";
import Update from "./Vistas/Update";
import Footer from "./Componentes/Footer";
import { GiStack } from "react-icons/gi";
import Form from "./Vistas/Form";

function App() {
  const [show, setShow] = useState(false);
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );

  const handleFailure = (result) => {
    alert(result);
  };

  const newProduct = async (Categoria, Marca, Modelo, Precio, Cantidad) => {
    const { data } = await Axios.post("http://localhost:4500/api/products", {
      Categoria,
      Marca,
      Modelo,
      Precio,
      Cantidad,
    });
  };

  const updateProduct = async (productId, Modelo, Precio, Cantidad) => {
    const { data } = await Axios.put(
      `http://localhost:4500/api/products/${productId}`,
      {
        Modelo,
        Precio,
        Cantidad,
      }
    );
  };

  const handleLogin = async (googleData) => {
    const res = await fetch("/api/google-login", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    setLoginData(data);
    localStorage.setItem("loginData", JSON.stringify(data));
  };

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
  };

  return (
    <BrowserRouter>
      <Nav />

      {loginData ? (
        <Sidebar show={show} setShow={setShow} handleLogout={handleLogout} />
      ) : null}
      {loginData ? <Btns /> : null}
      {loginData ? <SideBarBtn show={show} setShow={setShow} /> : null}
      {loginData ? (
        <LoginRoutes
          loginDataEmail={loginData.email}
          handleLogout={handleLogout}
          newProduct={newProduct}
          updateProduct={updateProduct}
        />
      ) : (
        <div className="app-home">
          <GiStack style={{ fontSize: "70px" }} />
          <h1>Bienvenido a Stocky</h1>
          <p>Inicia sesion para continuar</p>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Inicio de sesion con Google"
            onSuccess={handleLogin}
            onFailure={handleFailure}
            cookiePolicy={"single_host_origin"}
          ></GoogleLogin>
        </div>
      )}
    </BrowserRouter>
  );
}

const LoginRoutes = ({
  handleLogout,
  loginDataEmail,
  newProduct,
  updateProduct,
}) => {
  return (
    <Routes>
      <Route
        default
        path="/"
        element={
          <Home handleLogout={handleLogout} loginDataEmail={loginDataEmail} />
        }
      />
      <Route path="/rodamientos" element={<Rodamientos />} />
      <Route path="/aceites" element={<Aceites />} />
      <Route path="/aerosol" element={<Aerosol />} />
      <Route path="/carbones" element={<Carbones />} />
      <Route path="/esteticaautomotor" element={<EstAutomotor />} />
      <Route path="/interruptores" element={<Interruptores />} />
      <Route path="/pegamentos" element={<Pegamentos />} />
      <Route path="/plumita" element={<PlumitaCatalogo />} />
      <Route path="/capacitores" element={<Capacitores />} />
      <Route path="/nuevoproducto" element={<Form newProduct={newProduct} />} />
      <Route path="/delete/:type" element={<Delete />} />
      <Route
        path="/update/:type"
        element={<Update updateProduct={updateProduct} />}
      />
    </Routes>
  );
};

export default App;
