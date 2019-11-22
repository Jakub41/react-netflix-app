import React from 'react';
import { Container, Row } from "reactstrap";
import PropTypes from 'prop-types';
import MovieGridItem from './MovieGridItem';


class MovieGrid extends React.Component {

    render() {
        const { data } = this.props;
        let movieList = data.map(movie => {
            return (<MovieGridItem key={movie.imdbID} history={this.props.history} colWidth="col-4" data={movie} />)
        });
        return (
            <Container className="mt-2">
                <Row className="mt-4">
                    {movieList}
                </Row>
            </Container>
        );
    }
}

MovieGrid.propTypes = {
    history: PropTypes.object,
    data: PropTypes.arrayOf(PropTypes.shape({
        Title: PropTypes.string,
        Year: PropTypes.string,
        imdbID: PropTypes.string,
        Poster: PropTypes.string,
        Type: PropTypes.string
    }))
};

export default MovieGrid;
