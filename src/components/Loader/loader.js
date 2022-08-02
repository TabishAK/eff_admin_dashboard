import "./loader.scss";
import React from "react";

const Loader = () => {
  return (
    <center>
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </center>
  );
};

export default Loader;
