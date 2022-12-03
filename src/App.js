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
import Insumos from "./Vistas/Insumos";
import Herramientas from "./Vistas/Herramientas";
import Motores from "./Vistas/Motores";
import Repuestos from "./Vistas/Repuestos";
import Sidebar from "./Componentes/Sidebar";
import SideBarBtn from "./Componentes/SideBarBtn";
import Btns from "./Componentes/Btns";
import Delete from "./Vistas/Delete";
import Update from "./Vistas/Update";
import Detail from "./Vistas/Detail";
import Chart from "./Vistas/Chart";
import ChatRoom from "./Vistas/ChatRoom";
import Footer from "./Componentes/Footer";
import Swal from "sweetalert2";
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
    Swal.fire({
      title: "Hubo un problema para iniciar sesion",
      icon: "error",
      showDenyButton: false,
      confirmButtonText: "Ok",
      timer: 4000,
    });
    console.log(result);
  };

  const url = "https://stocky-backend-v1-0-farbuscoder.vercel.app";

  const newMensaje = async (Mensaje, Fecha, User) => {
    const { data } = await Axios.post(`${url}/api/users`, {
      Mensaje,
      Fecha,
      User,
    });
  };

  const newProduct = async (
    Categoria,
    Marca,
    Modelo,
    Precio,
    Cantidad,
    Fecha,
    FechaAct
  ) => {
    const { data } = await Axios.post(`${url}/api/products`, {
      Categoria,
      Marca,
      Modelo,
      Precio,
      Cantidad,
      Fecha,
      FechaAct,
    });
  };

  const updateProduct = async (
    productId,
    Modelo,
    Precio,
    Cantidad,
    FechaAct
  ) => {
    const { data } = await Axios.put(`${url}/api/products/${productId}`, {
      Modelo,
      Precio,
      Cantidad,
      FechaAct,
    });
  };

  const handleLogin = async (googleData) => {
    const res = await fetch(
      `https://stocky-backend-v1-0.vercel.app/api/google-login`,
      {
        method: "POST",
        body: JSON.stringify({
          token: googleData.tokenId,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const data = await res.json();
    console.log(data);

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
          newMensaje={newMensaje}
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
  newMensaje,
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
      <Route path="/insumos" element={<Insumos />} />
      <Route path="/herramientas" element={<Herramientas />} />
      <Route path="/repuestos" element={<Repuestos />} />
      <Route path="/motores" element={<Motores />} />
      <Route path="/nuevoproducto" element={<Form newProduct={newProduct} />} />
      <Route path="/delete/:type" element={<Delete />} />
      <Route
        path="/update/:type"
        element={<Update updateProduct={updateProduct} />}
      />
      <Route path="/detail/:type" element={<Detail />} />
      <Route path="/chart" element={<Chart />} />
      <Route path="/chat" element={<ChatRoom newMensaje={newMensaje} />} />
    </Routes>
  );
};

export default App;
