import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Movies from "./Components/Movies";
import MovieDetails from "./Components/MovieDetails";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Movies />} />
                <Route path="/movie-details/:movieId" element={<MovieDetails />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
