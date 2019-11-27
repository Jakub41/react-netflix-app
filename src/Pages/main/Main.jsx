import React, {Component} from "react";
import PropTypes from "prop-types";
import {
  Container,
  Input,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import {Icon} from "@iconify/react";
import netflixIcon from "@iconify/icons-mdi/netflix";
import FilterMovieList from "../../Components/MovieList";
import {getMoviesBySearch} from "../../Apis/MovieApi";
import Loading from "../../Components/Loading";
import Error from "../../Components/Alert/Error";
import MovieGrid from "../../Components/MovieGrid";
import Hero from "./partials/Hero";
import {navigationLink} from "../../Utils/utilsConst";

const debounce = (func, delay) => {
  let debounceTimer;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

class Main extends Component {
  state = {
    loading: false,
    movies: [],
    hasErrors: false,
    message: "Error something went wrong please refresh the browser or come back later",
    firstCategories: [],
    secondCategories: [],
    thirdCategories: [],
    selectedCategory: 0,
    searchString: "",
    typing: false,
    typingTimeout: 0,
    gridView: false,
    gridData: [],
    dropdown: false,
  };

  componentDidMount = async () => {
    try {
      this.setState({loading: true});
      const firstCategories = await this.onFetchMovies(
        "firstCategories",
        "s=star trek&type=series"
      );
      const secondCategories = await this.onFetchMovies(
        "secondCategories",
        "s=star wars&type=movie"
      );
      const thirdCategories = await this.onFetchMovies(
        "thirdCategories",
        "s=harry potter&type=movie"
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
  };

  onFetchMovies = async (key, search) => {
    try {
      const data1 = await getMoviesBySearch(search);
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
    debounce(this.onSearchByText(event.target.value), 3000);
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
  toggle = () => {
    const {dropdown} = this.state;
    this.setState({dropdown: !dropdown});
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
    const {
      hasErrors,
      message,
      loading,
      gridView,
      selectedCategory,
      dropdown,
    } = this.state;
    return (
      <div style={{backgroundColor: "#2b2a25"}}>
        <Navbar dark expand="md">
          <Container className="pb-4">
            <NavbarBrand href="/">
              <Icon icon={netflixIcon} color="red" />
            </NavbarBrand>
            <Nav className="only-desktop" navbar>
              {navigationLink.map((item, index) => (
                <NavItem key={index}>
                  <NavLink
                    href="#"
                    onClick={() => this.onSelectCategory(index)}
                    style={{
                      color: selectedCategory === index ? "red" : "white",
                      fontSize: 25,
                    }}
                  >
                    {item}
                  </NavLink>
                </NavItem>
              ))}
            </Nav>
            <div className="only-mobile">
              <Dropdown isOpen={dropdown} toggle={this.toggle}>
                <DropdownToggle caret>Browse</DropdownToggle>
                <DropdownMenu>
                  {navigationLink.map((item, index) => (
                    <DropdownItem key={index} onClick={() => this.onSelectCategory(index)}>
                      {item}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>

            <Input
              type="text"
              placeholder="Search movie"
              onChange={this.searchChange}
              className="input-field"
            />
          </Container>
        </Navbar>

        <Hero />
        <Container className="py-4">
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
