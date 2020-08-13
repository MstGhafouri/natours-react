import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Search } from 'semantic-ui-react';

import natoursApi from '../../../api/natoursApi';

const SearchBar = () => {
  let history = useHistory();
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const search = async () => {
      try {
        setIsLoading(true);
        const response = await natoursApi.get(
          `/tours?name=${term}&fields=name,price,summary,imageCover,slug`
        );
        setIsLoading(false);
        const data = response.data.data.tours.map(tour => ({
          title: tour.name,
          description: tour.summary,
          price: `$${tour.price}`,
          image: `${process.env.PUBLIC_URL}/img/tours/${tour.imageCover}`,
          slug: tour.slug
        }));
        setResults(data);
      } catch (error) {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      if (term) {
        search();
      }
    }, 700);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [term]);

  return (
    <Search
      fluid
      placeholder="Search tours ..."
      loading={isLoading}
      onResultSelect={(_, data) => history.push(`/tour/${data.result.slug}`)}
      onSearchChange={e => setTerm(e.target.value)}
      results={results}
      value={term}
    />
  );
};

export default SearchBar;
