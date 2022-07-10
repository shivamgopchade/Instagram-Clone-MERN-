import { CSSTransition } from "react-transition-group";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
const PostCreateModal = (props) => {
  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  return (
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div className="modal" onClick={props.onClose}>
        <div
          className="modal-content"
          style={{
            width: "700px",
            height: "650px",
            marginTop: "30px",
            borderRadius: "0.625rem",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="modal-header"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <h4 className="modal-title">{props.title}</h4>
            <button
              onClick={props.onClose}
              className="button"
              style={{ cursor: "pointer" }}
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
          </div>
          <div
            className="modal-body"
            style={{ backgroundColor: "rgb(51, 51, 51)" }}
          >
            {props.children}
          </div>
          <div className="modal-footer"></div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default PostCreateModal;
