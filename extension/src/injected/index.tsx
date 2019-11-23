import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import App from "./App";

window.addEventListener("load", myMain, false);

function myMain(evt) {
  const secondary = $("#secondary");
  const injected = document.createElement("div");
  const video = $(".html5-main-video")[0]; // finds the main html5 Youtubue video
  secondary.prepend(injected);
  ReactDOM.render(<App video={video} />, injected);
}
