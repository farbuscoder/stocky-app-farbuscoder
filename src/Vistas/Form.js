import react, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ProductContextState } from "../Context/Context";

const Form = ({ newProduct }) => {
  const [creandoProducto, setCreandoProducto] = useState(false);
  const { product, setProduct, moreProduct, setMoreProduct } =
    ProductContextState();

  const handleReset = () => {
    setProduct({
      ...product,
      Categoria: "",
      Marca: "",
      Modelo: "",
      Precio: "",
      Cantidad: "",
    });
  };

  const handleInputChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit(e) {
    if (creandoProducto) {
      return;
    }
    e.preventDefault();

    try {
      setCreandoProducto(true);
      await newProduct(
        product.Categoria,
        product.Marca,
        product.Modelo,
        product.Precio,
        product.Cantidad
      );
      setCreandoProducto(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "El producto ha sido añadido exitosamente",
        showConfirmButton: false,
        timer: 3000,
      });
      setMoreProduct(true);

      handleReset();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="display-form">
      <div className="form-container">
        <h2>Agregar un producto</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="pet-select">Categoria:</label>

          <select
            value={product.Categoria}
            onChange={handleInputChange}
            name="Categoria"
            id="categoria"
            required
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

          <input
            type="text"
            name="Marca"
            id="marca"
            value={product.Marca}
            onChange={handleInputChange}
            placeholder="Marca"
            pattern="[^\sa-z]{1,15}"
            title="Solo puede ingresar Mayusculas"
            required
          />

          <input
            type="text"
            name="Modelo"
            id="modelo"
            value={product.Modelo}
            onChange={handleInputChange}
            placeholder="Modelo"
            required
          />

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
          <button type="submit">Aceptar</button>
        </form>
      </div>
    </div>
  );
};

export default Form;
