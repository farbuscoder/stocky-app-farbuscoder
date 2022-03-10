import react, { useEffect, useState } from "react";
import Grid from "../Componentes/Grid";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ProductContextState } from "../Context/Context";

const Home = () => {
  const { datos, emptyFilters, setEmptyFilters } = ProductContextState();

  const [wordToFilter, setWordToFilter] = useState([]);

  const filtrados = datos.filter((dato) => dato.Marca === wordToFilter);

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
          console.log("Enviado");
          const word = valores.searchWord;
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
      <div className="content">
        <Grid datos={filtrados == "" ? datos : filtrados} />
      </div>
    </div>
  );
};

export default Home;
