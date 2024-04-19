import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Navbar from '../Components/Navbar';
import MovieTrailers from '../Components/Trailers';
import '../Pages/booking.css';

const BASE_URL = 'https://flickfusion-backend-dyeq.onrender.com';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`${BASE_URL}/movies/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch movie');
        }
        const movieData = await response.json();
        setMovie(movieData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchMovie();

  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-black text-white min-h-screen ">
      <Navbar />
      {movie && (
        <div className='container mx-auto px-4 py-8'  style={{ fontFamily: 'Jolly Lodger' }}>
          <div className="movie-details"> {/* Add movie-details class here */}
            <h2 className="text-3xl font-bold mb-4">Movie Details</h2>
            <img src={movie.poster} alt={movie.title} className="mb-4" />
            <h3 className="movie-details underline" style={{ fontFamily: 'Jolly Lodger' }}>{movie.title}</h3>
            <p>Description: {movie.description}</p>
            <p>Year: {movie.year}</p>
            <p>Rating: {movie.rating}</p>
            <p>Price: {movie.price}</p>
            <p>Genre: {movie.genre}</p>

            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
              <Link to="/" className="text-black-500">Back to Homepage</Link>
            </button>
            <button onClick={() => alert('Movie Successfully Bought')} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
              Buy Movie 2D version
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
