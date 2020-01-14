import Rating from "./Rating";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import PropTypes from "prop-types";
import Suggest from "./Suggest";

const FormInput = forwardRef((props, ref) => {
  const childRef = useRef();

  useImperativeHandle(ref, () => ({
    getValue() {
      return "value" in childRef.current
        ? childRef.current.value
        : childRef.current.getValue();
    }
  }));

  const common = {
    id: props.id,
    ref: childRef,
    defaultValue: props.defaultValue
  };

  switch (props.type) {
    case "year":
      return (
        <input
          {...common}
          type="number"
          defaultValue={props.defaultValue || new Date().getFullYear()}
          ref={childRef}
        />
      );
    case "suggest":
      return <Suggest {...common} options={props.options} />;
    case "rating":
      return (
        <Rating {...common} defaultValue={parseInt(props.defaultValue, 10)} />
      );
    case "text":
      return <textarea {...common} />;
    default:
      return <input {...common} type="text" />;
  }
});

FormInput.propTypes = {
  type: PropTypes.oneOf(["year", "suggest", "rating", "text", "input"]),
  id: PropTypes.string,
  options: PropTypes.array,
  defaultValue: PropTypes.any
};

export default FormInput;
