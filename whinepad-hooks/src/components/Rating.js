/* @flow */

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState
} from "react";
import classNames from "classnames";

type Props = {
  id?: string,
  defaultValue: number,
  readonly: boolean,
  max: number
};

const Rating = forwardRef((props: Props, ref: any) => {
  const [rating, setRating]: number = useState(props.defaultValue);
  const [tmpRating, setTmpRating]: number = useState(props.defaultValue);

  const onClickHandler = useCallback(
    value => {
      if (!props.readonly) {
        setRating(value);
        setTmpRating(value);
      }
    },
    [props.readonly]
  );

  const onMouseOverHandler = useCallback(
    value => {
      if (!props.readonly) {
        setTmpRating(value);
      }
    },
    [props.readonly]
  );

  useEffect(() => {
    setRating(props.defaultValue);
    setTmpRating(props.defaultValue);
  }, [props.defaultValue]);

  useImperativeHandle((ref: any), () => ({
    getValue(): number {
      return rating;
    }
  }));

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= props.max; i++) {
      stars.push(
        <span
          className={i <= tmpRating ? "RatingOn" : null}
          key={i}
          onClick={() => onClickHandler(i)}
          onMouseOver={() => onMouseOverHandler(i)}
        >
          &#9734;
        </span>
      );
    }
    return stars;
  };

  return (
    <div
      className={classNames({
        Rating: true,
        RatingReadonly: props.readonly
      })}
      onMouseOut={() => setTmpRating(rating)}
    >
      {renderStars()}
      {props.readonly || !props.id ? null : (
        <input type="hidden" id={props.id} value={rating} />
      )}
    </div>
  );
});

Rating.defaultProps = {
  defaultValue: 0,
  max: 5,
  readonly: false
};

export default Rating;
