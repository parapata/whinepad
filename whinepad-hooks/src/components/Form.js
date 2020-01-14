import FormInput from "./FormInput";
import Rating from "./Rating";
import React, {
  createRef,
  forwardRef,
  useImperativeHandle,
  useState
} from "react";
import PropTypes from "prop-types";

const Form = forwardRef((props, ref) => {
  const [itemRefs] = useState(() => {
    let items = {};
    props.fields.forEach(field => (items[field.id] = createRef()));
    return items;
  });

  useImperativeHandle(ref, () => ({
    getData() {
      let data = {};
      props.fields.forEach(field => {
        data[field.id] = itemRefs[field.id].current.getValue();
      });
      return data;
    }
  }));

  return (
    <form className="Form">
      {props.fields.map(field => {
        const prefilled = props.initialData && props.initialData[field.id];
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

Form.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired,
  initialData: PropTypes.object,
  readonly: PropTypes.bool
};

export default Form;
