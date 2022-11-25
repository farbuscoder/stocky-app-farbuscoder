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
  const [moreMensaje, setMoreMensaje] = useState(false);
  const [cargandoProductos, setCargandoProductos] = useState(true);
  const [emptyFilters, setEmptyFilters] = useState(false);
  const [chats, setChats] = useState([]);
  const [mensaje, setMensaje] = useState({
    User: "",
    Mensaje: "",
    Fecha: "",
  });
  const [product, setProduct] = useState({
    Categoria: "",
    Marca: "",
    Modelo: "",
    Precio: "",
    Cantidad: "",
    Fecha: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await Axios.get(
          "https://stocky-backend-v1-0-farbuscoder.vercel.app/api/users"
        );
        setChats(data.body);

        setMoreMensaje(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [moreMensaje]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await Axios.get(
          "https://stocky-backend-v1-0-farbuscoder.vercel.app/api/products"
        );
        setCargandoProductos(false);
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
        cargandoProductos,
        setCargandoProductos,
        chats,
        setChats,
        setMoreMensaje,
        mensaje,
        setMensaje,
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
