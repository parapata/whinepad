import React from "react";
import TestUtils from "react-dom/test-utils";

jest.dontMock("../components/Actions");

const Actions = require("../components/Actions").default;

class Wrap extends React.Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}

describe("Click some actions", () => {
  it("calls you back", () => {
    const callback = jest.fn();
    const actions = TestUtils.renderIntoDocument(
      <Wrap>
        <Actions onAction={callback} />
      </Wrap>
    );

    /*
         let spans = TestUtils
         .scryRenderedDOMComponentsWithTag(actions, 'span');
         console.log(spans[0].outerHTML);
         */

    TestUtils.scryRenderedDOMComponentsWithTag(actions, "span").forEach(span =>
      TestUtils.Simulate.click(span)
    );

    const calls = callback.mock.calls;
    expect(calls.length).toEqual(3);
    expect(calls[0][0]).toEqual("info");
    expect(calls[1][0]).toEqual("edit");
    expect(calls[2][0]).toEqual("delete");
  });
});
