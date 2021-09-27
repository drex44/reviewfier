import React from "react";
import ReactDOM from "react-dom";

export const Header = () => (
  <section class="section navbar-section">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <p class="navbar-item subtitle is-1 homeBtn">
        <strong>Reviewfier</strong>
      </p>
      <p class="navbar-item subtitle is-2">
        <span class="subtitle is-4">Find reviews for any product!</span>
      </p>
    </nav>
  </section>
);

ReactDOM.render(<Header />, document.getElementById("header"));
