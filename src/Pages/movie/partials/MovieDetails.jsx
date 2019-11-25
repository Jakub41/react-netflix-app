import React, {Component} from "react";
import PropTypes from "prop-types";
import {
  Container,
  Row,
  Col,
  CardImg,
  CardTitle,
  CardBody,
  Button,
  Input,
  FormGroup,
  Label,
} from "reactstrap";
import {getMoviesInfo} from "../../../Apis/MovieApi";

export default class MovieDetails extends Component {
  state = {
    movieInfo: {},
  };

  async componentDidMount() {
    await this.onFetchInfo(this.props.movieID);
  }

  onFetchInfo = async movieID => {
    try {
      const info = await getMoviesInfo(movieID);

      console.log("GETTING IN DETAIL", info);

      this.setState({
        movieInfo: info,
      });

      return [];
    } catch (err) {
      console.log("onFetchInfo err: ", err);
    }
  };

  render() {
    const {movieInfo} = this.state;
    return movieInfo ? (
      <div>
        <h1>{movieInfo.Title}</h1>
        <p>{movieInfo.Plot}</p>
        <p>{movieInfo.Genre}</p>
        <p>{movieInfo.Actors}</p>
        <p>{movieInfo.Country}</p>
        <p>{movieInfo.Language}</p>
        <p>{movieInfo.Awards}</p>
      </div>
    ) : (
      <div></div>
    );
  }
}

MovieDetails.propTypes = {
  history: PropTypes.any,
  info: PropTypes.shape({
    Title: PropTypes.string,
    Actors: PropTypes.string,
    Awards: PropTypes.string,
    Country: PropTypes.string,
    Genre: PropTypes.string,
    Language: PropTypes.string,
    Plot: PropTypes.string,
  }),
  movieID: PropTypes.string,
};
