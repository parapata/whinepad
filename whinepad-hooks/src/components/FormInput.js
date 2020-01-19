/* @flow */

import Rating from "./Rating";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import Suggest from "./Suggest";

type FormInputFieldType = "year" | "suggest" | "rating" | "text" | "input";

export type FormInputFieldValue = string | number;

export type FormInputField = {
  type: FormInputFieldType,
  defaultValue?: FormInputFieldValue,
  id?: string,
  options?: Array<string>,
  label?: string
};

const FormInput = forwardRef((props: FormInputField, ref: any) => {
  const childRef = useRef();

  const common: Object = {
    id: props.id,
    ref: childRef,
    defaultValue: props.defaultValue
  };

  useImperativeHandle((ref: any), () => ({
    getValue() {
      return "value" in childRef.current
        ? childRef.current.value
        : childRef.current.getValue();
    }
  }));

  switch (props.type) {
    case "year":
      return (
        <input
          {...common}
          type="number"
          defaultValue={props.defaultValue || new Date().getFullYear()}
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

FormInput.defaultProps = {
  type: "input"
};

export default FormInput;
