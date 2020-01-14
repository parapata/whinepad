import React, { forwardRef, useImperativeHandle, useState } from "react";
import PropTypes from "prop-types";

const Suggest = forwardRef((props, ref) => {
  const [value, setValue] = useState(props.defaultValue);

  useImperativeHandle(ref, () => ({
    getValue() {
      return value;
    }
  }));

  const randomid = Math.random()
    .toString(16)
    .substring(2);

  return (
    <div>
      <input
        list={randomid}
        defaultValue={props.defaultValue}
        onChange={e => setValue(e.target.value)}
        id={props.id}
      />
      <datalist id={randomid}>
        {props.options.map((item, idx) => (
          <option value={item} key={idx} />
        ))}
      </datalist>
    </div>
  );
});

Suggest.propTypes = {
  id: PropTypes.string,
  defaultValue: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string)
};

export default Suggest;
