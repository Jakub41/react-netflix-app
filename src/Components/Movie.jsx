import React, { Component } from "react";
import PropTypes from 'prop-types';
import { CardImg, CardTitle, CardBody } from "reactstrap";

class Movie extends Component {

  render() {
    const { data, onClickCapture, onMouseUpCapture, onMouseDownCapture } = this.props;
    return data ? 
    (
      <div
        className="mx-2 movie-item"
        onClickCapture={e => onClickCapture(e, data)}
        onMouseUpCapture={onMouseUpCapture}
        onMouseDownCapture={e => onMouseDownCapture(e)}
      >
        <CardImg className="movie-image" src={data.Poster} top />
        <CardBody>
          <CardTitle style={{ color: "white" }}>{data.Title}</CardTitle>
        </CardBody>
      </div>
    ) : (<div></div>);
  }
}

Movie.propTypes = {
  history: PropTypes.object,
  data: PropTypes.shape({
    Title: PropTypes.string,
    Year: PropTypes.string,
    imdbID: PropTypes.string,
    Poster: PropTypes.string,
    Type: PropTypes.string
  }),
  onClickCapture: PropTypes.func.isRequired,
  onMouseUpCapture: PropTypes.func.isRequired,
  onMouseDownCapture: PropTypes.func.isRequired
};

export default Movie;
