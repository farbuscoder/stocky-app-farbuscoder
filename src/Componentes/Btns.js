import React from "react";
import axios from "axios";
import Toastify from "toastify-js";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { BiAddToQueue } from "react-icons/bi";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { ProductContextState } from "../Context/Context";

const Btns = () => {
  const { setMoreProduct, emptyFilters, setEmptyFilters } =
    ProductContextState();

  const downloadTable = () => {
    let enlace = `https://server-stocky-app.herokuapp.com/products/report`;
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
          duration: 4500,
          close: true,
          gravity: "bottom", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
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
      <Link to="/">
        <button
          onClick={() => {
            setEmptyFilters(true);
          }}
        >
          <AiOutlineHome />
        </button>
      </Link>
      <Link to="/nuevoproducto">
        <button>
          <BiAddToQueue />
        </button>
      </Link>
      <button onClick={downloadTable}>
        <AiOutlineCloudDownload />
      </button>
    </div>
  );
};

export default Btns;
