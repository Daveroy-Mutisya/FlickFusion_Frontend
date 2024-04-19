import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import { useParams } from 'react-router-dom'; // Import useParams
import { BASE_URL } from '../App';
import { FaChair } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';
import'../Pages/booking.css';

const Booking = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { id } = useParams(); // Get id from URL parameters
  const [errorMessage, setErrorMessage] = useState('');
  const [movie, setMovie] = useState(null);
  const [availableSeats, setAvailableSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

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
        setErrorMessage(error.message);
      }
    };

    fetchMovie();

  }, [id]); // Add id to the dependency array

  useEffect(() => {
    const fetchAvailableSeats = async () => {
      try {
        const ontheatreId = 1; 
        const response = await axios.get(`${BASE_URL}/ontheatre/${ontheatreId}/seats`);
        setAvailableSeats(response.data.available_seats);
      } catch (error) {
        console.error(error);
        setErrorMessage('Error fetching available seats');
      }
    };

    fetchAvailableSeats();
  }, []);

  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat)) {
      alert(`Seat ${seat} has already been booked.`);
    } else {
      alert(`Seat ${seat} booked successfully for ${movie.title}.`);
      setBookedSeats([...bookedSeats, seat]);
    }
  };

  return (
    <div style={{ backgroundColor: 'black', color: 'white', fontFamily: 'Jolly Lodger' }}>
      <Navbar/>
      {movie && (
        <div>
          <img src={movie.poster} alt={movie.title} className="mb-4" />
          <div className="movie-details">
          <h3 className="underline">{movie.title}</h3>
          <p>Description: {movie.description}</p>
          <p>Year: {movie.year}</p>
          <p>Rating: {movie.rating}</p>
          <p>Price: {movie.price}</p>
          <p>Genre: {movie.genre}</p>
          </div>
        </div>
      )}
      <p className='text-red-500 text-4xl px-7'>{errorMessage}</p>
      <div>
        <h3 className='text-center text-4xl p-4'>AVAILABLE SEATS</h3>
        <div className='flex justify-center flex-wrap'>
          {availableSeats.map(seat => (
            <button 
              key={seat} 
              onClick={() => handleSeatClick(seat)}
              disabled={bookedSeats.includes(seat)}
              className={`p-3 text-2xl m-2 hover:bg-red-500 hover:text-white flex items-center justify-center rounded-full ${isMobile ? 'text-base' : ''}`}
            >
              {bookedSeats.includes(seat) ? (
                <a href="https://icons8.com/icon/111056/x" target="_blank" rel="noopener noreferrer">
                  <FaChair style={{ display: 'none' }} />
                  <img src="https://img.icons8.com/ios/50/000000/x.png" alt="X" />
                </a>
              ) : (
                <FaChair />
              )}
              {seat}
            </button>
            
          ))}
        </div>
        <button onClick={() => alert('Movie_Ticket has been Successfully Bought')} className="p-3 text-2xl m-2 hover:bg-red-500 hover:text black lex center rounded-full bg-blue-500 text-white px-4 py-2 rounded mt-4 centre-align">
              Buy Ticket
            </button>
      </div>
    </div>
  );
};

export default Booking;
