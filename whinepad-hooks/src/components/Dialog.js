import Button from "./Button";
import React, { useEffect } from "react";
import PropTypes from "prop-types";

const Dialog = props => {
  useEffect(() => {
    if (props.modal) {
      document.body.classList.add("DialogModalOpen");
    } else {
      document.body.classList.remove("DialogModalOpen");
    }
  }, [props.modal]);

  return (
    <div className={props.modal ? "Dialog DialogModal" : "Dialog"}>
      <div className={props.modal ? "DialogModalWrap" : null}>
        <div className="DialogHeader">{props.header}</div>
        <div className="DialogBody">{props.children}</div>
        <div className="DialogFooter">
          {props.hasCancel ? (
            <span
              className="DialogDismiss"
              onClick={props.onAction.bind(this, "dismiss")}
            >
              Cancel
            </span>
          ) : null}
          <Button
            onClick={props.onAction.bind(
              this,
              props.hasCancel ? "confirm" : "dismiss"
            )}
          >
            {props.confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

Dialog.propTypes = {
  header: PropTypes.string.isRequired,
  confirmLabel: PropTypes.string,
  modal: PropTypes.bool,
  onAction: PropTypes.func,
  hasCancel: PropTypes.bool
};

Dialog.defaultProps = {
  confirmLabel: "Ok",
  modal: false,
  onAction: () => {},
  hasCancel: true
};

export default Dialog;
