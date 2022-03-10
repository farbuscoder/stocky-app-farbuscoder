import react, { useEffect, useState } from "react";
import Item from "../Componentes/Item";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ProductContextState } from "../Context/Context";

const Aerosol = () => {
  const { datos } = ProductContextState();
  const [wordToFilter, setWordToFilter] = useState([]);

  const aerosoles = datos.filter((dato) => dato.Categoria === "Aerosol");

  const filtrados = aerosoles.filter(
    (aerosol) => aerosol.Marca === wordToFilter
  );

  const search = (word) => {
    try {
      setWordToFilter(word.toUpperCase());
    } catch (error) {}
  };

  return (
    <div className="display">
      <h1>Aerosoles</h1>
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
        <div className="grid-container">
          {(filtrados.length == 0 ? aerosoles : filtrados).map((aerosol) => {
            return <Item key={aerosol._id} dato={aerosol} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Aerosol;
