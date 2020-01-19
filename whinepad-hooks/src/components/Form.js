/* @flow */

import CRUDStore from "../flux-imm/CRUDStore";
import FormInput from "./FormInput";
import Rating from "./Rating";
import React, {
  createRef,
  forwardRef,
  useImperativeHandle,
  useState
} from "react";

import type { FormInputField, FormInputFieldValue } from "./FormInput";

type Props = {
  readonly?: boolean,
  recordId?: number
};

const Form = forwardRef((props: Props, ref: any) => {
  const [itemRefs] = useState(() => {
    let items = {};
    CRUDStore.getSchema().forEach(field => (items[field.id] = createRef()));
    return items;
  });

  const [fields]: Array<Object> = useState(CRUDStore.getSchema());
  const [initialData]: ?Object = useState(() => {
    if ("recordId" in props) {
      return CRUDStore.getRecord(props.recordId);
    }
  });

  useImperativeHandle((ref: any), () => ({
    getData() {
      let data = {};
      fields.forEach(field => {
        data[field.id] = itemRefs[field.id].current.getValue();
      });
      return data;
    }
  }));

  return (
    <form className="Form">
      {fields.map((field: FormInputField) => {
        const prefilled: FormInputFieldValue =
          (initialData && initialData[field.id]) || "";
        if (!props.readonly) {
          return (
            <div className="FormRow" key={field.id}>
              <label className="FormLabel" htmlFor={field.id}>
                {field.label}:
              </label>
              <FormInput
                {...field}
                ref={itemRefs[field.id]}
                defaultValue={prefilled}
              />
            </div>
          );
        }
        if (!prefilled) {
          return null;
        }
        return (
          <div className="FormRow" key={field.id}>
            <span className="FormLabel">{field.label}:</span>
            {field.type === "rating" ? (
              <Rating
                readonly={true}
                ref={itemRefs[field.id]}
                defaultValue={parseInt(prefilled, 10)}
              />
            ) : (
              <div>{prefilled}</div>
            )}
          </div>
        );
      }, this)}
    </form>
  );
});

export default Form;
