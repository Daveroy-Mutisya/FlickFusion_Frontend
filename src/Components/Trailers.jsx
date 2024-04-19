import React, { useState, useEffect } from 'react';

const MovieTrailers = ({ movieTitle }) => {
  const [trailers, setTrailers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTrailers();
  }, []);

  const fetchTrailers = () => {
    fetch(`https://api.themoviedb.org/3/search/movie?query=${movieTitle}&api_key=1e221254797788136100ef2e09183b2d`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch movie trailers');
        }
        return response.json();
      })
      .then(data => {
        const trailerKeys = data.results.map(result => result.key);
        setTrailers(trailerKeys);
      })
      .catch(error => {
        console.error(error);
        setError('Failed to fetch movie trailers');
      });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  const getYoutubeEmbedUrl = (key) => {
    if (!key) return null;
    return `https://www.youtube.com/embed/${key}`;
  };

  return (
    <div>
      {trailers && (
        <div>
          {trailers.map((trailerKey, index) => (
            <iframe
              key={index} // Assigning index as the key
              width="560"
              height="315"
              src={getYoutubeEmbedUrl(trailerKey)}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieTrailers;
