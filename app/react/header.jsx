import React from "react";
import ReactDOM from "react-dom";
import { goToHomePage } from "../js/router";

export const Header = () => (
  <section className="section navbar-section">
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <p className="navbar-item subtitle is-1 homeBtn" onClick={goToHomePage}>
        <strong>Reviewfier</strong>
      </p>
      <p className="navbar-item subtitle is-2">
        <span className="subtitle is-4">Find reviews for any product!</span>
      </p>
    </nav>
  </section>
);

ReactDOM.render(<Header />, document.getElementById("header"));
