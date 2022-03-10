import React from "react";

const SideBarBtn = (props) => {
  const { show, setShow } = props;

  const showClass = () => {
    setShow(!show);
  };
  return (
    <div
      style={{ cursor: "pointer" }}
      className="side-bar-btn"
      onClick={showClass}
    >
      <i className="fas fa-ellipsis-v"></i>
    </div>
  );
};

export default SideBarBtn;
