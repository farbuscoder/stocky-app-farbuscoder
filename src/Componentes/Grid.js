import react from "react";
import Item from "./Item";

const Grid = ({ datos }) => {
  /*{datos.map((producto) => {
        return <Item key={producto._id} producto={producto} />;
      })}*/

  //const productos = datos.filter((dato) => dato.Categoria === "Aceites");

  return (
    <div className="grid-container">
      {datos.map((dato) => {
        return <Item key={dato._id} dato={dato} />;
      })}
    </div>
  );
};

export default Grid;
