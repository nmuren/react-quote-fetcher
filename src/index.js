import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import ReadMe from "./ReadMe";
import ReadMeText from "../public/README.md";

import "bootstrap";

const rootElement = document.getElementById("root");

/*<React.StrictMode>*/

//const JSX = <ReadMe input={ReadMeText} />;
const appJSX = (
  <div>
    <div className="mb-3 shadow-sm card card-body">
      <App />
    </div>
  </div>
);

const readMeJSX = (
  <div>
    <button
      className="btn btn-info btn-block"
      type="button"
      data-toggle="collapse"
      data-target="#collapseReadMe"
    >
      Read Me
    </button>
    <div
      id="collapseReadMe"
      className="container border-warning mt-2 shadow-sm card card-body collapse"
    >
      <ReadMe input={ReadMeText} />
    </div>
  </div>
);
//ReactDOM.render(JSX, rootElement);

const JSX = (
  <React.StrictMode>
    <div className="container border border-warning rounded my-3 p-3 grid-gap">
      {appJSX}
      <div className="mb-2" />
      {readMeJSX}
    </div>
  </React.StrictMode>
);

ReactDOM.render(JSX, rootElement);
