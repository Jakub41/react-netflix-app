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
    console.log("props", this.props);

    await this.onFetchInfo();
  }

  onFetchInfo = async () => {
    try {
      const info = await getMoviesInfo();

      console.log(info);

      this.setState({
        MovieDetails: info.data,
      });
    } catch (err) {
      console.log("onFetchInfo err: ", err);
    }
  };

  render() {
    return <div></div>;
  }
}

MovieDetails.propTypes = {
  history: PropTypes.any,
  match: PropTypes.shape({
    params: PropTypes.shape({
      imdbID: PropTypes.string.isRequired,
    }),
  }),
};
