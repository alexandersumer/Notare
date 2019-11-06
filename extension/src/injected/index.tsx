import * as React from "react";
import * as ReactDOM from "react-dom";
import * as $ from "jquery";
import NotetakingBox from "./NotetakingBox";

const secondary = $("#secondary");
const injected = document.createElement("div");
const video = $(".html5-main-video")[0]; // finds the main html5 Youtubue video
secondary.prepend(injected);
ReactDOM.render(<NotetakingBox video={video} />, injected);
