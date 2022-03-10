import react, { useEffect, useState } from "react";
import Item from "../Componentes/Item";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ProductContextState } from "../Context/Context";

const Aceites = () => {
  const { datos, emptyFilters, setEmptyFilters } = ProductContextState();
  const [wordToFilter, setWordToFilter] = useState([]);

  const aceites = datos.filter((dato) => dato.Categoria === "Aceites");

  const filtrados = aceites.filter((aceite) => aceite.Marca === wordToFilter);

  if (emptyFilters == true) {
    filtrados.length = 0;
  }

  const search = (word) => {
    try {
      setWordToFilter(word.toUpperCase());
      setEmptyFilters(false);
    } catch (error) {}
  };

  return (
    <div className="display">
      <h1>Aceites</h1>
      <Formik
        initialValues={{ searchWord: "" }}
        validate={(valores) => {
          let errores = {};

          if (!valores.searchWord) {
            errores.searchWord = "Ingrese un termino de busqueda";
          } else if (!/([A-z]{3,})/.test(valores.searchWord)) {
            errores.searchWord = "Ingrese un termino de mas de dos letras";
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
        <div className="grid-container">
          {(filtrados.length == 0 ? aceites : filtrados).map((aceite) => {
            return <Item key={aceite._id} dato={aceite} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Aceites;
