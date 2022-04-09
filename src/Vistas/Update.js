import react, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ProductContextState } from "../Context/Context";

const Update = ({ updateProduct }) => {
  const [creandoProducto, setCreandoProducto] = useState(false);
  const navigate = useNavigate();
  const { type } = useParams();
  const { datos, product, setProduct, moreProduct, setMoreProduct } =
    ProductContextState();

  const producto = datos.filter((dato) => dato._id === type);
  const productoCategoria = producto[0].Categoria;

  let fecha = new Date();

  let date = fecha.toDateString();

  function handleInputChange(e) {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
      FechaAct: date,
    });
  }

  const handleReset = () => {
    setProduct({
      ...product,
      Categoria: "",
      Marca: "",
      Modelo: "",
      Precio: "",
      Cantidad: "",
      Fecha: "",
      FechaAct: "",
    });
  };

  async function handleUpdate(e) {
    e.preventDefault();

    try {
      setCreandoProducto(true);
      await updateProduct(
        type,
        product.Modelo,
        product.Precio,
        product.Cantidad,
        product.FechaAct
      );
      setCreandoProducto(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "El producto ha sido modificado exitosamente",
        showConfirmButton: false,
        timer: 3000,
      });
      setMoreProduct(true);
      handleReset();
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="display-form">
      <div className="form-container">
        <h2>Editar producto</h2>
        <form onSubmit={handleUpdate}>
          <label htmlFor="pet-select">Categoria:</label>

          <select
            value={productoCategoria}
            onChange={handleInputChange}
            name="Categoria"
            id="categoria"
            disabled
          >
            <option value="">Elige una categoria</option>
            <option value="Rodamientos">Rodamientos</option>
            <option value="Aceites">Aceites</option>
            <option value="Aerosol">Aerosol</option>
            <option value="Carbones">Carbones</option>
            <option value="Interruptores">Interruptores</option>
            <option value="Capacitores">Capacitores</option>
            <option value="EsteticaAutomotor">EsteticaAutomotor</option>
            <option value="Pegamentos">Pegamentos</option>
            <option value="Plumita">Plumita</option>
          </select>
          <label htmlFor="marca">Actual: {producto[0].Marca}</label>
          <input
            type="text"
            name="Marca"
            id="marca"
            value={producto[0].Marca}
            onChange={handleInputChange}
            placeholder="Marca"
            disabled
          />
          <label htmlFor="modelo">Actual: {producto[0].Modelo}</label>
          <input
            type="text"
            name="Modelo"
            id="modelo"
            value={product.Modelo}
            onChange={handleInputChange}
            placeholder="Modelo"
            required
          />
          <label htmlFor="modelo">Actual: {producto[0].Precio}</label>
          <input
            type="number"
            name="Precio"
            id="precio"
            placeholder="Precio"
            min="0"
            value={product.Precio}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="modelo">Actual: {producto[0].Cantidad}</label>
          <input
            type="number"
            name="Cantidad"
            id="cantidad"
            placeholder="Cantidad"
            min="0"
            step="1"
            value={product.Cantidad}
            onChange={handleInputChange}
            required
          />
          <input
            type="hidden"
            name="Fecha"
            id="fecha"
            placeholder="Fecha"
            value={product.FechaAct}
            onChange={handleInputChange}
          />
          <button type="submit">Aceptar</button>
        </form>
      </div>
    </div>
  );
};

export default Update;
