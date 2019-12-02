import React, {Component} from "react";
import PropTypes from "prop-types";
import {ListGroup, ListGroupItem, ListGroupItemHeading, Container} from "reactstrap";
import {getMoviesInfo} from "../../../Apis/MovieApi";
import {
  MdBook,
  MdVoiceChat,
  MdRecentActors,
  MdFlag,
  MdMovie,
  MdChildCare,
} from "react-icons/md";
import {FaAward, FaCalendarAlt, FaLanguage} from "react-icons/fa";
import {
  GiSandsOfTime,
  GiFountainPen,
  GiDirectorChair,
} from "react-icons/gi";
import Error from "../../../Components/Alert/Error";

export default class MovieDetails extends Component {
  state = {
    movieInfo: [],
    hasErrors: false,
    message: "Something went wrong, please refresh yours page or come back later",
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
      this.onShowErrorMessage();
    }
  };

  onShowErrorMessage = () => {
    this.setState({hasErrors: true, loading: false});
    setTimeout(this.onClearMessage, 5000);
  };
  // movieInfo && Object.keys(movieInfo).length !== 0 ?
  /* : (
    <div>{hasErrors && <Error message={message} />}</div>
    )*/
  render() {
    const {movieInfo, hasErrors, message} = this.state;
    return (
      <>
      <Container>
      {hasErrors && <Error message={message} />}
      </Container>

        <ListGroup className="list-info">
          <ListGroupItemHeading>{movieInfo.Title}</ListGroupItemHeading>
          <ListGroupItem>
            <MdBook />
            <span>{movieInfo.Plot}</span>
          </ListGroupItem>
          <ListGroupItem>
            <MdVoiceChat />
            <span>{movieInfo.Genre}</span>
          </ListGroupItem>
          <ListGroupItem>
            <GiDirectorChair />
            <span>{movieInfo.Director}</span>
          </ListGroupItem>
          <ListGroupItem>
            <MdRecentActors />
            <span>{movieInfo.Actors}</span>
          </ListGroupItem>
          <ListGroupItem>
            <GiFountainPen />
            <span>{movieInfo.Writer}</span>
          </ListGroupItem>
          <ListGroupItem>
            <MdFlag />
            <span>{movieInfo.Country}</span>
          </ListGroupItem>
          <ListGroupItem>
            <FaAward />
            <span>{movieInfo.Awards}</span>
          </ListGroupItem>
          <ListGroupItem>
            <FaCalendarAlt />
            <span>{movieInfo.Year}</span>
          </ListGroupItem>
          <ListGroupItem>
            <FaLanguage />
            <span>{movieInfo.Language}</span>
          </ListGroupItem>
          <ListGroupItem>
            <GiSandsOfTime />
            <span>{movieInfo.Runtime}</span>
          </ListGroupItem>
          <ListGroupItem>
            <MdMovie />
            <span>{movieInfo.totalSeasons}</span>
          </ListGroupItem>
          <ListGroupItem>
            <MdChildCare />
            <span>{movieInfo.Rated}</span>
          </ListGroupItem>
        </ListGroup>
      </>
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
    Year: PropTypes.string,
    Runtime: PropTypes.string,
    totalSeasons: PropTypes.string,
    Rated: PropTypes.string,
    Writer: PropTypes.string,
    Director: PropTypes.string,
  }),
  movieID: PropTypes.string,
};
