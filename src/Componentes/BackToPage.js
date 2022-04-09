import react from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const BackToPage = () => {
  const navigate = useNavigate();

  const back = () => {
    navigate(-1);
  };

  return (
    <div className="back-btn">
      <FaArrowLeft onClick={back} />
    </div>
  );
};

export default BackToPage;
