import React from "react";
import axios from "axios";
import Toastify from "toastify-js";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { BiAddToQueue, BiMessage } from "react-icons/bi";
import { AiOutlineCloudDownload, AiOutlineBarChart } from "react-icons/ai";
import { BsChatRightText } from "react-icons/bs";
import { ProductContextState } from "../Context/Context";

const Btns = () => {
  const { setMoreProduct, emptyFilters, setEmptyFilters } =
    ProductContextState();

  const downloadTable = () => {
    let enlace = `https://stocky-app-vercel-farbuscoder.vercel.app/api/products/report`;
    axios
      .get(enlace, {
        responseType: "blob",
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Tabla de productos.xlsx");
        document.body.appendChild(link);
        link.click();
        Toastify({
          text: "La descarga ha comenzado...",
          duration: 3500,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "center", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "#bee6c4",
            border: "1px solid rgb(51, 155, 109)",
            color: "rgb(22,22,22)",
          },
        }).showToast();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container-btns">
      <div className="container-btns-one">
        <Link to="/">
          <button
            onClick={() => {
              setEmptyFilters(true);
            }}
          >
            <AiOutlineHome />
          </button>
        </Link>
        <div className="tooltip-container-one">Home</div>
      </div>
      <div className="container-btns-two">
        <Link to="/nuevoproducto">
          <button>
            <BiAddToQueue />
          </button>
        </Link>
        <div className="tooltip-container-two">Agregar producto</div>
      </div>
      <div className="container-btns-three">
        <button onClick={downloadTable}>
          <AiOutlineCloudDownload />
        </button>
        <div className="tooltip-container-three">Descargar Tabla</div>
      </div>
      <div className="container-btns-four">
        <Link to="chart">
          <button>
            <AiOutlineBarChart />
          </button>
        </Link>
        <div className="tooltip-container-four">Ver graficos</div>
      </div>
      <div className="container-btns-five">
        <Link to="chat">
          <button>
            <BsChatRightText />
          </button>
        </Link>
        <div className="tooltip-container-five">Anuncios</div>
      </div>
    </div>
  );
};

export default Btns;
