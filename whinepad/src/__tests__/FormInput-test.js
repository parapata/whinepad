import React from "react";
import TestUtils from "react-dom/test-utils";

jest
  .dontMock("../components/FormInput")
  .dontMock("../components/Rating")
  .dontMock("../components/Suggest")
  .dontMock("classnames");

const FormInput = require("../components/FormInput").default;

describe("factory works", () => {
  it("renders correct input node", () => {
    expect(
      TestUtils.findRenderedDOMComponentWithTag(
        TestUtils.renderIntoDocument(<FormInput />),
        "input"
      ).type
    ).toBe("text");

    expect(
      TestUtils.findRenderedDOMComponentWithTag(
        TestUtils.renderIntoDocument(<FormInput type="year" />),
        "input"
      ).type
    ).toBe("number");

    expect(
      TestUtils.findRenderedDOMComponentWithTag(
        TestUtils.renderIntoDocument(<FormInput type="rating" id="rating" />),
        "input"
      ).type
    ).toBe("hidden");

    expect(
      TestUtils.findRenderedDOMComponentWithTag(
        TestUtils.renderIntoDocument(
          <FormInput type="suggest" options={["r", "g", "b"]} />
        ),
        "datalist"
      ).id
    ).toBeTruthy();

    expect(
      TestUtils.findRenderedDOMComponentWithTag(
        TestUtils.renderIntoDocument(<FormInput type="text" />),
        "textarea"
      ).nodeName
    ).toBe("TEXTAREA");
  });

  it("returns input value", () => {
    let input = TestUtils.renderIntoDocument(<FormInput type="year" />);
    expect(input.getValue()).toBe(String(new Date().getFullYear()));
    input = TestUtils.renderIntoDocument(
      <FormInput type="rating" defaultValue="3" />
    );
    expect(input.getValue()).toBe(3);
  });
});
