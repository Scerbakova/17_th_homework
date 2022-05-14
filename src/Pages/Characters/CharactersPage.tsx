import axios from 'axios';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSearchParams } from 'react-router-dom';
import CharacterCard from '../../components/Cards/CharacterCard';
import Loader from '../../components/Loader/Loader';
import { Character } from '../../Models/CharacterModel';

const CaractersPage = () => {
  const [characters, setCharacters] = useState<Character[]>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [activeFilter, setActiveFilter] = useState('all');
  const [nextPage, setNextPage] = useState<string>();
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const getCharacters = async () => {
    setLoading(true);
    const params = activeFilter === 'all' ? '' : `?${searchParams}`;

    try {
      const { data } = await axios.get(`https://rickandmortyapi.com/api/character/${params}`);
      const { results, info } = data;

      setCharacters(results);

      if (info.next === null) {
        setHasMore(false);
      } else {
        setNextPage(info.next);
        setHasMore(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.status === 404 ? 'Nothing to show' : error.message;
        setErrorMessage(message);
      } else {
        setErrorMessage('Not Axios Error');
      }
    } finally {
      setLoading(false);
    }
  };

  const getMoreCharacters = async () => {
    setLoading(true);

    try {
      if (nextPage) {
        const response = await axios.get(nextPage);
        setNextPage(response.data.info.next);
        const data = response.data.results;
        return data;
      }
      setHasMore(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.status === 404 ? 'Nothing to show' : error.message;
        setErrorMessage(message);
      } else {
        setErrorMessage('Not Axios Error');
      }
    } finally {
      setLoading(false);
    } return [];
  };

  const fetchData = async () => {
    const moreCharacters = await getMoreCharacters();

    if (characters) {
      setCharacters([...characters, ...moreCharacters]);
    }
  };

  useEffect(() => {
    getCharacters();
  }, [activeFilter]);

  return (
    <div className="text-center">
      <h1 className="title">Characters</h1>
      <div className="buttons">
        <button
          onClick={() => {
            setActiveFilter('all');
            setSearchParams({ status: 'all' });
          }}
          className="btn btn-primary"
        >
          All
        </button>
        <button
          onClick={() => {
            setActiveFilter('alive');
            setSearchParams({ status: 'alive' });
          }}
          className="btn btn-success"
        >
          Alive
        </button>
        <button
          onClick={() => {
            setActiveFilter('dead'); setSearchParams({ status: 'dead' });
          }}
          className="btn btn-danger"
        >
          Dead
        </button>
        <button
          onClick={() => {
            setActiveFilter('unknown'); setSearchParams({ status: 'unknown' });
          }}
          className="btn btn-warning"
        >
          Unknown
        </button>
      </div>
      {characters && (
      <InfiniteScroll
        dataLength={characters.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <div className="row gx-2 justify-content-center">
          {characters && characters.map(({
            id, name, image, status,
          }) => (
            <CharacterCard
              key={id}
              id={id}
              name={name}
              image={image}
              status={status}
            />
          ))}
        </div>
      </InfiniteScroll>
      )}
      <div>{errorMessage && <span>{errorMessage}</span>}</div>
      {loading && <Loader />}
    </div>
  );
};

export default CaractersPage;
