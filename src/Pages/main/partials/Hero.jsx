import React, {Component} from "react";
import {Jumbotron} from "reactstrap";

export default class Hero extends Component {
  componentDidMount = () => {
    var myvid = document.getElementById("myvideo");

    myvid.addEventListener("ended", function(e) {
      var activesource = document.querySelector("#myvideo source.active");
      var nextsource =
        document.querySelector("#myvideo source.active + source") ||
        document.querySelector("#myvideo source:first-child");

      activesource.className = "";
      nextsource.className = "active";

      myvid.src = nextsource.src;
      myvid.play();
    });
  };
  render() {
    return (
      <Jumbotron fluid>
        <div className="video-container">
          <video autoPlay muted className="video-bg" id="myvideo">
            <source
              src={require("../../../media/stw.mp4")}
              type="video/mp4"
              alt="HTML5 background video"
              className="active"
            />
            <source
              src={require("../../../media/geminiMan.mp4")}
              type="video/mp4"
              alt="HTML5 background video"
            />
            <source
              src={require("../../../media/SuperrHerro.mp4")}
              type="video/mp4"
              alt="HTML5 background video"
            />
            <source
              src={require("../../../media/terminator.mp4")}
              type="video/mp4"
              alt="HTML5 background video"
            />
          </video>
        </div>
      </Jumbotron>
    );
  }
}
