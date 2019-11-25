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
    movieInfo: [],
  };

  async componentDidMount() {
    await this.onFetchInfo(this.props.movieID);
  }

  onFetchInfo = async movieID => {
    try {
      const info = await getMoviesInfo(movieID);

      console.log("GETTING IN DETAIL", info);

      this.setState({
        movieInfo: info.data,
      });

      return [];
    } catch (err) {
      console.log("onFetchInfo err: ", err);
    }
  };

  render() {
    const {info} = this.props;
    return info ? <div><h1>{info.Actors}</h1></div> : <div></div>;
  }
}

MovieDetails.propTypes = {
  history: PropTypes.any,
  info: PropTypes.shape({
    Actors: PropTypes.string,
    Awards: PropTypes.string,
    Country: PropTypes.string,
    Genre: PropTypes.string,
    Language: PropTypes.string,
  }),
  movieID: PropTypes.string,
};
