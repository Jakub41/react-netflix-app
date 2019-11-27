import React, {Component} from "react";
import PropTypes from "prop-types";
import {ListGroup, ListGroupItem, ListGroupItemHeading} from "reactstrap";
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
import {GiSandsOfTime, GiFountainPen, GiDirectorChair} from "react-icons/gi";
import Error from "../../../Components/Alert/Error";

export default class MovieDetails extends Component {
  state = {
    movieInfo: {},
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
    this.setState({hasErrors: true});
    setTimeout(this.onClearMessage, 5000);
  };

  render() {
    const {movieInfo, hasErrors, message} = this.state;
    return movieInfo ? (
      <>
        <ListGroup>
          <ListGroupItemHeading>{movieInfo.Title}</ListGroupItemHeading>
          <ListGroupItem className="media">
            <MdBook className="media-left media-middle" />
            <span className="media-right">{movieInfo.Plot}</span>
          </ListGroupItem>
          <ListGroupItem>
            {" "}
            <MdVoiceChat /> {movieInfo.Genre}
          </ListGroupItem>
          <ListGroupItem>
            {" "}
            <GiDirectorChair /> {movieInfo.Director}
          </ListGroupItem>
          <ListGroupItem>
            {" "}
            <MdRecentActors /> {movieInfo.Actors}
          </ListGroupItem>
          <ListGroupItem>
            {" "}
            <GiFountainPen /> {movieInfo.Writer}
          </ListGroupItem>
          <ListGroupItem>
            {" "}
            <MdFlag /> {movieInfo.Country}
          </ListGroupItem>
          <ListGroupItem>
            {" "}
            <FaAward /> {movieInfo.Awards}
          </ListGroupItem>
          <ListGroupItem>
            {" "}
            <FaCalendarAlt /> {movieInfo.Year}
          </ListGroupItem>
          <ListGroupItem>
            {" "}
            <FaLanguage /> {movieInfo.Language}
          </ListGroupItem>
          <ListGroupItem>
            {" "}
            <GiSandsOfTime /> {movieInfo.Runtime}
          </ListGroupItem>
          <ListGroupItem>
            {" "}
            <MdMovie /> {movieInfo.totalSeasons}
          </ListGroupItem>
          <ListGroupItem>
            {" "}
            <MdChildCare /> {movieInfo.Rated}
          </ListGroupItem>
        </ListGroup>
        <div>{hasErrors && <Error message={message} />}</div>
      </>
    ) : (
      <div>{hasErrors && <Error message={message} />}</div>
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
