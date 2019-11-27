import React, {Component} from "react";
import PropTypes from "prop-types";
import {CardImg, Row, Col} from "reactstrap";

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {data, onClickCapture, onMouseUpCapture, onMouseDownCapture} = this.props;
    if (!data) {
      return null;
    }
    return (
      <Row>
        <Col className="sm-8">
          <div
            className="movie-item"
            onClickCapture={e => onClickCapture(e, data)}
            onMouseUpCapture={onMouseUpCapture}
            onMouseDownCapture={e => onMouseDownCapture(e)}
          >
            <CardImg src={data.Poster} className="movie-image" />
            <div className="movie-title">{data.Title}</div>
          </div>
        </Col>
      </Row>
    );
  }
}

Movie.propTypes = {
  history: PropTypes.object,
  data: PropTypes.shape({
    Title: PropTypes.string,
    Year: PropTypes.string,
    imdbID: PropTypes.string,
    Poster: PropTypes.string,
    Type: PropTypes.string,
  }),
  onClickCapture: PropTypes.func.isRequired,
  onMouseUpCapture: PropTypes.func.isRequired,
  onMouseDownCapture: PropTypes.func.isRequired,
};

export default Movie;
