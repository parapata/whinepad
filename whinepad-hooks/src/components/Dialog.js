/* @flow */

import Button from "./Button";
import React, { useEffect } from "react";

type Props = {
  header: string,
  confirmLabel: string,
  modal: boolean,
  onAction: Function,
  hasCancel: ?boolean,
  children?: any
};

const Dialog = (props: Props) => {
  useEffect(() => {
    if (props.modal) {
      if (document.body) {
        document.body.classList.add("DialogModalOpen");
      }
    } else {
      if (document.body) {
        document.body.classList.remove("DialogModalOpen");
      }
    }
  });

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

Dialog.defaultProps = {
  confirmLabel: "Ok",
  modal: false,
  onAction: (_: any) => {},
  hasCancel: true
};

export default Dialog;
