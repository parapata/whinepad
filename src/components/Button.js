/* @flow */

import React from "react";
import classNames from "classnames";

type Props = {
  href?: ?string,
  className?: ?string
};

const Button = (props: Props) =>
  props.href ? (
    <a {...props} className={classNames("Button", props.className)}>
      {props.children}
    </a>
  ) : (
    <button {...props} className={classNames("Button", props.className)} />
  );

export default Button;
