import react, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import BackToPage from "../Componentes/BackToPage";
import { BiBadgeCheck } from "react-icons/bi";
import { BiPaint, BiEdit } from "react-icons/bi";
import { MdAttachMoney, MdCategory, MdUpdate } from "react-icons/md";
import { FaStackOverflow } from "react-icons/fa";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { RiDeleteBack2Line } from "react-icons/ri";
import { FaInfoCircle } from "react-icons/fa";
import { ProductContextState } from "../Context/Context";
import Axios from "axios";
import Swal from "sweetalert2";

const Detail = () => {
  const navigate = useNavigate();
  const { type } = useParams();
  const { datos, setMoreProduct } = ProductContextState();

  const producto = datos.filter((dato) => dato._id == type);

  const deleteThis = () => {
    Swal.fire({
      title: "Desea eliminar este producto?",
      position: "center",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Si, eliminar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Axios.delete(
          `https://server-stocky-app.herokuapp.com/api/products/${producto[0]._id}`
        );

        setMoreProduct(true);
        Swal.fire("Producto eliminado correctamente!", "", "success").then(
          () => {
            navigate(-1);
          }
        );
      } else if (result.isDenied) {
        return;
      }
    });
  };

  return (
    <div className="detail-container">
      <div className="detail-frame">
        <BackToPage />
        <h1>Detalle del producto:</h1>
        <div className="detail-body">
          <ul>
            <li>
              <MdCategory />
              Categoria: {producto[0].Categoria}.
            </li>
            <li>
              <BiBadgeCheck />
              Marca: {producto[0].Marca}.
            </li>
            <li>
              <BiPaint />
              Modelo: {producto[0].Modelo}.
            </li>
            <li>
              <FaStackOverflow />
              Cantidad: {producto[0].Cantidad}.
            </li>
            <li>
              <MdAttachMoney />
              Precio: ${producto[0].Precio}.
            </li>
            <li>
              <BsFillCalendarDateFill />
              Creacion: {producto[0].Fecha}.
            </li>
            <li>
              <MdUpdate /> Actualizacion: {producto[0].FechaAct}.
            </li>
          </ul>
        </div>
        <div className="detail-btns">
          <Link to={{ pathname: `/update/${producto[0]._id}` }}>
            <button className="edit">
              <BiEdit />
            </button>
          </Link>

          <button onClick={deleteThis} className="delete">
            <RiDeleteBack2Line />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
