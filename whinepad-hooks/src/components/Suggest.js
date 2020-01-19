/* @flow */

import React, { forwardRef, useImperativeHandle, useState } from "react";

type Props = {
  id?: string,
  defaultValue?: string | number,
  options: Array<string>
};

const Suggest = forwardRef((props: Props, ref: any) => {
  const [value, setValue]: string | number = useState(props.defaultValue);

  useImperativeHandle(ref, () => ({
    getValue(): string | number {
      return value;
    }
  }));

  const randomid: string = Math.random()
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

export default Suggest;
