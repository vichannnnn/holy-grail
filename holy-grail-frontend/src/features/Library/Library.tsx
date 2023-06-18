import MaterialsGrid from "./MaterialsGrid";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../providers/AuthProvider";

const Library = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleUploadButtonClick = () => {
    if (user) {
      navigate("/upload");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="library section container" id="library">
      <div>
        <div className="sub-section__title">Library</div>
        <div className="section__subtitle">
          View materials or contribute{" "}
          <a onClick={handleUploadButtonClick} className="text__link">
            here
          </a>{" "}
          after you have logged in (subjected to approval of administrators).
        </div>
      </div>
      <MaterialsGrid />
    </section>
  );
};

export default Library;
