import React from 'react';
import Slider from "react-slick";
import PropTypes from 'prop-types';
import Movie from './Movie';


class MovieList extends React.Component {
    state = {
        dragging: false
    }
    swiping = false;
    carouselRef = React.createRef();
    handleMouseDown = event => {
        event.preventDefault();
    };

    handleMouseUp = () => {
        this.swiping = this.carouselRef.current.innerSlider.state.swiping;
    };

    handleClick = (event, data) => {
        if (this.swiping) {
            event.preventDefault();
        } else {
            this.props.history.push({
                pathname: data.imdbID,
                state: { data: data }
            })
        }
    };

    render() {
        const { data } = this.props;
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            beforeChange: () => this.setState({ dragging: true }),
            afterChange: () => this.setState({ dragging: false }),
        };
        let movieList = data ? data.map(m => {
            return (
                <Movie
                    key={m.imdbID}
                    history={this.props.history}
                    data={m}
                    onClickCapture={this.handleClick}
                    onMouseUpCapture={this.handleMouseUp}
                    onMouseDownCapture={this.handleMouseDown}
                />
            )
        }) : null;
        
        return (
            <div className="mt-2 p-2">
                <label style={{ color: "white" }}>{this.props.label}</label>
                <div className="">
                    <Slider {...settings} ref={this.carouselRef}>
                        {movieList}
                    </Slider>
                </div>
            </div>
        );
    }
}

MovieList.propTypes = {
    history: PropTypes.object,
    label: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape({
        Title: PropTypes.string,
        Year: PropTypes.string,
        imdbID: PropTypes.string,
        Poster: PropTypes.string,
        Type: PropTypes.string
    }))
};

export default MovieList;
