import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const CatBreedCard = React.memo(({ breed }) => (
  <div style={{ margin: '20px', textAlign: 'start' }}>
    <h2>{breed.name}</h2>
    {breed.image && breed.image.url ? (
      <img
        src={breed.image.url}
        alt={`Image of ${breed.name}`}
        style={{ width: '200px', height: 'auto' }}
      />
    ) : (
      <p>No image available</p>
    )}
  </div>
));

export const MyComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('https://api.thecatapi.com/v1/breeds');
      if (!response.ok) {
        throw new Error('Failed to fetch data. Please try again later.');
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div>
      {data.map(item => (
        <CatBreedCard key={item.id} breed={item} />
      ))}
    </div>
  );
};

// Prop Types for validation
CatBreedCard.propTypes = {
  breed: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.shape({
      url: PropTypes.string,
    }),
  }).isRequired,
};

