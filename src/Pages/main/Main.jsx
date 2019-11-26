import React, {Component} from "react";
import PropTypes from "prop-types";
import {
  Container,
  Row,
  Input,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import FilterMovieList from "../../Components/MovieList";
import {getMoviesBySearch} from "../../Apis/MovieApi";
import Loading from "../../Components/Loading";
import Error from "../../Components/Alert/Error";
import MovieGrid from "../../Components/MovieGrid";
import {Icon} from "@iconify/react";
import netflixIcon from "@iconify/icons-mdi/netflix";
import Hero from "./partials/Hero";

class Main extends Component {
  state = {
    loading: false,
    movies: [],
    hasErrors: false,
    message: "Not found movie",
    firstCategories: [],
    secondCategories: [],
    thirdCategories: [],
    selectedCategory: 0,
    searchString: "",
    typing: false,
    typingTimeout: 0,
    gridView: false,
    gridData: [],
  };

  async componentDidMount() {
    try {
      this.setState({loading: true});
      const firstCategories = await this.onFetchMovies(
        "firstCategories",
        "s=star+trek&type=series"
      );
      const secondCategories = await this.onFetchMovies(
        "secondCategories",
        "s=star+wars&type=movie"
      );
      const thirdCategories = await this.onFetchMovies(
        "thirdCategories",
        "s=harry+potter&type=movie"
      );
      this.setState({
        firstCategories,
        secondCategories,
        thirdCategories,
        loading: false,
      });
    } catch (error) {
      console.log("onFetchComments err: ", error);
      this.onShowErrorMessage();
    }
  }

  onFetchMovies = async (key, search) => {
    try {
      const data1 = await getMoviesBySearch(search);
      console.log("Data1", data1)
      if (!data1.Response === "True") {
        return [];
      } else {
        return data1.Search.sort(
          (a, b) => parseInt(b.Year.slice(0, 4)) - parseInt(a.Year.slice(0, 4))
        );
      }
    } catch (err) {
      console.log("onFetchComments err: ", err);
      this.onShowErrorMessage();
    }
  };

  onShowErrorMessage = () => {
    this.setState({hasErrors: true, loading: false});
    setTimeout(this.onClearMessage, 5000);
  };

  onClearMessage = () => {
    this.setState({hasErrors: false});
  };

  searchChange = event => {
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }

    this.setState({
      searchString: event.target.value,
      typing: false,
      typingTimeout: setTimeout(() => {
        this.onSearchByText(this.state.searchString);
      }, 3000),
    });
  };

  onSearchByText = async text => {
    if (text !== "") {
      try {
        this.setState({loading: true});
        const data = await getMoviesBySearch(`s=${text}`);
        if (data.Response === "False") {
          this.setState({loading: false, gridView: true, gridData: []});
        } else {
          this.setState({
            loading: false,
            gridView: true,
            gridData: data.Search.sort(
              (a, b) => parseInt(b.Year.slice(0, 4)) - parseInt(a.Year.slice(0, 4))
            ),
          });
        }
      } catch (err) {
        console.log("onSearchByText err: ", err);
        this.onShowErrorMessage();
      }
    } else {
      this.setState({
        gridView: false,
        selectedCategory: 0,
      });
    }
  };

  onSelectCategory = selectedCategory => {
    this.setState({selectedCategory});
  };

  renderMovies = () => {
    const {
      selectedCategory,
      firstCategories,
      secondCategories,
      thirdCategories,
    } = this.state;
    switch (selectedCategory) {
      case 0:
        return (
          <>
            <FilterMovieList
              label="Star Trek"
              history={this.props.history}
              data={firstCategories}
            />
            <FilterMovieList
              label="Star Wars"
              history={this.props.history}
              data={secondCategories}
            />
            <FilterMovieList
              label="Harry potter"
              history={this.props.history}
              data={thirdCategories}
            />
          </>
        );
      case 1:
        return (
          <FilterMovieList
            label="Star Trek"
            history={this.props.history}
            data={firstCategories}
          />
        );
      case 2:
        return (
          <FilterMovieList
            label="Star Wars"
            history={this.props.history}
            data={secondCategories}
          />
        );
      case 3:
        return (
          <FilterMovieList
            label="Harry potter"
            history={this.props.history}
            data={thirdCategories}
          />
        );
      default:
        return (
          <>
            <FilterMovieList
              label="Star Trek"
              history={this.props.history}
              data={firstCategories}
            />
            <FilterMovieList
              label="Star Wars"
              history={this.props.history}
              data={secondCategories}
            />
            <FilterMovieList
              label="Harry potter"
              history={this.props.history}
              data={thirdCategories}
            />
          </>
        );
    }
  };

  renderMovieGrid = () => {
    const {gridData} = this.state;
    return gridData.length > 0 ? (
      <MovieGrid data={gridData} history={this.props.history} />
    ) : (
      <div className="text-center text-white h-100">
        There is no movie that is matched.
      </div>
    );
  };

  render() {
    const {hasErrors, message, loading, searchString, gridView} = this.state;
    return (
      <div style={{backgroundColor: "#2b2a25"}}>
        <Navbar dark expand="md">
          <Container className="pb-4">
            <NavbarBrand href="/">
              <Icon icon={netflixIcon} color="red" />
            </NavbarBrand>
            <NavbarToggler />
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink
                  href="#"
                  onClick={() => this.onSelectCategory(0)}
                  style={{color: "white"}}
                >
                  All
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="#"
                  onClick={() => this.onSelectCategory(1)}
                  style={{color: "white"}}
                >
                  Star Trek
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="#"
                  onClick={() => this.onSelectCategory(2)}
                  style={{color: "white"}}
                >
                  Star Wars
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="#"
                  onClick={() => this.onSelectCategory(3)}
                  style={{color: "white"}}
                >
                  Harry potter
                </NavLink>
              </NavItem>
              <NavItem>
                <div className="ui icon input">
                  <Input
                    type="text"
                    placeholder="Search movie"
                    onChange={this.searchChange}
                    value={searchString}
                  />
                </div>
              </NavItem>
            </Nav>
          </Container>
        </Navbar>
        <Hero />
        <Container className="py-4">
          <Row></Row>
          {hasErrors && <Error message={message} />}
          {loading && <Loading />}
          {gridView ? this.renderMovieGrid() : this.renderMovies()}
        </Container>
      </div>
    );
  }
}

Main.propTypes = {
  history: PropTypes.any,
};

export default Main;
