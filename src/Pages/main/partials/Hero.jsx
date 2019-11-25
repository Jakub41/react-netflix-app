import React, {Component} from "react";
import {Jumbotron} from "reactstrap";

export default class Hero extends Component {
  render() {
    return (
      <Jumbotron fluid>
        <div className="video-container">
        <video autoPlay loop muted className="video-bg" id="video-bg">
          <source
            src={require('../../../media/stw.mp4')}
            type="video/mp4"
            alt="HTML5 background video"
          />
        </video>
        </div>
      </Jumbotron>
    );
  }
}
