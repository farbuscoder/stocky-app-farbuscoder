import react, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";
import { ProductContextState } from "../Context/Context";

const Delete = () => {
  const { setMoreProduct } = ProductContextState();
  const navigate = useNavigate();
  const { type } = useParams();

  useEffect(() => {
    Swal.fire({
      title: "Desea eliminar este producto?",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Si, eliminar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Axios.delete(
          `https://server-stocky-app.herokuapp.com/api/products/${type}`
        );
        setMoreProduct(true);
        Swal.fire("Producto eliminado correctamente!", "", "success").then(
          () => {
            navigate(-1);
          }
        );
      } else if (result.isDenied) {
        navigate(-1);
      }
    });
  }, []);

  return (
    <div className="display-delete">
      <h1>Delete</h1>
      <Link to="/">
        <button>Volver al home</button>
      </Link>
    </div>
  );
};

export default Delete;
