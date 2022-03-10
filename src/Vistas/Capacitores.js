import react, { useState } from "react";
import Item from "../Componentes/Item";
import { ProductContextState } from "../Context/Context";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Capacitores = () => {
  const { datos, emptyFilters, setEmptyFilters } = ProductContextState();

  const [wordToFilter, setWordToFilter] = useState([]);

  const capacitores = datos.filter((dato) => dato.Categoria === "Capacitores");

  const filtrados = capacitores.filter(
    (element) => element.Marca === wordToFilter
  );

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
      <div className="display-home">
        <h1>Capacitores</h1>
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
            {(filtrados.length == 0 ? capacitores : filtrados).map(
              (capacitor) => {
                return <Item key={capacitor._id} dato={capacitor} />;
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Capacitores;
