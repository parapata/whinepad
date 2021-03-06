/* @flow */

import React, { Component } from "react";

type Props = {
  id?: string,
  defaultValue?: string | number,
  options: Array<string>
};

type State = {
  value: string | number;
};

class Suggest extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { value: props.defaultValue || "" };
  }

  getValue(): string | number {
    return this.state.value;
  }

  render() {
    const randomid: string = Math.random()
      .toString(16)
      .substring(2);
    return (
      <div>
        <input
          list={randomid}
          defaultValue={this.props.defaultValue}
          onChange={e => this.setState({ value: e.target.value })}
          id={this.props.id}
        />
        <datalist id={randomid}>
          {this.props.options.map((item: string, idx: number) => (
            <option value={item} key={idx} />
          ))}
        </datalist>
      </div>
    );
  }
}

export default Suggest;
