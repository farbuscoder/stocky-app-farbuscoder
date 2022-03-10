import react, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

import Axios from "axios";

const ProductContext = createContext();

const Context = ({ children }) => {
  const [datos, setDatos] = useState([]);
  const [moreProduct, setMoreProduct] = useState(false);
  const [productosMarca, setProductosMarca] = useState([]);
  const [emptyFilters, setEmptyFilters] = useState(false);
  const [product, setProduct] = useState({
    Categoria: "",
    Marca: "",
    Modelo: "",
    Precio: "",
    Cantidad: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await Axios.get("http://localhost:4500/api/products/");
        console.log(data.body);
        setDatos(data.body);
        setMoreProduct(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [moreProduct]);

  return (
    <ProductContext.Provider
      value={{
        datos,
        product,
        setProduct,
        moreProduct,
        setMoreProduct,
        productosMarca,
        setProductosMarca,
        emptyFilters,
        setEmptyFilters,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default Context;

export const ProductContextState = () => {
  return useContext(ProductContext);
};
