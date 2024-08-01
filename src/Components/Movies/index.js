import { Component } from "react";
import "./index.css";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";

class Movies extends Component {
    state = {
        movies: [],
        errorMessage: "",
    };

    componentDidMount() {
        const getMoviesData = async () => {
            const url = "https://tridizi-backend.onrender.com/api/movies";
            const options = {
                method: "GET",
            };
            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const responseData = await response.json();
                this.setState({ movies: responseData });
                console.log(responseData);
            } catch (error) {
                console.error("Error fetching movies data", error);
                this.setState({ errorMessage: "Error fetching movies data: " + error.message });
            }
        };

        getMoviesData();
    }

    render() {
        const { movies } = this.state;
        return (
            <div className="main-container">
                <Navbar />
                <ul className="movies-container">
                    {movies.map((movie) => (
                        <Link key={movie.poster} to={`/movie-details/${movie.id}`} className="movie-card">
                            <li>
                                <img src={movie.poster} alt={movie.title} />
                                <h3 className="title">{movie.title}</h3>
                                <div className="rating-container">
                                    <h3>{movie.releaseDate.substring(0, 4)}</h3>
                                    <h3 className={movie.rating > 5 ? "rating-color-gold" : "rating-color-red"}>{movie.rating}</h3>
                                </div>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Movies;
