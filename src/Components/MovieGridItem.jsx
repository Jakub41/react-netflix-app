import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Col, Card, CardImg, CardTitle, CardBody } from "reactstrap";

class MovieGridItem extends Component {
  onClick = () => {
    this.props.history.push({
      pathname: this.props.data.imdbID,
      state: { data: this.props.data },
    });
  };

  render() {
    const { data } = this.props;
    if (!data) {
      return null;
    }
    return (
      <Col className={this.props.colWidth} onClick={() => this.onClick()}>
        <Card>
          <CardImg className="images" object src={data.Poster} top width="100%" />
          <CardBody>
            <CardTitle>{data.Title}</CardTitle>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

MovieGridItem.propTypes = {
  history: PropTypes.object,
  data: PropTypes.shape({
    Title: PropTypes.string,
    Year: PropTypes.string,
    imdbID: PropTypes.string,
    Type: PropTypes.string,
    Poster: PropTypes.string
  }),
  colWidth: PropTypes.string
};

export default MovieGridItem;
