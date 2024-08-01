import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import "./index.css";
import { useParams } from "react-router-dom";

export default function MovieDetails(params) {
    const [movieDetails, setMovieDetails] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    const movieId = useParams();
    useEffect(() => {
        const getMovieDetails = async () => {
            const detailsUrl = `https://tridizi-backend.onrender.com/api/movie/details/${movieId.movieId}`;
            const peoplesUrl = `https://tridizi-backend.onrender.com/api/movie/people/${movieId.movieId}`;
            const ImagesUrl = `https://tridizi-backend.onrender.com/api/movie/${movieId.movieId}/images`;
            const options = {
                method: "GET",
            };

            try {
                const [detailsResponse, peoplesResponse, imagesResponse] = await Promise.all([
                    fetch(detailsUrl, options),
                    fetch(peoplesUrl, options),
                    fetch(ImagesUrl, options),
                ]);
                if (!detailsResponse.ok) {
                    throw new Error("Network response was not ok");
                }
                if (!peoplesResponse.ok) {
                    throw new Error("Network response was not ok");
                }
                if (!imagesResponse.ok) {
                    throw new Error("Network response was not ok");
                }
                const detailsData = await detailsResponse.json();
                const peoplesData = await peoplesResponse.json();
                const imagesData = await imagesResponse.json();
                const actors = peoplesData.actors.filter((actor) => !actor.profileImg.endsWith("null"));
                const directors = peoplesData.directors.filter((director) => !director.profileImg.endsWith("null"));
                const cast = actors.slice(0, 10);
                const crew = [];
                const ids = new Set();
                directors.forEach((director) => {
                    if (!ids.has(director.id)) {
                        ids.add(director.id);
                        crew.push(director);
                    }
                });
                const castAndCrewData = { actors: cast, directors: crew };
                setMovieDetails({ detailsData, castAndCrewData, imagesData });
                setErrorMessage("");
            } catch (error) {
                console.error("Error fetching movie details", error);
                setErrorMessage("Error fetching movie details");
            }
        };
        getMovieDetails();
    }, [movieId.movieId]);
    return (
        <div className="main-container">
            <Navbar />
            <div className="details-container">
                {errorMessage && <p className="error">{errorMessage}</p>}
                {movieDetails.detailsData && movieDetails.castAndCrewData && movieDetails.imagesData && (
                    <>
                        <div className="details-inner1">
                            <img src={movieDetails.detailsData.poster} alt="poster" />
                            <div className="inner1">
                                <h1 className="inner1-title">{movieDetails.detailsData.title}</h1>
                                <h2 className="inner1-disc">{movieDetails.detailsData.description}</h2>
                                <p className="inner1-runtime">{movieDetails.detailsData.runtime}</p>
                                <div className="budget-div">
                                    <div>
                                        <p>Budget:</p>
                                        <h3>${movieDetails.detailsData.budget}</h3>
                                    </div>
                                    <div>
                                        <p>Revenue:</p>
                                        <h3>${movieDetails.detailsData.revenue}</h3>
                                    </div>
                                </div>
                                <div className="rating-div">
                                    <div>
                                        <p>Rating:</p>
                                        <h3 className={movieDetails.detailsData.rating > 5 ? "rating-color-gold" : "rating-color-red"}>
                                            {movieDetails.detailsData.rating}
                                        </h3>
                                    </div>
                                    <div>
                                        <p>Visit</p>
                                        {movieDetails.detailsData.homepage ? (
                                            <a href={movieDetails.detailsData.homepage}>{movieDetails.detailsData.homepage}</a>
                                        ) : (
                                            <h3>Link not available</h3>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h1 className="cast-heading">Cast</h1>
                        <ul className="actors-container">
                            {movieDetails.castAndCrewData.actors.map((cast) => (
                                <li className="cast" key={cast.id}>
                                    <img src={cast.profileImg} alt={cast.id} />
                                    <h2>{cast.name}</h2>
                                    <h3>{cast.character}</h3>
                                </li>
                            ))}
                        </ul>
                        <h1 className="cast-heading">Directors</h1>
                        <ul className="actors-container">
                            {movieDetails.castAndCrewData.directors.map((cast) => (
                                <li className="cast" key={cast.id}>
                                    <img src={cast.profileImg} alt={cast.id} />
                                    <h2>{cast.name}</h2>
                                    <h3>{cast.character}</h3>
                                </li>
                            ))}
                            {movieDetails.castAndCrewData.directors.length === 0 && <p className="error">No Data</p>}
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
}
