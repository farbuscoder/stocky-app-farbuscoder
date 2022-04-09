import React from "react";
import { BiBadgeCheck } from "react-icons/bi";
import { BiPaint, BiEdit } from "react-icons/bi";
import { MdAttachMoney } from "react-icons/md";
import { FaStackOverflow } from "react-icons/fa";
import { RiDeleteBack2Line } from "react-icons/ri";
import { FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Item = ({ dato }) => {
  return (
    <div className="item">
      <h3>{dato.Categoria}</h3>
      <div className="item-features">
        <div className="item-body">
          <span>
            <BiBadgeCheck /> {dato.Marca}
          </span>
          <span>
            <BiPaint /> {dato.Modelo}{" "}
          </span>
          <span>
            <MdAttachMoney /> {dato.Precio}
          </span>
          <span>
            <FaStackOverflow /> {dato.Cantidad}
          </span>
        </div>
        <div className="item-btns">
          <Link to={{ pathname: `/update/${dato._id}` }}>
            <button className="edit">
              <BiEdit />
            </button>
          </Link>

          <Link
            to={{
              pathname: `/delete/${dato._id}`,
            }}
          >
            <button className="delete">
              <RiDeleteBack2Line />
            </button>
          </Link>
        </div>
      </div>
      <Link to={{ pathname: `/detail/${dato._id}` }}>
        <button className="detail-btn">
          <FaInfoCircle />
        </button>
      </Link>
    </div>
  );
};

export default Item;
