import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Navbar from '../Components/Navbar';
import '../Pages/booking.css';

const BASE_URL = 'https://flickfusion-backend-dyeq.onrender.com';

const ComingSoonDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`${BASE_URL}/ontheatre/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch coming soon movie');
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
    <div className="bg-black text-white min-h-screen movie">
      <Navbar />
      {movie && (
        <div className="container mx-auto px-4 py-8">
          <div className='movie-details' style={{ fontFamily: 'Jolly Lodger' }}>
            <h2 className="movie-details">Coming Soon Details</h2>
            <img src={movie.poster_theater} alt={movie.title} className="mb-4" />
            <h3 className="movie-details underline">{movie.title}</h3>
            <p>Description: {movie.description}</p>
            <p>Year: {movie.year}</p>
            <p>Rating: {movie.rating_theater}</p>
            <p>Genre: {movie.genre_theater}</p>
            {/* Add more details if needed */}

            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
              <Link to="/coming-soon" className="text-black-500">Back to Coming Soon</Link>
            </button>
            <button onClick={() => alert('Movie Successfully Bookmarked')} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
              Bookmark Movie
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComingSoonDetails;
