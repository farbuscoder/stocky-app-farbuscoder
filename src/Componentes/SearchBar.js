import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ProductContextState } from "../Context/Context";
import axios from "axios";

const SearchBar = () => {
  const { productosMarca, setProductosMarca } = ProductContextState();
  async function search(word) {
    try {
      const { data } = await axios.get(
        `http://localhost:4500/api/products/marca/${word}`
      );
      console.log(data.body);
      setProductosMarca(data.body);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
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
          <div className="search-bar-menu">
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
    </>
  );
};

export default SearchBar;
