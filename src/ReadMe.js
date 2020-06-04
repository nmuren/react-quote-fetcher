import React from "react";
import Markdown from "markdown-to-jsx";

export default class ReadMe extends React.Component {
  markdownREADME = <Markdown>{this.props.input}</Markdown>;
  render() {
    return this.markdownREADME;
  }
}
