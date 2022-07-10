import { CSSTransition } from "react-transition-group";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
const ProfileEditModal = (props) => {
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
          onClick={(e) => e.stopPropagation()}
          style={{ borderRadius: "0.625rem" }}
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
          <div className="modal-body">{props.children}</div>
          <div className="modal-footer">
            <br />
            <br />
            <button
              onClick={props.HandleSubmit}
              className="button"
              style={{ cursor: "pointer" }}
            >
              <FontAwesomeIcon
                icon={faCloudArrowUp}
                style={{ fontSize: "20px" }}
              />
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default ProfileEditModal;
