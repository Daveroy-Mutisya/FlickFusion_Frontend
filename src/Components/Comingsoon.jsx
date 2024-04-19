import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../App';
import { useMediaQuery } from 'react-responsive';
import Navbar from './Navbar';

const ComingSoon = () => {
  const [comingSoonMovies, setComingSoonMovies] = useState([]);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    fetchComingSoonMovies();
  }, []);

  const fetchComingSoonMovies = async () => {
    try {
      const response = await fetch(`${BASE_URL}/ontheatre`);
      if (!response.ok) {
        throw new Error('Failed to fetch coming soon movies');
      }
      const data = await response.json();
      setComingSoonMovies(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="custom-font bg-black text-white font-jolly-lodger">
      <div>
        <Navbar />
        <section>
          <div className={`text text-center ${isMobile ? 'py-10 text-5xl' : 'py-20 text-9xl'}`}>
            COMING SOON
          </div>
        </section>
        {/* Movie list section */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Added gap-8 for spacing */}
            {comingSoonMovies.map(movie => (
              <div key={movie.id} className="bg-black p-4">
                <Link to={`/comingsoon-details/${movie.id}`}>
                  <img
                    src={movie.poster_theater}
                    alt={movie.title}
                    className="w-full h-120 object-cover border-2 border-transparent transition-all duration-300 hover:border-red-500 rounded-md"
                  />
                </Link>
                <div className="flex flex-col items-center mt-4">
                  <p className="text-white text-3xl">Rating: {movie.rating_theater}</p>
                  <h3 className="text-white text-xl mt-2">{movie.title}</h3>
                  <div className="flex mt-4">
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ComingSoon;
