import react, { useEffect, useState } from "react";
import Grid from "../Componentes/Grid";
import Loader from "../Componentes/Loader";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";
import { ProductContextState } from "../Context/Context";

const Home = () => {
  const {
    datos,
    emptyFilters,
    setEmptyFilters,
    cargandoProductos,
    setCargandoProductos,
  } = ProductContextState();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageLimit, setPageLimit] = useState(false);

  const [wordToFilter, setWordToFilter] = useState([]);

  const filtrados = datos.filter((dato) => dato.Marca === wordToFilter);

  const paginadorTwo = () => {
    return filtrados.slice(currentPage, currentPage + 10);
  };

  const paginador = () => {
    return datos.slice(currentPage, currentPage + 10);
  };

  const nextPageFiltrados = () => {
    if (currentPage + 10 >= filtrados.length) {
      setPageLimit(true);
      return;
    } else {
      setCurrentPage(currentPage + 10);
    }
  };

  const nextPage = () => {
    if (currentPage + 10 >= datos.length) {
      setPageLimit(true);
      return;
    } else {
      setCurrentPage(currentPage + 10);
    }
  };

  const backPage = () => {
    if (currentPage == 0) {
      return;
    } else {
      setCurrentPage(currentPage - 10);
      setPageLimit(false);
    }
  };

  const search = (word) => {
    try {
      setWordToFilter(word.toUpperCase());
      setEmptyFilters(false);
    } catch (error) {}
  };

  if (emptyFilters == true) {
    filtrados.length = 0;
  }

  return (
    <div className="display">
      <h1>Home</h1>
      <h2>Todos los productos</h2>
      <h2>Total: {datos.length}</h2>
      <Formik
        initialValues={{ searchWord: "" }}
        validate={(valores) => {
          let errores = {};

          if (!valores.searchWord) {
            errores.searchWord = "Ingrese un termino de busqueda";
          }
          return errores;
        }}
        onSubmit={(valores, { resetForm }) => {
          resetForm();
          const word = valores.searchWord;
          setCurrentPage(0);
          setPageLimit(false);
          search(word);
        }}
      >
        {({ errors }) => (
          <div className="search-bar">
            <Form>
              <Field
                type="text"
                id="searchWord"
                placeholder="Ingresa una marca"
                name="searchWord"
                className="input"
              />
              <ErrorMessage
                name="searchWord"
                className
                component={() => (
                  <div className="error">{errors.searchWord}</div>
                )}
              />
              <button type="submit" className="buttonContacto">
                Search
              </button>
            </Form>
          </div>
        )}
      </Formik>
      <div className="pagination-btns">
        <button onClick={backPage} disabled={currentPage == 0 ? true : false}>
          <BiLeftArrow />
        </button>
        <span style={{ color: "aliceblue" }}>
          {currentPage / 10 + 1} de{" "}
          {filtrados == ""
            ? Math.floor(datos.length / 10) + 1
            : Math.floor(filtrados.length / 10) + 1}
        </span>
        <button
          onClick={filtrados == "" ? nextPage : nextPageFiltrados}
          disabled={pageLimit ? true : false}
        >
          <BiRightArrow />
        </button>
      </div>
      <div className="content">
        {cargandoProductos ? (
          <div className="Loader-container">
            <Loader />
            <h2>Cargando...</h2>
          </div>
        ) : (
          <Grid datos={filtrados == "" ? paginador() : paginadorTwo()} />
        )}
      </div>
    </div>
  );
};

export default Home;
