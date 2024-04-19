import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./Pages/HomePage";
import AuthenticationPage from "./Pages/AuthenticationPage";
import BookingPage from "./Pages/BookingPage";
import MovieDetails from "./Pages/MovieDetails";
import ComingSoon from "./Components/Comingsoon";
import ComingSoonDetails from "./Pages/ComingDetails";

export const BASE_URL = 'https://flickfusion-backend-dyeq.onrender.com/';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />} exact />
                <Route path="/authentication" element={<AuthenticationPage />} />
                < Route path="/movies" element={<ComingSoon/>} />
                <Route path="/booking/:id" element={<BookingPage />} />
                <Route path="/movie-details/:id" element={<MovieDetails />} />
                <Route path="/comingsoon-details/:id" element={<ComingSoonDetails />} />

            </Routes>
        </BrowserRouter>
    );
};

export default App;
